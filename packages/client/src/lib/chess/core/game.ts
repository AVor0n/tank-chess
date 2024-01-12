import { EventBus } from '../../eventBus'
import { CHARS, PLAYER_COLORS, START_BOARD_TEMPLATE, CHAR_TO_TANK_TYPE } from '../constants'
import { ACTION_TYPE, TANK_TYPE } from '../types'
import { isEqual } from '../utils/isEqual'
import { getNextCell } from '../utils/step'
import { Board } from './board'
import { Player } from './player'
import { Tank } from './tank'

export class Game extends EventBus<{
  /** Срабатывает прямо перед тем, как танк совершит действие */
  willPerformAction: (action: ACTION_TYPE) => void
  /** Срабатывает после того, как танк совершил действие */
  didPerformAction: (action: ACTION_TYPE) => void
  /** Срабатывает при каждой смене активного игрока */
  onChangeActivePlayer: (activePlayer: Player) => void
  /** Срабатывает при каждой смене активного танка */
  onChangeActiveTank: (activeTank: Tank | null) => void
  /** Срабатывает при старте игры */
  startGame: (firstPlayer: Player) => void
  /** Срабатывает при обнулении игры */
  resetGame: () => void
  /** Срабатывает при завершении игры */
  endGame: (winner: Player) => void
}> {
  /** Счетчик ходов. При каждом изменении меняется активный игрок */
  private _moveCounter = 0

  players: Player[] = []

  board: Board

  /** Все танки в игре */
  tanks: Tank[] = []

  /** Мапа для быстрого доступа */
  tanksMap: Record<string, Tank> = {}

  private _activeTank: Tank | null = null

  get moveCounter() {
    return this._moveCounter
  }

  get activePlayer() {
    return this.players[this.moveCounter % this.players.length]
  }

  get activeTank() {
    return this._activeTank
  }

  constructor() {
    super()
    this.board = new Board()
  }

  public startGame(options: { playerName1: string; playerName2: string }): void {
    this.players = [new Player(options.playerName1), new Player(options.playerName2)]
    this.initBoard()

    this._moveCounter = 0
    this.tanksMap = this.tanks.reduce((acc: Record<string, Tank>, tank) => {
      acc[tank.id] = tank
      return acc
    }, {})

    this.emit('startGame', this.activePlayer)
  }

  /** Танки которые можно выбрать в качестве активного */
  public getTanksForMove() {
    return this.tanks.filter(tank => tank.isAlive && tank.playerId === this.activePlayer.id)
  }

  /** Выбирает танк для совершения дальнейших действий  */
  public setActiveTank(tankId: string) {
    if (this._activeTank && this._activeTank.energy < this._activeTank.movement) return
    const selectedTank = this.tanksMap[tankId]
    if (selectedTank && selectedTank.playerId === this.activePlayer.id) {
      this._activeTank = this.tanksMap[tankId]
      this.activeTank?.charge()
      this.emit('onChangeActiveTank', this.activeTank)
    }
  }

  public resetActiveTank() {
    if (!this._activeTank) return
    this._activeTank = null
    this.emit('onChangeActiveTank', this.activeTank)
  }

  private isLeftTurnAvailable(tank: Tank) {
    if (tank.energy === 0) return false
    if (tank.energy > 1) return true
    const newPosition = { ...tank.position, rotation: (tank.position.rotation - 1) % 8 }
    return !isEqual(newPosition, tank.startPosition)
  }

  private isRightTurnAvailable(tank: Tank) {
    if (tank.energy === 0) return false
    if (tank.energy > 1) return true
    const newPosition = { ...tank.position, rotation: (tank.position.rotation + 1) % 8 }
    return !isEqual(newPosition, tank.startPosition)
  }

  private isStopAvailable(tank: Tank) {
    return !tank.hasFullEnergy && !isEqual(tank.position, tank.startPosition)
  }

  private isDriveAvailable(tank: Tank) {
    if (tank.energy === 0) return false

    const nextCell = getNextCell(tank.position, 1)
    return this.board.getCellAt(nextCell)?.type === 'empty'
  }

  private isReverseAvailable(tank: Tank) {
    if (!tank.hasFullEnergy) return false

    const nextCell = getNextCell(tank.position, -1)
    return this.board.getCellAt(nextCell)?.type === 'empty'
  }

  private isFireAvailable(tank: Tank) {
    if (tank.energy === 0) return false
    const objectOnBoard = this.board.getTarget(tank.position)
    if (objectOnBoard && objectOnBoard.type === 'tank') {
      const target = this.tanksMap[objectOnBoard.data.id]
      if (!target) return false
      const hasEnemy = target.playerId !== tank.playerId
      const hasStrength = tank.strength >= target?.armor
      const nextCell = getNextCell(tank.position, 1)
      const hasDistance = target.position.x !== nextCell.x || target.position.y !== nextCell.y
      return hasEnemy && hasStrength && hasDistance
    }
    return false
  }

  /** Возвращает доступные действия для указного танка */
  public getAvailableActions(tank: Tank) {
    if (!tank.energy) return []
    const availableActions: ACTION_TYPE[] = []

    if (this.isFireAvailable(tank)) availableActions.push(ACTION_TYPE.FIRE)
    if (this.isStopAvailable(tank)) availableActions.push(ACTION_TYPE.STOP)
    if (this.isDriveAvailable(tank)) availableActions.push(ACTION_TYPE.DRIVE)
    if (this.isReverseAvailable(tank)) availableActions.push(ACTION_TYPE.REVERSE)
    if (this.isLeftTurnAvailable(tank)) availableActions.push(ACTION_TYPE.TURN_LEFT)
    if (this.isRightTurnAvailable(tank)) availableActions.push(ACTION_TYPE.TURN_RIGHT)

    return availableActions
  }

  /** Выполнить движение танком, который выбран в качестве активного */
  public makeMove(action: ACTION_TYPE): void {
    this.emit('willPerformAction', action)

    const tank = this.activeTank
    if (!tank) throw new Error(`Танк не выбран`)

    const { x, y } = tank.position
    const actionMap: Record<ACTION_TYPE, () => void> = {
      STOP: () => this.endMove(),
      DRIVE: () => tank.drive(),
      REVERSE: () => tank.reverse(),
      TURN_LEFT: () => tank.turnLeft(),
      TURN_RIGHT: () => tank.turnRight(),
      FIRE: () => {
        const obj = this.board.getTarget(tank.position)
        if (!obj || obj.type !== 'tank') throw new Error('Цель не является танком')

        const target = this.tanksMap[obj.data.id]
        if (!target) throw new Error('Не удалось найти цель')

        tank.shoot()
        this.killTank(target)
      },
    }

    actionMap[action]()
    this.board.moveItem(x, y, tank.position.x, tank.position.y)
    this.emit('didPerformAction', action)

    if (tank.energy === 0) {
      this.endMove()
    }
  }

  /** Уничтожить танк */
  private killTank(tank: Tank) {
    tank.destroy()
    delete this.tanksMap[tank.id]
    if (tank.type === TANK_TYPE.CLT) {
      this.emit('endGame', this.activePlayer)
    }
  }

  /** Закончить ход досрочно */
  public endMove = () => {
    this.resetActiveTank()
    this._moveCounter++
    this.emit('onChangeActivePlayer', this.activePlayer)
  }

  /** Инициализирует доску, создает и расставляет фигуры на доске */
  private initBoard() {
    const colors = PLAYER_COLORS
    this.board = Board.createFromTemplate(START_BOARD_TEMPLATE, (board, char, x, y) => {
      if (char === CHARS.EMPTY) {
        return
      }

      if (char === CHARS.WALL) {
        board.placeWall(x, y)
        return
      }

      const playerIdx = Number(char.toLowerCase() === char)
      const playerId = this.players[playerIdx].id
      const color = colors[playerIdx]
      const type = CHAR_TO_TANK_TYPE[char[0].toUpperCase()]
      const rotation = CHARS.ARROWS.indexOf(char.slice(1))
      const tank = new Tank(type, playerId, color, { x, y, rotation })
      this.tanks.push(tank)
      board.placeTank(tank)
    })
  }

  /** Сбрасывает состояние игры */
  public resetGame() {
    this.board = new Board()
    this._moveCounter = 0
    this.tanks = []
    this.players = []
    this.tanksMap = {}
    this._activeTank = null
    this.emit('resetGame')
  }
}

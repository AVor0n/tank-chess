import { type Game, type Tank, TANK_TYPE, ACTION_TYPE } from '../chess'
import { colors } from './constants'
import { shootSound, moveSound, stopSound, winSound, changeSound, chooseSound } from './soundEffects'
import { getContrast } from './utils'

export class ChessCanvasUI {
  /** объект содержащий всю логику игры */
  game: Game

  ctx: CanvasRenderingContext2D

  /** Размер каждой из сторон canvas в px */
  canvasSize: number

  /** Размер одной клетки поля в px */
  cellSize: number

  /** Ширина границы доски */
  boardBorderWidth = 20

  /** Поле повернуто на 180° */
  isInverted: boolean

  /** Играть со звуком */
  withSound: boolean

  /** Путь к папке со звуками */
  soundPath: string

  private cache: {
    availableActions: Set<ACTION_TYPE> | null
    target: Tank | null
  } = {
    availableActions: null,
    target: null,
  }

  private updateCache() {
    if (this.game.activeTank) {
      const target = this.game.board.getTarget(this.game.activeTank.position)
      this.cache.target = target?.type === 'tank' ? target.data : null
      this.cache.availableActions = new Set(this.game.getAvailableActions(this.game.activeTank))
    } else {
      this.cache.availableActions = null
      this.cache.target = null
    }
  }

  constructor(game: Game, canvas: HTMLCanvasElement, canvasSize: number, withSound = false, soundPath = '') {
    this.game = game
    this.ctx = canvas.getContext('2d')!
    this.canvasSize = canvasSize
    this.cellSize = (canvasSize - this.boardBorderWidth * 2) / this.game.board.size
    this.isInverted = false

    /**определяем, будет ли звук и
     * где хранятся звуки
     */
    if (soundPath) {
      this.withSound = withSound
      this.soundPath = soundPath
    } else {
      this.withSound = false
      this.soundPath = ''
    }

    this.game.on('startGame', this.refresh)
    this.game.on('onChangeActivePlayer', () => {
      if (this.withSound) changeSound(this.soundPath)
      this.refresh()
    })
    this.game.on('onChangeActiveTank', () => {
      if (this.withSound) chooseSound(this.soundPath)
      this.updateCache()
      this.refresh()
    })
    this.game.on('didPerformAction', action => {
      if (this.withSound) this.soundEffectAction(action)
      this.updateCache()
      this.refresh()
    })
    this.game.on('endGame', () => {
      if (this.withSound) winSound(this.soundPath)
    })
  }

  /**
   * Преобразует абсолютные координаты (точка отсчета - левый верхний угол экрана)
   * в относительные (точка отсчета - левый верхний угол левой верхней клетки доски)
   * @param event - событие мыши
   */
  private getBoardRelativePixel(event: React.MouseEvent) {
    const { x, y } = (event.target as HTMLCanvasElement).getBoundingClientRect()
    return this.isInverted
      ? {
          xPixel: this.canvasSize - (event.clientX - x + this.boardBorderWidth),
          yPixel: this.canvasSize - (event.clientY - y + this.boardBorderWidth),
        }
      : {
          xPixel: event.clientX - x - this.boardBorderWidth,
          yPixel: event.clientY - y - this.boardBorderWidth,
        }
  }

  /**
   * Возвращает координаты относительно центра клетки
   * @param event событие курсора мыши
   * @param xCoord горизонтальный индекс клетки на доске
   * @param yCoord вертикальный индекс клетки на доске, счет сверху вниз
   * @param rotation коэффициент поворота клетки (танка в этой клетке). Значение от 0 до 7
   * @returns
   */
  private getCellRelativePixel(event: React.MouseEvent, xCoord: number, yCoord: number, rotation = 0) {
    const { centerX, centerY } = this.getPixelByCoordinate(xCoord, yCoord)
    const { xPixel, yPixel } = this.getBoardRelativePixel(event)

    const x = xPixel - centerX
    const y = yPixel - centerY
    const alpha = Math.PI * (rotation / 4)

    return {
      x: x * Math.cos(alpha) + y * Math.sin(alpha),
      y: -x * Math.sin(alpha) + y * Math.cos(alpha),
    }
  }

  /**
   * Возвращает индексы клетки на доске по координатам в px
   * @param x количество px от левого края доски
   * @param y количество px от верхнего края доски
   * @returns
   */
  private getCoordinateByPixel(x: number, y: number) {
    return {
      x: Math.floor(x / this.cellSize),
      y: Math.floor(y / this.cellSize),
    }
  }

  /**
   * Возвращает координаты клетки в px
   * @param x индекс клетки на доске по горизонтали
   * @param y индекс клетки на доске по вертикали сверху вниз
   */
  private getPixelByCoordinate(x: number, y: number) {
    return {
      centerX: x * this.cellSize + this.cellSize / 2,
      centerY: y * this.cellSize + this.cellSize / 2,
    }
  }

  /** Поворачивает доску на 180 градусов */
  // private flip() {
  //   this.isInverted = !this.isInverted
  //   this.ctx.canvas.style.transform = this.isInverted ? 'rotate(180deg)' : 'rotate(0deg)'
  // }

  /** Рисует стрелку вверх */
  private drawArrowUp() {
    this.ctx.save()
    const size = this.cellSize
    const start = { x: 0, y: -0.2 * size }
    const arrowWidth = 0.6 * size
    const arrowHeight = 0.3 * size
    const baseArrowWidth = 0.25 * size
    const baseArrowHeight = 0.2 * size

    this.ctx.beginPath()
    this.ctx.moveTo(start.x, start.y)
    this.ctx.lineTo(start.x + arrowWidth / 2, start.y + arrowHeight)
    this.ctx.lineTo(start.x + baseArrowWidth / 2, start.y + arrowHeight)
    this.ctx.lineTo(start.x + baseArrowWidth / 2, start.y + arrowHeight + baseArrowHeight)
    this.ctx.lineTo(start.x - baseArrowWidth / 2, start.y + arrowHeight + baseArrowHeight)
    this.ctx.lineTo(start.x - baseArrowWidth / 2, start.y + arrowHeight)
    this.ctx.lineTo(start.x - arrowWidth / 2, start.y + arrowHeight)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()
    this.ctx.restore()
  }

  /** Рисует стрелку вниз. Отражает по вертикали результат {@link drawArrowUp} */
  private drawArrowDown() {
    this.ctx.save()
    this.ctx.scale(1, -1)
    this.drawArrowUp()
    this.ctx.restore()
  }

  /** Рисует стрелку поворота влево */
  private drawArrowLeftTurn() {
    this.ctx.save()
    this.ctx.translate(-this.cellSize / 2, -this.cellSize / 2)
    const size = this.cellSize

    const center = { x: 0.5 * size, y: 0.5 * size }
    const innerArcRadius = 0.1 * size
    const outerArcRadius = 0.3 * size
    const arrowWidth = 0.2 * size
    const arrowHeight = 0.3 * size

    const startOfInnerCircle = {
      x: center.x - innerArcRadius / Math.SQRT2,
      y: center.y - innerArcRadius / Math.SQRT2,
    }
    const endOfOuterCircle = {
      x: center.x - outerArcRadius / Math.SQRT2,
      y: center.y - outerArcRadius / Math.SQRT2,
    }
    const arrowCenterBase = {
      x: (startOfInnerCircle.x + endOfOuterCircle.x) / 2,
      y: (startOfInnerCircle.y + endOfOuterCircle.y) / 2,
    }

    this.ctx.beginPath()
    this.ctx.moveTo(startOfInnerCircle.x, startOfInnerCircle.y)
    this.ctx.arc(center.x, center.y, innerArcRadius, Math.PI * (-3 / 4), Math.PI * (1 / 4)) // внутренний полукруг
    this.ctx.arc(center.x, center.y, outerArcRadius, Math.PI * (1 / 4), Math.PI * (-3 / 4), true) //внешний полукруг
    this.ctx.lineTo(arrowCenterBase.x - arrowWidth / Math.SQRT2, arrowCenterBase.y - arrowWidth / Math.SQRT2) // основание стрелки
    this.ctx.lineTo(arrowCenterBase.x - arrowHeight / Math.SQRT2, arrowCenterBase.y + arrowHeight / Math.SQRT2) // 1-я сторона вершины стрелки
    this.ctx.lineTo(arrowCenterBase.x + arrowWidth / Math.SQRT2, arrowCenterBase.y + arrowWidth / Math.SQRT2) // основание стрелки
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()
    this.ctx.restore()
  }

  /** Рисует стрелку поворота вправо. Отражает по горизонтали результат {@link drawArrowLeftTurn} */
  private drawArrowRightTurn() {
    this.ctx.save()
    this.ctx.scale(-1, 1)
    this.drawArrowLeftTurn()
    this.ctx.restore()
  }

  /** Рисует мишень */
  private drawTarget() {
    this.ctx.save()
    const size = this.cellSize
    const innerCircleRadius = 0.2 * size
    const outerCircleRadius = 0.4 * size

    this.ctx.beginPath()
    this.ctx.moveTo(0, 0)
    this.ctx.arc(0, 0, innerCircleRadius, -Math.PI, Math.PI)
    this.ctx.arc(0, 0, outerCircleRadius, -Math.PI, Math.PI)
    this.ctx.moveTo(-size / 2, 0)
    this.ctx.lineTo(size / 2, 0)
    this.ctx.moveTo(0, -size / 2)
    this.ctx.lineTo(0, size / 2)
    this.ctx.stroke()
    this.ctx.restore()
  }

  /** Рисует пустую клетку доски. Темную или светлую в зависимости от позиции */
  private drawEmptyCell(x: number, y: number) {
    this.ctx.save()
    this.ctx.fillStyle = (x + y) % 2 ? colors.darkCell : colors.lightCell
    this.ctx.strokeStyle = colors.cellBorder
    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)
    this.ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)
    this.ctx.restore()
  }

  /** Рисует границу вокруг клетки на указанной позиции */
  private drawSelectedBound(x: number, y: number, borderColor: string) {
    this.ctx.save()
    this.ctx.lineWidth = 3
    this.ctx.strokeStyle = borderColor
    this.ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)
    this.ctx.restore()
  }

  /** Рисует препятствие на указанной позиции */
  private drawWall = (x: number, y: number) => {
    this.ctx.save()
    this.ctx.fillStyle = colors.wall
    this.ctx.strokeStyle = colors.wall
    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)
    this.ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)
    this.ctx.restore()
  }

  /** Рисует танк, позиция берется из данных танка */
  private drawTank = ({ type, position, color, isAlive }: Tank) => {
    const body = new Path2D(
      'M18.867 18.685h-.25v.9c0 .853.687 1.548 1.539 1.548.851 0 1.538-.695 1.538-1.549v-.899h-2.827Zm22.16.25v-.25H37.95v.9c0 .853.687 1.548 1.539 1.548.852 0 1.539-.695 1.539-1.549v-.649ZM15.25 15.039c0-.94.755-1.698 1.683-1.698h25.134a1.69 1.69 0 0 1 1.683 1.698v9.49h-.395a.897.897 0 0 0-.894.9v3.896c0 .495.399.899.895.899h.394v7.942h-.394a.897.897 0 0 0-.895.899v3.896c0 .495.399.9.895.9h.394v8.19a1.69 1.69 0 0 1-1.683 1.699H16.933a1.69 1.69 0 0 1-1.683-1.698V43.86h.394a.897.897 0 0 0 .895-.899v-3.896c0-.495-.399-.9-.895-.9h-.394v-7.941h.394a.897.897 0 0 0 .895-.9v-3.896c0-.494-.399-.899-.895-.899h-.394v-9.49Zm10.956 30.844a.574.574 0 0 0-.573-.575h-3.866a.574.574 0 0 0-.573.575c0 .316.255.575.573.575h3.866c.318 0 .573-.26.573-.575Zm0 1.299a.574.574 0 0 0-.573-.575h-3.866a.574.574 0 0 0-.573.575c0 .315.255.575.573.575h3.866c.318 0 .573-.26.573-.575Zm0 1.298a.574.574 0 0 0-.573-.574h-3.866a.574.574 0 0 0-.573.575c0 .315.255.574.573.574h3.866c.318 0 .573-.259.573-.575Zm12.244-2.597a.573.573 0 0 0-.572-.575H34.01a.573.573 0 0 0-.572.575c0 .316.254.575.572.575h3.867c.318 0 .572-.26.572-.575Zm0 1.299a.573.573 0 0 0-.572-.575H34.01a.573.573 0 0 0-.572.575c0 .315.254.575.572.575h3.867c.318 0 .572-.26.572-.575Zm0 1.298a.573.573 0 0 0-.572-.574H34.01a.573.573 0 0 0-.572.575c0 .315.254.574.572.574h3.867c.318 0 .572-.259.572-.575Z',
    )
    const tower = new Path2D(
      'M30.789 7h-1.934v14h1.934V7ZM31.433 22.506h-3.222v3.247h3.222v-3.247ZM26.176 27.052h7.292c.74 0 1.384.507 1.563 1.23l1.548 6.238-1.548 6.237a1.613 1.613 0 0 1-1.563 1.23h-7.292c-.74 0-1.384-.507-1.563-1.23l-1.548-6.237 1.548-6.238c.18-.723.824-1.23 1.563-1.23Z',
    )
    const hatch = new Path2D('M32.75 35A2.75 2.75 0 1,1 32.75 34.99Z')
    const shine = new Path2D('M31 34 h.1v2h-.1Z')
    const mediumTracks = new Path2D(
      'M50.75 13a.75.75 0 0 0-.75-.75h-4.75v2.5H50a.75.75 0 0 0 .75-.75v-1ZM50.75 17a.75.75 0 0 0-.75-.75h-4.75v2.5H50a.75.75 0 0 0 .75-.75v-1ZM50.75 21a.75.75 0 0 0-.75-.75h-4.75v2.5H50a.75.75 0 0 0 .75-.75v-1ZM50.75 25a.75.75 0 0 0-.75-.75h-4.75v2.5H50a.75.75 0 0 0 .75-.75v-1ZM50.75 29a.75.75 0 0 0-.75-.75h-4.75v2.5H50a.75.75 0 0 0 .75-.75v-1ZM50.75 33a.75.75 0 0 0-.75-.75h-4.75v2.5H50a.75.75 0 0 0 .75-.75v-1ZM50.75 37a.75.75 0 0 0-.75-.75h-4.75v2.5H50a.75.75 0 0 0 .75-.75v-1ZM50.75 41a.75.75 0 0 0-.75-.75h-4.75v2.5H50a.75.75 0 0 0 .75-.75v-1ZM50.75 45a.75.75 0 0 0-.75-.75h-4.75v2.5H50a.75.75 0 0 0 .75-.75v-1ZM50.75 49a.75.75 0 0 0-.75-.75h-4.75v2.5H50a.75.75 0 0 0 .75-.75v-1ZM50.75 53a.75.75 0 0 0-.75-.75h-4.75v2.5H50a.75.75 0 0 0 .75-.75v-1ZM8.25 13a.75.75 0 0 1 .75-.75h4.75v2.5H9a.75.75 0 0 1-.75-.75v-1ZM8.25 17a.75.75 0 0 1 .75-.75h4.75v2.5H9a.75.75 0 0 1-.75-.75v-1ZM8.25 21a.75.75 0 0 1 .75-.75h4.75v2.5H9a.75.75 0 0 1-.75-.75v-1ZM8.25 25a.75.75 0 0 1 .75-.75h4.75v2.5H9a.75.75 0 0 1-.75-.75v-1ZM8.25 29a.75.75 0 0 1 .75-.75h4.75v2.5H9a.75.75 0 0 1-.75-.75v-1ZM8.25 33a.75.75 0 0 1 .75-.75h4.75v2.5H9a.75.75 0 0 1-.75-.75v-1ZM8.25 37a.75.75 0 0 1 .75-.75h4.75v2.5H9a.75.75 0 0 1-.75-.75v-1ZM8.25 41a.75.75 0 0 1 .75-.75h4.75v2.5H9a.75.75 0 0 1-.75-.75v-1ZM8.25 45a.75.75 0 0 1 .75-.75h4.75v2.5H9a.75.75 0 0 1-.75-.75v-1ZM8.25 49a.75.75 0 0 1 .75-.75h4.75v2.5H9a.75.75 0 0 1-.75-.75v-1ZM8.25 53a.75.75 0 0 1 .75-.75h4.75v2.5H9a.75.75 0 0 1-.75-.75v-1Z',
    )
    const heavyTracks = new Path2D(
      'M12.75 7a.75.75 0 0 0-.75-.75H3a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75ZM12.75 14a.75.75 0 0 0-.75-.75H3a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75ZM12.75 21a.75.75 0 0 0-.75-.75H3a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75ZM12.75 28a.75.75 0 0 0-.75-.75H3a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75ZM12.75 35a.75.75 0 0 0-.75-.75H3a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75ZM12.75 42a.75.75 0 0 0-.75-.75H3a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75ZM12.75 49a.75.75 0 0 0-.75-.75H3a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75ZM12.75 56a.75.75 0 0 0-.75-.75H3a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75ZM57.75 7a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75ZM57.75 14a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75ZM57.75 21a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75ZM57.75 28a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75ZM57.75 35a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75ZM57.75 42a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75ZM57.75 49a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75ZM57.75 56a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75Z',
    )

    this.ctx.save()
    this.ctx.translate(position.x * this.cellSize + this.cellSize / 2, position.y * this.cellSize + this.cellSize / 2)
    this.ctx.rotate((Math.PI / 4) * position.rotation)
    this.ctx.translate(-30, -32)

    const baseColor = isAlive ? color : colors.destroyedTank
    const contrastColor = getContrast(baseColor)
    this.ctx.fillStyle = baseColor
    this.ctx.strokeStyle = contrastColor

    this.ctx.stroke(body)
    this.ctx.fill(body)

    if (type === TANK_TYPE.HT) {
      this.ctx.stroke(heavyTracks)
      this.ctx.fill(heavyTracks)
    }

    if (type === TANK_TYPE.MT) {
      this.ctx.stroke(mediumTracks)
      this.ctx.fill(mediumTracks)
    }

    if (isAlive) {
      this.ctx.save()
      if (type === TANK_TYPE.CLT) {
        this.ctx.fillStyle = colors.commanderTankTower
      } else if (type === TANK_TYPE.MT) {
        this.ctx.fillStyle = contrastColor
        this.ctx.strokeStyle = baseColor
      }

      this.ctx.stroke(tower)
      this.ctx.fill(tower)
      this.ctx.restore()
    }

    this.ctx.stroke(hatch)
    this.ctx.fill(hatch)
    this.ctx.lineWidth = 0.5
    this.ctx.stroke(shine)

    this.ctx.restore()
  }

  /** Рисует статическую часть доски: клетки и препятствия */
  private drawBoard = () => {
    this.ctx.resetTransform()
    this.ctx.fillStyle = colors.boardBorder
    this.ctx.fillRect(0, 0, this.canvasSize, this.canvasSize)
    this.ctx.translate(this.boardBorderWidth, this.boardBorderWidth)

    const fontSize = this.boardBorderWidth / 2
    this.ctx.fillStyle = 'white'
    this.ctx.font = `${fontSize}px 'Bebas Neue', 'Helvetica Neue', sans-serif`
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    for (let i = 0; i < this.game.board.size; i++) {
      const startOfBoard = -this.boardBorderWidth * 0.5
      const endOfBoard = this.canvasSize - this.boardBorderWidth * 1.5
      const centerOfCell = i * this.cellSize + this.cellSize / 2

      this.ctx.fillText(letters[i], centerOfCell, startOfBoard)
      this.ctx.fillText(letters[i], centerOfCell, endOfBoard)
      this.ctx.fillText(`${i + 1}`, startOfBoard, centerOfCell)
      this.ctx.fillText(`${i + 1}`, endOfBoard, centerOfCell)
    }

    this.game.board.grid.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell.type === 'empty') {
          this.drawEmptyCell(x, y)
        }
        if (cell.type === 'wall') {
          this.drawWall(x, y)
        }
      }),
    )
  }

  /** Рисует танки на доске */
  public drawUnits() {
    const tanksForMove = new Set(this.game.getTanksForMove().map(({ id }) => id))
    const activeTankId = this.game.activeTank?.id

    this.game.tanks.forEach(tank => {
      const { x, y } = tank.position
      this.drawEmptyCell(x, y)
      this.drawTank(tank)

      if (!activeTankId && tanksForMove.has(tank.id)) {
        this.drawSelectedBound(x, y, 'lime')
      }
      if (activeTankId === tank.id) {
        this.drawSelectedBound(x, y, 'cyan')
        this.drawAvailableActionsForTank(tank)
      }
    })
  }

  /**
   * Рисует доступные действия для танка
   * @param tank активный танк
   * @param options доп опции
   */
  private drawAvailableActionsForTank(
    tank: Tank,
    options?: {
      /** действия, которые нужно выделить */
      highlight?: Partial<Record<ACTION_TYPE, boolean>>
    },
  ) {
    const { x, y, rotation } = tank.position
    this.ctx.save()
    const highlightColor = 'green'
    this.ctx.fillStyle = 'cyan'

    this.ctx.translate(x * this.cellSize + this.cellSize / 2, y * this.cellSize + this.cellSize / 2)
    this.ctx.rotate((Math.PI / 4) * rotation)

    this.cache.availableActions?.forEach(action => {
      this.ctx.save()
      switch (action) {
        case ACTION_TYPE.DRIVE:
          if (options?.highlight?.DRIVE) {
            this.ctx.fillStyle = highlightColor
          }
          this.ctx.translate(0, -this.cellSize)
          this.drawArrowUp()
          break

        case ACTION_TYPE.TURN_LEFT:
          if (options?.highlight?.TURN_LEFT) {
            this.ctx.fillStyle = highlightColor
          }
          this.ctx.translate(-this.cellSize, 0)
          this.drawArrowLeftTurn()
          break

        case ACTION_TYPE.TURN_RIGHT:
          if (options?.highlight?.TURN_RIGHT) {
            this.ctx.fillStyle = highlightColor
          }
          this.ctx.translate(this.cellSize, 0)
          this.drawArrowRightTurn()
          break

        case ACTION_TYPE.REVERSE:
          if (options?.highlight?.REVERSE) {
            this.ctx.fillStyle = highlightColor
          }
          this.ctx.translate(0, this.cellSize)
          this.drawArrowDown()
          break

        case ACTION_TYPE.FIRE:
          const target = this.game.board.getTarget(tank.position)
          if (!target || target.type !== 'tank') break

          this.ctx.strokeStyle = options?.highlight?.FIRE ? 'red' : 'grey'
          this.ctx.rotate(-(Math.PI / 4) * rotation)
          this.ctx.translate(this.cellSize * (target.data.position.x - x), this.cellSize * (target.data.position.y - y))
          this.drawTarget()
          break
      }
      this.ctx.restore()
    })
    this.ctx.restore()
  }

  /** Очищает все нарисованное */
  public clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize)
  }

  /** Перерисовывает canvas с игрой */
  public refresh = () => {
    this.clearCanvas()
    this.drawBoard()
    this.drawUnits()
  }

  /** Возвращает действие над которым находится курсор */
  private getActionUnderCursor(event: React.MouseEvent): ACTION_TYPE | null {
    if (!this.game.activeTank) return null
    const innerRadius = this.cellSize * 0.5
    const outerRadius = this.cellSize * 1.5

    if (this.cache.target) {
      const { x, y, rotation } = this.cache.target.position
      const cellTargetRelative = this.getCellRelativePixel(event, x, y, rotation)
      if (
        cellTargetRelative.x >= -innerRadius &&
        cellTargetRelative.x <= innerRadius &&
        cellTargetRelative.y >= -innerRadius &&
        cellTargetRelative.y <= innerRadius
      ) {
        return ACTION_TYPE.FIRE
      }
    }

    const { x, y, rotation } = this.game.activeTank.position
    const cellRelative = this.getCellRelativePixel(event, x, y, rotation)

    if (cellRelative.x <= -outerRadius || cellRelative.x >= outerRadius) return null
    if (cellRelative.y <= -outerRadius || cellRelative.y >= outerRadius) return null

    if (cellRelative.x >= innerRadius) {
      return -innerRadius <= cellRelative.y && cellRelative.y <= innerRadius ? ACTION_TYPE.TURN_RIGHT : null
    }
    if (cellRelative.x <= -innerRadius) {
      return -innerRadius <= cellRelative.y && cellRelative.y <= innerRadius ? ACTION_TYPE.TURN_LEFT : null
    }
    if (cellRelative.y <= -innerRadius) {
      return ACTION_TYPE.DRIVE
    }
    if (cellRelative.y >= innerRadius) {
      return ACTION_TYPE.REVERSE
    }
    return null
  }

  public onMouseClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (this.game.activeTank) {
      const action = this.getActionUnderCursor(event)
      if (action && this.cache.availableActions?.has(action)) {
        this.game.makeMove(action)
      }
      return
    }

    const { xPixel, yPixel } = this.getBoardRelativePixel(event)
    const item = this.game.board.getCellAt(this.getCoordinateByPixel(xPixel, yPixel))

    if (item?.type === 'tank') {
      this.game.setActiveTank(item.data.id)
    }
  }

  public onMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!this.game.activeTank) return
    const hoveredAction = this.getActionUnderCursor(event)
    this.drawAvailableActionsForTank(this.game.activeTank, {
      highlight: {
        DRIVE: this.cache.availableActions?.has(ACTION_TYPE.DRIVE) && hoveredAction === ACTION_TYPE.DRIVE,
        REVERSE: this.cache.availableActions?.has(ACTION_TYPE.REVERSE) && hoveredAction === ACTION_TYPE.REVERSE,
        FIRE: this.cache.availableActions?.has(ACTION_TYPE.TURN_RIGHT) && hoveredAction === ACTION_TYPE.FIRE,
        TURN_LEFT: this.cache.availableActions?.has(ACTION_TYPE.TURN_LEFT) && hoveredAction === ACTION_TYPE.TURN_LEFT,
        TURN_RIGHT:
          this.cache.availableActions?.has(ACTION_TYPE.TURN_RIGHT) && hoveredAction === ACTION_TYPE.TURN_RIGHT,
      },
    })
  }

  public changeSound = (withSound: boolean) => {
    this.withSound = withSound
  }
  private soundEffectAction = (action: ACTION_TYPE) => {
    if (action === ACTION_TYPE.FIRE) shootSound(this.soundPath)
    else if (action !== ACTION_TYPE.STOP) moveSound(this.soundPath)
    else {
      stopSound(this.soundPath)
    }
  }
}

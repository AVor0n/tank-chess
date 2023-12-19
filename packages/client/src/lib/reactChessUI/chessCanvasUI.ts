import { type Game, type Tank, TANK_TYPE, ACTION_TYPE } from '../chess'

const tankTypeToImage: Record<TANK_TYPE, string> = {
  [TANK_TYPE.LT]: '🠑',
  [TANK_TYPE.MT]: '⤊',
  [TANK_TYPE.HT]: '⟰',
  [TANK_TYPE.CLT]: '⥉',
}

export class ChessCanvasUI {
  /** объект содержащий всю логику игры */
  game: Game

  ctx: CanvasRenderingContext2D

  /** Размер каждой из сторон canvas в px */
  canvasSize: number

  /** Размер одной клетки поля в px */
  cellSize: number

  /** Поле повернуто на 180° */
  isInverted: boolean

  private _cache: {
    activeTank: Tank | null
    availableAction: Set<ACTION_TYPE> | null
    target: Tank | null
  } = {
    activeTank: null,
    availableAction: null,
    target: null,
  }

  /** Кешированное значение доступных действий для танка */
  private get availableActions() {
    if (!this.game.activeTank) return null
    if (this._cache.activeTank !== this.game.activeTank) {
      this._cache.activeTank = this.game.activeTank
      this._cache.availableAction = new Set(this.game.getAvailableActions(this.game.activeTank))
    }
    return this._cache.availableAction
  }

  /** Кешированная информации о цели */
  private get target() {
    if (!this.game.activeTank) return null

    if (
      this.game.activeTank.position.x === this._cache.activeTank?.position.x &&
      this.game.activeTank.position.y === this._cache.activeTank?.position.y &&
      this.game.activeTank.position.rotation === this._cache.activeTank?.position.rotation
    ) {
      const target = this.game.board.getTarget(this.game.activeTank.position)
      this._cache.target = target?.type === 'tank' ? target.data : null
      this._cache.availableAction = new Set(this.game.getAvailableActions(this.game.activeTank))
    }

    return this._cache.target
  }

  constructor(game: Game, canvas: HTMLCanvasElement, canvasSize: number) {
    this.game = game
    this.ctx = canvas.getContext('2d')!
    this.canvasSize = canvasSize
    this.cellSize = canvasSize / this.game.board.size
    this.isInverted = false

    this.game.on('startGame', this.refresh)
    this.game.on('didPerformAction', this.refresh)
    this.game.on('onChangeActiveTank', this.refresh)
    this.game.on('onChangeActivePlayer', () => {
      this.flip()
      this.refresh()
    })
  }

  /**
   * Преобразует абсолютные координаты (точка отсчета - левый верхний угол экрана)
   * в относительные (точка отсчета - левый верхний угол canvas элемента)
   * @param event - событие мыши
   */
  private getBoardRelativePixel(event: React.MouseEvent) {
    const { x, y } = (event.target as HTMLCanvasElement).getBoundingClientRect()
    return this.isInverted
      ? {
          xPixel: this.canvasSize - (event.clientX - x),
          yPixel: this.canvasSize - (event.clientY - y),
        }
      : {
          xPixel: event.clientX - x,
          yPixel: event.clientY - y,
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
  private flip() {
    this.isInverted = !this.isInverted
    this.ctx.canvas.style.transform = this.isInverted ? 'rotate(180deg)' : 'rotate(0deg)'
  }

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
    this.ctx.fillStyle = (x + y) % 2 ? '#464646' : '#cacaca'
    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)
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
    this.ctx.fillStyle = 'saddlebrown'
    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)
    this.ctx.restore()
  }

  /** Рисует танк, позиция берется из данных танка */
  private drawTank = ({ type, position, color }: Tank) => {
    this.ctx.save()
    this.ctx.translate(position.x * this.cellSize + this.cellSize / 2, position.y * this.cellSize + this.cellSize / 2)
    this.ctx.rotate((Math.PI / 4) * position.rotation)

    const tankCharImage = tankTypeToImage[type]
    const fontSize = this.cellSize * 0.75
    this.ctx.font = `${fontSize}px Arial`
    this.ctx.fillStyle = color
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(tankCharImage, 0, 0)

    this.ctx.restore()
  }

  /** Рисует статическую часть доски: клетки и препятствия */
  private drawBoard = () => {
    this.ctx.save()
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
    this.ctx.restore()
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

    const availableActions = this.game.getAvailableActions(tank)
    availableActions.forEach(action => {
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

    if (this.target) {
      const { x, y, rotation } = this.target.position
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
      if (action) {
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
        DRIVE: this.availableActions?.has(ACTION_TYPE.DRIVE) && hoveredAction === ACTION_TYPE.DRIVE,
        REVERSE: this.availableActions?.has(ACTION_TYPE.REVERSE) && hoveredAction === ACTION_TYPE.REVERSE,
        TURN_LEFT: this.availableActions?.has(ACTION_TYPE.TURN_LEFT) && hoveredAction === ACTION_TYPE.TURN_LEFT,
        TURN_RIGHT: this.availableActions?.has(ACTION_TYPE.TURN_RIGHT) && hoveredAction === ACTION_TYPE.TURN_RIGHT,
        FIRE: this.availableActions?.has(ACTION_TYPE.TURN_RIGHT) && hoveredAction === ACTION_TYPE.FIRE,
      },
    })
  }
}

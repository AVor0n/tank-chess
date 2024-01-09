import { TANK_TYPE_TO_PROPS } from '../constants'
import { type BoardPosition, type TANK_TYPE } from '../types'
import { generateId } from '../utils/generateid'
import { getNextCell } from '../utils/step'

export class Tank {
  readonly id: string
  readonly type: TANK_TYPE
  readonly armor: number
  readonly strength: number
  readonly movement: number
  readonly playerId: string
  private _energy: number
  private _color: string
  private x = 0
  private y = 0
  private rotation = 0
  private alive = true

  /** Танк исправен */
  public get isAlive() {
    return this.alive
  }

  /**
   * Положение на доске в декартовой системе координат. x=0; y=0 - левый нижний угол доски
   * Поворот задается числом от 0 до 7. Для перевода в градусы умножить на 45°
   * */
  public get position() {
    return { x: this.x, y: this.y, rotation: this.rotation }
  }

  /** Оставшаяся энергия для совершения действий */
  public get energy() {
    return this._energy
  }

  /** Цвет танка */
  public get color() {
    return this._color
  }

  /** Танк имеет полный заряд энергии, т.е. не совершал действия в этом ходу */
  get hasFullEnergy() {
    return this._energy === this.movement
  }

  /**
   * @param type тип танка
   * @param playerId id игрока, который управляет танком
   * @param color цвет танка
   * @param position начальная позиция танка на доске
   */
  constructor(type: TANK_TYPE, playerId: string, color: string, position: BoardPosition) {
    const { armor, damage, energy } = TANK_TYPE_TO_PROPS[type]
    this.id = generateId(`${type}_${playerId}`)
    this.type = type
    this.armor = armor
    this._energy = energy
    this.strength = damage
    this.movement = energy
    this.playerId = playerId
    this._color = color
    this.x = position.x
    this.y = position.y
    this.rotation = position.rotation
  }

  private doStep(direction: 1 | -1) {
    if (this.energy < 1) throw new Error('Не хватает энергии для движения')
    const { x, y } = getNextCell(this.position, direction)
    this.x = x
    this.y = y
    this._energy--
    return this
  }

  private doTurn(direction: 1 | -1) {
    if (this.energy < 1) throw new Error('Не хватает энергии для поворота')
    this.rotation = (8 + this.rotation + direction) % 8
    this._energy--
    return this
  }

  /** Восстанавливает энергию */
  public charge() {
    this._energy = this.movement
  }

  /** Едет вперед на 1 шаг */
  public drive() {
    this.doStep(1)
  }

  /** Едет назад на 1 шаг */
  public reverse() {
    this.doStep(-1)
    this._energy = 0
  }

  /** Поворачивает влево на 45° */
  public turnLeft() {
    this.doTurn(-1)
  }

  /** Поворачивает вправо на 45° */
  public turnRight() {
    this.doTurn(1)
  }

  /** Совершает выстрел */
  public shoot() {
    if (this.energy < 1) throw new Error('Не хватает энергии для выстрела')
    this._energy--
    return this
  }

  /** Уничтожает танк */
  public destroy() {
    this.alive = false
  }
}

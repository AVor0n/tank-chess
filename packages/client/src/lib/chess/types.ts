import { type Tank } from './core'

/** Действия, которые может совершить танк */
export const enum ACTION_TYPE {
  /** Выстрел прямо */
  FIRE = 'FIRE',
  /** Шаг вперед на 1 клетку */
  DRIVE = 'DRIVE',
  /** Шаг назад на 1 клетку */
  REVERSE = 'REVERSE',
  /** Поворот влево на 45° */
  TURN_LEFT = 'TURN_LEFT',
  /** Поворот вправо на 45° */
  TURN_RIGHT = 'TURN_RIGHT',
  /** Завершение хода ° */
  STOP = 'STOP',
}

/** Тип танка */
export enum TANK_TYPE {
  /** Тяжелый танк */
  HT = 'HT',
  /** Средний танк */
  MT = 'MT',
  /** Легкий танк */
  LT = 'LT',
  /** Командирский танк */
  CLT = 'CLT',
}

/** Позиция объекта на доске */
export interface BoardPosition {
  /** координата по горизонтали от 0 до n. Где n - ширина доски. Нумерация слева-направо */
  x: number
  /** координата по вертикали от 0 до n. Где n - высота доски. Нумерация снизу-вверх */
  y: number
  /** коэффициент поворота от 0 до 7. Для перевода в градусы умножить на 45° */
  rotation: number
}

export interface EmptyCell {
  type: 'empty'
}

export interface WallCell {
  type: 'wall'
}

export interface TankCell {
  type: 'tank'
  data: Tank
}

export type ItemOnBoard = EmptyCell | WallCell | TankCell

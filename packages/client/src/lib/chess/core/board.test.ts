import { describe, test, expect } from '@jest/globals'
import { TANK_TYPE } from '../types'
import { Board } from './board'
import { Tank } from './tank'

describe('class Board', () => {
  let board: Board
  const lightWhiteTank = new Tank(TANK_TYPE.LT, 'player_1', '#ffffff', { x: 4, y: 4, rotation: 0 })

  beforeEach(() => {
    board = new Board()
    board.initialize(16)
  })

  test('После инициализации создается массив заданного размера', () => {
    expect(board.grid.length).toBe(16)
  })

  test('getCellAt возвращает содержимое ячейки', () => {
    expect(board.getCellAt({ x: 2, y: 2 })).toMatchObject({ type: 'empty' })
  })

  test('getCellAt возвращает содержимое ячейки', () => {
    board.placeTank(lightWhiteTank)
    expect(board.getCellAt({ x: 4, y: 4 })).toMatchObject({
      type: 'tank',
      data: {
        id: 'LT_player_1_0',
        type: 'LT',
        armor: 1,
        strength: 1,
        movement: 5,
        playerId: 'player_1',
        _energy: 5,
        _color: '#ffffff',
        x: 4,
        y: 4,
        rotation: 0,
        alive: true,
      },
    })
  })

  test('Невозможно получить ячейку за пределами игрового поля', () => {
    expect(board.getCellAt({ x: 17, y: 17 })).toBe(null)
  })

  test('Невозможно получить ячейку за пределами игрового поля', () => {
    expect(board.getCellAt({ x: -17, y: 1 })).toBe(null)
  })

  test('checkBounds вернет false, если задать координаты за пределами массива', () => {
    expect(board.grid.length).toBe(16)
  })

  test('Заполнение массива grid - установка преграды', () => {
    board.placeWall(8, 8)
    expect(board.grid[8][8].type).toBe('wall')
  })

  test('Заполнение массива grid - установка танка', () => {
    board.placeTank(lightWhiteTank)
    expect(board.grid[4][4].type).toBe('tank')
  })

  test('moveItem перемещает танк в указанную позицию', () => {
    board.placeTank(lightWhiteTank)
    board.moveItem(4, 4, 5, 4)
    expect(board.grid[4][5].type).toBe('tank')
  })

  test('moveItem очищает позицию после перемещения танка', () => {
    board.placeTank(lightWhiteTank)
    board.moveItem(4, 4, 5, 4)
    expect(board.grid[4][4].type).toBe('empty')
  })

  test('getTarget возвращает цель справа', () => {
    const lightBlackTank = new Tank(TANK_TYPE.LT, 'player_2', '#000000', { x: 6, y: 4, rotation: 0 })
    board.placeTank(lightBlackTank)
    expect(board.getTarget({ x: 4, y: 4, rotation: 2 })).not.toBe(null)
  })

  test('getTarget возвращает цель слева', () => {
    const lightBlackTank = new Tank(TANK_TYPE.LT, 'player_2', '#000000', { x: 6, y: 4, rotation: 0 })
    board.placeTank(lightBlackTank)
    expect(board.getTarget({ x: 8, y: 4, rotation: 6 })).not.toBe(null)
  })

  test('getTarget возвращает цель вверху', () => {
    const lightBlackTank = new Tank(TANK_TYPE.LT, 'player_2', '#000000', { x: 6, y: 4, rotation: 0 })
    board.placeTank(lightBlackTank)
    expect(board.getTarget({ x: 6, y: 8, rotation: 0 })).not.toBe(null)
  })

  test('getTarget возвращает цель внизу', () => {
    const lightBlackTank = new Tank(TANK_TYPE.LT, 'player_2', '#000000', { x: 6, y: 4, rotation: 0 })
    board.placeTank(lightBlackTank)
    expect(board.getTarget({ x: 6, y: 2, rotation: 4 })).not.toBe(null)
  })

  test('getTarget возвращает null, если нет танка на прицеле', () => {
    const lightBlackTank = new Tank(TANK_TYPE.LT, 'player_2', '#000000', { x: 6, y: 4, rotation: 0 })
    board.placeTank(lightBlackTank)
    expect(board.getTarget({ x: 8, y: 0, rotation: 0 })).toBe(null)
  })

  test('getTarget возвращает null, если пушка повернута не на цель', () => {
    const lightBlackTank = new Tank(TANK_TYPE.LT, 'player_2', '#000000', { x: 6, y: 4, rotation: 0 })
    board.placeTank(lightBlackTank)
    expect(board.getTarget({ x: 8, y: 4, rotation: 0 })).toBe(null)
  })
})

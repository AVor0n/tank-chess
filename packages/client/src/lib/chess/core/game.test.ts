import { expect, jest, test } from '@jest/globals'
import { type ACTION_TYPE, type TankCell } from '../types'
import { Board } from './board'
import { Game } from './game'
import { Player } from './player'
import { type Tank } from './tank'

const MAX_LIGHT_TANK_ENERGY = 5

const repeat = (repeatFunc: () => void, quantity: number) => {
  let q = 0
  while (q < quantity) {
    repeatFunc()
    q++
  }
}

describe('Проверяем состояние после StartGame', () => {
  let game: Game
  let gamers: {
    playerName1: string
    playerName2: string
  }

  beforeEach(() => {
    game = new Game()
    gamers = {
      playerName1: 'Иван Иванов',
      playerName2: 'Катя Катина',
    }
  })

  test('Формируется массив игроков', () => {
    game.startGame(gamers)
    expect(game.players[0] instanceof Player && game.players[1] instanceof Player).toBeTruthy()
  })

  test('Верно устанавливаются имена игроков', () => {
    game.startGame(gamers)
    expect(game.players[0].name === 'Иван Иванов' && game.players[1].name === 'Катя Катина')
  })

  test('При старте игры вызывается метод createFromTemplate', () => {
    const createFromTemplateSpy = jest.spyOn(Board, 'createFromTemplate')
    game.startGame(gamers)
    expect(createFromTemplateSpy).toHaveBeenCalled()
  })

  test('При старте игры происходит событие StartGame', () => {
    game.emit = jest.fn()
    game.startGame(gamers)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(game.emit).toHaveBeenCalledWith('startGame', game.players[0])
  })

  test('Право первого хода за первым игроком ', () => {
    game.startGame(gamers)
    expect(game.activePlayer.name).toBe(game.players[0].name)
  })

  test('Среди танков, доступных для первого хода, нет черных', () => {
    game.startGame(gamers)
    const arrTank = game.getTanksForMove()
    let haveBlack = false
    arrTank.forEach(tank => {
      if (tank.color === '#000000') haveBlack = true
    })
    expect(haveBlack).toBeFalsy()
  })
})

describe('Проверяем правильную расстановку танков', () => {
  let game: Game
  let gamers: {
    playerName1: string
    playerName2: string
  }

  beforeAll(() => {
    game = new Game()
    gamers = {
      playerName1: 'Иван Иванов',
      playerName2: 'Катя Катина',
    }
    game.startGame(gamers)
  })

  test('Стартовая расстановка танков [1]', () => {
    expect((game.board.grid[0][3] as TankCell).data.type).toBe('HT')
  })

  test('Стартовая расстановка танков [2]', () => {
    expect((game.board.grid[0][6] as TankCell).data.type).toBe('MT')
  })

  test('Стартовая расстановка танков [3]', () => {
    expect((game.board.grid[0][8] as TankCell).data.type).toBe('CLT')
  })

  test('Стартовая расстановка танков [4]', () => {
    expect((game.board.grid[0][10] as TankCell).data.type).toBe('MT')
  })

  test('Стартовая расстановка танков [5]', () => {
    expect((game.board.grid[0][13] as TankCell).data.type).toBe('HT')
  })

  test('Стартовая расстановка танков [6]', () => {
    expect((game.board.grid[2][3] as TankCell).data.type).toBe('LT')
  })

  test('Стартовая расстановка танков [7]', () => {
    expect((game.board.grid[2][6] as TankCell).data.type).toBe('LT')
  })

  test('Стартовая расстановка танков [8]', () => {
    expect((game.board.grid[2][8] as TankCell).data.type).toBe('MT')
  })

  test('Стартовая расстановка танков [9]', () => {
    expect((game.board.grid[2][10] as TankCell).data.type).toBe('LT')
  })

  test('Стартовая расстановка танков [10]', () => {
    expect((game.board.grid[2][13] as TankCell).data.type).toBe('LT')
  })

  test('Стартовая расстановка танков [11]', () => {
    expect((game.board.grid[13][2] as TankCell).data.type).toBe('LT')
  })

  test('Стартовая расстановка танков [12]', () => {
    expect((game.board.grid[13][5] as TankCell).data.type).toBe('LT')
  })

  test('Стартовая расстановка танков [13]', () => {
    expect((game.board.grid[13][7] as TankCell).data.type).toBe('MT')
  })

  test('Стартовая расстановка танков [14]', () => {
    expect((game.board.grid[13][9] as TankCell).data.type).toBe('LT')
  })

  test('Стартовая расстановка танков [15]', () => {
    expect((game.board.grid[13][12] as TankCell).data.type).toBe('LT')
  })

  test('Стартовая расстановка танков [16]', () => {
    expect((game.board.grid[15][2] as TankCell).data.type).toBe('HT')
  })

  test('Стартовая расстановка танков [17]', () => {
    expect((game.board.grid[15][5] as TankCell).data.type).toBe('MT')
  })

  test('Стартовая расстановка танков [18]', () => {
    expect((game.board.grid[15][7] as TankCell).data.type).toBe('CLT')
  })

  test('Стартовая расстановка танков [19]', () => {
    expect((game.board.grid[15][9] as TankCell).data.type).toBe('MT')
  })

  test('Стартовая расстановка танков [20]', () => {
    expect((game.board.grid[15][12] as TankCell).data.type).toBe('HT')
  })
})

/**--------------------------------------------------------------- */

describe('Тестирование действий', () => {
  let game: Game
  let gamers: {
    playerName1: string
    playerName2: string
  }
  let testWhiteTank: Tank, testBlackTank: Tank, testWhiteTankLine2: Tank

  beforeEach(() => {
    game = new Game()
    gamers = {
      playerName1: 'Иван Иванов',
      playerName2: 'Катя Катина',
    }
    game.startGame(gamers)
    testWhiteTank = game.tanks[10]
    testBlackTank = game.tanks[0]
    testWhiteTankLine2 = game.tanks[18]
  })

  test('Перед ходом танку не доступно действие "Завершить ход"', () => {
    game.setActiveTank(testWhiteTank.id)
    const availableActArr = game.getAvailableActions(game.activeTank!)
    expect(availableActArr.indexOf('STOP' as ACTION_TYPE)).toBe(-1)
  })

  test('При первом ходе танку доступны поворот, движение вперед и назад', () => {
    game.setActiveTank(testWhiteTank.id)
    const availableActArr = game.getAvailableActions(game.activeTank!)
    expect(
      availableActArr.indexOf('TURN_LEFT' as ACTION_TYPE) > -1 &&
        availableActArr.indexOf('TURN_LEFT' as ACTION_TYPE) > -1 &&
        availableActArr.indexOf('DRIVE' as ACTION_TYPE) > -1 &&
        availableActArr.indexOf('REVERSE' as ACTION_TYPE) > -1,
    ).toBeTruthy()
  })

  test('Перед началом хода энергия равна максимальной', () => {
    game.setActiveTank(testWhiteTank.id)
    expect(testWhiteTank.energy).toBe(MAX_LIGHT_TANK_ENERGY)
  })

  test('При совершении действия срабатывает событие willPerformAction', () => {
    game.setActiveTank(testWhiteTank.id)
    game.emit = jest.fn()
    game.makeMove('DRIVE' as ACTION_TYPE)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(game.emit).toHaveBeenNthCalledWith(1, 'willPerformAction', 'DRIVE')
  })

  test('При совершении действия срабатывает событие didPerformAction', () => {
    game.setActiveTank(testWhiteTank.id)
    game.emit = jest.fn()
    game.makeMove('DRIVE' as ACTION_TYPE)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(game.emit).toHaveBeenNthCalledWith(2, 'didPerformAction', 'DRIVE')
  })

  test('Перед началом хода энергия танка восстанавлтивается до максимального значения', () => {
    game.setActiveTank(testWhiteTank.id)
    game.makeMove('REVERSE' as ACTION_TYPE)
    game.setActiveTank(testBlackTank.id)
    game.makeMove('DRIVE' as ACTION_TYPE)
    game.makeMove('STOP' as ACTION_TYPE)
    game.setActiveTank(testWhiteTank.id)
    expect(testWhiteTank.energy).toBe(MAX_LIGHT_TANK_ENERGY)
  })

  test('После совершения хода энергия уменьшается на 1', () => {
    game.setActiveTank(testWhiteTank.id)
    game.makeMove('DRIVE' as ACTION_TYPE)
    expect(testWhiteTank.energy).toBe(MAX_LIGHT_TANK_ENERGY - 1)
  })

  test('Обратный ход обнуляет энергию', () => {
    game.setActiveTank(testWhiteTank.id)
    game.makeMove('REVERSE' as ACTION_TYPE)
    expect(testWhiteTank.energy).toBe(0)
  })

  test('Нельзя, чтобы после завершения хода танк не изменил позицию', () => {
    game.setActiveTank(testWhiteTank.id)
    game.makeMove('TURN_LEFT' as ACTION_TYPE)
    game.makeMove('TURN_RIGHT' as ACTION_TYPE)
    const availableActArr = game.getAvailableActions(game.activeTank!)
    expect(availableActArr.indexOf('STOP' as ACTION_TYPE)).toBe(-1)
  })

  test('Движение за пределы поля запрещено [1]', () => {
    game.setActiveTank(testWhiteTankLine2.id)
    const availableActArr = game.getAvailableActions(game.activeTank!)
    expect(availableActArr.indexOf('REVERSE' as ACTION_TYPE)).toBe(-1)
  })

  test('Движение за пределы поля запрещено [2]', () => {
    game.setActiveTank(testWhiteTank.id)
    game.makeMove('TURN_LEFT' as ACTION_TYPE)
    repeat(() => {
      game.makeMove('DRIVE' as ACTION_TYPE)
    }, 2)
    const availableActArr = game.getAvailableActions(game.activeTank!)
    expect(availableActArr.indexOf('DRIVE' as ACTION_TYPE)).toBe(-1)
  })

  test('Невозможно выстрелить, если нет цели', () => {
    expect(() => {
      game.setActiveTank(testWhiteTank.id)
      game.makeMove('FIRE' as ACTION_TYPE)
    }).toThrow()
  })
})

describe('Подбитие танка', () => {
  let game: Game
  let gamers: {
    playerName1: string
    playerName2: string
  }
  let testWhiteTank: Tank, testBlackTank: Tank, testBlackComanderTank: Tank

  beforeEach(() => {
    game = new Game()
    gamers = {
      playerName1: 'Иван Иванов',
      playerName2: 'Катя Катина',
    }
    game.startGame(gamers)
    testWhiteTank = game.tanks[10]
    testBlackTank = game.tanks[0]
    testBlackComanderTank = game.tanks[2]

    /**Путь белого танка до положения, позволяющего выстрелить по врагу */
    game.setActiveTank(testWhiteTank.id)
    game.makeMove('TURN_LEFT' as ACTION_TYPE)
    repeat(() => {
      game.makeMove('DRIVE' as ACTION_TYPE)
    }, 2)
    game.makeMove('TURN_RIGHT' as ACTION_TYPE)
    game.makeMove('DRIVE' as ACTION_TYPE)
    game.setActiveTank(testBlackTank.id)
    game.makeMove('TURN_LEFT' as ACTION_TYPE)
    game.makeMove('STOP' as ACTION_TYPE)
    game.setActiveTank(testWhiteTank.id)
    repeat(() => {
      game.makeMove('DRIVE' as ACTION_TYPE)
    }, 5)
    game.setActiveTank(testBlackTank.id)
    game.makeMove('TURN_RIGHT' as ACTION_TYPE)
    game.makeMove('STOP' as ACTION_TYPE)
    game.setActiveTank(testWhiteTank.id)
    game.makeMove('TURN_RIGHT' as ACTION_TYPE)
  })

  test('После выстрела  происходит завершение хода', () => {
    game.endMove = jest.fn()
    game.makeMove('FIRE' as ACTION_TYPE)
    expect(game.endMove).toHaveBeenCalled()
  })

  test('Свойство isAlive подбитого танка равно false', () => {
    game.makeMove('FIRE' as ACTION_TYPE)
    expect((game.board.grid[2][3] as TankCell).data.isAlive).toBeFalsy()
  })

  test('Если убит командирский танк - игра завершена', () => {
    game.makeMove('FIRE' as ACTION_TYPE)
    game.setActiveTank(testBlackComanderTank.id)
    game.makeMove('TURN_RIGHT' as ACTION_TYPE)
    game.makeMove('DRIVE' as ACTION_TYPE)
    game.makeMove('TURN_LEFT' as ACTION_TYPE)
    repeat(() => {
      game.makeMove('DRIVE' as ACTION_TYPE)
    }, 2)
    game.setActiveTank(testWhiteTank.id)
    game.makeMove('DRIVE' as ACTION_TYPE)
    game.makeMove('TURN_RIGHT' as ACTION_TYPE)
    repeat(() => {
      game.makeMove('DRIVE' as ACTION_TYPE)
    }, 3)
    game.setActiveTank(testBlackComanderTank.id)
    game.makeMove('TURN_RIGHT' as ACTION_TYPE)
    game.makeMove('DRIVE' as ACTION_TYPE)
    game.makeMove('STOP' as ACTION_TYPE)
    game.setActiveTank(testWhiteTank.id)
    game.emit = jest.fn()
    game.makeMove('FIRE' as ACTION_TYPE)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(game.emit).toHaveBeenNthCalledWith(2, 'endGame', game.players[0])
  })
})

export {}

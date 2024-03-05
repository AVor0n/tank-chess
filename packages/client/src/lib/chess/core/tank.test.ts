import { TANK_TYPE } from '../types'
import { Tank } from './tank'

const repeat = (repeatFunc: () => void, quantity: number) => {
  let q = 0
  while (q < quantity) {
    repeatFunc()
    q++
  }
}

describe('class Tank - общее', () => {
  let lightTank: Tank
  beforeEach(() => {
    lightTank = new Tank(TANK_TYPE.LT, 0, '#ffffff', { x: 2, y: 4, rotation: 0 })
  })

  test('reverse делает шаг назад', () => {
    lightTank.reverse()
    expect(lightTank.position.y).toBe(5)
  })

  test('Шаг назад расходует всю энергию танка', () => {
    lightTank.reverse()
    expect(lightTank.energy).toBe(0)
  })

  test('Выстрел рассходует всю энергию', () => {
    lightTank.shoot()
    expect(lightTank.energy).toBe(0)
  })

  test('turnLeft изменяет rotation с 0 до 7', () => {
    lightTank.turnLeft()
    expect(lightTank.position.rotation).toBe(7)
  })

  test('turnRight изменяет rotation с 0 до 1', () => {
    lightTank.turnRight()
    expect(lightTank.position.rotation).toBe(1)
  })
})

describe('class Tank - легкий танк', () => {
  let lightTank: Tank
  beforeEach(() => {
    lightTank = new Tank(TANK_TYPE.LT, 0, '#ffffff', { x: 2, y: 4, rotation: 0 })
  })

  test('Правильно присваивается тип танка', () => {
    expect(lightTank.type).toEqual('LT')
  })

  test('Количество ходов легкого танка равно 5', () => {
    expect(lightTank.energy).toEqual(5)
  })

  test('Броня легкого танка равна 1', () => {
    expect(lightTank.armor).toEqual(1)
  })

  test('Сила удара легкого танка равна 1', () => {
    expect(lightTank.strength).toEqual(1)
  })

  test('Начальный угол поворота равен 0', () => {
    expect(lightTank.position.rotation).toEqual(0)
  })

  test('Может сделать 5 шагов подряд', () => {
    expect(() => {
      repeat(() => lightTank.drive(), 5)
    }).not.toThrow()
  })

  test('Не может сделать более 5 шагов подряд', () => {
    expect(() => {
      repeat(() => lightTank.drive(), 6)
    }).toThrow()
  })

  test('Танк может сделать не более 5 различных действий подряд', () => {
    expect(() => {
      lightTank.drive()
      lightTank.turnLeft()
      lightTank.turnLeft()
      lightTank.drive()
      lightTank.turnLeft()
      lightTank.drive()
    }).toThrow()
  })
})

describe('class Tank - средний танк', () => {
  let middleTank: Tank
  beforeEach(() => {
    middleTank = new Tank(TANK_TYPE.MT, 0, '#ffffff', { x: 2, y: 4, rotation: 0 })
  })

  test('Правильно присваивается тип танка', () => {
    expect(middleTank.type).toEqual('MT')
  })

  test('Количество ходов среднего танка равно 4', () => {
    expect(middleTank.energy).toEqual(4)
  })

  test('Броня среднего танка равна 2', () => {
    expect(middleTank.armor).toEqual(2)
  })

  test('Сила удара среднего танка равна 2', () => {
    expect(middleTank.strength).toEqual(2)
  })

  test('Начальный угол поворота равен 0', () => {
    expect(middleTank.position.rotation).toEqual(0)
  })

  test('Может сделать 4 шага подряд', () => {
    expect(() => {
      middleTank.drive()
      middleTank.drive()
      middleTank.drive()
      middleTank.drive()
    }).not.toThrow()
  })

  test('Не может сделать более 4 шагов подряд', () => {
    expect(() => {
      middleTank.drive()
      middleTank.drive()
      middleTank.drive()
      middleTank.drive()
      middleTank.drive()
    }).toThrow()
  })

  test('Танк может сделать не более 4 различных действий подряд', () => {
    expect(() => {
      middleTank.drive()
      middleTank.turnLeft()
      middleTank.turnLeft()
      middleTank.drive()
      middleTank.turnLeft()
    }).toThrow()
  })
})

describe('class Tank - тяжелый танк', () => {
  let heavyTank: Tank
  beforeEach(() => {
    heavyTank = new Tank(TANK_TYPE.HT, 0, '#ffffff', { x: 2, y: 4, rotation: 0 })
  })

  test('Правильно присваивается тип танка', () => {
    expect(heavyTank.type).toEqual('HT')
  })

  test('Количество ходов среднего танка равно 3', () => {
    expect(heavyTank.energy).toEqual(3)
  })

  test('Броня среднего танка равна 3', () => {
    expect(heavyTank.armor).toEqual(3)
  })

  test('Сила удара среднего танка равна 3', () => {
    expect(heavyTank.strength).toEqual(3)
  })

  test('Начальный угол поворота равен 0', () => {
    expect(heavyTank.position.rotation).toEqual(0)
  })

  test('Может сделать 4 шага подряд', () => {
    expect(() => {
      heavyTank.drive()
      heavyTank.drive()
      heavyTank.drive()
    }).not.toThrow()
  })

  test('Не может сделать более 4 шагов подряд', () => {
    expect(() => {
      heavyTank.drive()
      heavyTank.drive()
      heavyTank.drive()
      heavyTank.drive()
    }).toThrow()
  })

  test('Танк может сделать не более 4 различных действий подряд', () => {
    expect(() => {
      heavyTank.drive()
      heavyTank.turnLeft()
      heavyTank.drive()
      heavyTank.turnRight()
    }).toThrow()
  })
})

describe('class Tank - командирский танк', () => {
  let comanderTank: Tank
  beforeEach(() => {
    comanderTank = new Tank(TANK_TYPE.CLT, 0, '#ffffff', { x: 2, y: 4, rotation: 0 })
  })

  test('Правильно присваивается тип танка', () => {
    expect(comanderTank.type).toEqual('CLT')
  })

  test('Количество ходов командирского танка равно 5', () => {
    expect(comanderTank.energy).toEqual(5)
  })

  test('Броня командирского танка равна 1', () => {
    expect(comanderTank.armor).toEqual(1)
  })

  test('Сила удара командирского танка равна 1', () => {
    expect(comanderTank.strength).toEqual(1)
  })

  test('Начальный угол поворота равен 0', () => {
    expect(comanderTank.position.rotation).toEqual(0)
  })

  test('Может сделать 5 шагов подряд', () => {
    expect(() => {
      comanderTank.drive()
      comanderTank.drive()
      comanderTank.drive()
      comanderTank.drive()
      comanderTank.drive()
    }).not.toThrow()
  })

  test('Не может сделать более 5 шагов подряд', () => {
    expect(() => {
      comanderTank.drive()
      comanderTank.drive()
      comanderTank.drive()
      comanderTank.drive()
      comanderTank.drive()
      comanderTank.drive()
    }).toThrow()
  })

  test('Танк может сделать не более 5 различных действий подряд', () => {
    expect(() => {
      comanderTank.drive()
      comanderTank.turnLeft()
      comanderTank.drive()
      comanderTank.turnRight()
      comanderTank.drive()
      comanderTank.turnRight()
    }).toThrow()
  })
})

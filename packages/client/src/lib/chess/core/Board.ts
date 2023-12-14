import { type BoardPosition } from '../types'
import { getNextCell } from '../utils/step'
import { type Tank } from './Tank'

export type ItemOnBoard =
  | {
      type: 'empty'
    }
  | {
      type: 'wall'
    }
  | {
      type: 'tank'
      data: Tank
    }

export class Board {
  private _size = 0
  private _grid: ItemOnBoard[][] = []

  public get size() {
    return this._size
  }

  public get grid(): readonly (readonly ItemOnBoard[])[] {
    return this._grid
  }

  public initialize(size: number): void {
    this._size = size
    this._grid = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({
        type: 'empty',
      })),
    )
  }

  private checkBounds({ x, y }: { x: number; y: number }) {
    if (x < 0) return false
    if (y < 0) return false
    if (x >= this.size) return false
    if (y >= this.size) return false
    return true
  }

  private placeItem(x: number, y: number, item: ItemOnBoard) {
    try {
      this._grid[y][x] = item
    } catch {
      throw new Error(`Попытка поставить элемент за границы доски, на [${x}, ${y}]`)
    }
  }

  public placeWall(x: number, y: number) {
    this.placeItem(x, y, { type: 'wall' })
  }

  public placeTank(tank: Tank): void {
    this.placeItem(tank.position.x, tank.position.y, {
      type: 'tank',
      data: tank,
    })
  }

  public moveItem(x: number, y: number, newX: number, newY: number): void {
    const fieldWithTank = this._grid[y][x]
    this._grid[y][x] = { type: 'empty' }
    this._grid[newY][newX] = fieldWithTank
  }

  public getTarget(position: BoardPosition) {
    let tempPosition = getNextCell(position, 1)
    while (this.checkBounds(tempPosition)) {
      const target = this.getCellAt(tempPosition)
      if (target && target.type !== 'empty') return target
      tempPosition = getNextCell(tempPosition, 1)
    }
    return null
  }

  public getCellAt({ x, y }: { x: number; y: number }): ItemOnBoard | null {
    if (!this.checkBounds({ x, y })) return null
    return this.grid[y][x]
  }

  /**
   * Создает доску из строкового шаблона
   * @param template шаблон - строка из нескольких линий.
   * Каждая линия должна содержать 2-а символа `|`, между которыми любые наборы символов, разделенные любым количеством пробелов
   * В рамках одной линии, всё что находится до 1-го символа `|` или после 2-го `|` игнорируется
   * Остальные символы разбиваются по пробелам на блоки и эти блоки отправляются в функцию `cellParcel`
   * Строки не содержащие `|` также игнорируются
   * @param cellParser парсер клетки, принимает объект создаваемой доски, блок символов и координаты этого блока на доске
   * для добавления новых элементов на доску можно воспользоваться методами объекта `board`
   * @example
   * Board.createFromTemplate(`
   * т.к. эта строка не содержит символы вертикальной черты, она будет проигнорирована
   * 1 | - x x - | все что после второй вертикальной черты также игнорируется
   * 2 | 000 - - - | группы символов могут состоять из строки любой длины
   * 3 | - 00      x 1 | и быть разделенными любым количеством пробелов
   * 10000 | - x -  0 |
   * `, (board, cell, x, y) => {
   *  if(cell === '-) return;
   *  else board.placeWall(x,y);
   * })
   */
  public static createFromTemplate(
    template: string,
    cellParser: (board: Board, cell: string, x: number, y: number) => void,
  ) {
    const rows = template.split('\n').filter(row => /\|.+\|/.test(row))

    const board = new Board()
    board.initialize(rows.length)

    rows.forEach((row, y) => {
      const cells = row.split('|')[1]?.trim()?.split(/\s+/) ?? []

      cells.forEach((cell, x) => {
        cellParser(board, cell, x, y)
      })
    })

    return board
  }
}

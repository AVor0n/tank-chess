import { type BoardPosition } from '../types'

export const getNextCell = ({ x, y, rotation }: BoardPosition, direction: 1 | -1) => {
  if (rotation === 0) return { rotation, x, y: y - direction }
  if (rotation === 1) return { rotation, x: x + direction, y: y - direction }
  if (rotation === 2) return { rotation, x: x + direction, y }
  if (rotation === 3) return { rotation, x: x + direction, y: y + direction }
  if (rotation === 4) return { rotation, x, y: y + direction }
  if (rotation === 5) return { rotation, x: x - direction, y: y + direction }
  if (rotation === 6) return { rotation, x: x - direction, y }
  if (rotation === 7) return { rotation, x: x - direction, y: y - direction }
  return { x, y, rotation }
}

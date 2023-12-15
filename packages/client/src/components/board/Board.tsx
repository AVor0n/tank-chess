import { BOARD_ROWS } from '../../utils/constants'
import BoardRow from './boardRow'

export const Board = () => (
  <div>
    {BOARD_ROWS.map(number => (
      <BoardRow key={number} rowNumber={number + 1} />
    ))}
  </div>
)

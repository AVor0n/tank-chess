import BoardRow from './boardRow'
import { BOARD_ROWS } from '../../utils/constants'

export const Board = () => {
  return (
    <div>
      {BOARD_ROWS.map(number => (
        <BoardRow key={number} rowNumber={number + 1} />
      ))}
    </div>
  )
}

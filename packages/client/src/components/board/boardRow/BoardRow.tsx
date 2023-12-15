import { BOARD_ROWS } from '../../../utils/constants'
import styles from './boardRow.module.scss'
import Square from './square'
import { MAX_ROW_NUMBER, MIN_ROW_NUMBER } from '../../../utils/constants'

type BoardRowProps = {
  rowNumber: number
}

export const BoardRow = ({ rowNumber }: BoardRowProps) => {
  const calculatePosition = (row: number, column: number) => {
    let type = 'simple'

    if (row === MIN_ROW_NUMBER || row === MAX_ROW_NUMBER) {
      switch (column) {
        case MIN_ROW_NUMBER:
          type = row === MIN_ROW_NUMBER ? 'leftUpper' : 'leftLower'
          break
        case MAX_ROW_NUMBER:
          type = row === MIN_ROW_NUMBER ? 'rightUpper' : 'rightLower'
          break
        default:
          type = row === MIN_ROW_NUMBER ? 'upper' : 'lower'
      }
    } else if (
      column === MIN_ROW_NUMBER &&
      row !== MIN_ROW_NUMBER &&
      row !== MAX_ROW_NUMBER
    ) {
      type = 'left'
    } else if (
      column === MAX_ROW_NUMBER &&
      row !== MIN_ROW_NUMBER &&
      row !== MAX_ROW_NUMBER
    ) {
      type = 'right'
    }

    return type
  }

  return (
    <div className={styles.row}>
      {BOARD_ROWS.map(number => (
        <Square
          key={number}
          columnNumber={number + 1}
          rowNumber={rowNumber}
          squareType={calculatePosition(rowNumber, number + 1)}
        />
      ))}
    </div>
  )
}

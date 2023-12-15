import * as cn from 'classnames'
import { COLUMNS_LETTERS } from '../../../../utils/constants'
import styles from './square.module.scss'

interface SquareProps {
  columnNumber: number
  rowNumber: number
  squareType: string
}

export const Square = ({ rowNumber, columnNumber, squareType }: SquareProps) => {
  const isDark = (rowNumber + columnNumber) % 2 !== 0

  const isUpper = squareType === 'upper'
  const isLower = squareType === 'lower'
  const isLeft = squareType === 'left'
  const isRight = squareType === 'right'
  const isLeftUpper = squareType === 'leftUpper'
  const isRightUpper = squareType === 'rightUpper'
  const isLeftLower = squareType === 'leftLower'
  const isRightLower = squareType === 'rightLower'

  return (
    <div
      className={cn(styles.squareType, {
        [styles['black-square']]: isDark,
        [styles['light-square']]: !isDark,
        [styles.left]: isLeft,
        [styles.right]: isRight,
        [styles.upper]: isUpper,
        [styles.lower]: isLower,
        [styles['left-upper']]: isLeftUpper,
        [styles['right-upper']]: isRightUpper,
        [styles['left-lower']]: isLeftLower,
        [styles['right-lower']]: isRightLower,
      })}>
      {isLeftUpper ? (
        <>
          <p className={styles['upper-letter']}>{COLUMNS_LETTERS[String(columnNumber)]}</p>
          <p className={styles['left-number']}>{rowNumber}</p>
        </>
      ) : null}
      {isLeft ? <p className={styles['left-number']}>{rowNumber}</p> : null}
      {isLeftLower ? (
        <>
          <p className={styles['lower-letter']}>{COLUMNS_LETTERS[String(columnNumber)]}</p>
          <p className={styles['left-number']}>{rowNumber}</p>
        </>
      ) : null}
      {isRight ? <p className={styles['right-number']}>{rowNumber}</p> : null}
      {isUpper ? <p className={styles['upper-letter']}>{COLUMNS_LETTERS[String(columnNumber)]}</p> : null}
      {isRightUpper ? (
        <>
          <p className={styles['upper-letter']}>{COLUMNS_LETTERS[String(columnNumber)]}</p>
          <p className={styles['right-number']}>{rowNumber}</p>
        </>
      ) : null}
      {isRightLower ? (
        <>
          <p className={styles['lower-letter']}>{COLUMNS_LETTERS[String(columnNumber)]}</p>
          <p className={styles['right-number']}>{rowNumber}</p>
        </>
      ) : null}
      {isLower ? <p className={styles['lower-letter']}>{COLUMNS_LETTERS[String(columnNumber)]}</p> : null}
    </div>
  )
}

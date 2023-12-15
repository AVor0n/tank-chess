import * as cn from 'classnames'
import styles from './square.module.scss'
import { COLUMNS_LETTERS } from '../../../../utils/constants'

type SquareProps = {
  columnNumber: number
  rowNumber: number
  squareType: string
}

export const Square = ({
  rowNumber,
  columnNumber,
  squareType,
}: SquareProps) => {
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
        [styles.blackSquare]: isDark,
        [styles.lightSquare]: !isDark,
        [styles.left]: isLeft,
        [styles.right]: isRight,
        [styles.upper]: isUpper,
        [styles.lower]: isLower,
        [styles.leftUpper]: isLeftUpper,
        [styles.rightUpper]: isRightUpper,
        [styles.leftLower]: isLeftLower,
        [styles.rightLower]: isRightLower,
      })}>
      {isLeftUpper && (
        <>
          <p className={styles.upperLetter}>
            {COLUMNS_LETTERS[String(columnNumber)]}
          </p>
          <p className={styles.leftNumber}>{rowNumber}</p>
        </>
      )}
      {isLeft && <p className={styles.leftNumber}>{rowNumber}</p>}
      {isLeftLower && (
        <>
          <p className={styles.lowerLetter}>
            {COLUMNS_LETTERS[String(columnNumber)]}
          </p>
          <p className={styles.leftNumber}>{rowNumber}</p>
        </>
      )}
      {isRight && <p className={styles.rightNumber}>{rowNumber}</p>}
      {isUpper && (
        <p className={styles.upperLetter}>
          {COLUMNS_LETTERS[String(columnNumber)]}
        </p>
      )}
      {isRightUpper && (
        <>
          <p className={styles.upperLetter}>
            {COLUMNS_LETTERS[String(columnNumber)]}
          </p>
          <p className={styles.rightNumber}>{rowNumber}</p>
        </>
      )}
      {isRightLower && (
        <>
          <p className={styles.lowerLetter}>
            {COLUMNS_LETTERS[String(columnNumber)]}
          </p>
          <p className={styles.rightNumber}>{rowNumber}</p>
        </>
      )}
      {isLower && (
        <p className={styles.lowerLetter}>
          {COLUMNS_LETTERS[String(columnNumber)]}
        </p>
      )}
    </div>
  )
}

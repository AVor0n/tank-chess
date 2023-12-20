import { memo } from 'react'
import styles from './TankController.module.scss'

interface TankControllerProps {
  canEndMove: boolean
  onEndMove: () => void
}

export const TankController = memo(({ canEndMove, onEndMove }: TankControllerProps) => (
  <div className={styles.action}>
    <div className={styles.row}>
      <button className={styles.btn} onClick={onEndMove} disabled={!canEndMove}>
        завершить ход
      </button>
    </div>
  </div>
))

import { type TANK_TYPE } from 'lib/chess'
import { tankTypeToName } from '../../constants'
import styles from './TankInfo.module.scss'

interface TankInfoProps {
  type: TANK_TYPE
  strength: number
  armor: number
  energy: number
}

export const TankInfo = ({ type, armor, energy, strength }: TankInfoProps) => (
  <div className={styles.info}>
    <h2>Выбран {tankTypeToName[type]}</h2>
    <div className={styles.row}>
      <div className={styles.name}>Атака:</div>
      <div className={styles.value}>{strength}</div>
    </div>
    <div className={styles.row}>
      <div className={styles.name}>Броня:</div>
      <div className={styles.value}>{armor}</div>
    </div>
    <div className={styles.row}>
      <div className={styles.name}>Энергия:</div>
      <div className={styles.value}>{energy}</div>
    </div>
  </div>
)

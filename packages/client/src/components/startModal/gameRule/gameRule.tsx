import { Fragment } from 'react'
import { RULES_LIST } from '../constants'
import styles from './gameRule.module.scss'

interface GameRuleProps {
  currentPage: number
}

export const GameRule = ({ currentPage }: GameRuleProps) => (
  <>
    <h2 className={styles.title}>Перед боем</h2>
    <h3 className={styles.subtitle}>{RULES_LIST[currentPage].title}</h3>
    <div className={styles.box}>
      {RULES_LIST[currentPage].text.map((item, idx) => (
        <Fragment key={item}>
          <p className={styles.text}>{item}</p>
          {RULES_LIST[currentPage].images[idx] && (
            <img className={styles.image} src={RULES_LIST[currentPage].images[idx]} alt="Правила" />
          )}
        </Fragment>
      ))}
    </div>
  </>
)

import { useCallback, useEffect, useState } from 'react'
import { type Game } from 'lib/chess'
import { TankController } from '../TankController'
import { TankInfo } from '../TankInfo'
import styles from './Info.module.scss'

export const GameInfo = ({ game }: { game: Game }) => {
  const [update, setUpdate] = useState(0)
  const { activeTank } = game

  const onEndMove = useCallback(() => game.endMove(), [game])

  useEffect(() => {
    const disposers = [
      game.on('onChangeActiveTank', () => setUpdate(update + 1)),
      game.on('didPerformAction', () => setUpdate(update + 1)),
    ]

    return () => disposers.forEach(disposer => disposer())
  }, [game, update])

  return (
    <div className={styles.info}>
      <h1 className={styles.header}>Ход игрока: {game.activePlayer.name}</h1>

      {activeTank ? (
        <>
          <TankInfo
            type={activeTank.type}
            armor={activeTank.armor}
            energy={activeTank.energy}
            strength={activeTank.strength}
          />
          <TankController canEndMove={activeTank.energy !== activeTank.movement} onEndMove={onEndMove} />
        </>
      ) : (
        <h2>Выберите танк</h2>
      )}
    </div>
  )
}

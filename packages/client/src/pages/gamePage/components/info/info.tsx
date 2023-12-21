import { useCallback, useEffect, useState } from 'react'
import { type Game } from 'lib/chess'
import { TankController } from '../tankController'
import { TankInfo } from '../tankInfo'
import styles from './info.module.scss'

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

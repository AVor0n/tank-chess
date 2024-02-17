import { type TANK_TYPE } from '@lib/chess'
import type { Game, Player } from '@lib/chess/core'
import type { GameResult } from 'types/types'

const TankTypesCost: Record<TANK_TYPE, number> = {
  CLT: 5000,
  HT: 800,
  MT: 600,
  LT: 400,
}

const calculateScore = (game: Game, winner: Player) => {
  const lostOwnTanks: TANK_TYPE[] = []
  const destroyedEnemyTanks: TANK_TYPE[] = []
  game.tanks.forEach(tank => {
    if (!tank.isAlive) {
      const targetCollection = tank.playerId === winner.id ? lostOwnTanks : destroyedEnemyTanks
      targetCollection.push(tank.type)
    }
  })

  const bonus = destroyedEnemyTanks.map(type => TankTypesCost[type]).reduce((sum, cost) => sum + cost, 0)
  const penalty = lostOwnTanks.map(type => TankTypesCost[type]).reduce((sum, cost) => sum + cost, 0)

  return {
    lostOwnTanks,
    destroyedEnemyTanks,
    score: bonus - penalty,
  }
}

export const getGameResult = (game: Game, winner: Player): GameResult => {
  const { destroyedEnemyTanks, lostOwnTanks, score } = calculateScore(game, winner)

  return {
    userName: winner.name,
    moves: game.moveCounter,
    endDate: new Date().toISOString(),
    lostOwnTanks,
    destroyedEnemyTanks,
    score,
  }
}

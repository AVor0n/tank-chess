import { TANK_TYPE } from '@lib/chess'

export const tankTypeToName: Record<TANK_TYPE, string> = {
  [TANK_TYPE.CLT]: 'командирский танк',
  [TANK_TYPE.LT]: 'легкий танк',
  [TANK_TYPE.MT]: 'средний танк',
  [TANK_TYPE.HT]: 'тяжелый танк',
}

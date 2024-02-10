import { type Optional } from 'sequelize'
import { Column, ForeignKey, Model, Table, BelongsTo } from 'sequelize-typescript'
import { Comment } from './comment'
import { Emoji } from './emoji'

interface ReactionProps {
  id: number
  emoji_id: number
  comment_id: number
  quantity: number
}

export type CreateReactionProps = Optional<ReactionProps, 'id'>

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'reactions',
})
export class Reaction extends Model<ReactionProps, CreateReactionProps> {
  @ForeignKey(() => Comment)
  @Column
  comment_id!: number

  @ForeignKey(() => Emoji)
  @Column
  emoji_id!: number

  @Column
  quantity!: number

  @BelongsTo(() => Emoji, { targetKey: 'id' })
  emoji?: Emoji
}

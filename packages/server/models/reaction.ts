import { type Optional } from 'sequelize'
import { Column, ForeignKey, Model, Table, BelongsTo, Unique } from 'sequelize-typescript'
import { Comment } from './comment'
import { Emoji } from './emoji'
import { User } from './user'

interface ReactionProps {
  id: number
  emoji_id: number
  comment_id: number
  user_id: number
}

export type CreateReactionProps = Optional<ReactionProps, 'id'>

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'reactions',
})
export class Reaction extends Model<ReactionProps, CreateReactionProps> {
  @ForeignKey(() => Comment)
  @Unique('indexes')
  @Column
  comment_id!: number

  @ForeignKey(() => Emoji)
  @Unique('indexes')
  @Column
  emoji_id!: number

  @ForeignKey(() => User)
  @Unique('indexes')
  @Column
  user_id!: number

  @BelongsTo(() => Emoji, { targetKey: 'id' })
  emoji?: Emoji
}

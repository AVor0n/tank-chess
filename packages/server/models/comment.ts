import { type Optional } from 'sequelize'
import { BelongsTo, Column, Default, ForeignKey, Min, Model, NotEmpty, Table, HasMany } from 'sequelize-typescript'
import { type ReactionType } from '../controllers/reaction'
import { Reaction } from './reaction'
import { Topic } from './topic'

interface CommentProps {
  id: number
  topic_id: number
  text: string
  like_count?: number
}

export type CreateCommentProps = Optional<CommentProps, 'id'>

@Table({ tableName: 'comments', timestamps: true })
export class Comment extends Model<CommentProps, CreateCommentProps> {
  @BelongsTo(() => Topic)
  topic!: Topic

  @ForeignKey(() => Topic)
  topic_id!: number

  @NotEmpty
  @Column
  text!: string

  @Min(0)
  @Default(0)
  @Column
  like_count!: number

  @HasMany(() => Reaction)
  reactions?: ReactionType[]
}

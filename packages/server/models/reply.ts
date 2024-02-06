import { type Optional } from 'sequelize'
import { BelongsTo, Column, Default, ForeignKey, Min, Model, NotEmpty, Table } from 'sequelize-typescript'
import { Comment } from './comment'

interface ReplyProps {
  id: number
  comment_id: number
  parent?: number
  text: string
  like_count?: number
}

type CreateReplyProps = Optional<ReplyProps, 'id'>

@Table({ tableName: 'replies', timestamps: true })
export class Reply extends Model<ReplyProps, CreateReplyProps> {
  @BelongsTo(() => Comment)
  comment!: Comment

  @ForeignKey(() => Comment)
  comment_id!: number

  @Column
  parent!: number

  @NotEmpty
  @Column
  text!: string

  @Min(0)
  @Default(0)
  @Column
  like_count!: number
}

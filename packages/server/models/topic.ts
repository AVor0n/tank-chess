import { type Optional } from 'sequelize'
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, NotEmpty, Table } from 'sequelize-typescript'
import { Comment } from './comment'
import { User } from './user'

interface TopicProps {
  id: number
  user_id: number
  title: string
  text: string
  comments?: Comment[]
  createdAt: Date
  updatedAt: Date
  lastComment?: Comment
}

type CreateTopicProps = Optional<TopicProps, 'id' | 'createdAt' | 'updatedAt'>

@Table({ tableName: 'topics', timestamps: true })
export class Topic extends Model<TopicProps, CreateTopicProps> {
  @ForeignKey(() => User)
  user_id!: number

  @NotEmpty
  @Column(DataType.STRING)
  title!: string

  @NotEmpty
  @Column
  text!: string

  @HasMany(() => Comment)
  comments!: Comment[]

  @BelongsTo(() => User, { targetKey: '_id' })
  user?: User
}

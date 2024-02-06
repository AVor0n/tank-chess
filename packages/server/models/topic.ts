import { type Optional } from 'sequelize'
import { Column, DataType, HasMany, Model, NotEmpty, Table } from 'sequelize-typescript'
import { Comment } from './comment'

interface TopicProps {
  id: number
  user_id?: number // Переделать при реализации авторизации на беке
  title: string
  comments?: Comment[]
  createdAt: Date
  updatedAt: Date
  lastComment?: Comment
}

type CreateTopicProps = Optional<TopicProps, 'id' | 'createdAt' | 'updatedAt'>

@Table({ tableName: 'topics', timestamps: true })
export class Topic extends Model<TopicProps, CreateTopicProps> {
  @NotEmpty
  @Column(DataType.STRING)
  title!: string

  @HasMany(() => Comment)
  comments!: Comment[]
}

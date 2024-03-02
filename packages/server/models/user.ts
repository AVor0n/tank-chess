import { Column, Default, Model, PrimaryKey, Table, Unique, AllowNull, HasMany } from 'sequelize-typescript'
import { Comment } from './comment'
import { Topic } from './topic'

interface UserProps {
  _id: number
  login: string
  email: string
  first_name: string
  second_name: string
  display_name: string
  phone: string
  avatar: string
  theme: string
}

@Table({ tableName: 'users' })
export class User extends Model<UserProps> {
  @PrimaryKey
  @AllowNull(false)
  @Unique('user_indices')
  @Column
  _id!: number

  @Unique
  @AllowNull(false)
  @Unique('user_indices')
  @Column
  login!: string

  @Unique
  @AllowNull(false)
  @Unique('user_indices')
  @Column
  email!: string

  @Default('')
  @Column
  first_name!: string

  @Default('')
  @Column
  second_name!: string

  @Column
  display_name!: string

  @Default('')
  @Column
  phone!: string

  @Default('')
  @Column
  avatar!: string

  @Default('light')
  @Column
  theme!: string

  @HasMany(() => Comment)
  comments!: Comment[]

  @HasMany(() => Topic)
  topic!: Topic[]
}

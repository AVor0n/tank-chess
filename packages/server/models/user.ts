import { Column, Default, Model, PrimaryKey, Table, Unique, AllowNull } from 'sequelize-typescript'

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
  @Column
  user_id!: number

  @PrimaryKey
  @Unique
  @AllowNull(false)
  @Column
  login!: string

  @Unique
  @PrimaryKey
  @AllowNull(false)
  @Column
  email!: string

  @Unique
  @Default('')
  @Column
  first_name!: string

  @Unique
  @Default('')
  @Column
  second_name!: string

  @Unique
  @Column
  display_name!: string

  @Unique
  @Default('')
  @Column
  phone!: string

  @Unique
  @Default('')
  @Column
  avatar!: string

  @Default('light')
  @Column
  theme!: string
}

import { Column, Default, Model, PrimaryKey, Table } from 'sequelize-typescript'

interface UserProps {
  login: string
  theme: string
}

@Table({ tableName: 'users' })
export class User extends Model<UserProps> {
  @PrimaryKey
  @Column
  login!: string

  @Default('light')
  @Column
  theme!: string
}

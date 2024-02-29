import { type Optional } from 'sequelize'
import { Column, Model, Table, DataType, NotEmpty, Default } from 'sequelize-typescript'

interface EmojiProps {
  id: number
  code: string
  description: string
  isPopular: boolean
}

export type CreateEmojiProps = Optional<EmojiProps, 'id'>

@Table({
  timestamps: false,
  tableName: 'emoji',
})
export class Emoji extends Model<EmojiProps, CreateEmojiProps> {
  @NotEmpty
  @Column({
    type: DataType.STRING,
  })
  code!: string

  @Column({
    type: DataType.STRING,
  })
  description!: string

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isPopular!: boolean
}

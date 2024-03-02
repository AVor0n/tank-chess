import dotenv from 'dotenv'
import { Sequelize, type SequelizeOptions } from 'sequelize-typescript'
import { importEmojiFromJSON } from './controllers/reaction'
import { Comment, Topic, Reaction, Emoji, User } from './models'

dotenv.config({ path: '../../.env' })

//const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env

const sequelizeOptions: SequelizeOptions = {
  //host: POSTGRES_HOST ?? 'localhost',
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
}

export async function postgresConnect() {
  const sequelize = new Sequelize(sequelizeOptions)
  sequelize.addModels([Topic, Comment, Emoji, Reaction, User])

  try {
    await sequelize.authenticate()

    await sequelize.sync()

    /**заполняем таблицу с емодзи, если она пустая */
    const emoji = await Emoji.findAndCountAll()
    if (emoji.count === 0) {
      await importEmojiFromJSON()
    }
    /**------ */
  } catch (error) {
    console.error(error)
  }
  return sequelize
}

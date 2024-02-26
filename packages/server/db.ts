import dotenv from 'dotenv'
import { Sequelize, type SequelizeOptions } from 'sequelize-typescript'
import { Comment, Topic, Reaction, Emoji, User } from './models'

dotenv.config({ path: '../../.env' })

/***upd when push */
//const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env

const sequelizeOptions: SequelizeOptions = {
  /***upd when push */
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

    await sequelize.sync({ force: true })
  } catch (error) {
    console.error(error)
  }
  return sequelize
}

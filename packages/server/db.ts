import dotenv from 'dotenv'
import { Sequelize, type SequelizeOptions } from 'sequelize-typescript'
import { Comment, Topic, Reply, Reaction, Emoji } from './models'

dotenv.config({ path: '../../.env' })

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
}

export async function postgresConnect() {
  const sequelize = new Sequelize(sequelizeOptions)
  sequelize.addModels([Topic, Comment, Reply, Emoji, Reaction])

  try {
    await sequelize.authenticate()

    await sequelize.sync({ force: false })
  } catch (error) {
    console.error(error)
  }
  return sequelize
}

import { Client, type QueryResultRow } from 'pg'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env

export const createClientAndConnect = async (): Promise<Client | null> => {
  try {
    const client = new Client({
      user: POSTGRES_USER,
      host: 'localhost',
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT),
    })

    await client.connect()

    const res = await client.query<QueryResultRow>('SELECT NOW()')
    console.log('  ➜ 🎸 Connected to the database at:', res?.rows?.[0].now)
    client.end()

    return client
  } catch (e) {
    console.error(e)
  }

  return null
}

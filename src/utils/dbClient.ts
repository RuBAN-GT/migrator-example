import { Connection, createConnection } from 'typeorm'
import { getDbMigrations } from './dbHelper'

export interface DbConnectionOptions {
  host: string
  port: number
  database: string
  username: string
  password: string
}

export class DBClient {
  public static getInstance(): DBClient {
    if (!DBClient.client) {
      DBClient.client = new DBClient()
    }
    return DBClient.client
  }

  private static client: DBClient
  private connection: Connection

  public async connect(options: DbConnectionOptions): Promise<void> {
    this.connection = await createConnection({
      database: options.database,
      host: options.host,
      logging: true,
      migrations: getDbMigrations(),
      migrationsRun: false,
      migrationsTableName: 'storefront',
      password: options.password,
      port: options.port,
      synchronize: false,
      type: 'mysql',
      username: options.username
    })
  }

  public async runMigrations(): Promise<object[]> {
    const migrationResults = await this.connection.runMigrations()
    return migrationResults
  }

  public async disconnect(): Promise<void> {
    await this.connection.close()
  }
}

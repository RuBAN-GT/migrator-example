import { BasicAction } from '@actions/basicAction'
import { DBClient } from '@utils'

export class DbMigrationAction extends BasicAction<{}> {
  protected dbClient: DBClient

  public async init(): Promise<void> {
    await this.prepareDbClient()
  }

  public async finalize(): Promise<void> {
    await this.dbClient.disconnect()
  }

  protected async exec(): Promise<any> {
    return this.dbClient.runMigrations()
  }

  protected async prepareDbClient(): Promise<void> {
    this.dbClient = DBClient.getInstance()
    await this.dbClient.connect({
      database: process.env.DB__NAME,
      host: process.env.DB__HOST,
      password: process.env.DB__PASSWORD,
      port: +process.env.DB__PORT,
      username: process.env.DB__USERNAME
    })
  }
}

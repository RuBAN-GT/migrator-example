import { get } from 'lodash'
import Serverless from 'serverless'
import callLambda from './src/utils/callLambda'

module.exports = class CustomPlugin {
  private readonly commands: any
  private readonly hooks: any

  constructor(private serverless: Serverless) {
    this.commands = {
      customPlugin: {
        commands: {
          migration: {
            lifecycleEvents: ['run']
          }
        }
      }
    }

    this.hooks = {
      'after:deploy:finalize': () => this.runMigration(),
      'after:deploy:function:deploy': () => this.serverless.pluginManager.spawn('customPlugin:migration'),
      'customPlugin:migration:run': () => this.runMigration()
    }
  }

  public async runMigration(): Promise<void> {
    const lambdaName = get(this.serverless.service, 'functions.migrator.name', '')
    const lambdaResponse = await callLambda(lambdaName, this.getRegion(), { action: 'dbMigrate', payload: {} })

    this.serverless.cli.log(`Migrator returned a response: ${JSON.stringify(lambdaResponse)}`)
  }

  private getRegion(): string {
    return get(this.serverless, ['service', 'provider', 'region'])
  }
}

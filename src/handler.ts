import { Migrator } from '@utils/migrator'
import { MigratorEvent } from '@utils/migratorDef'
import { forEach } from 'lodash'

function validateEvent(event: any): void {
  if (typeof event != 'object' || !event.action || !event.payload) {
    throw new Error('Should be an object with action and payload keys')
  }
}

export default async function(event: MigratorEvent): Promise<any> {
  validateEvent(event)

  if (process.env.NODE_ENV == 'development' && process.env.PWD) {
    const path = require('path')
    const envConfig = require('dotenv').parse(
      require('fs').readFileSync(path.join(process.env.PWD, 'deployment', 'migrator', '.env.development'))
    )
    forEach(envConfig, (value, key) => (process.env[key] = value))
  }

  const migrator = new Migrator()
  try {
    await migrator.boot()
    return await migrator.call(event)
  } catch (e) {
    throw e
  } finally {
    await migrator.shutdown()
  }
}

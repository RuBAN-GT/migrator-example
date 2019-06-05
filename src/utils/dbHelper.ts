import { values } from 'lodash'
import { MigrationInterface } from 'typeorm'

export type MigrationConstructor = new () => MigrationInterface

export function getDbMigrations(): MigrationConstructor[] {
  const context = require.context('../migrations', true, /\.(ts)$/)
  return context.keys().reduce((total, key) => {
    const migration: object = context(key)
    return [...total, ...values(migration)]
  }, [])
}

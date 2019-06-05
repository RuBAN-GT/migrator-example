export * from './basicAction'
import { DbMigrationAction } from './dbMigrationAction'

export const AvailableActions = {
  dbMigrate: DbMigrationAction
}

import { AvailableActions } from '@actions'
import { ObjectLiteral } from 'typeorm'

export type MigratorEvent = {
  action: keyof typeof AvailableActions | string
  payload?: ObjectLiteral | null
}

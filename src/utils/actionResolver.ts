import { AvailableActions, BasicAction } from '@actions'
import { MigratorEvent } from './migratorDef'

export async function actionResolver(event: MigratorEvent): Promise<any> {
  const actionClass = AvailableActions[event.action]
  const actionInstance: BasicAction = new actionClass(event.payload || {})
  return actionLifecycle(actionInstance)
}

async function actionLifecycle(action: BasicAction): Promise<any> {
  await action.init()
  const result = await action.call()
  await action.finalize()

  return result
}

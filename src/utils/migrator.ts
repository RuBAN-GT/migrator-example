import { actionResolver, MigratorEvent } from '@utils'

export class Migrator {
  public static booted: boolean = false

  public static async boot(): Promise<void> {
    Migrator.finalizeBooting()
  }

  public static async call(event: MigratorEvent): Promise<any> {
    return actionResolver(event)
  }

  public static async shutdown(): Promise<void> {
    Migrator.finalizeShutdown()
  }

  private static finalizeBooting(): void {
    Migrator.booted = true
  }

  private static finalizeShutdown(): void {
    Migrator.booted = false
  }
}

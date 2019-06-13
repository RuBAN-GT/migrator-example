import { actionResolver, MigratorEvent } from '@utils'

export class Migrator {
  private booted: boolean = false

  public isBooted(): boolean {
    return this.booted
  }

  public async boot(): Promise<void> {
    this.finalizeBooting()
  }

  public async call(event: MigratorEvent): Promise<any> {
    return actionResolver(event)
  }

  public async shutdown(): Promise<void> {
    this.finalizeShutdown()
  }

  protected finalizeBooting(): void {
    this.booted = true
  }

  protected finalizeShutdown(): void {
    this.booted = false
  }
}

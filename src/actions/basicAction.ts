export type DefaultActionContext = { [key: string]: any }

export abstract class BasicAction<T extends DefaultActionContext = {}> {
  constructor(protected context: T) {}

  public abstract init(): Promise<void>

  public abstract finalize(): Promise<void>

  public async call(): Promise<any> {
    return await this.exec()
  }

  protected abstract exec(): Promise<any>
}

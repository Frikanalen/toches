import { RowStructure } from "../types/RowStructure"
import { Knex } from "knex"
import { parseRowStructure } from "../helpers/parseRowStructure"

export type ModelData<D extends object> = {
  tableName: string
  columns: ReadonlyArray<keyof D>
  structure: RowStructure
}

export class Model<D extends object> {
  constructor(private data: ModelData<D>) {}

  public async parseFromQuery(query: Knex.QueryBuilder): Promise<any> {
    const data = await query
    if (!data) return

    if (Array.isArray(data)) {
      return data.map((x) => parseRowStructure(x, this.structure))
    }

    return parseRowStructure(data, this.structure)
  }

  public get tableName() {
    return this.data.tableName
  }

  public get columns() {
    return this.data.columns
  }

  public get structure() {
    return this.data.structure
  }
}

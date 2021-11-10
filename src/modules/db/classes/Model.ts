import { RowStructure } from "../types/RowStructure"
import { Knex } from "knex"
import { parseRowStructure } from "../helpers/parseRowStructure"

export type ModelData = {
  tableName: string
  structure: RowStructure
  columns: ReadonlyArray<string>
}

export class Model<D extends object> {
  constructor(private data: ModelData) {}

  public async parseFromQuery(query: Knex.QueryBuilder) {
    const data = await query
    if (!data) return []

    if (Array.isArray(data)) {
      return data.map((x) => parseRowStructure(x, this.structure) as D)
    }

    return [parseRowStructure(data, this.structure) as D]
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

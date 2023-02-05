import { InputMaybe, VideoSort } from "../../../generated/graphql"

export type OrderBy = {
  column: string
  order?: "desc" | "asc"
  nulls?: "first" | "last"
}

export const getOrderBy = (
  sorts?: InputMaybe<VideoSort[]>,
  tablePrefix = "",
): OrderBy[] =>
  sorts?.map((sort): OrderBy => {
    switch (sort) {
      case VideoSort.DateAsc:
        return {
          column: `${tablePrefix}created_at`,
          order: "asc",
        }
      case VideoSort.DateDesc:
        return {
          column: `${tablePrefix}created_at`,
          order: "desc",
        }
    }
  }) || []

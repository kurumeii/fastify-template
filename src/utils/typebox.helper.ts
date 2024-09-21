import { Type, type UnsafeOptions } from "@sinclair/typebox"

export const StringEnum = <T extends string[]>(
  values: [...T],
  options?: UnsafeOptions,
) =>
  Type.Unsafe<T[number]>({
    type: "string",
    enum: values,
    ...options,
  })

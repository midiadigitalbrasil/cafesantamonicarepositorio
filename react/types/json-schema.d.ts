declare module 'json-schema' {
  const traverse: (
    schema: ComponentSchema,
    opts: (
      schema: JSONSchema6 & { widget: Widget },
      JSONPointer: string
    ) => void
  ) => void

  export default traverse
}

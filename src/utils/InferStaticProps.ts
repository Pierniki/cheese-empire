export type InferNextProps<T extends (args: any) => any> = Extract<Awaited<ReturnType<T>>, { props: any }>['props'];

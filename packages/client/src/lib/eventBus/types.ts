// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventHandler<T = any> = (...args: T[]) => void
export type EventMap = Record<string, EventHandler>
export type EventRegistry<E> = Record<keyof E, E[keyof E][]>

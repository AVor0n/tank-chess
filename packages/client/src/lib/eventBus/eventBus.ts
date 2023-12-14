import type { EventRegistry, EventMap } from './types'

/**
 * Шина событий
 * При создании требуется описать типы возможных событий
 * @example
 * ```ts
 * const commonEventsChanel = new EventBus<{
 *  event_1: (args: string) => void,
 *  event_2: (args: {name: string, age: number}) => void,
 * }>()
 * ```
 */
export class EventBus<Events extends EventMap = Record<string, never>> {
  private listeners: Partial<EventRegistry<Events>> = {}

  /**
   * Подписаться на событие
   * @param event название события
   * @param handler обработчик события
   * @returns функция отписки от события
   */
  public on<Key extends keyof Events>(event: Key, handler: Events[Key]) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event]?.push(handler)

    return () => {
      this.off(event, handler)
    }
  }

  /**
   * Отписаться от события
   * @param event название события
   * @param disabledHandler удаляемый обработчик
   */
  public off<Key extends keyof Events>(event: Key, disabledHandler: Events[Key]) {
    this.listeners[event] = this.listeners[event]?.filter(handler => handler !== disabledHandler)
  }

  /**
   * Одноразовая подписка на событие
   * @param event название события
   * @param handler обработчик события
   */
  public once<Key extends keyof Events>(event: Key, handler: Events[Key]) {
    const handleOnce = (payload: Parameters<typeof handler>) => {
      handler(payload)
      this.off(event, handleOnce as typeof handler)
    }

    this.on(event, handleOnce as typeof handler)
  }

  /**
   * Вызвать всех обработчиков определенного события
   * @param key название события
   * @param args параметры для передачи в обработчики события
   */
  public emit<Key extends keyof Events>(key: Key, ...args: Parameters<Events[Key]>) {
    this.listeners[key]?.forEach(fn => fn(...args))
  }
}

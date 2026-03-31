import { createProxyWithReset } from 'src/utils/valtio'

export class CounterState {
  count = 0

  decrement() {
    this.count--
  }

  increment() {
    this.count++
  }
}

export const externalCounterStore = createProxyWithReset(new CounterState())
export const externalCounterState = externalCounterStore.proxyState

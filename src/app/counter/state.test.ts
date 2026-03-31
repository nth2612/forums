import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { externalCounterStore } from './state'

describe('externalCounterStore', () => {
  beforeEach(() => {
    // Reset store before each test
    externalCounterStore.reset()
  })

  it('should initialize with count 0', () => {
    expect(externalCounterStore.proxyState.count).toBe(0)
  })

  it('should increment count', () => {
    externalCounterStore.proxyState.increment()
    expect(externalCounterStore.proxyState.count).toBe(1)
  })

  it('should decrement count', () => {
    externalCounterStore.proxyState.decrement()
    expect(externalCounterStore.proxyState.count).toBe(-1)
  })

  it('should reset count to initial state', () => {
    externalCounterStore.proxyState.increment()
    externalCounterStore.proxyState.increment()
    expect(externalCounterStore.proxyState.count).toBe(2)

    externalCounterStore.reset()
    expect(externalCounterStore.proxyState.count).toBe(0)
  })

  it('useResetHook should reset on unmount', () => {
    // Mutate state
    externalCounterStore.proxyState.increment()
    expect(externalCounterStore.proxyState.count).toBe(1)

    // Render hook and unmount
    const { unmount } = renderHook(() => externalCounterStore.useResetHook())
    unmount()

    // State should be reset
    expect(externalCounterStore.proxyState.count).toBe(0)
  })

  it('useStateSnapshot should return reactive snapshot', () => {
    const { result } = renderHook(() => externalCounterStore.useStateSnapshot())

    expect(result.current.count).toBe(0)
  })
})

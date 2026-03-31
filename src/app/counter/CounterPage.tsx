'use client'
import { useRouter } from 'next/navigation'
import { AppButton } from 'src/components/ui/button/AppButton'
import { useExampleTodoMutation } from 'src/services/api/mutations/useExampleTodo.mutation'
import { useExampleTodosQuery } from 'src/services/api/queries/useExampleTodo.query'
import { counterStore } from 'src/stores/counter.store'
import { useSnapshot } from 'valtio'

import { externalCounterStore } from './state'

/**
 * Read more at the docs/Valtio.md file for more information on when to use Valtio for each usecase
 *
 * This page demonstrates two Valtio patterns:
 * 1. External Store with Reset - Page-scoped state that resets on unmount
 * 2. Global Store - App-wide state that persists across navigation
 */
export function CounterPage() {
  // Reset external store on unmount
  externalCounterStore.useResetHook()

  const router = useRouter()

  return (
    <div>
      <ExternalCounter />
      <ExternalCounterController />
      <GlobalCounter />
      <GlobalCounterController />
      <AppButton className="mt-3" onClick={() => router.push('/')}>
        Navigate to homepage
      </AppButton>
      <ExampleTodo />
    </div>
  )
}

function ExampleTodo() {
  const { data: todos } = useExampleTodosQuery()

  const { data: updatedTodo, mutate: updateTodo } = useExampleTodoMutation()
  return (
    <div className="mt-10">
      TODO example with tanstack query
      <pre>{JSON.stringify(todos, null, 2)}</pre>
      <AppButton
        onClick={() =>
          updateTodo({ completed: true, id: 1, title: `New title ${new Date().toISOString()}` })
        }
      >
        Run update todo mutation
      </AppButton>
      <pre>{JSON.stringify(updatedTodo, null, 2)}</pre>
    </div>
  )
}

function ExternalCounter() {
  const snapshot = externalCounterStore.useStateSnapshot()
  return (
    <div>
      <h2 className="text-lg font-semibold">External Counter (Resets on Navigation)</h2>
      <p className="text-sm text-gray-600">
        This counter uses an external store with reset functionality
      </p>
      <p className="text-xl font-bold mt-2">Count: {snapshot.count}</p>
    </div>
  )
}

function ExternalCounterController() {
  const state = externalCounterStore.proxyState
  return (
    <div className="mt-3 mb-8 flex gap-4">
      <AppButton onClick={() => state.increment()}>Increment External</AppButton>
      <AppButton onClick={() => state.decrement()}>Decrement External</AppButton>
      <AppButton onClick={() => externalCounterStore.reset()} variant="outline">
        Reset External
      </AppButton>
    </div>
  )
}

function GlobalCounter() {
  const state = useSnapshot(counterStore)
  return (
    <div className="mt-5">
      <h2 className="text-lg font-semibold">Global Counter (Persists Across Navigation)</h2>
      <p className="text-sm text-gray-600">This counter uses a simple global proxy store</p>
      <p className="text-xl font-bold mt-2">Count: {state.count}</p>
    </div>
  )
}

function GlobalCounterController() {
  return (
    <div className="mt-3 mb-3 flex gap-4">
      <AppButton onClick={() => counterStore.increment()}>Increment Global</AppButton>
      <AppButton onClick={() => counterStore.decrement()}>Decrement Global</AppButton>
    </div>
  )
}

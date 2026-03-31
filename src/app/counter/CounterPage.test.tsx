import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CounterPage } from './CounterPage'
import { externalCounterStore } from './state'

// Mock the useRouter hook
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

// Mock the useRerenderCount hook
vi.mock('src/hooks/useRerenderCount', () => ({
  useRerenderCount: vi.fn(),
}))

// Mock tanstack query hooks
vi.mock('src/services/api/queries/useExampleTodo.query', () => ({
  useExampleTodosQuery: () => ({ data: [] }),
}))

vi.mock('src/services/api/mutations/useExampleTodo.mutation', () => ({
  useExampleTodoMutation: () => ({ data: null, mutate: vi.fn() }),
}))

describe('CounterPage', () => {
  beforeEach(() => {
    // Reset external store before each test
    externalCounterStore.reset()
  })

  it('should render both external and global counter sections', () => {
    render(<CounterPage />)

    expect(screen.getByText('External Counter (Resets on Navigation)')).toBeInTheDocument()
    expect(screen.getByText('Global Counter (Persists Across Navigation)')).toBeInTheDocument()
    expect(screen.getByText('Navigate to homepage')).toBeInTheDocument()
    expect(screen.getByText(/TODO example/i)).toBeInTheDocument()
  })

  it('should display external counter with initial count of 0', () => {
    render(<CounterPage />)
    expect(screen.getAllByText(/Count: 0/)[0]).toBeInTheDocument()
  })

  it('should display global counter with current count', () => {
    render(<CounterPage />)
    expect(screen.getAllByText(/Count: 0/)).toHaveLength(2) // Both counters start at 0
  })
})

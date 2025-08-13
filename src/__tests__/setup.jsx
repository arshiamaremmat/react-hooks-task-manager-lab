import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import fetch from 'node-fetch';

global.fetch = fetch

global.baseTasks = [
  { id: 1, name: "Buy groceries", completed: false },
  { id: 2, name: "Finish React project", completed: false }
]

  
global.setFetchResponse = (val) => {
    global.fetch = vi.fn(() => Promise.resolve({
        json: () => Promise.resolve(val),
        ok: true,
        status: 200
    }))
}

afterEach(() => {
    cleanup();
})
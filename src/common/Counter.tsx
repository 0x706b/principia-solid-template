import { createEffect, createSignal } from 'solid-js'

export const Counter = () => {
  const [count, setCount]       = createSignal(0)
  const [isRunning, setRunning] = createSignal(false)
  let handle: number
  createEffect(() => {
    if (isRunning()) {
      handle = window.setInterval(() => {
        setCount((c) => c + 1)
      }, 100)
    } else {
      clearInterval(handle)
    }
  })

  return (
    <div>
      <p>{count()}</p>
      <button onClick={() => setRunning((b) => !b)}>
        {isRunning() ? 'Stop' : 'Start'}
      </button>
    </div>
  )
}

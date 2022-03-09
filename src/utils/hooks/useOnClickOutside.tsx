import { RefObject, useEffect } from 'react'

const events = [`mousedown`, `touchstart`]

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  onClickOutside: (event: Event) => void,
  cleanup = true
) => {
  const isOutside = (element: Node | null) =>
    !ref.current || !ref.current.contains(element)

  const onClick = (event: Event) => {
    if (isOutside(event.target as Node)) {
      onClickOutside(event)
      if (cleanup) {
        for (const eventName of events)
          document.removeEventListener(eventName, onClick)
      }
    }
  }

  useEffect(() => {
    for (const eventName of events) {
      document.addEventListener(eventName, onClick)
    }

    return () => {
      for (const eventName of events)
        document.removeEventListener(eventName, onClick)
    }
  }, [ref, onClickOutside])
}
export default useOnClickOutside

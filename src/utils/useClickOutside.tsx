import React, { useEffect } from 'react'

const useClickOutside = (
  ref: React.MutableRefObject<any>,
  handler: () => void,
) => {
  useEffect(() => {
    let startedInside = false
    let startedWhenMounted = false

    const listener = (event: MouseEvent) => {
      // 如果 `mousedown` 或 `touchstart` 在 ref 內，則不執行任何操作
      if (startedInside || !startedWhenMounted) return
      // 如果點擊 ref 的元素或後代元素，什麼都不做
      if (!ref.current || ref.current.contains(event.target)) return

      handler()
    }

    const validateEventStart = (event: MouseEvent | TouchEvent) => {
      startedWhenMounted = ref.current
      startedInside = ref.current && ref.current.contains(event.target)
    }

    document.addEventListener('mousedown', validateEventStart)
    document.addEventListener('touchstart', validateEventStart)
    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', validateEventStart)
      document.removeEventListener('touchstart', validateEventStart)
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, handler])
}

export default useClickOutside

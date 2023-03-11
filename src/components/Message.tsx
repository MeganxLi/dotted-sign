import { useEffect, useRef, useState } from 'react'

import { useAtom } from 'jotai'
import { createPortal } from 'react-dom'
import { X } from 'react-feather'
import { useLocation } from 'react-router-dom'

import { MessageDefault, MessageIcon } from '../constants/MessageSetting'
import { messageAtom } from '../jotai'

const Message = () => {
  // route
  const location = useLocation()
  const { pathname } = location

  const [messageObj, setMessageObj] = useAtom(messageAtom)

  const [messages, setMessages] = useState<MessageType>(MessageDefault)
  const messageEl = document.getElementById('Message')

  const handleTimer = useRef<NodeJS.Timeout | null>(null)

  const messagesOff = () => {
    setMessages((prev) => ({ ...prev, ...{ open: false } }))

    if (messageEl?.className === '') return
    messageEl?.setAttribute('class', 'slide-bottom opacity-100')
    setTimeout(() => messageEl?.removeAttribute('class'), 1000)
  }

  useEffect(() => {
    if (handleTimer.current) {
      clearInterval(handleTimer.current)
    }

    if (messageObj) {
      setMessages(messageObj)
      if (messageObj.open) {
        messageEl?.setAttribute('class', 'slide-top')
        handleTimer.current = setTimeout(() => {
          messagesOff()
        }, 3000)
      }
    } else {
      messagesOff()
    }
  }, [messageObj])

  useEffect(() => {
    // 變化 page 關閉 message
    messagesOff()
  }, [pathname])

  const messageContent: JSX.Element = (
    <div className="message-notice">
      <span>{MessageIcon[messages.icon].icon}</span>
      <span className="flex-auto">{messages.content}</span>
      <span
        className="flex cursor-pointer items-center before:mr-3 before:block before:h-7 before:w-px before:bg-white/30"
        onClick={() => setMessageObj(null)}
      >
        <X size={20} />
      </span>
    </div>
  )

  return messageEl ? createPortal(messageContent, messageEl) : null
}

export default Message

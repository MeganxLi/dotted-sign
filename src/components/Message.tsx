import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "react-feather";
import { MessageDefault, MessageIcon } from "../constants/MessageSetting";
import { messageAtom } from "../jotai";

const Message = () => {
  const [messageObj, setMessageObj] = useAtom(messageAtom);

  const [messages, setMessages] = useState<MessageType>(MessageDefault);
  const messageEl = document.getElementById("Message");

  useEffect(() => {
    const messagesOff = () => setMessages((prev) => ({ ...prev, ... { open: false } }));
    const handleTimer = setTimeout(() => {
      messagesOff();
    }, 5000);

    if (messageObj) {
      setMessages(messageObj);
      if (messageObj.open) {
        clearInterval(handleTimer);
        handleTimer;
      }
    } else {
      messagesOff();
    }

  }, [messageObj]);

  const messageContent: JSX.Element = (
    <div className={`min-w-[380px] py-4 px-6 bg-depp-blue text-white flex rounded items-center gap-2 ${messages.open ?
      "slide-top" : "slide-bottom opacity-100"}`}>
      <span>{MessageIcon[messages.icon].icon}</span>
      <span className="flex-auto">{messages.content}</span>
      <span
        className="before:w-px before:h-7 before:bg-white/30 before:mr-3 before:block flex items-center cursor-pointer"
        onClick={() => setMessageObj(null)}
      >
        <X size={20} />
      </span>
    </div>
  );

  return messageEl ? createPortal(messageContent, messageEl) : null;
};

export default Message;

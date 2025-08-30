import React from "react";
import { BiMessageRoundedDetail } from "react-icons/bi"; // chat bubble icon
import chat from "../assets/chat.png";

const ChatWidget = () => {
  return (
    <div
      className="fixed bottom-20 right-5 bg-gradient-to-b from-yellow-300 to-yellow-600 
                 rounded-full p-1 shadow-lg cursor-pointer flex items-center justify-center  animate-bounce mt-2"
    >
      <img src={chat} className="w-12 h-12 " />
    </div>
  );
};

export default ChatWidget;

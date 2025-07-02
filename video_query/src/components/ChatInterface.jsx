import { useState } from "react"
import Conversation from "./Conversation"

const ChatInterface = () => {
  const [allTexts, setAllTexts] = useState([[1, "What can I help with?"]])
  const [chatBotTexts, setChatBotTexts] = useState(["What can I help with?"])
  const [userTexts, setUserTexts] = useState([])
  const [text, setText] = useState("")
  const [isUser, setIsUser] = useState(false)

  return (
    <div className="font-inter w-[360px] h-[500px] box-border border border-white overflow-hidden flex flex-col bg-white dark:bg-neutral-800 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      <div className="text-center text-2xl font-medium dark:text-white text-black p-3">
        
      </div>

      <div className="flex-grow overflow-y-auto px-3">
        <Conversation chatBotTexts={chatBotTexts} userTexts={userTexts} allTexts={allTexts}/>
      </div>

      <div>
        <button onClick={() => {setIsUser(!isUser)}}>Toggle: {isUser ? <label>User</label> : <label>Chatbot</label>}</button>
        
        {console.log(chatBotTexts)}
      </div>

      <div className="p-3 border-t border-neutral-300 dark:border-neutral-700">
        <form onSubmit={(e) => {
             e.preventDefault();
             if(isUser && (text !== "")){
              setUserTexts([...userTexts, text]);
              setAllTexts([...allTexts, [2, text]]);
             }
             else{
              setChatBotTexts([...chatBotTexts, text]);
              setAllTexts([...allTexts, [1, text]]);
             }
             
             
             setText("");
          }}>
            <input
              type="text"
              placeholder="Ask away!"
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full p-2 rounded-lg dark:bg-neutral-700 bg-neutral-100 text-black dark:text-white border border-neutral-600 focus:outline-none"
            />

        </form>
        
      </div>
    </div>
  )
}

export default ChatInterface

import { useEffect, useState, useRef } from "react"
import Conversation from "./Conversation"

const ChatInterface = () => {
  const [allTexts, setAllTexts] = useState([[1, "What can I help with?"]])
  const [text, setText] = useState("")
  const [currentUrl, setCurrentUrl] = useState("https://www.youtube.com/watch?v=9hE5-98ZeCg");
  const chatRef = useRef(null);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "tab-info") {
        console.log("Got tab URL from content.js:", event.data.url);
        setCurrentUrl(event.data.url); 
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [allTexts]); 

  return (
    <div className="font-inter w-[360px] h-[500px] box-border border border-white overflow-hidden flex flex-col bg-white dark:bg-neutral-800 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      <div className="text-center text-2xl font-medium dark:text-white text-black p-3">
        
      </div>
      
      <div className="flex-grow overflow-y-auto px-3">
        <Conversation chatRef={chatRef} allTexts={allTexts}/>
      </div>

      <div></div>

      <div className="p-3 border-t border-neutral-300 dark:border-neutral-700">
        <form onSubmit={(e) => {
             e.preventDefault();
              const userMessage = [2, text];

              setAllTexts(prev => [...prev, userMessage]);
              setAllTexts(prev => [...prev, [1, 

                <div role="status flex flex-row px-2">
                    <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    
                    <div>
                      Thinking...
                    </div>
                    
                </div>

              ]]);

              fetch("https://video-query-reew.onrender.com/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                  prompt: text,
                  file_uri: currentUrl
                })
              })
              .then(res => res.json())
              .then(data => {
                console.log(currentUrl)
                const botMessage = [1, data.response];
                setAllTexts(prev => [
                  ...prev.slice(0, -1), 
                  botMessage
                ]);

              });
              
             
             
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

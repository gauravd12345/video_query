import { useEffect,useState } from "react"
import Conversation from "./Conversation"

const ChatInterface = () => {
  const [allTexts, setAllTexts] = useState([[1, "What can I help with?"]])
  const [text, setText] = useState("")
  const [currentUrl, setCurrentUrl] = useState("https://www.youtube.com/watch?v=9hE5-98ZeCg");

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "tab-info") {
        console.log("📺 Got tab URL from content.js:", event.data.url);
        setCurrentUrl(event.data.url); 
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);


  return (
    <div className="font-inter w-[360px] h-[500px] box-border border border-white overflow-hidden flex flex-col bg-white dark:bg-neutral-800 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      <div className="text-center text-2xl font-medium dark:text-white text-black p-3">
        
      </div>
      
      <div className="flex-grow overflow-y-auto px-3">
        <Conversation allTexts={allTexts}/>
      </div>

      <div>
        
      </div>

      <div className="p-3 border-t border-neutral-300 dark:border-neutral-700">
        <form onSubmit={(e) => {
             e.preventDefault();
              const userMessage = [2, text];

              setAllTexts(prev => [...prev, userMessage]);

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
                setAllTexts(prev => [...prev, botMessage]);

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

import { useState } from "react"

const ChatInterface = () => {
  const [text, setText] = useState("")

  return (
    <div className="bg-white dark:bg-neutral-800 px-4 py-2 m-0">
    <div className="font-inter text-lg bg-white dark:bg-neutral-800">
        <div class="text-center text-2xl font-medium dark:text-white text-black p-4">
            Welcome to Video Query!
        </div>

        <div>
            <input type="text" placeholder="Ask away!" value={text} onChange={e => {setText(e.target.value)}}
            className="my-40 mx-14 max-w-3/4 dark:bg-neutral-700 p-1 px-3 w-full rounded text-white border border-neutral-600"
            />
        </div>

        
    </div>
  </div>
  )
}

export default ChatInterface

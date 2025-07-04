const Conversation = ({allTexts, chatRef}) => {
  return (
    <div ref={chatRef} className="flex flex-col items-end space-y-4 pb-24 ">
      {allTexts.map((text, idx) => (
        text[0] === 1 ? (
          <div key={idx} className="text-left self-start bg-neutral-100 dark:bg-neutral-200 text-white dark:text-black px-4 py-2 max-w-[75%] rounded-2xl break-words">
            {text[1]}
          </div>
        ) : (
          <div key={idx} className="text-left self-end bg-neutral-300 dark:bg-neutral-700 text-black dark:text-white px-4 py-2 max-w-[75%] rounded-2xl break-words">
            {text[1]}
          </div>
        )
      ))}

      
    </div>
  )
}

export default Conversation

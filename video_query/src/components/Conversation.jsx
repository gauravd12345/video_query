const Conversation = ({userTexts}) => {
  return (
    <div className="flex flex-col items-end space-y-4">
      <div className="text-left self-start bg-neutral-100 dark:bg-neutral-200 text-white dark:text-black px-4 py-2 max-w-[75%] rounded-2xl break-words">
        What can I help with?
      </div>
      {userTexts.map(({text}) => (
        <div className="text-left self-end bg-neutral-300 dark:bg-neutral-700 text-black dark:text-white px-4 py-2 max-w-[75%] rounded-2xl break-words">
          {text}
        </div>
      ))}
      
    </div>
  )
}

export default Conversation

import { useEffect } from 'react'
import './App.css'
import ChatInterface from './components/ChatInterface'

function App() {
  useEffect(() => {
    const sendSize = () => {
      window.parent.postMessage(
        {
          type: 'resize-iframe',
          height: document.body.scrollHeight,
          width: document.body.scrollWidth,
        },
        '*'
      )
    }

    sendSize()

    const observer = new MutationObserver(sendSize)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <ChatInterface />
    </div>
  )
}

export default App

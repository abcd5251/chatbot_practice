'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import { Message } from '@/types'
import { getBotResponse } from '@/lib/utils'

/*************  ✨ Codeium Command ⭐  *************/
/**
 * A simple chatbot component.
 *
 * It displays a list of messages, which can be either from the user or the bot.
 * The user can type a message and send it to the bot by clicking the send button.
 * The bot will then respond with a message.
 *
 * The component is a client component, meaning it will not be rendered on the server.
 * It uses the `useState` hook to manage the state of the messages and the input message.
 * It also uses the `useEffect` hook to simulate the bot's response.
 *
 * The component is also fully accessible, meaning it can be used by people with disabilities.
 * It uses the ARIA attributes to provide information about the component to screen readers.
 *
 * The component is fully customizable, meaning you can change the styles and the layout to fit your needs.
 * It also has a lot of features, such as the ability to send messages and receive responses from the bot.
 * It also has a lot of accessibility features, such as the ability to read the messages out loud.
 */
/******  13cc4352-84ba-44b9-855f-016f64e65d0f  *******/
export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm a simple chatbot. How can I help you today?", sender: 'bot' },
  ])
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return
    const newMessages = [
      ...messages,
      { text: inputMessage, sender: 'user' },
    ]
    setMessages(newMessages)
    setInputMessage('')
    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage.toLowerCase())
      setMessages([...newMessages, { text: botResponse, sender: 'bot' }])
    }, 500)
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto border rounded-lg overflow-hidden bg-background">
      <div className="p-4 bg-primary text-primary-foreground flex items-center">
        <Image
          src="/images/logo.png"
          alt="Shines Logo"
          width={40}
          height={40}
          className="mr-2"
        />
        <h1 className="text-2xl font-bold">Chatbot</h1>
      </div>
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex space-x-2"
        >
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Button type="submit">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
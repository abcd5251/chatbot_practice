'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { SendIcon } from './ui/SendIcon'
import Image from 'next/image'
import { Message } from '../types'
import { getBotResponse } from '../lib/utils'

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
            className="text-black"
          />
          <Button type="submit">
            <SendIcon />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
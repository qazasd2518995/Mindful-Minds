import React, { useState, useEffect, useRef } from 'react'
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'

const Chat = ({ user }) => {
  const { t, language } = useTranslation()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Load chat history from localStorage
    const savedMessages = localStorage.getItem(`chat-history-${user?.username}`)
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    } else {
      // Welcome message
      setMessages([{
        role: 'assistant',
        content: t('chat.welcomeMessage', { name: user?.username }),
        timestamp: new Date().toISOString()
      }])
    }
  }, [user, language])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    // Save chat history
    if (messages.length > 0) {
      localStorage.setItem(`chat-history-${user?.username}`, JSON.stringify(messages))
    }
  }, [messages, user])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      const assistantMessage = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = {
        role: 'assistant',
        content: t('chat.errorMessage'),
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickPrompts = t('chat.prompts')

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col">
      {/* Header */}
      <div className="glass-card p-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-mindful-purple to-mindful-blue rounded-xl flex items-center justify-center">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t('chat.title')}</h1>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              {t('chat.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 glass-card p-6 mb-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-mindful-green to-mindful-blue'
                  : 'bg-gradient-to-br from-mindful-purple to-mindful-pink'
              }`}>
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>
              <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'items-end' : ''}`}>
                <div className={`p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-mindful-blue to-mindful-purple text-white'
                    : 'bg-white/60'
                }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                <p className="text-xs text-gray-400 mt-1 px-2">
                  {new Date(message.timestamp).toLocaleTimeString(language === 'zh-TW' ? 'zh-TW' : 'en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mindful-purple to-mindful-pink flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white/60 p-4 rounded-2xl">
                <Loader2 className="w-5 h-5 animate-spin text-mindful-purple" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div className="glass-card p-4 mb-4">
          <p className="text-sm text-gray-600 mb-2">{t('chat.quickPrompts')}</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setInput(prompt)}
                className="px-4 py-2 bg-white/60 hover:bg-white rounded-xl text-sm transition-all hover:shadow-md"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="glass-card p-4">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('chat.placeholder')}
            className="flex-1 input-field resize-none"
            rows="1"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat

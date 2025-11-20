import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Groq from 'groq-sdk'
import { getUserData, getUserDataByType, saveMoodEntry, saveJournalEntry, saveMeditationLog, saveUser, deleteEntry } from '../server/db.js'

const app = express()

// Groq API setup
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'your-groq-api-key-here'
})

// Middleware
app.use(cors())
app.use(express.json())

// System prompt for mental health assistant
const SYSTEM_PROMPT = `你是一位專業、溫暖且富有同理心的心理健康助手。你的主要職責是：

1. 提供情緒支持和傾聽用戶的感受
2. 給予實用的心理健康建議和應對策略
3. 鼓勵用戶採取積極的自我照顧行為
4. 在必要時建議尋求專業協助

重要原則：
- 始終保持同理心和非評判性態度
- 使用溫暖、支持性的語言
- 提供具體、可行的建議
- 認識到自己的局限性，不做診斷
- 對於嚴重的心理健康問題，建議尋求專業協助
- 用繁體中文回應
- 回應要簡潔但有溫度，通常在 2-4 段之間
- 適時使用同理心的表達，如"我理解你的感受"、"這聽起來確實很困難"

你不是真正的心理治療師，但你可以提供支持性的對話和一般性的心理健康資訊。`

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' })
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.9,
    })

    const assistantMessage = chatCompletion.choices[0]?.message?.content || '抱歉，我現在無法回應。'

    res.json({ message: assistantMessage })
  } catch (error) {
    console.error('Error calling Groq API:', error)
    res.status(500).json({
      error: 'Failed to get response from AI',
      message: '抱歉，AI 服務暫時無法使用。請稍後再試。'
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mindful Mind API is running' })
})

// User Data Endpoints
app.get('/api/user/:username', async (req, res) => {
  try {
    const { username } = req.params
    const data = await getUserData(username)
    res.json(data)
  } catch (error) {
    console.error('Error fetching user data:', error)
    res.status(500).json({ error: 'Failed to fetch user data' })
  }
})

app.post('/api/user', async (req, res) => {
  try {
    const { username } = req.body
    if (!username) {
      return res.status(400).json({ error: 'Username is required' })
    }
    const result = await saveUser(username)
    res.json(result)
  } catch (error) {
    console.error('Error saving user:', error)
    res.status(500).json({ error: 'Failed to save user' })
  }
})

// Mood Entries Endpoints
app.get('/api/mood/:username', async (req, res) => {
  try {
    const { username } = req.params
    const entries = await getUserDataByType(username, 'mood')
    res.json(entries)
  } catch (error) {
    console.error('Error fetching mood entries:', error)
    res.status(500).json({ error: 'Failed to fetch mood entries' })
  }
})

app.post('/api/mood', async (req, res) => {
  try {
    const { username, entry } = req.body
    if (!username || !entry) {
      return res.status(400).json({ error: 'Username and entry are required' })
    }
    const result = await saveMoodEntry(username, entry)
    res.json(result)
  } catch (error) {
    console.error('Error saving mood entry:', error)
    res.status(500).json({ error: 'Failed to save mood entry' })
  }
})

app.delete('/api/mood/:username/:id', async (req, res) => {
  try {
    const { username, id } = req.params
    const result = await deleteEntry(username, 'mood', id)
    res.json(result)
  } catch (error) {
    console.error('Error deleting mood entry:', error)
    res.status(500).json({ error: 'Failed to delete mood entry' })
  }
})

// Journal Entries Endpoints
app.get('/api/journal/:username', async (req, res) => {
  try {
    const { username } = req.params
    const entries = await getUserDataByType(username, 'journal')
    res.json(entries)
  } catch (error) {
    console.error('Error fetching journal entries:', error)
    res.status(500).json({ error: 'Failed to fetch journal entries' })
  }
})

app.post('/api/journal', async (req, res) => {
  try {
    const { username, entry } = req.body
    if (!username || !entry) {
      return res.status(400).json({ error: 'Username and entry are required' })
    }
    const result = await saveJournalEntry(username, entry)
    res.json(result)
  } catch (error) {
    console.error('Error saving journal entry:', error)
    res.status(500).json({ error: 'Failed to save journal entry' })
  }
})

app.delete('/api/journal/:username/:id', async (req, res) => {
  try {
    const { username, id } = req.params
    const result = await deleteEntry(username, 'journal', id)
    res.json(result)
  } catch (error) {
    console.error('Error deleting journal entry:', error)
    res.status(500).json({ error: 'Failed to delete journal entry' })
  }
})

// Meditation Log Endpoints
app.get('/api/meditation/:username', async (req, res) => {
  try {
    const { username } = req.params
    const logs = await getUserDataByType(username, 'meditation')
    res.json(logs)
  } catch (error) {
    console.error('Error fetching meditation logs:', error)
    res.status(500).json({ error: 'Failed to fetch meditation logs' })
  }
})

app.post('/api/meditation', async (req, res) => {
  try {
    const { username, log } = req.body
    if (!username || !log) {
      return res.status(400).json({ error: 'Username and log are required' })
    }
    const result = await saveMeditationLog(username, log)
    res.json(result)
  } catch (error) {
    console.error('Error saving meditation log:', error)
    res.status(500).json({ error: 'Failed to save meditation log' })
  }
})

// Export for Vercel Serverless Functions
export default app

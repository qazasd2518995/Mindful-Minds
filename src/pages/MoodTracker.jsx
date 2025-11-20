import React, { useState, useEffect } from 'react'
import { Smile, Meh, Frown, Heart, Calendar, Plus, Trash2 } from 'lucide-react'

const MoodTracker = ({ user }) => {
  const [entries, setEntries] = useState([])
  const [selectedMood, setSelectedMood] = useState(3)
  const [note, setNote] = useState('')
  const [tags, setTags] = useState([])

  const moodOptions = [
    { value: 5, emoji: '😄', label: '非常好', color: 'text-green-500' },
    { value: 4, emoji: '🙂', label: '還不錯', color: 'text-blue-500' },
    { value: 3, emoji: '😐', label: '普通', color: 'text-yellow-500' },
    { value: 2, emoji: '😔', label: '不太好', color: 'text-orange-500' },
    { value: 1, emoji: '😢', label: '很糟糕', color: 'text-red-500' }
  ]

  const availableTags = [
    '工作', '家庭', '朋友', '健康', '運動',
    '睡眠', '飲食', '焦慮', '壓力', '快樂'
  ]

  useEffect(() => {
    const saved = localStorage.getItem(`mood-entries-${user?.username}`)
    if (saved) {
      setEntries(JSON.parse(saved))
    }
  }, [user])

  const saveEntry = () => {
    if (selectedMood === null) return

    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: selectedMood,
      note: note.trim(),
      tags: tags
    }

    const updated = [newEntry, ...entries]
    setEntries(updated)
    localStorage.setItem(`mood-entries-${user?.username}`, JSON.stringify(updated))

    // Reset form
    setSelectedMood(3)
    setNote('')
    setTags([])
  }

  const deleteEntry = (id) => {
    const updated = entries.filter(e => e.id !== id)
    setEntries(updated)
    localStorage.setItem(`mood-entries-${user?.username}`, JSON.stringify(updated))
  }

  const toggleTag = (tag) => {
    setTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-8 h-8 text-mindful-pink" />
          <h1 className="text-3xl font-bold">情緒追蹤</h1>
        </div>
        <p className="text-gray-600">記錄你的心情，了解自己的情緒模式</p>
      </div>

      {/* New Entry Form */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">今天心情如何？</h2>

        {/* Mood Selection */}
        <div className="mb-6">
          <div className="grid grid-cols-5 gap-3">
            {moodOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setSelectedMood(option.value)}
                className={`p-4 rounded-xl transition-all ${
                  selectedMood === option.value
                    ? 'bg-gradient-to-br from-mindful-purple to-mindful-blue text-white shadow-lg scale-105'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              >
                <div className="text-4xl mb-2">{option.emoji}</div>
                <div className={`text-sm font-medium ${
                  selectedMood === option.value ? 'text-white' : option.color
                }`}>
                  {option.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">相關標籤（可選）</p>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  tags.includes(tag)
                    ? 'bg-mindful-purple text-white'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mb-4">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="寫下一些想法或發生的事情（可選）..."
            className="input-field resize-none"
            rows="3"
          />
        </div>

        <button onClick={saveEntry} className="btn-primary w-full">
          <Plus className="w-5 h-5 inline mr-2" />
          儲存記錄
        </button>
      </div>

      {/* History */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          歷史記錄
        </h2>

        {entries.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Meh className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>還沒有記錄，開始記錄你的第一個心情吧！</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map(entry => {
              const moodOption = moodOptions.find(m => m.value === entry.mood)
              return (
                <div key={entry.id} className="bg-white/50 rounded-xl p-4 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{moodOption?.emoji}</span>
                      <div>
                        <p className="font-semibold">{moodOption?.label}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(entry.date).toLocaleString('zh-TW', {
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {entry.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-mindful-purple/20 text-mindful-purple rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {entry.note && (
                    <p className="text-gray-700 text-sm mt-2">{entry.note}</p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default MoodTracker

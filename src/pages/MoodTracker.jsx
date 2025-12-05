import React, { useState, useEffect } from 'react'
import { Smile, Meh, Frown, Heart, Calendar, Plus, Trash2 } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'

const MoodTracker = ({ user }) => {
  const { t, language } = useTranslation()
  const [entries, setEntries] = useState([])
  const [selectedMood, setSelectedMood] = useState(3)
  const [note, setNote] = useState('')
  const [tags, setTags] = useState([])

  const moodOptions = [
    { value: 5, emoji: '😄', label: t('moodTracker.moods.veryGood'), color: 'text-green-500' },
    { value: 4, emoji: '🙂', label: t('moodTracker.moods.good'), color: 'text-blue-500' },
    { value: 3, emoji: '😐', label: t('moodTracker.moods.neutral'), color: 'text-yellow-500' },
    { value: 2, emoji: '😔', label: t('moodTracker.moods.notGood'), color: 'text-orange-500' },
    { value: 1, emoji: '😢', label: t('moodTracker.moods.bad'), color: 'text-red-500' }
  ]

  const availableTags = t('moodTracker.tags')

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
          <h1 className="text-3xl font-bold">{t('moodTracker.title')}</h1>
        </div>
        <p className="text-gray-600">{t('moodTracker.subtitle')}</p>
      </div>

      {/* New Entry Form */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">{t('moodTracker.howAreYou')}</h2>

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
          <p className="text-sm font-medium mb-2">{t('moodTracker.relatedTags')}</p>
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
            placeholder={t('moodTracker.notePlaceholder')}
            className="input-field resize-none"
            rows="3"
          />
        </div>

        <button onClick={saveEntry} className="btn-primary w-full">
          <Plus className="w-5 h-5 inline mr-2" />
          {t('moodTracker.saveRecord')}
        </button>
      </div>

      {/* History */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          {t('moodTracker.history')}
        </h2>

        {entries.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Meh className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>{t('moodTracker.noRecords')}</p>
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
                          {new Date(entry.date).toLocaleString(language === 'zh-TW' ? 'zh-TW' : 'en-US', {
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

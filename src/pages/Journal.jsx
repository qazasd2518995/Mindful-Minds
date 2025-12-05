import React, { useState, useEffect } from 'react'
import { BookOpen, Plus, Trash2, Edit3, Save, X } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'

const Journal = ({ user }) => {
  const { t, language } = useTranslation()
  const [entries, setEntries] = useState([])
  const [isWriting, setIsWriting] = useState(false)
  const [currentEntry, setCurrentEntry] = useState({ title: '', content: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem(`journal-entries-${user?.username}`)
    if (saved) {
      setEntries(JSON.parse(saved))
    }
  }, [user])

  const saveEntries = (newEntries) => {
    setEntries(newEntries)
    localStorage.setItem(`journal-entries-${user?.username}`, JSON.stringify(newEntries))
  }

  const handleSave = () => {
    if (!currentEntry.title.trim() && !currentEntry.content.trim()) return

    if (editingId) {
      const updated = entries.map(entry =>
        entry.id === editingId
          ? { ...entry, ...currentEntry, updatedAt: new Date().toISOString() }
          : entry
      )
      saveEntries(updated)
      setEditingId(null)
    } else {
      const newEntry = {
        id: Date.now(),
        ...currentEntry,
        date: new Date().toISOString()
      }
      saveEntries([newEntry, ...entries])
    }

    setCurrentEntry({ title: '', content: '' })
    setIsWriting(false)
  }

  const handleEdit = (entry) => {
    setCurrentEntry({ title: entry.title, content: entry.content })
    setEditingId(entry.id)
    setIsWriting(true)
  }

  const handleDelete = (id) => {
    if (confirm(t('journal.confirmDelete'))) {
      saveEntries(entries.filter(e => e.id !== id))
    }
  }

  const handleCancel = () => {
    setCurrentEntry({ title: '', content: '' })
    setIsWriting(false)
    setEditingId(null)
  }

  const prompts = t('journal.prompts')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-8 h-8 text-mindful-orange" />
              <h1 className="text-3xl font-bold">{t('journal.title')}</h1>
            </div>
            <p className="text-gray-600">{t('journal.subtitle')}</p>
          </div>
          {!isWriting && (
            <button onClick={() => setIsWriting(true)} className="btn-primary">
              <Plus className="w-5 h-5 inline mr-2" />
              {t('journal.writeJournal')}
            </button>
          )}
        </div>
      </div>

      {/* Writing Area */}
      {isWriting && (
        <div className="glass-card p-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder={t('journal.titlePlaceholder')}
              value={currentEntry.title}
              onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
              className="input-field text-xl font-semibold"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder={t('journal.contentPlaceholder')}
              value={currentEntry.content}
              onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
              className="input-field resize-none"
              rows="10"
              autoFocus
            />
          </div>

          {/* Writing Prompts */}
          {!currentEntry.content && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-2 text-gray-600">{t('journal.inspirationPrompts')}</p>
              <div className="flex flex-wrap gap-2">
                {prompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentEntry({ ...currentEntry, content: prompt + '\n\n' })}
                    className="px-3 py-1 bg-white/50 hover:bg-white rounded-lg text-sm text-gray-700 transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={handleSave} className="btn-primary flex-1">
              <Save className="w-5 h-5 inline mr-2" />
              {t('common.save')}
            </button>
            <button onClick={handleCancel} className="btn-secondary">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Entries List */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">{t('journal.pastJournals')}</h2>

        {entries.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>{t('journal.noJournals')}</p>
            <p className="text-sm mt-2">{t('journal.startWriting')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map(entry => (
              <div key={entry.id} className="bg-white/50 rounded-xl p-5 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    {entry.title && (
                      <h3 className="text-lg font-semibold mb-2">{entry.title}</h3>
                    )}
                    <p className="text-sm text-gray-500">
                      {new Date(entry.date).toLocaleDateString(language === 'zh-TW' ? 'zh-TW' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'long'
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="p-2 hover:bg-mindful-blue/20 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4 text-mindful-blue" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap line-clamp-3">
                  {entry.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Benefits */}
      <div className="glass-card p-6 bg-gradient-to-r from-mindful-orange/20 to-mindful-pink/20">
        <h3 className="font-semibold mb-3">{t('journal.benefits.title')}</h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
          {t('journal.benefits.items').map((benefit, index) => (
            <div key={index}>• {benefit}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Journal

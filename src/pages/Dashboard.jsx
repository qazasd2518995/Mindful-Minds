import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { TrendingUp, Calendar, Heart, BookOpen, Award, Smile } from 'lucide-react'

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalEntries: 0,
    streakDays: 0,
    moodAverage: 0,
    meditationMinutes: 0
  })
  const [moodData, setMoodData] = useState([])

  useEffect(() => {
    // Load user data
    const moodEntries = JSON.parse(localStorage.getItem(`mood-entries-${user?.username}`) || '[]')
    const journalEntries = JSON.parse(localStorage.getItem(`journal-entries-${user?.username}`) || '[]')
    const meditationLog = JSON.parse(localStorage.getItem(`meditation-log-${user?.username}`) || '[]')

    // Calculate stats
    const totalMinutes = meditationLog.reduce((sum, entry) => sum + (entry.duration || 0), 0)
    const avgMood = moodEntries.length > 0
      ? moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length
      : 0

    setStats({
      totalEntries: journalEntries.length,
      streakDays: calculateStreak(journalEntries),
      moodAverage: Math.round(avgMood * 10) / 10,
      meditationMinutes: totalMinutes
    })

    // Prepare mood chart data (last 7 days)
    const last7Days = getLast7Days()
    const chartData = last7Days.map(date => {
      const dayEntries = moodEntries.filter(entry =>
        new Date(entry.date).toDateString() === new Date(date).toDateString()
      )
      const avgMood = dayEntries.length > 0
        ? dayEntries.reduce((sum, e) => sum + e.mood, 0) / dayEntries.length
        : 0
      return {
        date: new Date(date).toLocaleDateString('zh-TW', { month: 'short', day: 'numeric' }),
        mood: Math.round(avgMood * 10) / 10
      }
    })
    setMoodData(chartData)
  }, [user])

  const calculateStreak = (entries) => {
    if (entries.length === 0) return 0
    const sortedEntries = entries.sort((a, b) => new Date(b.date) - new Date(a.date))
    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.date)
      entryDate.setHours(0, 0, 0, 0)
      const diffDays = Math.floor((currentDate - entryDate) / (1000 * 60 * 60 * 24))

      if (diffDays === streak) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else if (diffDays > streak) {
        break
      }
    }
    return streak
  }

  const getLast7Days = () => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      days.push(date)
    }
    return days
  }

  const statCards = [
    {
      icon: BookOpen,
      label: '日記條目',
      value: stats.totalEntries,
      color: 'from-mindful-purple to-mindful-pink'
    },
    {
      icon: Calendar,
      label: '連續天數',
      value: `${stats.streakDays} 天`,
      color: 'from-mindful-blue to-mindful-green'
    },
    {
      icon: Heart,
      label: '平均心情',
      value: `${stats.moodAverage}/5`,
      color: 'from-mindful-pink to-mindful-orange'
    },
    {
      icon: Award,
      label: '冥想時長',
      value: `${stats.meditationMinutes} 分鐘`,
      color: 'from-mindful-green to-mindful-blue'
    }
  ]

  const getMoodEmoji = (mood) => {
    if (mood >= 4.5) return '😄'
    if (mood >= 3.5) return '🙂'
    if (mood >= 2.5) return '😐'
    if (mood >= 1.5) return '😔'
    return '😢'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <h1 className="text-3xl font-bold mb-2">
          歡迎回來，{user?.username}！
        </h1>
        <p className="text-gray-600">這是你的心靈健康儀表板</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon
          return (
            <div key={index} className="glass-card p-6 hover:shadow-xl transition-all duration-300">
              <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-600 text-sm mb-1">{card.label}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          )
        })}
      </div>

      {/* Mood Chart */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6 text-mindful-purple" />
          <h2 className="text-xl font-bold">過去 7 天的心情趨勢</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={moodData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" stroke="#666" />
            <YAxis domain={[0, 5]} stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="url(#moodGradient)"
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', r: 5 }}
              activeDot={{ r: 7 }}
            />
            <defs>
              <linearGradient id="moodGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-4">今天想做什麼？</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/chat" className="p-4 bg-gradient-to-r from-mindful-purple/10 to-mindful-blue/10 rounded-xl hover:shadow-lg transition-all">
            <Smile className="w-8 h-8 text-mindful-purple mb-2" />
            <h3 className="font-semibold mb-1">與 AI 聊天</h3>
            <p className="text-sm text-gray-600">分享你的想法和感受</p>
          </a>
          <a href="/mood" className="p-4 bg-gradient-to-r from-mindful-pink/10 to-mindful-orange/10 rounded-xl hover:shadow-lg transition-all">
            <Heart className="w-8 h-8 text-mindful-pink mb-2" />
            <h3 className="font-semibold mb-1">記錄心情</h3>
            <p className="text-sm text-gray-600">追蹤你的情緒狀態</p>
          </a>
          <a href="/meditation" className="p-4 bg-gradient-to-r from-mindful-green/10 to-mindful-blue/10 rounded-xl hover:shadow-lg transition-all">
            <Award className="w-8 h-8 text-mindful-green mb-2" />
            <h3 className="font-semibold mb-1">開始冥想</h3>
            <p className="text-sm text-gray-600">放鬆身心，找回平靜</p>
          </a>
        </div>
      </div>

      {/* Motivation */}
      <div className="glass-card p-6 bg-gradient-to-r from-mindful-purple/20 to-mindful-blue/20">
        <p className="text-lg text-center font-medium">
          "照顧好自己的心靈，就是給自己最好的禮物。" 💝
        </p>
      </div>
    </div>
  )
}

export default Dashboard

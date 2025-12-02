import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Sparkles, Brain, Moon, BookHeart, TrendingUp, ClipboardCheck } from 'lucide-react'

const Home = ({ onLogin }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.trim()) {
      onLogin(username.trim())
    }
  }

  const features = [
    {
      icon: Brain,
      title: 'AI 心理健康助手',
      description: '24/7 隨時與專業的 AI 助手對話，獲得情緒支持和建議'
    },
    {
      icon: Heart,
      title: '情緒追蹤',
      description: '記錄每日情緒，了解自己的情緒模式和觸發因素'
    },
    {
      icon: Moon,
      title: '冥想與呼吸練習',
      description: '引導式冥想和呼吸練習，幫助你放鬆身心'
    },
    {
      icon: BookHeart,
      title: '每日日記',
      description: '記錄生活點滴，培養感恩的心態'
    },
    {
      icon: TrendingUp,
      title: '數據分析',
      description: '視覺化你的心理健康趨勢，追蹤進步'
    },
    {
      icon: Sparkles,
      title: '個人化建議',
      description: '基於你的需求，提供量身定制的健康建議'
    }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-mindful-purple to-mindful-blue rounded-2xl flex items-center justify-center animate-pulse-slow">
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-mindful-purple via-mindful-blue to-mindful-green bg-clip-text text-transparent">
            Mindful Mind
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            你的個人心靈健康夥伴 · 隨時陪伴，用心守護
          </p>

          {/* Quiz CTA - 醒目的測驗入口 */}
          <div className="max-w-md mx-auto mb-8">
            <button
              onClick={() => navigate('/quiz')}
              className="w-full group relative overflow-hidden rounded-2xl p-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="relative bg-white rounded-xl p-6 flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse">
                  <ClipboardCheck className="w-8 h-8 text-white" />
                </div>
                <div className="text-left flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">✨</span>
                    <h3 className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                      馬上測測您的心理健康
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    只要 2 分鐘，了解自己的心靈狀態！
                  </p>
                </div>
                <div className="text-3xl group-hover:translate-x-1 transition-transform">
                  👉
                </div>
              </div>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto glass-card p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6">開始你的健康之旅</h2>
            <input
              type="text"
              placeholder="請輸入你的名字"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field mb-4"
              required
            />
            <button type="submit" className="btn-primary w-full">
              立即開始
            </button>
            <p className="text-sm text-gray-500 mt-4">
              開始使用即表示你同意我們的服務條款
            </p>
          </form>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="glass-card p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-mindful-purple/20 to-mindful-blue/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-mindful-purple" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>© 2024 Mindful Mind. 用愛與科技守護心靈健康</p>
          <p className="mt-2">
            ⚠️ 本應用不能替代專業醫療建議。如有嚴重心理健康問題，請尋求專業協助。
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home

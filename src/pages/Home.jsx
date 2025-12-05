import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Sparkles, Brain, Moon, BookHeart, TrendingUp, ClipboardCheck } from 'lucide-react'
import LanguageToggle from '../components/LanguageToggle'
import { useTranslation } from '../hooks/useTranslation'

const Home = ({ onLogin }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const { t } = useTranslation()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.trim()) {
      onLogin(username.trim())
    }
  }

  const features = [
    {
      icon: Brain,
      title: t('home.features.aiAssistant.title'),
      description: t('home.features.aiAssistant.description')
    },
    {
      icon: Heart,
      title: t('home.features.moodTracking.title'),
      description: t('home.features.moodTracking.description')
    },
    {
      icon: Moon,
      title: t('home.features.meditation.title'),
      description: t('home.features.meditation.description')
    },
    {
      icon: BookHeart,
      title: t('home.features.journal.title'),
      description: t('home.features.journal.description')
    },
    {
      icon: TrendingUp,
      title: t('home.features.analytics.title'),
      description: t('home.features.analytics.description')
    },
    {
      icon: Sparkles,
      title: t('home.features.personalized.title'),
      description: t('home.features.personalized.description')
    }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Language Toggle - Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle />
      </div>

      <div className="max-w-6xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-mindful-purple to-mindful-blue rounded-2xl flex items-center justify-center animate-pulse-slow">
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-mindful-purple via-mindful-blue to-mindful-green bg-clip-text text-transparent">
            {t('home.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('home.subtitle')}
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
                      {t('home.quizCTA')}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {t('home.quizSubtitle')}
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
            <h2 className="text-2xl font-semibold mb-6">{t('home.startJourney')}</h2>
            <input
              type="text"
              placeholder={t('home.enterName')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field mb-4"
              required
            />
            <button type="submit" className="btn-primary w-full">
              {t('home.startNow')}
            </button>
            <p className="text-sm text-gray-500 mt-4">
              {t('home.termsNotice')}
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
          <p>{t('home.footer.copyright')}</p>
          <p className="mt-2">
            {t('home.footer.disclaimer')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home

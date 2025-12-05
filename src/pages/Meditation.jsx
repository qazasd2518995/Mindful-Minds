import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Wind, Heart, Sparkles } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'

const Meditation = () => {
  const { t } = useTranslation()
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes default
  const [selectedDuration, setSelectedDuration] = useState(300)
  const [breathPhase, setBreathPhase] = useState('inhale')
  const intervalRef = useRef(null)
  const breathIntervalRef = useRef(null)

  const durations = [
    { label: t('meditation.durations.3min'), value: 180 },
    { label: t('meditation.durations.5min'), value: 300 },
    { label: t('meditation.durations.10min'), value: 600 },
    { label: t('meditation.durations.15min'), value: 900 },
  ]

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      handleComplete()
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isActive, timeLeft])

  useEffect(() => {
    if (isActive) {
      breathIntervalRef.current = setInterval(() => {
        setBreathPhase(prev => {
          if (prev === 'inhale') return 'hold'
          if (prev === 'hold') return 'exhale'
          return 'inhale'
        })
      }, 4000)
    } else {
      setBreathPhase('inhale')
    }

    return () => {
      if (breathIntervalRef.current) clearInterval(breathIntervalRef.current)
    }
  }, [isActive])

  const handleStart = () => {
    setIsActive(true)
  }

  const handlePause = () => {
    setIsActive(false)
  }

  const handleReset = () => {
    setIsActive(false)
    setTimeLeft(selectedDuration)
    setBreathPhase('inhale')
  }

  const handleComplete = () => {
    setIsActive(false)
    // Save meditation session
    const user = JSON.parse(localStorage.getItem('mindful-user') || '{}')
    const sessions = JSON.parse(localStorage.getItem(`meditation-log-${user.username}`) || '[]')
    sessions.push({
      date: new Date().toISOString(),
      duration: selectedDuration / 60
    })
    localStorage.setItem(`meditation-log-${user.username}`, JSON.stringify(sessions))
    alert(t('meditation.complete'))
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getBreathInstruction = () => {
    switch (breathPhase) {
      case 'inhale': return t('meditation.breathe.inhale')
      case 'hold': return t('meditation.breathe.hold')
      case 'exhale': return t('meditation.breathe.exhale')
      default: return ''
    }
  }

  const guidedItems = t('meditation.guidedItems')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-2">
          <Wind className="w-8 h-8 text-mindful-blue" />
          <h1 className="text-3xl font-bold">{t('meditation.title')}</h1>
        </div>
        <p className="text-gray-600">{t('meditation.subtitle')}</p>
      </div>

      {/* Main Meditation Area */}
      <div className="glass-card p-8">
        <div className="max-w-md mx-auto text-center">
          {/* Breathing Circle */}
          <div className="relative mb-8">
            <div
              className={`w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-mindful-purple to-mindful-blue flex items-center justify-center transition-all duration-4000 ${
                isActive ? 'breathe-animation' : ''
              }`}
              style={{
                boxShadow: '0 0 60px rgba(139, 92, 246, 0.4)',
                transform: breathPhase === 'inhale' && isActive ? 'scale(1.2)' : 'scale(1)'
              }}
            >
              <div className="text-white">
                <div className="text-5xl font-bold mb-2">{formatTime(timeLeft)}</div>
                {isActive && (
                  <div className="text-lg animate-pulse">{getBreathInstruction()}</div>
                )}
              </div>
            </div>
          </div>

          {/* Duration Selection */}
          {!isActive && (
            <div className="mb-6">
              <p className="text-sm font-medium mb-3">{t('meditation.selectDuration')}</p>
              <div className="grid grid-cols-4 gap-2">
                {durations.map(duration => (
                  <button
                    key={duration.value}
                    onClick={() => {
                      setSelectedDuration(duration.value)
                      setTimeLeft(duration.value)
                    }}
                    className={`py-2 rounded-xl transition-all ${
                      selectedDuration === duration.value
                        ? 'bg-gradient-to-r from-mindful-purple to-mindful-blue text-white'
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  >
                    {duration.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center gap-4">
            {!isActive ? (
              <button onClick={handleStart} className="btn-primary px-8">
                <Play className="w-5 h-5 inline mr-2" />
                {t('meditation.start')}
              </button>
            ) : (
              <>
                <button onClick={handlePause} className="btn-secondary px-8">
                  <Pause className="w-5 h-5 inline mr-2" />
                  {t('meditation.pause')}
                </button>
                <button onClick={handleReset} className="btn-secondary px-8">
                  <RotateCcw className="w-5 h-5 inline mr-2" />
                  {t('meditation.reset')}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Guided Meditations */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          {t('meditation.guided')}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {guidedItems.map((meditation, index) => (
            <div key={index} className="bg-white/50 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer">
              <div className="text-3xl mb-2">{meditation.icon}</div>
              <h3 className="font-semibold mb-1">{meditation.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{meditation.description}</p>
              <p className="text-xs text-mindful-purple font-medium">{meditation.duration}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="glass-card p-6 bg-gradient-to-r from-mindful-blue/20 to-mindful-green/20">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Heart className="w-5 h-5 text-mindful-pink" />
          {t('meditation.tips.title')}
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {t('meditation.tips.items').map((tip, index) => (
            <li key={index}>• {tip}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Meditation

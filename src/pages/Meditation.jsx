import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Wind, Heart, Sparkles } from 'lucide-react'

const Meditation = () => {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes default
  const [selectedDuration, setSelectedDuration] = useState(300)
  const [breathPhase, setBreathPhase] = useState('inhale')
  const intervalRef = useRef(null)
  const breathIntervalRef = useRef(null)

  const durations = [
    { label: '3 分鐘', value: 180 },
    { label: '5 分鐘', value: 300 },
    { label: '10 分鐘', value: 600 },
    { label: '15 分鐘', value: 900 },
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
    alert('恭喜完成冥想！🎉')
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getBreathInstruction = () => {
    switch (breathPhase) {
      case 'inhale': return '深深吸氣...'
      case 'hold': return '屏住呼吸...'
      case 'exhale': return '慢慢吐氣...'
      default: return ''
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-2">
          <Wind className="w-8 h-8 text-mindful-blue" />
          <h1 className="text-3xl font-bold">冥想與呼吸</h1>
        </div>
        <p className="text-gray-600">放鬆身心，找回內在的平靜</p>
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
              <p className="text-sm font-medium mb-3">選擇時長</p>
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
                開始
              </button>
            ) : (
              <>
                <button onClick={handlePause} className="btn-secondary px-8">
                  <Pause className="w-5 h-5 inline mr-2" />
                  暫停
                </button>
                <button onClick={handleReset} className="btn-secondary px-8">
                  <RotateCcw className="w-5 h-5 inline mr-2" />
                  重置
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
          引導式冥想
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              title: '早晨喚醒',
              description: '以平靜的心情開始新的一天',
              duration: '5 分鐘',
              icon: '🌅'
            },
            {
              title: '壓力釋放',
              description: '釋放緊張，恢復內在平衡',
              duration: '10 分鐘',
              icon: '🌊'
            },
            {
              title: '深度放鬆',
              description: '全身心的放鬆與療癒',
              duration: '15 分鐘',
              icon: '🌙'
            },
            {
              title: '感恩練習',
              description: '培養感恩的心態',
              duration: '7 分鐘',
              icon: '💝'
            }
          ].map((meditation, index) => (
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
          冥想小貼士
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• 找一個安靜舒適的地方</li>
          <li>• 保持舒適的坐姿或躺姿</li>
          <li>• 專注於你的呼吸</li>
          <li>• 不要強迫自己，順其自然</li>
          <li>• 每天堅持練習，效果會更好</li>
        </ul>
      </div>
    </div>
  )
}

export default Meditation

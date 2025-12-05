import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ArrowRight, ArrowLeft, Sparkles, Sun, Cloud, CloudRain, CloudLightning, Home, RefreshCw } from 'lucide-react'
import LanguageToggle from '../components/LanguageToggle'
import { useTranslation } from '../hooks/useTranslation'

const Quiz = () => {
  const navigate = useNavigate()
  const { t, language } = useTranslation()
  const [currentStep, setCurrentStep] = useState('intro') // intro, quiz, result
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  // Get questions from translations
  const questions = t('quiz.questions').map((q, index) => ({
    id: index + 1,
    emoji: q.emoji,
    question: q.question,
    color: [
      'from-yellow-400 to-orange-400',
      'from-indigo-400 to-purple-400',
      'from-green-400 to-teal-400',
      'from-pink-400 to-rose-400',
      'from-amber-400 to-yellow-400',
      'from-cyan-400 to-blue-400',
      'from-violet-400 to-purple-400',
      'from-rose-400 to-pink-400'
    ][index],
    options: q.options.map((opt, optIndex) => ({
      text: opt.text,
      score: 3 - optIndex, // 3, 2, 1, 0
      emoji: opt.emoji
    }))
  }))

  // Get result type based on score
  const getResult = (totalScore) => {
    const results = t('quiz.results')
    if (totalScore >= 20) {
      return {
        type: 'sunshine',
        ...results.sunshine,
        icon: Sun,
        image: '/characters/sunshine.png',
        color: 'from-yellow-400 to-orange-400',
        bgColor: 'from-yellow-50 to-orange-50',
        borderColor: 'border-yellow-300',
        textColor: 'text-orange-600'
      }
    } else if (totalScore >= 14) {
      return {
        type: 'sunny',
        ...results.sunny,
        icon: Cloud,
        image: '/characters/sunny.png',
        color: 'from-sky-400 to-blue-400',
        bgColor: 'from-sky-50 to-blue-50',
        borderColor: 'border-sky-300',
        textColor: 'text-sky-600'
      }
    } else if (totalScore >= 8) {
      return {
        type: 'cloudy',
        ...results.cloudy,
        icon: CloudRain,
        image: '/characters/rainy.png',
        color: 'from-cyan-400 to-teal-400',
        bgColor: 'from-cyan-50 to-teal-50',
        borderColor: 'border-cyan-300',
        textColor: 'text-teal-600'
      }
    } else {
      return {
        type: 'stormy',
        ...results.stormy,
        icon: CloudLightning,
        image: '/characters/stormy.png',
        color: 'from-indigo-500 to-purple-500',
        bgColor: 'from-indigo-50 to-purple-50',
        borderColor: 'border-indigo-300',
        textColor: 'text-indigo-600',
        urgent: true
      }
    }
  }

  const handleAnswer = (score) => {
    setSelectedAnswer(score)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)
    setSelectedAnswer(null)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCurrentStep('result')
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1])
      setAnswers(answers.slice(0, -1))
    }
  }

  const handleRestart = () => {
    setCurrentStep('intro')
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedAnswer(null)
  }

  const totalScore = answers.reduce((sum, score) => sum + score, 0)
  const result = getResult(totalScore)
  const progress = ((currentQuestion + 1) / questions.length) * 100

  // Intro page
  if (currentStep === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4 relative">
        {/* Language Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <LanguageToggle />
        </div>

        <div className="max-w-lg w-full">
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('quiz.backToHome')}</span>
          </button>

          <div className="glass-card p-8 text-center animate-fade-in">
            {/* Animated icon */}
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse-slow shadow-2xl">
                <Heart className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
                ✨
              </div>
              <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>
                🌱
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {t('quiz.title')}
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('quiz.subtitle')}
              <br />
              <span className="text-sm text-gray-500">{t('quiz.questionCount')}</span>
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
              <div className="p-2 sm:p-3 bg-pink-50 rounded-xl">
                <div className="text-xl sm:text-2xl mb-1">🎯</div>
                <div className="text-[10px] sm:text-xs text-gray-600">{t('quiz.quickTest')}</div>
              </div>
              <div className="p-2 sm:p-3 bg-purple-50 rounded-xl">
                <div className="text-xl sm:text-2xl mb-1">💝</div>
                <div className="text-[10px] sm:text-xs text-gray-600">{t('quiz.warmResult')}</div>
              </div>
              <div className="p-2 sm:p-3 bg-blue-50 rounded-xl">
                <div className="text-xl sm:text-2xl mb-1">🔒</div>
                <div className="text-[10px] sm:text-xs text-gray-600">{t('quiz.privacy')}</div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep('quiz')}
              className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              {t('quiz.startQuiz')}
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-xs text-gray-400 mt-4">
              {t('quiz.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Quiz page
  if (currentStep === 'quiz') {
    const question = questions[currentQuestion]

    return (
      <div className={`min-h-screen bg-gradient-to-br ${question.color} flex items-center justify-center p-4 transition-all duration-500 relative`}>
        {/* Language Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <LanguageToggle />
        </div>

        <div className="max-w-lg w-full">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-white text-sm mb-2">
              <span>{t('quiz.questionProgress').replace('{current}', currentQuestion + 1).replace('{total}', questions.length)}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-3 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="glass-card p-8 animate-fade-in">
            {/* Question emoji */}
            <div className="text-5xl sm:text-6xl text-center mb-4 sm:mb-6 animate-bounce">
              {question.emoji}
            </div>

            {/* Question */}
            <h2 className="text-xl font-bold text-center mb-8 text-gray-800">
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.score)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-3 ${
                    selectedAnswer === option.score
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                      : 'bg-white/80 hover:bg-white hover:shadow-md text-gray-700'
                  }`}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="flex-1 font-medium">{option.text}</span>
                  {selectedAnswer === option.score && (
                    <span className="text-xl">✓</span>
                  )}
                </button>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-4 mt-8">
              {currentQuestion > 0 && (
                <button
                  onClick={handlePrev}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {t('common.previous')}
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentQuestion < questions.length - 1 ? (
                  <>
                    {t('common.next')}
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    {t('quiz.viewResult')}
                    <Sparkles className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Result page
  if (currentStep === 'result') {
    const styleConfig = {
      sunshine: {
        bg: 'linear-gradient(180deg, #FFF8E7 0%, #FFE4B5 50%, #FFD700 100%)',
        accent: '#FF8C00',
        light: '#FFF5E1'
      },
      sunny: {
        bg: 'linear-gradient(180deg, #F0F9FF 0%, #E0F2FE 50%, #BAE6FD 100%)',
        accent: '#0EA5E9',
        light: '#F0F9FF'
      },
      cloudy: {
        bg: 'linear-gradient(180deg, #F0FDFA 0%, #CCFBF1 50%, #99F6E4 100%)',
        accent: '#14B8A6',
        light: '#F0FDFA'
      },
      stormy: {
        bg: 'linear-gradient(180deg, #F5F3FF 0%, #EDE9FE 50%, #DDD6FE 100%)',
        accent: '#8B5CF6',
        light: '#F5F3FF'
      }
    }
    const style = styleConfig[result.type]

    return (
      <div className="min-h-screen relative overflow-x-hidden" style={{ background: style.bg }}>
        {/* Language Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <LanguageToggle />
        </div>

        {/* Decorative grid */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)"/>
          </svg>
        </div>

        {/* Soft glow */}
        <div className="fixed top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full opacity-40 blur-3xl pointer-events-none" style={{ background: style.accent }} />
        <div className="fixed bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: style.accent }} />

        {/* Content */}
        <div className="relative z-10">
          {/* First section: Visual */}
          <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">

            {/* Title area */}
            <div className="text-center mb-8 max-w-4xl">
              <p
                className="text-lg md:text-xl tracking-[0.3em] mb-6 opacity-70"
                style={{
                  fontFamily: '"Noto Serif TC", serif',
                  color: style.accent
                }}
              >
                {t('quiz.yourMentalState')}
              </p>

              <h1
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-6 sm:mb-8 leading-tight"
                style={{
                  fontFamily: '"Noto Serif TC", serif',
                  fontWeight: 900,
                  color: style.accent,
                  textShadow: `3px 3px 0px ${style.light}, 6px 6px 15px rgba(0,0,0,0.15)`,
                  letterSpacing: '0.1em',
                  WebkitTextStroke: `1px ${style.accent}`
                }}
              >
                {result.title}
              </h1>

              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-[1px] w-16 md:w-24" style={{ background: style.accent, opacity: 0.5 }} />
                <span className="text-4xl">{result.emoji}</span>
                <div className="h-[1px] w-16 md:w-24" style={{ background: style.accent, opacity: 0.5 }} />
              </div>

              <div
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full backdrop-blur-md"
                style={{
                  background: 'rgba(255,255,255,0.8)',
                  border: `2px solid ${style.accent}`,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                }}
              >
                <Sparkles className="w-5 h-5" style={{ color: style.accent }} />
                <span
                  className="text-xl font-semibold tracking-wide"
                  style={{
                    fontFamily: '"Noto Serif TC", serif',
                    color: style.accent
                  }}
                >
                  {t('quiz.score')} {totalScore} / 24
                </span>
              </div>
            </div>

            {/* Character image */}
            <div className="relative mb-8 sm:mb-12 mx-4">
              <div
                className="hidden sm:block absolute inset-0 -m-4 md:-m-6 rounded-[3rem] opacity-20"
                style={{
                  border: `3px solid ${style.accent}`,
                  transform: 'rotate(-2deg)'
                }}
              />
              <div
                className="hidden sm:block absolute inset-0 -m-2 md:-m-3 rounded-[2.5rem] opacity-30"
                style={{
                  border: `2px solid ${style.accent}`,
                  transform: 'rotate(1deg)'
                }}
              />

              <img
                src={result.image}
                alt={result.title}
                className="relative w-auto h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-[55vh] max-h-[400px] sm:max-h-none object-contain mx-auto"
                style={{
                  filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.15))'
                }}
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>

            {/* Scroll hint */}
            <div className="animate-bounce flex flex-col items-center" style={{ color: style.accent, opacity: 0.6 }}>
              <span className="text-sm mb-2" style={{ fontFamily: '"Noto Serif TC", serif' }}>{t('quiz.continueReading')}</span>
              <ArrowRight className="w-5 h-5 rotate-90" />
            </div>
          </div>

          {/* Second section: Details */}
          <div className="min-h-screen px-4 py-12 sm:py-16 flex items-center justify-center">
            <div className="max-w-2xl w-full">

              {/* Description card */}
              <div
                className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 mb-6 sm:mb-8 relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
                }}
              >
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: style.accent, opacity: 0.5 }} />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: style.accent, opacity: 0.5 }} />

                <h2
                  className="text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4"
                  style={{
                    fontFamily: '"Noto Serif TC", serif',
                    fontWeight: 700,
                    color: style.accent
                  }}
                >
                  {result.description}
                </h2>
                <p
                  className="text-gray-600 leading-relaxed text-base sm:text-lg md:text-xl"
                  style={{ fontFamily: '"Noto Serif TC", serif' }}
                >
                  {result.detail}
                </p>
              </div>

              {/* Tips */}
              <div
                className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 mb-6 sm:mb-8 ${result.urgent ? 'text-white' : ''}`}
                style={{
                  background: result.urgent ? 'linear-gradient(135deg, #DC2626, #B91C1C)' : 'rgba(255,255,255,0.95)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
                }}
              >
                <h3
                  className="text-lg sm:text-xl md:text-2xl mb-5 sm:mb-8 flex items-center gap-2 sm:gap-3"
                  style={{
                    fontFamily: '"Noto Serif TC", serif',
                    fontWeight: 700,
                    color: result.urgent ? 'white' : style.accent
                  }}
                >
                  {result.urgent ? t('quiz.urgentResources') : t('quiz.warmTips')}
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {result.tips.map((tip, index) => (
                    <div
                      key={index}
                      className="p-3 sm:p-4 rounded-xl sm:rounded-2xl"
                      style={{
                        background: result.urgent ? 'rgba(255,255,255,0.15)' : `${style.accent}08`,
                        borderLeft: `3px solid ${result.urgent ? 'rgba(255,255,255,0.5)' : style.accent}`
                      }}
                    >
                      <h4
                        className="font-semibold text-base sm:text-lg mb-1 sm:mb-2"
                        style={{
                          fontFamily: '"Noto Serif TC", serif',
                          color: result.urgent ? 'white' : style.accent
                        }}
                      >
                        {tip.title}
                      </h4>
                      <p
                        className="leading-relaxed text-sm sm:text-base"
                        style={{
                          fontFamily: '"Noto Serif TC", serif',
                          color: result.urgent ? 'rgba(255,255,255,0.9)' : '#4B5563'
                        }}
                      >
                        {tip.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Encouragement */}
              <div
                className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-8 sm:mb-10 text-center"
                style={{
                  background: `linear-gradient(135deg, ${style.accent}15, ${style.accent}30)`,
                  border: `1px solid ${style.accent}40`
                }}
              >
                <p
                  className="text-base sm:text-xl md:text-2xl flex items-center justify-center gap-2 sm:gap-4 flex-wrap"
                  style={{
                    fontFamily: '"Noto Serif TC", serif',
                    fontWeight: 700,
                    color: style.accent,
                    letterSpacing: '0.08em'
                  }}
                >
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>{result.encouragement}</span>
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3 sm:space-y-4">
                <button
                  onClick={() => navigate('/')}
                  className="w-full py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl font-bold text-base sm:text-xl md:text-2xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 sm:gap-3"
                  style={{
                    background: style.accent,
                    color: 'white',
                    fontFamily: '"Noto Serif TC", serif',
                    boxShadow: `0 10px 40px ${style.accent}50`
                  }}
                >
                  <Home className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>{t('quiz.startCaring')}</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <button
                  onClick={handleRestart}
                  className="w-full py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-medium text-base sm:text-lg md:text-xl transition-all flex items-center justify-center gap-2"
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    color: style.accent,
                    fontFamily: '"Noto Serif TC", serif',
                    border: `2px solid ${style.accent}40`
                  }}
                >
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                  {t('quiz.retakeQuiz')}
                </button>
              </div>

              <p
                className="text-center text-sm mt-10 opacity-60"
                style={{ fontFamily: '"Noto Serif TC", serif' }}
              >
                {t('quiz.resultDisclaimer')}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default Quiz

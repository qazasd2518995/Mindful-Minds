import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ArrowRight, ArrowLeft, Sparkles, Sun, Cloud, CloudRain, CloudLightning, Home, RefreshCw } from 'lucide-react'

const Quiz = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState('intro') // intro, quiz, result
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  // 測驗題目
  const questions = [
    {
      id: 1,
      emoji: '😊',
      question: '最近一週，你的整體心情如何？',
      color: 'from-yellow-400 to-orange-400',
      options: [
        { text: '大部分時間都很開心', score: 3, emoji: '😄' },
        { text: '心情還不錯', score: 2, emoji: '🙂' },
        { text: '時好時壞', score: 1, emoji: '😐' },
        { text: '經常感到低落', score: 0, emoji: '😢' }
      ]
    },
    {
      id: 2,
      emoji: '😴',
      question: '你最近的睡眠品質如何？',
      color: 'from-indigo-400 to-purple-400',
      options: [
        { text: '睡得很好，精神飽滿', score: 3, emoji: '😴' },
        { text: '大致上睡得不錯', score: 2, emoji: '🌙' },
        { text: '有時難以入睡', score: 1, emoji: '😵' },
        { text: '經常失眠或睡不好', score: 0, emoji: '😫' }
      ]
    },
    {
      id: 3,
      emoji: '💪',
      question: '面對壓力時，你通常如何應對？',
      color: 'from-green-400 to-teal-400',
      options: [
        { text: '能有效管理，不太受影響', score: 3, emoji: '💪' },
        { text: '偶爾會焦慮，但還能處理', score: 2, emoji: '🤔' },
        { text: '常常感到有壓力', score: 1, emoji: '😰' },
        { text: '壓力大到難以承受', score: 0, emoji: '😵‍💫' }
      ]
    },
    {
      id: 4,
      emoji: '👥',
      question: '你與身邊的人（家人、朋友）關係如何？',
      color: 'from-pink-400 to-rose-400',
      options: [
        { text: '關係很好，常有交流', score: 3, emoji: '🥰' },
        { text: '關係還不錯', score: 2, emoji: '😊' },
        { text: '有時感到孤獨', score: 1, emoji: '🥺' },
        { text: '經常感到孤立無援', score: 0, emoji: '😔' }
      ]
    },
    {
      id: 5,
      emoji: '⚡',
      question: '你對日常活動的興趣和動力如何？',
      color: 'from-amber-400 to-yellow-400',
      options: [
        { text: '充滿熱情和動力', score: 3, emoji: '🔥' },
        { text: '大部分事情還是有興趣', score: 2, emoji: '✨' },
        { text: '對很多事提不起勁', score: 1, emoji: '😑' },
        { text: '對什麼都沒興趣', score: 0, emoji: '😶' }
      ]
    },
    {
      id: 6,
      emoji: '🧘',
      question: '你有照顧自己的習慣嗎？（如運動、休息、興趣）',
      color: 'from-cyan-400 to-blue-400',
      options: [
        { text: '有規律的自我照顧習慣', score: 3, emoji: '🧘' },
        { text: '偶爾會做些放鬆的事', score: 2, emoji: '🎵' },
        { text: '很少有時間照顧自己', score: 1, emoji: '😅' },
        { text: '完全沒有', score: 0, emoji: '😞' }
      ]
    },
    {
      id: 7,
      emoji: '🎯',
      question: '你對自己的未來感到如何？',
      color: 'from-violet-400 to-purple-400',
      options: [
        { text: '充滿希望和期待', score: 3, emoji: '🌟' },
        { text: '還算樂觀', score: 2, emoji: '😌' },
        { text: '有些擔憂', score: 1, emoji: '😟' },
        { text: '感到無望或迷茫', score: 0, emoji: '😢' }
      ]
    },
    {
      id: 8,
      emoji: '💭',
      question: '你多常出現負面的想法？',
      color: 'from-rose-400 to-pink-400',
      options: [
        { text: '很少有負面想法', score: 3, emoji: '😊' },
        { text: '偶爾會有', score: 2, emoji: '🤷' },
        { text: '經常出現', score: 1, emoji: '😔' },
        { text: '幾乎每天都有', score: 0, emoji: '😢' }
      ]
    }
  ]

  // 結果類型
  const getResult = (totalScore) => {
    if (totalScore >= 20) {
      return {
        type: 'sunshine',
        title: '陽光寶寶',
        emoji: '☀️',
        icon: Sun,
        image: '/characters/sunshine.png',
        color: 'from-yellow-400 to-orange-400',
        bgColor: 'from-yellow-50 to-orange-50',
        borderColor: 'border-yellow-300',
        textColor: 'text-orange-600',
        description: '太棒了！你的心理狀態非常健康！',
        detail: '你就像溫暖的陽光一樣，散發著正面的能量！你擁有出色的情緒管理能力，能夠積極面對生活中的挑戰。你與身邊的人保持著良好的關係，對生活充滿熱情和期待。這樣的你，不僅照亮了自己的人生，也溫暖了周圍的人。請繼續保持這份美好的狀態，同時也別忘了適時犒賞自己喔！',
        tips: [
          { title: '持續自我照顧', content: '保持規律的作息、運動習慣和健康飲食，這些都是維持好狀態的基石' },
          { title: '分享你的光芒', content: '你的正能量可以感染身邊的人，試著關心周圍需要幫助的朋友' },
          { title: '設定新目標', content: '在狀態好的時候，是挑戰新事物的最佳時機，給自己設定一些小目標吧' },
          { title: '記錄美好時刻', content: '把開心的事情記錄下來，未來遇到低潮時可以回顧這些美好回憶' },
          { title: '感恩練習', content: '每天花一點時間感謝生活中的小確幸，讓幸福感持續加倍' }
        ],
        encouragement: '你是大家的小太陽，繼續閃耀吧！'
      }
    } else if (totalScore >= 14) {
      return {
        type: 'sunny',
        title: '晴天娃娃',
        emoji: '🌤️',
        icon: Cloud,
        image: '/characters/sunny.png',
        color: 'from-sky-400 to-blue-400',
        bgColor: 'from-sky-50 to-blue-50',
        borderColor: 'border-sky-300',
        textColor: 'text-sky-600',
        description: '很好！你的心理狀態整體良好！',
        detail: '就像晴天娃娃一樣，你正在努力為自己帶來好天氣！生活中難免會遇到一些小壓力和煩惱，但你展現出良好的韌性和應對能力。偶爾感到疲憊或小小的焦慮是很正常的，重要的是你知道如何照顧自己。適時的休息和放鬆，能幫助你維持這份平衡。記得，照顧好自己，才能更好地面對生活中的各種挑戰！',
        tips: [
          { title: '練習放鬆技巧', content: '學習深呼吸、漸進式肌肉放鬆或簡單的冥想，每天只需要5-10分鐘' },
          { title: '維持社交連結', content: '定期與朋友家人聊聊天、吃頓飯，人際支持是心理健康的重要養分' },
          { title: '培養興趣愛好', content: '找一個讓你感到快樂的活動，可能是閱讀、繪畫、園藝或運動' },
          { title: '設立健康界線', content: '學會說「不」，不要讓自己承擔過多的壓力和責任' },
          { title: '規律睡眠', content: '確保每天有7-8小時的優質睡眠，這對情緒穩定非常重要' },
          { title: '親近大自然', content: '每週找時間到戶外走走，曬曬太陽、呼吸新鮮空氣' }
        ],
        encouragement: '你正在很好地照顧自己，繼續加油！'
      }
    } else if (totalScore >= 8) {
      return {
        type: 'cloudy',
        title: '微雨精靈',
        emoji: '🌧️',
        icon: CloudRain,
        image: '/characters/rainy.png',
        color: 'from-cyan-400 to-teal-400',
        bgColor: 'from-cyan-50 to-teal-50',
        borderColor: 'border-cyan-300',
        textColor: 'text-teal-600',
        description: '親愛的，你最近辛苦了',
        detail: '就像微雨精靈一樣，你可能正在經歷一段需要被溫柔對待的時光。感到疲憊、壓力大或情緒低落，這些都是很正常的感受，請不要責備自己。每個人都會有需要休息的時候，而承認自己需要幫助，正是勇敢的表現。現在最重要的是好好照顧自己，給自己多一點耐心和愛。記住，雨天也有它的美麗，而雨後總會有彩虹。',
        tips: [
          { title: '給自己喘息空間', content: '每天至少留15-30分鐘完全屬於自己，做任何讓你感到放鬆的事' },
          { title: '傾訴你的感受', content: '找一個信任的朋友、家人或專業人士，把心裡的話說出來，不要一個人扛' },
          { title: '降低對自己的要求', content: '現在不是追求完美的時候，完成比完美更重要，對自己溫柔一點' },
          { title: '照顧基本需求', content: '確保自己有好好吃飯、喝水、睡覺，身體的照顧是心理健康的基礎' },
          { title: '嘗試情緒紀錄', content: '用我們的情緒追蹤功能記錄每天的心情，了解自己的情緒模式' },
          { title: '體驗冥想練習', content: '每天花5分鐘做簡單的冥想或深呼吸，幫助安撫焦慮的心' },
          { title: '減少負面資訊', content: '暫時減少接收讓你感到壓力的新聞或社群媒體內容' }
        ],
        encouragement: '雨後一定會有彩虹，我們陪你一起等待！'
      }
    } else {
      return {
        type: 'stormy',
        title: '風暴勇者',
        emoji: '⛈️',
        icon: CloudLightning,
        image: '/characters/stormy.png',
        color: 'from-indigo-500 to-purple-500',
        bgColor: 'from-indigo-50 to-purple-50',
        borderColor: 'border-indigo-300',
        textColor: 'text-indigo-600',
        description: '親愛的勇者，謝謝你願意面對',
        detail: '你正在經歷一段非常不容易的時光，而願意完成這份測驗，本身就是一種勇敢。就像在風暴中依然站立的勇者，你比自己想像的更堅強。但是，即使是最勇敢的勇者也需要同伴和休息。請記住，尋求幫助不是軟弱的表現，而是對自己最大的關愛。你不需要獨自面對這一切，有很多人願意傾聽你、支持你、陪伴你走過這段路。',
        tips: [
          { title: '📞 安心專線 1925', content: '24小時免費心理諮詢服務，有專業人員傾聽你的心聲' },
          { title: '📞 生命線 1995', content: '24小時全天候服務，提供情緒支持和危機處理' },
          { title: '📞 張老師專線 1980', content: '專業諮商服務，陪伴你度過難關' },
          { title: '尋求專業協助', content: '考慮預約心理諮商師或精神科醫師，專業的幫助能讓你更快好起來' },
          { title: '告訴信任的人', content: '讓身邊至少一個人知道你的狀況，不要獨自承受' },
          { title: '現在就行動', content: '如果你正在看這段文字，請現在就撥打上面的專線，或告訴一個人你需要幫助' }
        ],
        encouragement: '你很勇敢，你不孤單，我們都在這裡支持你！',
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

  // 介紹頁面
  if (currentStep === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          {/* 返回首頁按鈕 */}
          <button
            onClick={() => navigate('/')}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回首頁</span>
          </button>

          <div className="glass-card p-8 text-center animate-fade-in">
            {/* 可愛的動畫圖示 */}
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
              心靈健康小測驗
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed">
              花 2 分鐘時間，了解一下自己最近的心理健康狀況吧！
              <br />
              <span className="text-sm text-gray-500">共 8 題，簡單又有趣</span>
            </p>

            {/* 特色說明 */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
              <div className="p-2 sm:p-3 bg-pink-50 rounded-xl">
                <div className="text-xl sm:text-2xl mb-1">🎯</div>
                <div className="text-[10px] sm:text-xs text-gray-600">快速測驗</div>
              </div>
              <div className="p-2 sm:p-3 bg-purple-50 rounded-xl">
                <div className="text-xl sm:text-2xl mb-1">💝</div>
                <div className="text-[10px] sm:text-xs text-gray-600">溫馨結果</div>
              </div>
              <div className="p-2 sm:p-3 bg-blue-50 rounded-xl">
                <div className="text-xl sm:text-2xl mb-1">🔒</div>
                <div className="text-[10px] sm:text-xs text-gray-600">隱私保護</div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep('quiz')}
              className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              開始測驗
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-xs text-gray-400 mt-4">
              ⚠️ 此測驗僅供參考，不能替代專業診斷
            </p>
          </div>
        </div>
      </div>
    )
  }

  // 測驗頁面
  if (currentStep === 'quiz') {
    const question = questions[currentQuestion]

    return (
      <div className={`min-h-screen bg-gradient-to-br ${question.color} flex items-center justify-center p-4 transition-all duration-500`}>
        <div className="max-w-lg w-full">
          {/* 進度條 */}
          <div className="mb-6">
            <div className="flex justify-between text-white text-sm mb-2">
              <span>第 {currentQuestion + 1} 題 / 共 {questions.length} 題</span>
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
            {/* 題目 emoji */}
            <div className="text-5xl sm:text-6xl text-center mb-4 sm:mb-6 animate-bounce">
              {question.emoji}
            </div>

            {/* 題目 */}
            <h2 className="text-xl font-bold text-center mb-8 text-gray-800">
              {question.question}
            </h2>

            {/* 選項 */}
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

            {/* 導航按鈕 */}
            <div className="flex gap-4 mt-8">
              {currentQuestion > 0 && (
                <button
                  onClick={handlePrev}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  上一題
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
                    下一題
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    查看結果
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

  // 結果頁面 - 藝術感設計
  if (currentStep === 'result') {
    // 每種類型的專屬配色和風格
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
        {/* 藝術感裝飾線條 */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)"/>
          </svg>
        </div>

        {/* 柔和光暈 */}
        <div className="fixed top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full opacity-40 blur-3xl pointer-events-none" style={{ background: style.accent }} />
        <div className="fixed bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: style.accent }} />

        {/* 可滾動內容 */}
        <div className="relative z-10">
          {/* 第一區塊：主視覺 */}
          <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">

            {/* 藝術感標題區 */}
            <div className="text-center mb-8 max-w-4xl">
              {/* 小標 */}
              <p
                className="text-lg md:text-xl tracking-[0.3em] mb-6 opacity-70"
                style={{
                  fontFamily: '"Noto Serif TC", serif',
                  color: style.accent
                }}
              >
                — 你的心理狀態是 —
              </p>

              {/* 主標題 - 藝術字體 */}
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

              {/* 裝飾線 */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-[1px] w-16 md:w-24" style={{ background: style.accent, opacity: 0.5 }} />
                <span className="text-4xl">{result.emoji}</span>
                <div className="h-[1px] w-16 md:w-24" style={{ background: style.accent, opacity: 0.5 }} />
              </div>

              {/* 分數標籤 */}
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
                  測驗得分 {totalScore} / 24
                </span>
              </div>
            </div>

            {/* 角色圖片 - 藝術框架 */}
            <div className="relative mb-8 sm:mb-12 mx-4">
              {/* 裝飾框 - 隱藏在極小螢幕 */}
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

            {/* 向下滾動提示 */}
            <div className="animate-bounce flex flex-col items-center" style={{ color: style.accent, opacity: 0.6 }}>
              <span className="text-sm mb-2" style={{ fontFamily: '"Noto Serif TC", serif' }}>繼續閱讀</span>
              <ArrowRight className="w-5 h-5 rotate-90" />
            </div>
          </div>

          {/* 第二區塊：詳細內容 */}
          <div className="min-h-screen px-4 py-12 sm:py-16 flex items-center justify-center">
            <div className="max-w-2xl w-full">

              {/* 描述卡片 */}
              <div
                className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 mb-6 sm:mb-8 relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
                }}
              >
                {/* 裝飾角 */}
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

              {/* 建議區塊 */}
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
                  {result.urgent ? '❤️ 重要資源與支持' : '✦ 給你的溫馨小建議'}
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

              {/* 鼓勵語 */}
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

              {/* 按鈕區域 */}
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
                  <span>開始照顧心靈健康</span>
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
                  重新測驗
                </button>
              </div>

              <p
                className="text-center text-sm mt-10 opacity-60"
                style={{ fontFamily: '"Noto Serif TC", serif' }}
              >
                ⚠️ 此測驗結果僅供參考，如有需要請尋求專業協助
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

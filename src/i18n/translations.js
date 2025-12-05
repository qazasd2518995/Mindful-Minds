export const translations = {
  'zh-TW': {
    // Common
    common: {
      appName: 'Mindful Mind',
      appSlogan: '你的個人心靈健康夥伴 · 隨時陪伴，用心守護',
      start: '開始',
      save: '儲存',
      cancel: '取消',
      delete: '刪除',
      edit: '編輯',
      back: '返回',
      next: '下一題',
      previous: '上一題',
      submit: '提交',
      loading: '載入中...',
      error: '發生錯誤',
      success: '成功',
      confirm: '確定',
      logout: '登出',
      login: '登入',
      minutes: '分鐘',
      days: '天',
      hours: '小時',
    },

    // Navigation
    nav: {
      dashboard: '儀表板',
      aiAssistant: 'AI 助手',
      moodTracker: '情緒追蹤',
      meditation: '冥想練習',
      journal: '每日日記',
      resources: '資源庫',
      quiz: '心理測驗',
    },

    // Home Page
    home: {
      title: 'Mindful Mind',
      subtitle: '你的個人心靈健康夥伴 · 隨時陪伴，用心守護',
      quizCTA: '馬上測測您的心理健康',
      quizSubtitle: '只要 2 分鐘，了解自己的心靈狀態！',
      startJourney: '開始你的健康之旅',
      enterName: '請輸入你的名字',
      startNow: '立即開始',
      termsNotice: '開始使用即表示你同意我們的服務條款',
      loginError: '登入失敗，請稍後再試',
      features: {
        aiAssistant: {
          title: 'AI 心理健康助手',
          description: '24/7 隨時與專業的 AI 助手對話，獲得情緒支持和建議'
        },
        moodTracking: {
          title: '情緒追蹤',
          description: '記錄每日情緒，了解自己的情緒模式和觸發因素'
        },
        meditation: {
          title: '冥想與呼吸練習',
          description: '引導式冥想和呼吸練習，幫助你放鬆身心'
        },
        journal: {
          title: '每日日記',
          description: '記錄生活點滴，培養感恩的心態'
        },
        analytics: {
          title: '數據分析',
          description: '視覺化你的心理健康趨勢，追蹤進步'
        },
        personalized: {
          title: '個人化建議',
          description: '基於你的需求，提供量身定制的健康建議'
        }
      },
      footer: {
        copyright: '© 2024 Mindful Mind. 用愛與科技守護心靈健康',
        disclaimer: '⚠️ 本應用不能替代專業醫療建議。如有嚴重心理健康問題，請尋求專業協助。'
      }
    },

    // Quiz Page
    quiz: {
      title: '心靈健康小測驗',
      subtitle: '花 2 分鐘時間，了解一下自己最近的心理健康狀況吧！',
      questionCount: '共 8 題，簡單又有趣',
      quickTest: '快速測驗',
      warmResult: '溫馨結果',
      privacy: '隱私保護',
      startQuiz: '開始測驗',
      disclaimer: '⚠️ 此測驗僅供參考，不能替代專業診斷',
      backToHome: '返回首頁',
      questionProgress: '第 {current} 題 / 共 {total} 題',
      viewResult: '查看結果',
      yourMentalState: '— 你的心理狀態是 —',
      score: '測驗得分',
      continueReading: '繼續閱讀',
      warmTips: '✦ 給你的溫馨小建議',
      urgentResources: '❤️ 重要資源與支持',
      startCaring: '開始照顧心靈健康',
      retakeQuiz: '重新測驗',
      resultDisclaimer: '⚠️ 此測驗結果僅供參考，如有需要請尋求專業協助',
      questions: [
        {
          emoji: '😊',
          question: '最近一週，你的整體心情如何？',
          options: [
            { text: '大部分時間都很開心', emoji: '😄' },
            { text: '心情還不錯', emoji: '🙂' },
            { text: '時好時壞', emoji: '😐' },
            { text: '經常感到低落', emoji: '😢' }
          ]
        },
        {
          emoji: '😴',
          question: '你最近的睡眠品質如何？',
          options: [
            { text: '睡得很好，精神飽滿', emoji: '😴' },
            { text: '大致上睡得不錯', emoji: '🌙' },
            { text: '有時難以入睡', emoji: '😵' },
            { text: '經常失眠或睡不好', emoji: '😫' }
          ]
        },
        {
          emoji: '💪',
          question: '面對壓力時，你通常如何應對？',
          options: [
            { text: '能有效管理，不太受影響', emoji: '💪' },
            { text: '偶爾會焦慮，但還能處理', emoji: '🤔' },
            { text: '常常感到有壓力', emoji: '😰' },
            { text: '壓力大到難以承受', emoji: '😵‍💫' }
          ]
        },
        {
          emoji: '👥',
          question: '你與身邊的人（家人、朋友）關係如何？',
          options: [
            { text: '關係很好，常有交流', emoji: '🥰' },
            { text: '關係還不錯', emoji: '😊' },
            { text: '有時感到孤獨', emoji: '🥺' },
            { text: '經常感到孤立無援', emoji: '😔' }
          ]
        },
        {
          emoji: '⚡',
          question: '你對日常活動的興趣和動力如何？',
          options: [
            { text: '充滿熱情和動力', emoji: '🔥' },
            { text: '大部分事情還是有興趣', emoji: '✨' },
            { text: '對很多事提不起勁', emoji: '😑' },
            { text: '對什麼都沒興趣', emoji: '😶' }
          ]
        },
        {
          emoji: '🧘',
          question: '你有照顧自己的習慣嗎？（如運動、休息、興趣）',
          options: [
            { text: '有規律的自我照顧習慣', emoji: '🧘' },
            { text: '偶爾會做些放鬆的事', emoji: '🎵' },
            { text: '很少有時間照顧自己', emoji: '😅' },
            { text: '完全沒有', emoji: '😞' }
          ]
        },
        {
          emoji: '🎯',
          question: '你對自己的未來感到如何？',
          options: [
            { text: '充滿希望和期待', emoji: '🌟' },
            { text: '還算樂觀', emoji: '😌' },
            { text: '有些擔憂', emoji: '😟' },
            { text: '感到無望或迷茫', emoji: '😢' }
          ]
        },
        {
          emoji: '💭',
          question: '你多常出現負面的想法？',
          options: [
            { text: '很少有負面想法', emoji: '😊' },
            { text: '偶爾會有', emoji: '🤷' },
            { text: '經常出現', emoji: '😔' },
            { text: '幾乎每天都有', emoji: '😢' }
          ]
        }
      ],
      results: {
        sunshine: {
          title: '陽光寶寶',
          emoji: '☀️',
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
        },
        sunny: {
          title: '晴天娃娃',
          emoji: '🌤️',
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
        },
        cloudy: {
          title: '微雨精靈',
          emoji: '🌧️',
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
        },
        stormy: {
          title: '風暴勇者',
          emoji: '⛈️',
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
          encouragement: '你很勇敢，你不孤單，我們都在這裡支持你！'
        }
      }
    },

    // Dashboard
    dashboard: {
      welcome: '歡迎回來，{name}！',
      subtitle: '這是你的心靈健康儀表板',
      journalEntries: '日記條目',
      streakDays: '連續天數',
      averageMood: '平均心情',
      meditationTime: '冥想時長',
      moodTrend: '過去 7 天的心情趨勢',
      whatToDo: '今天想做什麼？',
      chatWithAI: '與 AI 聊天',
      shareThoughts: '分享你的想法和感受',
      recordMood: '記錄心情',
      trackEmotions: '追蹤你的情緒狀態',
      startMeditation: '開始冥想',
      findPeace: '放鬆身心，找回平靜',
      motivation: '"照顧好自己的心靈，就是給自己最好的禮物。" 💝',
      keepCaring: '持續照顧自己',
    },

    // Chat
    chat: {
      title: 'AI 心靈助手',
      subtitle: '隨時為你提供支持與建議',
      welcomeMessage: '你好 {name}！我是你的心靈健康助手。我在這裡傾聽你的想法和感受，提供支持和建議。有什麼我可以幫助你的嗎？',
      placeholder: '輸入你的想法或問題...',
      quickPrompts: '快速提問：',
      errorMessage: '抱歉，我現在無法回應。請稍後再試。',
      prompts: [
        '我感到焦慮，該怎麼辦？',
        '如何改善睡眠品質？',
        '幫我做呼吸練習',
        '我需要一些正能量',
      ]
    },

    // Mood Tracker
    moodTracker: {
      title: '情緒追蹤',
      subtitle: '記錄你的心情，了解自己的情緒模式',
      howAreYou: '今天心情如何？',
      moods: {
        veryGood: '非常好',
        good: '還不錯',
        neutral: '普通',
        notGood: '不太好',
        bad: '很糟糕'
      },
      relatedTags: '相關標籤（可選）',
      tags: ['工作', '家庭', '朋友', '健康', '運動', '睡眠', '飲食', '焦慮', '壓力', '快樂'],
      notePlaceholder: '寫下一些想法或發生的事情（可選）...',
      saveRecord: '儲存記錄',
      history: '歷史記錄',
      noRecords: '還沒有記錄，開始記錄你的第一個心情吧！'
    },

    // Meditation
    meditation: {
      title: '冥想與呼吸',
      subtitle: '放鬆身心，找回內在的平靜',
      selectDuration: '選擇時長',
      durations: {
        '3min': '3 分鐘',
        '5min': '5 分鐘',
        '10min': '10 分鐘',
        '15min': '15 分鐘'
      },
      start: '開始',
      pause: '暫停',
      reset: '重置',
      breathe: {
        inhale: '深深吸氣...',
        hold: '屏住呼吸...',
        exhale: '慢慢吐氣...'
      },
      guided: '引導式冥想',
      guidedItems: [
        { title: '早晨喚醒', description: '以平靜的心情開始新的一天', duration: '5 分鐘', icon: '🌅' },
        { title: '壓力釋放', description: '釋放緊張，恢復內在平衡', duration: '10 分鐘', icon: '🌊' },
        { title: '深度放鬆', description: '全身心的放鬆與療癒', duration: '15 分鐘', icon: '🌙' },
        { title: '感恩練習', description: '培養感恩的心態', duration: '7 分鐘', icon: '💝' }
      ],
      tips: {
        title: '冥想小貼士',
        items: [
          '找一個安靜舒適的地方',
          '保持舒適的坐姿或躺姿',
          '專注於你的呼吸',
          '不要強迫自己，順其自然',
          '每天堅持練習，效果會更好'
        ]
      },
      complete: '恭喜完成冥想！🎉'
    },

    // Journal
    journal: {
      title: '每日日記',
      subtitle: '記錄生活點滴，培養感恩的心',
      writeJournal: '寫日記',
      titlePlaceholder: '標題（可選）',
      contentPlaceholder: '寫下你的想法...',
      inspirationPrompts: '靈感提示：',
      prompts: [
        '今天發生了什麼讓你感恩的事？',
        '你今天學到了什麼？',
        '今天有什麼值得慶祝的小事？',
        '什麼事情讓你感到快樂？',
        '你今天幫助了誰？'
      ],
      pastJournals: '過往日記',
      noJournals: '還沒有日記記錄',
      startWriting: '點擊上方按鈕開始寫日記吧！',
      confirmDelete: '確定要刪除這篇日記嗎？',
      benefits: {
        title: '寫日記的好處',
        items: [
          '幫助整理思緒和情緒',
          '培養感恩的心態',
          '記錄人生重要時刻',
          '促進自我反思和成長',
          '減輕壓力和焦慮',
          '提升幸福感'
        ]
      }
    },

    // Resources
    resources: {
      title: '資源庫',
      subtitle: '豐富的心理健康資源，全部都是真實可用的免費資源',
      categories: {
        articles: '文章',
        audio: '音頻',
        videos: '影片'
      },
      emergencyHotlines: '緊急求助專線',
      emergencySubtitle: '如果你需要立即協助，請撥打以下專線',
      hotlines: {
        suicide: {
          name: '全國自殺防治專線',
          number: '1925',
          description: '24小時免費諮詢服務'
        },
        lifeline: {
          name: '生命線',
          number: '1995',
          description: '24小時心理諮詢熱線'
        },
        teacher: {
          name: '張老師專線',
          number: '1980',
          description: '心理輔導與諮詢服務'
        }
      },
      importantNotice: '⚠️ 重要提醒：本應用提供的建議和資源僅供參考，不能替代專業醫療協助。如果你正經歷嚴重的心理健康問題或有自殺傾向，請立即尋求專業協助。',
      recommendedBooks: '推薦書籍',
      clickToView: '點擊書籍可前往博客來查看詳細資訊',
      otherResources: '其他實用資源'
    },

    // Layout
    layout: {
      keepCaring: '持續照顧自己'
    }
  },

  'en': {
    // Common
    common: {
      appName: 'Mindful Mind',
      appSlogan: 'Your personal mental health companion · Always here for you',
      start: 'Start',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success',
      confirm: 'Confirm',
      logout: 'Logout',
      login: 'Login',
      minutes: 'minutes',
      days: 'days',
      hours: 'hours',
    },

    // Navigation
    nav: {
      dashboard: 'Dashboard',
      aiAssistant: 'AI Assistant',
      moodTracker: 'Mood Tracker',
      meditation: 'Meditation',
      journal: 'Journal',
      resources: 'Resources',
      quiz: 'Mental Health Quiz',
    },

    // Home Page
    home: {
      title: 'Mindful Mind',
      subtitle: 'Your personal mental health companion · Always here for you',
      quizCTA: 'Test Your Mental Health Now',
      quizSubtitle: 'Just 2 minutes to understand your mental state!',
      startJourney: 'Start Your Wellness Journey',
      enterName: 'Enter your name',
      startNow: 'Get Started',
      termsNotice: 'By starting, you agree to our terms of service',
      loginError: 'Login failed, please try again later',
      features: {
        aiAssistant: {
          title: 'AI Mental Health Assistant',
          description: '24/7 chat with professional AI assistant for emotional support and advice'
        },
        moodTracking: {
          title: 'Mood Tracking',
          description: 'Record daily emotions, understand your mood patterns and triggers'
        },
        meditation: {
          title: 'Meditation & Breathing',
          description: 'Guided meditation and breathing exercises to help you relax'
        },
        journal: {
          title: 'Daily Journal',
          description: 'Record life moments, cultivate gratitude'
        },
        analytics: {
          title: 'Data Analytics',
          description: 'Visualize your mental health trends, track progress'
        },
        personalized: {
          title: 'Personalized Advice',
          description: 'Tailored health recommendations based on your needs'
        }
      },
      footer: {
        copyright: '© 2024 Mindful Mind. Caring for mental health with love and technology',
        disclaimer: '⚠️ This app cannot replace professional medical advice. Please seek professional help for serious mental health issues.'
      }
    },

    // Quiz Page
    quiz: {
      title: 'Mental Health Quiz',
      subtitle: 'Take 2 minutes to check on your mental health!',
      questionCount: '8 questions, quick and fun',
      quickTest: 'Quick Test',
      warmResult: 'Warm Results',
      privacy: 'Privacy Protected',
      startQuiz: 'Start Quiz',
      disclaimer: '⚠️ This quiz is for reference only, not a professional diagnosis',
      backToHome: 'Back to Home',
      questionProgress: 'Question {current} of {total}',
      viewResult: 'View Result',
      yourMentalState: '— Your Mental State is —',
      score: 'Quiz Score',
      continueReading: 'Continue Reading',
      warmTips: '✦ Warm Tips for You',
      urgentResources: '❤️ Important Resources & Support',
      startCaring: 'Start Your Mental Health Journey',
      retakeQuiz: 'Retake Quiz',
      resultDisclaimer: '⚠️ This result is for reference only. Please seek professional help if needed',
      questions: [
        {
          emoji: '😊',
          question: 'How has your overall mood been this past week?',
          options: [
            { text: 'Happy most of the time', emoji: '😄' },
            { text: 'Pretty good', emoji: '🙂' },
            { text: 'Up and down', emoji: '😐' },
            { text: 'Often feeling down', emoji: '😢' }
          ]
        },
        {
          emoji: '😴',
          question: 'How has your sleep quality been recently?',
          options: [
            { text: 'Sleeping well, feeling energetic', emoji: '😴' },
            { text: 'Generally sleeping okay', emoji: '🌙' },
            { text: 'Sometimes hard to fall asleep', emoji: '😵' },
            { text: 'Often having insomnia or poor sleep', emoji: '😫' }
          ]
        },
        {
          emoji: '💪',
          question: 'How do you usually cope with stress?',
          options: [
            { text: 'Can manage effectively, not much affected', emoji: '💪' },
            { text: 'Occasionally anxious, but can handle it', emoji: '🤔' },
            { text: 'Often feeling stressed', emoji: '😰' },
            { text: 'Stress feels overwhelming', emoji: '😵‍💫' }
          ]
        },
        {
          emoji: '👥',
          question: 'How are your relationships with people around you?',
          options: [
            { text: 'Great relationships, frequent communication', emoji: '🥰' },
            { text: 'Relationships are pretty good', emoji: '😊' },
            { text: 'Sometimes feel lonely', emoji: '🥺' },
            { text: 'Often feel isolated', emoji: '😔' }
          ]
        },
        {
          emoji: '⚡',
          question: 'How is your interest and motivation for daily activities?',
          options: [
            { text: 'Full of passion and energy', emoji: '🔥' },
            { text: 'Still interested in most things', emoji: '✨' },
            { text: 'Not feeling motivated for many things', emoji: '😑' },
            { text: 'Not interested in anything', emoji: '😶' }
          ]
        },
        {
          emoji: '🧘',
          question: 'Do you have self-care habits? (exercise, rest, hobbies)',
          options: [
            { text: 'Have regular self-care routines', emoji: '🧘' },
            { text: 'Occasionally do relaxing things', emoji: '🎵' },
            { text: 'Rarely have time for self-care', emoji: '😅' },
            { text: 'Not at all', emoji: '😞' }
          ]
        },
        {
          emoji: '🎯',
          question: 'How do you feel about your future?',
          options: [
            { text: 'Full of hope and anticipation', emoji: '🌟' },
            { text: 'Generally optimistic', emoji: '😌' },
            { text: 'Some worries', emoji: '😟' },
            { text: 'Feeling hopeless or lost', emoji: '😢' }
          ]
        },
        {
          emoji: '💭',
          question: 'How often do you have negative thoughts?',
          options: [
            { text: 'Rarely have negative thoughts', emoji: '😊' },
            { text: 'Occasionally', emoji: '🤷' },
            { text: 'Frequently', emoji: '😔' },
            { text: 'Almost every day', emoji: '😢' }
          ]
        }
      ],
      results: {
        sunshine: {
          title: 'Sunshine Baby',
          emoji: '☀️',
          description: 'Amazing! Your mental health is excellent!',
          detail: 'Like warm sunshine, you radiate positive energy! You have excellent emotional management skills and can positively face life\'s challenges. You maintain good relationships with those around you and are full of enthusiasm for life. Keep up this wonderful state, and don\'t forget to reward yourself occasionally!',
          tips: [
            { title: 'Continue Self-Care', content: 'Maintain regular sleep, exercise habits, and healthy eating - these are foundations for staying well' },
            { title: 'Share Your Light', content: 'Your positive energy can inspire others. Try caring for friends who need help' },
            { title: 'Set New Goals', content: 'When you\'re in a good state, it\'s the best time to try new things. Set some small goals!' },
            { title: 'Record Happy Moments', content: 'Write down happy things. When you hit low points, you can look back at these memories' },
            { title: 'Practice Gratitude', content: 'Take time each day to appreciate the small joys in life, multiplying your happiness' }
          ],
          encouragement: 'You are everyone\'s little sun, keep shining!'
        },
        sunny: {
          title: 'Sunny Doll',
          emoji: '🌤️',
          description: 'Great! Your mental health is generally good!',
          detail: 'Like a sunny doll, you\'re working to bring good weather to yourself! Life inevitably has some small pressures and worries, but you show good resilience. Feeling tired or slightly anxious sometimes is normal - what matters is you know how to take care of yourself. Remember, taking care of yourself helps you better face life\'s challenges!',
          tips: [
            { title: 'Practice Relaxation', content: 'Learn deep breathing, progressive muscle relaxation, or simple meditation - just 5-10 minutes daily' },
            { title: 'Maintain Social Connections', content: 'Regularly chat with friends and family. Social support is important for mental health' },
            { title: 'Cultivate Hobbies', content: 'Find an activity that makes you happy - reading, painting, gardening, or sports' },
            { title: 'Set Healthy Boundaries', content: 'Learn to say "no" and don\'t take on too much pressure and responsibility' },
            { title: 'Regular Sleep', content: 'Ensure 7-8 hours of quality sleep daily. This is crucial for emotional stability' },
            { title: 'Connect with Nature', content: 'Find time each week to go outdoors, enjoy the sun and fresh air' }
          ],
          encouragement: 'You\'re taking great care of yourself, keep it up!'
        },
        cloudy: {
          title: 'Rain Fairy',
          emoji: '🌧️',
          description: 'Dear one, you\'ve been working hard lately',
          detail: 'Like a rain fairy, you might be going through a time that needs gentle care. Feeling tired, stressed, or low is completely normal - please don\'t blame yourself. Everyone needs rest sometimes, and admitting you need help is brave. The most important thing now is to take good care of yourself. Remember, rainy days have their own beauty, and there\'s always a rainbow after the rain.',
          tips: [
            { title: 'Give Yourself Space', content: 'Reserve at least 15-30 minutes daily just for yourself, doing anything that relaxes you' },
            { title: 'Share Your Feelings', content: 'Find a trusted friend, family member, or professional. Talk it out, don\'t carry it alone' },
            { title: 'Lower Your Standards', content: 'Now is not the time for perfection. Done is better than perfect. Be gentle with yourself' },
            { title: 'Care for Basic Needs', content: 'Make sure you\'re eating, drinking water, and sleeping. Physical care is the foundation of mental health' },
            { title: 'Try Mood Tracking', content: 'Use our mood tracking feature to record daily feelings and understand your emotional patterns' },
            { title: 'Try Meditation', content: 'Spend 5 minutes daily on simple meditation or deep breathing to calm anxiety' },
            { title: 'Reduce Negative Info', content: 'Temporarily reduce exposure to stressful news or social media content' }
          ],
          encouragement: 'There\'s always a rainbow after the rain. We\'re here with you!'
        },
        stormy: {
          title: 'Storm Warrior',
          emoji: '⛈️',
          description: 'Dear warrior, thank you for facing this',
          detail: 'You\'re going through a very difficult time, and completing this quiz itself shows courage. Like a warrior standing in a storm, you\'re stronger than you think. But even the bravest warriors need companions and rest. Remember, seeking help is not weakness - it\'s the greatest act of self-love. You don\'t have to face this alone. Many people are willing to listen, support, and walk with you.',
          tips: [
            { title: '📞 Crisis Hotline (US)', content: '988 - Free 24/7 Suicide & Crisis Lifeline with trained counselors' },
            { title: '📞 Crisis Text Line', content: 'Text HOME to 741741 for free 24/7 crisis support' },
            { title: '📞 SAMHSA Helpline', content: '1-800-662-4357 - Free 24/7 mental health referral service' },
            { title: 'Seek Professional Help', content: 'Consider booking with a therapist or psychiatrist. Professional help can speed recovery' },
            { title: 'Tell Someone You Trust', content: 'Let at least one person know your situation. Don\'t bear this alone' },
            { title: 'Take Action Now', content: 'If you\'re reading this, please call one of the hotlines above or tell someone you need help' }
          ],
          encouragement: 'You\'re brave, you\'re not alone, we\'re all here supporting you!'
        }
      }
    },

    // Dashboard
    dashboard: {
      welcome: 'Welcome back, {name}!',
      subtitle: 'This is your mental health dashboard',
      journalEntries: 'Journal Entries',
      streakDays: 'Streak Days',
      averageMood: 'Average Mood',
      meditationTime: 'Meditation Time',
      moodTrend: 'Mood Trend (Last 7 Days)',
      whatToDo: 'What would you like to do today?',
      chatWithAI: 'Chat with AI',
      shareThoughts: 'Share your thoughts and feelings',
      recordMood: 'Record Mood',
      trackEmotions: 'Track your emotional state',
      startMeditation: 'Start Meditation',
      findPeace: 'Relax and find inner peace',
      motivation: '"Taking care of your mind is the best gift you can give yourself." 💝',
      keepCaring: 'Keep caring for yourself',
    },

    // Chat
    chat: {
      title: 'AI Mental Assistant',
      subtitle: 'Always here to support and advise you',
      welcomeMessage: 'Hello {name}! I\'m your mental health assistant. I\'m here to listen to your thoughts and feelings, and provide support and advice. How can I help you?',
      placeholder: 'Type your thoughts or questions...',
      quickPrompts: 'Quick prompts:',
      errorMessage: 'Sorry, I can\'t respond right now. Please try again later.',
      prompts: [
        'I feel anxious, what should I do?',
        'How can I improve my sleep quality?',
        'Guide me through a breathing exercise',
        'I need some positive energy',
      ]
    },

    // Mood Tracker
    moodTracker: {
      title: 'Mood Tracker',
      subtitle: 'Record your mood, understand your emotional patterns',
      howAreYou: 'How are you feeling today?',
      moods: {
        veryGood: 'Very Good',
        good: 'Good',
        neutral: 'Neutral',
        notGood: 'Not Great',
        bad: 'Bad'
      },
      relatedTags: 'Related Tags (optional)',
      tags: ['Work', 'Family', 'Friends', 'Health', 'Exercise', 'Sleep', 'Diet', 'Anxiety', 'Stress', 'Happy'],
      notePlaceholder: 'Write some thoughts or what happened (optional)...',
      saveRecord: 'Save Record',
      history: 'History',
      noRecords: 'No records yet. Start recording your first mood!'
    },

    // Meditation
    meditation: {
      title: 'Meditation & Breathing',
      subtitle: 'Relax your body and mind, find inner peace',
      selectDuration: 'Select Duration',
      durations: {
        '3min': '3 minutes',
        '5min': '5 minutes',
        '10min': '10 minutes',
        '15min': '15 minutes'
      },
      start: 'Start',
      pause: 'Pause',
      reset: 'Reset',
      breathe: {
        inhale: 'Breathe in deeply...',
        hold: 'Hold your breath...',
        exhale: 'Breathe out slowly...'
      },
      guided: 'Guided Meditations',
      guidedItems: [
        { title: 'Morning Awakening', description: 'Start your day with a calm mind', duration: '5 min', icon: '🌅' },
        { title: 'Stress Release', description: 'Release tension, restore inner balance', duration: '10 min', icon: '🌊' },
        { title: 'Deep Relaxation', description: 'Complete relaxation and healing', duration: '15 min', icon: '🌙' },
        { title: 'Gratitude Practice', description: 'Cultivate a grateful mindset', duration: '7 min', icon: '💝' }
      ],
      tips: {
        title: 'Meditation Tips',
        items: [
          'Find a quiet, comfortable place',
          'Maintain a comfortable sitting or lying position',
          'Focus on your breathing',
          'Don\'t force yourself, let it flow naturally',
          'Practice daily for better results'
        ]
      },
      complete: 'Congratulations on completing meditation! 🎉'
    },

    // Journal
    journal: {
      title: 'Daily Journal',
      subtitle: 'Record life moments, cultivate gratitude',
      writeJournal: 'Write Journal',
      titlePlaceholder: 'Title (optional)',
      contentPlaceholder: 'Write your thoughts...',
      inspirationPrompts: 'Inspiration prompts:',
      prompts: [
        'What happened today that you\'re grateful for?',
        'What did you learn today?',
        'What small wins are worth celebrating today?',
        'What made you happy?',
        'Who did you help today?'
      ],
      pastJournals: 'Past Journals',
      noJournals: 'No journal entries yet',
      startWriting: 'Click the button above to start writing!',
      confirmDelete: 'Are you sure you want to delete this journal entry?',
      benefits: {
        title: 'Benefits of Journaling',
        items: [
          'Helps organize thoughts and emotions',
          'Cultivates gratitude',
          'Records important life moments',
          'Promotes self-reflection and growth',
          'Reduces stress and anxiety',
          'Increases happiness'
        ]
      }
    },

    // Resources
    resources: {
      title: 'Resource Library',
      subtitle: 'Rich mental health resources, all real and free',
      categories: {
        articles: 'Articles',
        audio: 'Audio',
        videos: 'Videos'
      },
      emergencyHotlines: 'Emergency Hotlines',
      emergencySubtitle: 'If you need immediate help, please call these numbers',
      hotlines: {
        suicide: {
          name: 'National Suicide Prevention Lifeline',
          number: '988',
          description: '24/7 free crisis counseling'
        },
        lifeline: {
          name: 'Crisis Text Line',
          number: 'Text HOME to 741741',
          description: '24/7 free text support'
        },
        teacher: {
          name: 'SAMHSA Helpline',
          number: '1-800-662-4357',
          description: 'Mental health referral service'
        }
      },
      importantNotice: '⚠️ Important: The advice and resources provided by this app are for reference only and cannot replace professional medical help. If you are experiencing serious mental health issues or suicidal thoughts, please seek professional help immediately.',
      recommendedBooks: 'Recommended Books',
      clickToView: 'Click on books to view details on Amazon',
      otherResources: 'Other Useful Resources'
    },

    // Layout
    layout: {
      keepCaring: 'Keep caring for yourself'
    }
  }
}

// Helper function to get translation
export const getTranslation = (lang, key) => {
  const keys = key.split('.')
  let result = translations[lang]
  for (const k of keys) {
    if (result && result[k]) {
      result = result[k]
    } else {
      return key // Return the key if translation not found
    }
  }
  return result
}

// Helper function to interpolate variables in translations
export const interpolate = (str, vars) => {
  if (typeof str !== 'string') return str
  return str.replace(/\{(\w+)\}/g, (match, key) => vars[key] || match)
}

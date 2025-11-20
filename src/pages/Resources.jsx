import React from 'react'
import { BookOpen, Headphones, Video, ExternalLink, Heart } from 'lucide-react'

const Resources = () => {
  const resources = [
    {
      category: '文章',
      icon: BookOpen,
      color: 'from-mindful-purple to-mindful-blue',
      items: [
        {
          title: '心理健康司 - 衛生福利部',
          description: '官方心理健康資源與政策說明，包含各種心理健康資訊。',
          link: 'https://dep.mohw.gov.tw/DOMHAOH/mp-107.html'
        },
        {
          title: '心理健康促進專區',
          description: '衛福部提供的完整心理健康促進資訊與文章。',
          link: 'https://dep.mohw.gov.tw/DOMHAOH/np-326-107.html'
        },
        {
          title: '15-45歲心理諮商補助方案',
          description: '政府提供3次免費心理諮商，最高補助4800元。',
          link: 'https://mohw.gov.tw/cp-16-79502-1.html'
        },
        {
          title: '各縣市心理諮商機構查詢',
          description: '查詢全台合作的心理諮商機構名單與聯絡資訊。',
          link: 'https://dep.mohw.gov.tw/DOMHAOH/cp-6608-74985-107.html'
        }
      ]
    },
    {
      category: '音頻',
      icon: Headphones,
      color: 'from-mindful-blue to-mindful-green',
      items: [
        {
          title: 'YouTube: 中文正念冥想 10分鐘',
          description: '搜尋「正念冥想 10分鐘」可找到大量免費中文冥想音頻。',
          link: 'https://www.youtube.com/results?search_query=%E6%AD%A3%E5%BF%B5%E5%86%A5%E6%83%B3+10%E5%88%86%E9%90%98'
        },
        {
          title: 'YouTube: 睡前放鬆冥想',
          description: '幫助入睡的中文引導冥想音頻。',
          link: 'https://www.youtube.com/results?search_query=%E7%9D%A1%E5%89%8D%E5%86%A5%E6%83%B3+%E4%B8%AD%E6%96%87'
        },
        {
          title: 'YouTube: 呼吸練習引導',
          description: '各種呼吸放鬆技巧的教學影片。',
          link: 'https://www.youtube.com/results?search_query=%E5%91%BC%E5%90%B8%E7%B7%B4%E7%BF%92+%E6%94%BE%E9%AC%86'
        },
        {
          title: 'Spotify: 冥想音樂播放清單',
          description: 'Spotify 上的免費冥想和放鬆音樂。',
          link: 'https://open.spotify.com/search/%E5%86%A5%E6%83%B3%E9%9F%B3%E6%A8%82'
        }
      ]
    },
    {
      category: '影片',
      icon: Video,
      color: 'from-mindful-green to-mindful-pink',
      items: [
        {
          title: 'TED: 如何讓壓力成為你的朋友',
          description: 'Kelly McGonigal 博士的精彩演講（中文字幕）。',
          link: 'https://www.ted.com/talks/kelly_mcgonigal_how_to_make_stress_your_friend?language=zh-tw'
        },
        {
          title: 'TED: 憂鬱的祕密',
          description: 'Andrew Solomon 分享對抗憂鬱的深刻見解。',
          link: 'https://www.ted.com/talks/andrew_solomon_depression_the_secret_we_share?language=zh-tw'
        },
        {
          title: 'YouTube: 初學者瑜伽教學',
          description: '搜尋適合初學者的瑜伽和伸展練習影片。',
          link: 'https://www.youtube.com/results?search_query=%E5%88%9D%E5%AD%B8%E8%80%85%E7%91%9C%E4%BC%BD+%E4%B8%AD%E6%96%87'
        },
        {
          title: 'Coursera: 幸福的科學',
          description: 'Yale 大學免費線上課程，學習提升幸福感的科學方法。',
          link: 'https://www.coursera.org/learn/the-science-of-well-being'
        }
      ]
    }
  ]

  const helplines = [
    {
      name: '全國自殺防治專線',
      number: '1925',
      description: '24小時免費諮詢服務',
      link: 'https://www.mohw.gov.tw/cp-88-237-1.html'
    },
    {
      name: '生命線',
      number: '1995',
      description: '24小時心理諮詢熱線',
      link: 'https://www.life1995.org.tw/'
    },
    {
      name: '張老師專線',
      number: '1980',
      description: '心理輔導與諮詢服務',
      link: 'https://www.1980.org.tw/'
    }
  ]

  const books = [
    {
      title: '被討厭的勇氣',
      author: '岸見一郎',
      emoji: '📘',
      link: 'https://www.books.com.tw/products/0010653153'
    },
    {
      title: '原子習慣',
      author: 'James Clear',
      emoji: '📗',
      link: 'https://www.books.com.tw/products/0010822522'
    },
    {
      title: '情緒勒索',
      author: '周慕姿',
      emoji: '📙',
      link: 'https://www.books.com.tw/products/0010742389'
    },
    {
      title: '也許你該找人聊聊',
      author: 'Lori Gottlieb',
      emoji: '📕',
      link: 'https://www.books.com.tw/products/0010849326'
    }
  ]

  const handleLinkClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-mindful-green" />
          <h1 className="text-3xl font-bold">資源庫</h1>
        </div>
        <p className="text-gray-600">豐富的心理健康資源，全部都是真實可用的免費資源</p>
      </div>

      {/* Resources by Category */}
      {resources.map((category, idx) => {
        const Icon = category.icon
        return (
          <div key={idx} className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold">{category.category}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {category.items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleLinkClick(item.link)}
                  className="bg-white/50 rounded-xl p-4 hover:shadow-lg transition-all group cursor-pointer text-left w-full"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold group-hover:text-mindful-purple transition-colors flex-1">
                      {item.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-mindful-purple transition-colors ml-2 flex-shrink-0" />
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </button>
              ))}
            </div>
          </div>
        )
      })}

      {/* Help Lines */}
      <div className="glass-card p-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-8 h-8 text-red-500" />
          <div>
            <h2 className="text-xl font-semibold text-red-900">緊急求助專線</h2>
            <p className="text-sm text-red-700">如果你需要立即協助，請撥打以下專線</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {helplines.map((helpline, index) => (
            <button
              key={index}
              onClick={() => handleLinkClick(helpline.link)}
              className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all"
            >
              <h3 className="font-semibold mb-2">{helpline.name}</h3>
              <div className="text-3xl font-bold text-red-600 mb-2">{helpline.number}</div>
              <p className="text-sm text-gray-600 mb-2">{helpline.description}</p>
              <ExternalLink className="w-4 h-4 mx-auto text-gray-400" />
            </button>
          ))}
        </div>

        <div className="mt-4 p-4 bg-red-100 rounded-xl">
          <p className="text-sm text-red-900">
            <strong>⚠️ 重要提醒：</strong>
            本應用提供的建議和資源僅供參考，不能替代專業醫療協助。
            如果你正經歷嚴重的心理健康問題或有自殺傾向，請立即尋求專業協助。
          </p>
        </div>
      </div>

      {/* Recommended Books */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">推薦書籍</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {books.map((book, index) => (
            <button
              key={index}
              onClick={() => handleLinkClick(book.link)}
              className="bg-white/50 rounded-xl p-4 hover:shadow-lg transition-all text-center w-full"
            >
              <div className="text-4xl mb-2">{book.emoji}</div>
              <h3 className="font-semibold text-sm mb-1">{book.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{book.author}</p>
              <ExternalLink className="w-3 h-3 mx-auto text-gray-400" />
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center">
          點擊書籍可前往博客來查看詳細資訊
        </p>
      </div>

      {/* Additional Resources */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">其他實用資源</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => handleLinkClick('https://www.commonhealth.com.tw/channel/category/4')}
            className="bg-white/50 rounded-xl p-4 hover:shadow-lg transition-all text-left"
          >
            <h3 className="font-semibold mb-2">康健雜誌 - 心靈健康專區</h3>
            <p className="text-sm text-gray-600 mb-2">專業的心理健康文章和最新研究</p>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </button>

          <button
            onClick={() => handleLinkClick('https://www.calm.com/')}
            className="bg-white/50 rounded-xl p-4 hover:shadow-lg transition-all text-left"
          >
            <h3 className="font-semibold mb-2">Calm App</h3>
            <p className="text-sm text-gray-600 mb-2">熱門冥想和睡眠應用程式（部分免費）</p>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </button>

          <button
            onClick={() => handleLinkClick('https://www.headspace.com/')}
            className="bg-white/50 rounded-xl p-4 hover:shadow-lg transition-all text-left"
          >
            <h3 className="font-semibold mb-2">Headspace</h3>
            <p className="text-sm text-gray-600 mb-2">引導式冥想和正念練習（部分免費）</p>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </button>

          <button
            onClick={() => handleLinkClick('https://www.mohw.gov.tw/cp-16-38547-1.html')}
            className="bg-white/50 rounded-xl p-4 hover:shadow-lg transition-all text-left"
          >
            <h3 className="font-semibold mb-2">衛福部心理健康資源</h3>
            <p className="text-sm text-gray-600 mb-2">政府提供的完整心理健康資訊</p>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Resources

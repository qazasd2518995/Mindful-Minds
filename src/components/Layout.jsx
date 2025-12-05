import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  Home, MessageCircle, Heart, Compass, BookOpen,
  BarChart3, Menu, X, LogOut
} from 'lucide-react'
import LanguageToggle from './LanguageToggle'
import { useTranslation } from '../hooks/useTranslation'

const Layout = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { t } = useTranslation()

  const menuItems = [
    { path: '/dashboard', icon: Home, label: t('nav.dashboard') },
    { path: '/chat', icon: MessageCircle, label: t('nav.aiAssistant') },
    { path: '/mood', icon: Heart, label: t('nav.moodTracker') },
    { path: '/meditation', icon: Compass, label: t('nav.meditation') },
    { path: '/journal', icon: BookOpen, label: t('nav.journal') },
    { path: '/resources', icon: BarChart3, label: t('nav.resources') },
  ]

  const handleLogout = () => {
    localStorage.removeItem('mindful-user')
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 glass-card m-4 p-6 transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-mindful-purple to-mindful-blue rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-mindful-purple to-mindful-blue bg-clip-text text-transparent">
              Mindful Mind
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Language Toggle */}
        <div className="mb-4">
          <LanguageToggle className="w-full justify-center" />
        </div>

        {/* User Profile */}
        <div className="mb-8 p-4 bg-gradient-to-r from-mindful-purple/10 to-mindful-blue/10 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-mindful-purple to-mindful-blue rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold">{user?.username}</p>
              <p className="text-xs text-gray-500">{t('layout.keepCaring')}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive
                    ? 'bg-gradient-to-r from-mindful-purple to-mindful-blue text-white shadow-lg'
                    : 'hover:bg-white/50 text-gray-700'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-auto pt-6 flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">{t('common.logout')}</span>
        </button>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-3 glass-card rounded-xl"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <Outlet />
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}
    </div>
  )
}

export default Layout

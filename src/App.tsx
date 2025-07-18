import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Dashboard } from '@/pages/Dashboard'
import { Settings } from '@/pages/Settings'
import { blink } from '@/blink/client'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Khazanah Portfolio Analytics...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Khazanah Portfolio Analytics</h1>
          <p className="text-gray-600 mb-6">
            Please sign in to access the portfolio performance dashboard and analytics tools.
          </p>
          <button
            onClick={() => blink.auth.login()}
            className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'portfolio':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Portfolio Overview</h2>
            <p className="text-gray-600">Detailed portfolio overview coming soon...</p>
          </div>
        )
      case 'performance':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Performance Analytics</h2>
            <p className="text-gray-600">Advanced performance analytics coming soon...</p>
          </div>
        )
      case 'allocation':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Asset Allocation</h2>
            <p className="text-gray-600">Detailed asset allocation analysis coming soon...</p>
          </div>
        )
      case 'risk':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Risk Analysis</h2>
            <p className="text-gray-600">Comprehensive risk analysis coming soon...</p>
          </div>
        )
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="khazanah-theme">
      <div className="min-h-screen bg-background transition-colors duration-300">
        <div className="flex">
          {/* Sidebar */}
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          
          {/* Main Content */}
          <div className="flex-1 lg:ml-64">
            <main className="p-6">
              {renderContent()}
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
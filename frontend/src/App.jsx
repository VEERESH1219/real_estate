import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { useState, createContext, useContext } from 'react'
import LandsPage from './pages/LandsPage'
import PlotsPage from './pages/PlotsPage'
import Plot3DPage from './pages/Plot3DPage'
import LoginPage from './pages/LoginPage'

const AuthContext = createContext(null)

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext)
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

function PageWrapper({ children }) {
  return (
    <div className="page-transition">
      {children}
    </div>
  )
}

function AppContent() {
  const [user, setUser] = useState(null)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setShowLogoutConfirm(true)
    setLoggingOut(true)
    setTimeout(() => {
      setUser(null)
      setShowLogoutConfirm(false)
      setLoggingOut(false)
    }, 2000)
  }

  const cancelLogout = () => {
    setShowLogoutConfirm(false)
    setLoggingOut(false)
  }

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
      <div className="min-h-screen">
        <style>{`
          .page-transition {
            animation: pageIn 0.4s ease-out;
          }
          @keyframes pageIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .nav-bar {
            margin: 16px 24px;
            background: linear-gradient(145deg, #ffffff, #e6e6e6);
            border-radius: 20px;
            box-shadow: 
              8px 8px 16px rgba(163, 177, 198, 0.5),
              -8px -8px 16px rgba(255, 255, 255, 0.8);
            animation: navSlide 0.5s ease-out;
          }

          @keyframes navSlide {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .nav-content {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 64px;
          }

          .nav-logo {
            font-size: 20px;
            font-weight: 700;
            color: #333;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
          }

          .nav-logo:hover {
            transform: scale(1.05);
            color: #667eea;
          }

          .nav-logo::before {
            content: '🏠';
          }

          .nav-right {
            display: flex;
            align-items: center;
            gap: 16px;
          }

          .welcome-text {
            font-size: 14px;
            color: #666;
            display: flex;
            align-items: center;
            gap: 8px;
            animation: fadeIn 0.5s ease-out 0.2s both;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .welcome-text::before {
            content: '👋';
            animation: wave 1s ease-in-out infinite;
          }

          @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(20deg); }
            75% { transform: rotate(-20deg); }
          }

          .logout-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 12px;
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            animation: btnSlide 0.5s ease-out 0.3s both;
          }

          @keyframes btnSlide {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }

          .logout-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
          }

          .logout-btn:active {
            transform: scale(0.95);
          }

          .logout-btn::before {
            content: '🚪';
          }

          .logout-btn.logging-out::before {
            animation: doorOpen 0.5s ease-out forwards;
          }

          @keyframes doorOpen {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(90deg); opacity: 0; }
          }

          .logout-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15, 12, 41, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: overlayFade 0.3s ease;
          }

          @keyframes overlayFade {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .logout-card {
            background: white;
            border-radius: 30px;
            padding: 40px 50px;
            text-align: center;
            animation: cardPop 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }

          @keyframes cardPop {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }

          .logout-icon {
            width: 100px;
            height: 100px;
            margin: 0 auto 25px;
            position: relative;
          }

          .door-animation {
            width: 60px;
            height: 80px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 8px 8px 0 0;
            margin: 0 auto;
            position: relative;
            transform-style: preserve-3d;
            animation: doorSwing 1s ease-in-out infinite;
          }

          @keyframes doorSwing {
            0%, 100% { transform: perspective(500px) rotateY(-20deg); }
            50% { transform: perspective(500px) rotateY(20deg); }
          }

          .door-animation::after {
            content: '';
            position: absolute;
            right: 10px;
            top: 35px;
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
          }

          .logout-title {
            font-size: 24px;
            font-weight: 700;
            color: #333;
            margin-bottom: 10px;
          }

          .logout-subtitle {
            color: #666;
            font-size: 14px;
          }

          .logout-dots {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 20px;
          }

          .logout-dot {
            width: 10px;
            height: 10px;
            background: #667eea;
            border-radius: 50%;
            animation: dotPulse 1.4s ease-in-out infinite;
          }

          .logout-dot:nth-child(2) { animation-delay: 0.2s; }
          .logout-dot:nth-child(3) { animation-delay: 0.4s; }

          @keyframes dotPulse {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
            40% { transform: scale(1); opacity: 1; }
          }
        `}</style>

        {showLogoutConfirm && (
          <div className="logout-overlay">
            <div className="logout-card">
              <div className="logout-icon">
                <div className="door-animation"></div>
              </div>
              <h2 className="logout-title">Logging Out</h2>
              <p className="logout-subtitle">See you soon!</p>
              <div className="logout-dots">
                <span className="logout-dot"></span>
                <span className="logout-dot"></span>
                <span className="logout-dot"></span>
              </div>
            </div>
          </div>
        )}

        {user && (
          <nav className="nav-bar">
            <div className="nav-content">
              <Link to="/" className="nav-logo">Real Estate</Link>
              <div className="nav-right">
                <span className="welcome-text">Welcome, {user.name}</span>
                <button 
                  onClick={handleLogout}
                  className={`logout-btn ${loggingOut ? 'logging-out' : ''}`}
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        )}
        
        <Routes>
          <Route path="/login" element={
            user ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <PageWrapper><LandsPage /></PageWrapper>
            </ProtectedRoute>
          } />
          <Route path="/lands/:landId/plots" element={
            <ProtectedRoute>
              <PageWrapper><PlotsPage /></PageWrapper>
            </ProtectedRoute>
          } />
          <Route path="/plots/:plotId/3d" element={
            <ProtectedRoute>
              <PageWrapper><Plot3DPage /></PageWrapper>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </AuthContext.Provider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App

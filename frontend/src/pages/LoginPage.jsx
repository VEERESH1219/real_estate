import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(null)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [btnClicked, setBtnClicked] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setBtnClicked(true)

    if (email === 'admin@realestate.com' && password === 'admin123') {
      setTimeout(() => {
        setLoginSuccess(true)
        setTimeout(() => {
          onLogin({ name: 'Admin User', email })
          navigate('/')
        }, 2500)
      }, 2000)
    } else {
      setTimeout(() => {
        setError('Invalid credentials. Try admin@realestate.com / admin123')
        setLoading(false)
        setBtnClicked(false)
      }, 1000)
    }
  }

  return (
    <div className="login-page">
      <div className="background-effects">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`floating-element el-${i % 6}`}></div>
        ))}
      </div>

      {loginSuccess && (
        <div className="success-overlay">
          <div className="success-container">
            <div className="success-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
            <div className="success-icon">
              <div className="icon-circle">
                <div className="icon-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="success-text-content">
              <h2 className="success-title">Login Successful</h2>
              <p className="success-subtitle">Welcome to Real Estate</p>
            </div>
            <div className="success-particles">
              {[...Array(20)].map((_, i) => (
                <span key={i} className="confetti"></span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="login-wrapper">
        <div className="login-card">
          <div className="card-glow"></div>
          
          <div className="login-header">
            <div className="logo-wrapper">
              <div className="logo">
                <div className="house">
                  <div className="roof"></div>
                  <div className="body">
                    <div className="door"></div>
                    <div className="windows">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
                <div className="sparkles">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
            <h1 className="title">Real Estate</h1>
            <p className="subtitle">Your dream property awaits</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-toast">{error}</div>}

            <div className="input-container">
              <label>Email Address</label>
              <div className={`input-field ${focused === 'email' ? 'active' : ''} ${email ? 'has-value' : ''}`}>
                <span className="field-icon">✉</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="admin@realestate.com"
                  required
                />
                <span className="field-line"></span>
              </div>
            </div>

            <div className="input-container">
              <label>Password</label>
              <div className={`input-field ${focused === 'password' ? 'active' : ''} ${password ? 'has-value' : ''}`}>
                <span className="field-icon">🔒</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••"
                  required
                />
                <span className="field-line"></span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || loginSuccess}
              className={`submit-btn ${loading ? 'loading' : ''} ${btnClicked ? 'clicked' : ''}`}
            >
              <span className="btn-bg"></span>
              <span className="btn-particles">
                {[...Array(12)].map((_, i) => (
                  <span key={i} className="particle-btn"></span>
                ))}
              </span>
              <span className="btn-text">
                {loading ? (
                  <>
                    <span className="btn-spinner"></span>
                    Authenticating
                  </>
                ) : (
                  <>
                    Sign In
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="login-footer">
            <div className="footer-line"></div>
            <p className="demo-text">
              <span>Demo Access</span>
              <small>admin@realestate.com / admin123</small>
            </p>
          </div>
        </div>

        <div className="welcome-text">
          <div className="welcome-content">
            <div className="welcome-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>
            <h2 className="welcome-line">
              <span className="word">Find</span>
              <span className="word">Your</span>
            </h2>
            <h2 className="welcome-line highlight">
              <span className="word">Perfect</span>
              <span className="word">Home</span>
            </h2>
            <div className="welcome-features">
              <div className="feature">
                <span className="feature-icon">🏠</span>
                <span>3D View</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🗺️</span>
                <span>Map View</span>
              </div>
              <div className="feature">
                <span className="feature-icon">📍</span>
                <span>GPS Location</span>
              </div>
            </div>
            <p className="welcome-desc">Explore thousands of properties with immersive 3D visualization</p>
          </div>
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f0c29;
          background: linear-gradient(to bottom, #24243e, #302b63, #0f0c29);
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        .background-effects {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: orbFloat 20s infinite ease-in-out;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: rgba(102, 126, 234, 0.4);
          top: -100px;
          left: -100px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 300px;
          height: 300px;
          background: rgba(118, 75, 162, 0.4);
          bottom: -50px;
          right: -50px;
          animation-delay: -5s;
        }

        .orb-3 {
          width: 250px;
          height: 250px;
          background: rgba(102, 126, 234, 0.3);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -10s;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 30px) scale(1.05); }
        }

        .floating-element {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: floatElem 15s infinite linear;
        }

        .el-0 { width: 10px; height: 10px; left: 10%; animation-duration: 12s; }
        .el-1 { width: 6px; height: 6px; left: 20%; animation-duration: 15s; animation-delay: 1s; }
        .el-2 { width: 8px; height: 8px; left: 30%; animation-duration: 18s; animation-delay: 2s; }
        .el-3 { width: 12px; height: 12px; left: 40%; animation-duration: 14s; animation-delay: 3s; }
        .el-4 { width: 5px; height: 5px; left: 50%; animation-duration: 16s; animation-delay: 4s; }
        .el-5 { width: 7px; height: 7px; left: 60%; animation-duration: 13s; animation-delay: 5s; }

        @keyframes floatElem {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }

        .login-wrapper {
          display: flex;
          align-items: center;
          gap: 60px;
          z-index: 10;
          max-width: 900px;
          width: 100%;
        }

        .welcome-text {
          flex: 1;
          color: white;
          animation: slideInLeft 0.8s ease-out;
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .welcome-content {
          position: relative;
        }

        .welcome-shapes {
          position: absolute;
          top: -30px;
          left: -30px;
          width: 200px;
          height: 200px;
          pointer-events: none;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          animation: shapeFloat 6s ease-in-out infinite;
        }

        .shape-1 {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
          top: 0;
          left: 0;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, rgba(240, 147, 251, 0.3), rgba(102, 126, 234, 0.3));
          top: 60px;
          left: 100px;
          animation-delay: 1s;
        }

        .shape-3 {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(240, 147, 251, 0.3));
          top: 100px;
          left: 30px;
          animation-delay: 2s;
        }

        @keyframes shapeFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(10px, -10px) rotate(10deg); }
          66% { transform: translate(-5px, 10px) rotate(-5deg); }
        }

        .welcome-line {
          display: flex;
          gap: 16px;
          font-size: 52px;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 8px;
        }

        .welcome-line .word {
          display: inline-block;
          animation: wordReveal 0.8s ease-out both;
        }

        .welcome-line .word:nth-child(1) { animation-delay: 0.1s; }
        .welcome-line .word:nth-child(2) { animation-delay: 0.2s; }

        @keyframes wordReveal {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .welcome-line.highlight .word {
          background: linear-gradient(135deg, #667eea, #f093fb, #ffd700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite, wordReveal 0.8s ease-out both;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .welcome-features {
          display: flex;
          gap: 20px;
          margin: 30px 0;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: featureSlide 0.5s ease-out both;
        }

        .feature:nth-child(1) { animation-delay: 0.4s; }
        .feature:nth-child(2) { animation-delay: 0.5s; }
        .feature:nth-child(3) { animation-delay: 0.6s; }

        @keyframes featureSlide {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .feature-icon {
          font-size: 20px;
          animation: iconBounce 2s ease-in-out infinite;
        }

        .feature:nth-child(1) .feature-icon { animation-delay: 0s; }
        .feature:nth-child(2) .feature-icon { animation-delay: 0.3s; }
        .feature:nth-child(3) .feature-icon { animation-delay: 0.6s; }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .feature span:last-child {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
        }

        .welcome-desc {
          font-size: 18px;
          opacity: 0.8;
          max-width: 400px;
          animation: fadeInUp 0.5s ease-out 0.7s both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 0.8; transform: translateY(0); }
        }

        .login-card {
          flex: 0 0 420px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 30px;
          padding: 45px;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          animation: slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 50%);
          animation: glowPulse 4s infinite ease-in-out;
          pointer-events: none;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        .login-header {
          text-align: center;
          margin-bottom: 35px;
          position: relative;
        }

        .logo-wrapper {
          margin-bottom: 20px;
        }

        .logo {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          position: relative;
        }

        .house {
          position: absolute;
          inset: 0;
          animation: houseFloat 3s ease-in-out infinite;
        }

        @keyframes houseFloat {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          50% { transform: translateY(-8px) rotateY(5deg); }
        }

        .house .roof {
          width: 0;
          height: 0;
          border-left: 40px solid transparent;
          border-right: 40px solid transparent;
          border-bottom: 35px solid #667eea;
          position: absolute;
          top: 0;
          left: 0;
        }

        .house .body {
          width: 55px;
          height: 40px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          position: absolute;
          bottom: 0;
          left: 12px;
          border-radius: 0 0 8px 8px;
        }

        .house .door {
          width: 16px;
          height: 22px;
          background: rgba(255, 255, 255, 0.9);
          position: absolute;
          bottom: 0;
          left: 20px;
          border-radius: 4px 4px 0 0;
        }

        .house .windows {
          position: absolute;
          top: 8px;
          left: 8px;
          display: flex;
          gap: 8px;
        }

        .house .windows span {
          width: 14px;
          height: 14px;
          background: #ffd700;
          border-radius: 3px;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }

        .sparkles {
          position: absolute;
          inset: 0;
        }

        .sparkles span {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ffd700;
          border-radius: 50%;
          animation: sparkle 1.5s infinite;
        }

        .sparkles span:nth-child(1) { top: 0; right: 10px; animation-delay: 0s; }
        .sparkles span:nth-child(2) { top: 20px; right: 0; animation-delay: 0.5s; }
        .sparkles span:nth-child(3) { top: -5px; right: 20px; animation-delay: 1s; }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }

        .title {
          font-size: 32px;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
        }

        .subtitle {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
        }

        .error-toast {
          background: rgba(255, 82, 82, 0.2);
          border: 1px solid rgba(255, 82, 82, 0.5);
          color: #ff5252;
          padding: 14px 18px;
          border-radius: 12px;
          font-size: 13px;
          animation: shake 0.5s ease, slideDown 0.3s ease;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .input-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-container label {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
        }

        .input-field {
          position: relative;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 14px;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .input-field.active {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(102, 126, 234, 0.5);
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.2);
        }

        .field-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 16px;
          transition: all 0.3s ease;
          color: rgba(255, 255, 255, 0.5);
        }

        .input-field.active .field-icon {
          color: #667eea;
          transform: translateY(-50%) scale(1.1);
        }

        .input-field input {
          width: 100%;
          padding: 16px 16px 16px 48px;
          border: none;
          background: transparent;
          font-size: 14px;
          color: white;
          outline: none;
        }

        .input-field input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .field-line {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #667eea, #f093fb);
          transition: all 0.3s ease;
          transform: translateX(-50%);
          border-radius: 2px;
        }

        .input-field.active .field-line {
          width: 100%;
        }

        .submit-btn {
          position: relative;
          padding: 18px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .submit-btn:hover::before {
          left: 100%;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .submit-btn.clicked {
          transform: scale(0.95);
        }

        .submit-btn.clicked::before {
          left: 100%;
        }

        .btn-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .particle-btn {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #ffd700;
          border-radius: 50%;
          opacity: 0;
        }

        .submit-btn.clicked .particle-btn {
          animation: particleExplode 0.8s ease-out forwards;
        }

        .submit-btn.clicked .particle-btn:nth-child(1) { top: 50%; left: 10%; --x: -50px; --y: -80px; }
        .submit-btn.clicked .particle-btn:nth-child(2) { top: 50%; left: 20%; --x: -20px; --y: -90px; }
        .submit-btn.clicked .particle-btn:nth-child(3) { top: 50%; left: 30%; --x: 0px; --y: -100px; }
        .submit-btn.clicked .particle-btn:nth-child(4) { top: 50%; left: 40%; --x: 20px; --y: -90px; }
        .submit-btn.clicked .particle-btn:nth-child(5) { top: 50%; left: 50%; --x: 50px; --y: -80px; }
        .submit-btn.clicked .particle-btn:nth-child(6) { top: 50%; left: 60%; --x: 60px; --y: -60px; }
        .submit-btn.clicked .particle-btn:nth-child(7) { top: 50%; left: 70%; --x: 70px; --y: -40px; }
        .submit-btn.clicked .particle-btn:nth-child(8) { top: 50%; left: 80%; --x: 60px; --y: -20px; }
        .submit-btn.clicked .particle-btn:nth-child(9) { top: 50%; left: 90%; --x: 50px; --y: 0px; }
        .submit-btn.clicked .particle-btn:nth-child(10) { top: 50%; left: 50%; --x: 0px; --y: -120px; }
        .submit-btn.clicked .particle-btn:nth-child(11) { top: 50%; left: 50%; --x: -40px; --y: -60px; }
        .submit-btn.clicked .particle-btn:nth-child(12) { top: 50%; left: 50%; --x: 40px; --y: -60px; }

        @keyframes particleExplode {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--x), var(--y)) scale(0);
          }
        }

        .btn-text {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          z-index: 1;
        }

        .btn-arrow {
          transition: transform 0.3s ease;
        }

        .submit-btn:hover .btn-arrow {
          transform: translateX(5px);
        }

        .btn-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .login-footer {
          margin-top: 30px;
          text-align: center;
          position: relative;
        }

        .footer-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          margin-bottom: 20px;
        }

        .demo-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .demo-text span {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .demo-text small {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
        }

        .success-overlay {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: successFadeIn 0.5s ease;
        }

        @keyframes successFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .success-container {
          text-align: center;
          position: relative;
        }

        .success-rings {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .ring {
          position: absolute;
          border: 3px solid transparent;
          border-top-color: #667eea;
          border-radius: 50%;
          animation: ringPulse 2s ease-out infinite;
        }

        .ring-1 {
          width: 120px;
          height: 120px;
          left: -60px;
          top: -60px;
          animation-delay: 0s;
        }

        .ring-2 {
          width: 160px;
          height: 160px;
          left: -80px;
          top: -80px;
          animation-delay: 0.3s;
          border-top-color: #f093fb;
        }

        .ring-3 {
          width: 200px;
          height: 200px;
          left: -100px;
          top: -100px;
          animation-delay: 0.6s;
          border-top-color: #764ba2;
        }

        @keyframes ringPulse {
          0% { transform: rotate(0deg); opacity: 1; }
          100% { transform: rotate(360deg); opacity: 0; }
        }

        .success-icon {
          position: relative;
          z-index: 10;
          margin-bottom: 30px;
        }

        .icon-circle {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: iconPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s both;
          box-shadow: 0 20px 60px rgba(102, 126, 234, 0.5);
        }

        @keyframes iconPop {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .icon-check {
          width: 50px;
          height: 50px;
          color: white;
          animation: checkDraw 0.4s ease 0.6s both;
        }

        .icon-check svg {
          width: 100%;
          height: 100%;
        }

        @keyframes checkDraw {
          from { 
            stroke-dasharray: 0 100;
            stroke-dashoffset: 0;
            opacity: 0;
          }
          to { 
            stroke-dasharray: 100 0;
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        .success-text-content {
          animation: textSlideUp 0.5s ease 0.4s both;
        }

        @keyframes textSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .success-title {
          font-size: 36px;
          font-weight: 700;
          color: white;
          margin-bottom: 10px;
          text-shadow: 0 0 30px rgba(102, 126, 234, 0.5);
        }

        .success-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.7);
        }

        .success-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 2px;
          animation: confettiFall 3s ease-out forwards;
        }

        .confetti:nth-child(odd) {
          background: #667eea;
        }

        .confetti:nth-child(even) {
          background: #f093fb;
        }

        .confetti:nth-child(3n) {
          background: #ffd700;
        }

        .confetti:nth-child(1) { left: 10%; animation-delay: 0.1s; --fall-x: -50px; --fall-y: 200px; --rotation: 360deg; }
        .confetti:nth-child(2) { left: 20%; animation-delay: 0.2s; --fall-x: 30px; --fall-y: 180px; --rotation: -360deg; }
        .confetti:nth-child(3) { left: 30%; animation-delay: 0.15s; --fall-x: -40px; --fall-y: 220px; --rotation: 270deg; }
        .confetti:nth-child(4) { left: 40%; animation-delay: 0.25s; --fall-x: 50px; --fall-y: 190px; --rotation: -270deg; }
        .confetti:nth-child(5) { left: 50%; animation-delay: 0.1s; --fall-x: -30px; --fall-y: 210px; --rotation: 180deg; }
        .confetti:nth-child(6) { left: 60%; animation-delay: 0.2s; --fall-x: 40px; --fall-y: 200px; --rotation: -180deg; }
        .confetti:nth-child(7) { left: 70%; animation-delay: 0.15s; --fall-x: -50px; --fall-y: 180px; --rotation: 90deg; }
        .confetti:nth-child(8) { left: 80%; animation-delay: 0.25s; --fall-x: 30px; --fall-y: 220px; --rotation: -90deg; }
        .confetti:nth-child(9) { left: 90%; animation-delay: 0.1s; --fall-x: -20px; --fall-y: 190px; --rotation: 45deg; }
        .confetti:nth-child(10) { left: 15%; animation-delay: 0.3s; --fall-x: 20px; --fall-y: 200px; --rotation: -45deg; }
        .confetti:nth-child(11) { left: 35%; animation-delay: 0.2s; --fall-x: -35px; --fall-y: 180px; --rotation: 135deg; }
        .confetti:nth-child(12) { left: 55%; animation-delay: 0.15s; --fall-x: 45px; --fall-y: 210px; --rotation: -135deg; }
        .confetti:nth-child(13) { left: 75%; animation-delay: 0.25s; --fall-x: -45px; --fall-y: 190px; --rotation: 225deg; }
        .confetti:nth-child(14) { left: 85%; animation-delay: 0.1s; --fall-x: 35px; --fall-y: 220px; --rotation: -225deg; }
        .confetti:nth-child(15) { left: 25%; animation-delay: 0.3s; --fall-x: -25px; --fall-y: 200px; --rotation: 315deg; }
        .confetti:nth-child(16) { left: 45%; animation-delay: 0.2s; --fall-x: 25px; --fall-y: 180px; --rotation: -315deg; }
        .confetti:nth-child(17) { left: 65%; animation-delay: 0.15s; --fall-x: -55px; --fall-y: 210px; --rotation: 405deg; }
        .confetti:nth-child(18) { left: 5%; animation-delay: 0.25s; --fall-x: 55px; --fall-y: 190px; --rotation: -405deg; }
        .confetti:nth-child(19) { left: 95%; animation-delay: 0.1s; --fall-x: -15px; --fall-y: 200px; --rotation: 450deg; }
        .confetti:nth-child(20) { left: 50%; animation-delay: 0.3s; --fall-x: 15px; --fall-y: 180px; --rotation: -450deg; }

        @keyframes confettiFall {
          0% {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--fall-x), var(--fall-y)) rotate(var(--rotation)) scale(0);
          }
        }

        @media (max-width: 900px) {
          .login-wrapper {
            flex-direction: column;
            gap: 40px;
          }
          
          .welcome-text {
            text-align: center;
          }
          
          .welcome-shapes {
            display: none;
          }
          
          .welcome-line {
            font-size: 36px;
            justify-content: center;
            flex-wrap: wrap;
          }
          
          .welcome-features {
            justify-content: center;
            flex-wrap: wrap;
          }
          
          .welcome-desc {
            margin: 0 auto;
          }
          
          .login-card {
            flex: none;
            width: 100%;
            max-width: 420px;
          }
        }
      `}</style>
    </div>
  )
}

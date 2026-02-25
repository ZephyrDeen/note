import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { showError, showCorrect } from '../utils/animations'
import GalaxyBackground from './GalaxyBackground'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.username || !formData.password) {
      showError()
      return
    }

    setLoading(true)
    const result = await login(formData.username, formData.password)

    if (result.success) {
      showCorrect()
      setFormData({ username: '', password: '' })
      setTimeout(() => navigate('/welcome'), 2000)
    } else {
      showError()
    }
    setLoading(false)
  }

  const handleSwitchToRegister = (e) => {
    e.preventDefault()
    navigate('/register')
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden relative">
      <GalaxyBackground starCount={150} showShootingStars={true} />

      {/* 主卡片 */}
      <div className="relative z-10 w-full max-w-md animate-[fadeInUp_0.8s_ease-out]">
        {/* Logo 和标题 */}
        <div className="text-center mb-8 animate-[fadeInDown_0.6s_ease-out]">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-violet-600/80 to-fuchsia-600/80 mb-4 shadow-[0_0_60px_20px_rgba(139,92,246,0.3)] animate-[float_3s_ease-in-out_infinite] backdrop-blur-sm border border-white/10">
            <span className="text-4xl">🌍</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">GeoNotes</h1>
          <p className="text-violet-300/70">Pin your thoughts to the cosmos</p>
        </div>

        {/* 登录卡片 */}
        <div className="bg-slate-900/40 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_50px_10px_rgba(139,92,246,0.1)]">
          <div className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"></div>

          <div className="p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Welcome Back</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 用户名输入 */}
              <div className={`relative transition-all duration-300 ${focusedField === 'username' ? 'scale-[1.02]' : ''}`}>
                <label
                  htmlFor="username"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'username' || formData.username
                    ? '-top-2.5 text-xs text-violet-400 bg-slate-900/90 px-2 rounded'
                    : 'top-3.5 text-gray-400'
                    }`}
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  disabled={loading}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-violet-500/50 focus:bg-white/10 focus:shadow-[0_0_20px_5px_rgba(139,92,246,0.15)] transition-all duration-300 disabled:opacity-50"
                />
              </div>

              {/* 密码输入 */}
              <div className={`relative transition-all duration-300 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
                <label
                  htmlFor="password"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'password' || formData.password
                    ? '-top-2.5 text-xs text-violet-400 bg-slate-900/90 px-2 rounded'
                    : 'top-3.5 text-gray-400'
                    }`}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  disabled={loading}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-violet-500/50 focus:bg-white/10 focus:shadow-[0_0_20px_5px_rgba(139,92,246,0.15)] transition-all duration-300 disabled:opacity-50"
                />
              </div>

              {/* 登录按钮 */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-semibold text-lg overflow-hidden group transition-all duration-300 hover:shadow-[0_0_30px_10px_rgba(139,92,246,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* 测试账号 */}
            <div
              onClick={() => setFormData({ username: 'testuser', password: 'test123' })}
              className="mt-4 p-3 bg-violet-500/10 border border-violet-500/20 rounded-xl cursor-pointer hover:bg-violet-500/20 transition-all group"
            >
              <p className="text-xs text-violet-400/70 text-center mb-1">🧪 Demo Account (click to fill)</p>
              <p className="text-sm text-violet-300 text-center font-mono group-hover:text-white transition-colors">
                testuser / test123
              </p>
            </div>

            {/* 分隔线 */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <span className="text-gray-500 text-sm">✦</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* 注册链接 */}
            <p className="text-center text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={handleSwitchToRegister}
                className="text-violet-400 hover:text-violet-300 font-medium transition-colors hover:underline underline-offset-4"
              >
                Create one
              </button>
            </p>
          </div>
        </div>

        {/* 底部装饰文字 */}
        <p className="text-center text-gray-500/50 text-sm mt-8 animate-[fadeIn_1s_ease-out_0.5s_both]">
          ⭐ Explore the universe of your thoughts
        </p>
      </div>

      {/* CSS 动画 */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}

export default Login

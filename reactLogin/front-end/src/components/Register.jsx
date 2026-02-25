import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { showError, showCorrect } from '../utils/animations'
import GalaxyBackground from './GalaxyBackground'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const { register } = useAuth()
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

    if (!formData.username || !formData.password || !formData.confirmPassword) {
      showError()
      return
    }

    if (formData.password !== formData.confirmPassword) {
      showError()
      return
    }

    setLoading(true)
    const result = await register(formData.username, formData.password)

    if (result.success) {
      showCorrect()
      setFormData({ username: '', password: '', confirmPassword: '' })
      setTimeout(() => navigate('/login'), 2000)
    } else {
      showError()
    }
    setLoading(false)
  }

  const handleSwitchToLogin = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  const InputField = ({ name, type = 'text', label }) => (
    <div className={`relative transition-all duration-300 ${focusedField === name ? 'scale-[1.02]' : ''}`}>
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === name || formData[name]
            ? '-top-2.5 text-xs text-cyan-400 bg-slate-900/90 px-2 rounded'
            : 'top-3.5 text-gray-400'
          }`}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField(null)}
        disabled={loading}
        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 focus:shadow-[0_0_20px_5px_rgba(34,211,238,0.15)] transition-all duration-300 disabled:opacity-50"
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden relative">
      <GalaxyBackground starCount={150} showShootingStars={true} />

      {/* 主卡片 */}
      <div className="relative z-10 w-full max-w-md animate-[fadeInUp_0.8s_ease-out]">
        {/* Logo 和标题 */}
        <div className="text-center mb-8 animate-[fadeInDown_0.6s_ease-out]">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-600/80 to-violet-600/80 mb-4 shadow-[0_0_60px_20px_rgba(34,211,238,0.3)] animate-[float_3s_ease-in-out_infinite] backdrop-blur-sm border border-white/10">
            <span className="text-4xl">✨</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">Join GeoNotes</h1>
          <p className="text-cyan-300/70">Begin your cosmic journey</p>
        </div>

        {/* 注册卡片 */}
        <div className="bg-slate-900/40 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_50px_10px_rgba(34,211,238,0.1)]">
          <div className="h-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500"></div>

          <div className="p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Create Account</h2>

            <form className="space-y-5"> 
            {/* onSubmit={handleSubmit} */}
              <InputField name="username" label="Username" />
              <InputField name="password" type="password" label="Password" />
              <InputField name="confirmPassword" type="password" label="Confirm Password" />

              {/* 密码匹配提示 */}
              {formData.password && formData.confirmPassword && (
                <div className={`flex items-center gap-2 text-sm ${formData.password === formData.confirmPassword
                    ? 'text-emerald-400'
                    : 'text-red-400'
                  }`}>
                  {formData.password === formData.confirmPassword ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Passwords match
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Passwords don't match
                    </>
                  )}
                </div>
              )}

              {/* 注册按钮 */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full py-4 bg-gradient-to-r from-cyan-600 to-violet-600 text-white rounded-xl font-semibold text-lg overflow-hidden group transition-all duration-300 hover:shadow-[0_0_30px_10px_rgba(34,211,238,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Launch Into Space
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* 分隔线 */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <span className="text-gray-500 text-sm">✦</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* 登录链接 */}
            <p className="text-center text-gray-400">
              Already have an account?{' '}
              <button
                onClick={handleSwitchToLogin}
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors hover:underline underline-offset-4"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* 底部装饰文字 */}
        <p className="text-center text-gray-500/50 text-sm mt-8 animate-[fadeIn_1s_ease-out_0.5s_both]">
          🚀 Your journey among the stars begins here
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

export default Register

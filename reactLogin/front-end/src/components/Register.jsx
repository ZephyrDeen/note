import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { showError, showCorrect } from '../utils/animations'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError(false) // 清除错误状态
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
      // 清空表单
      setFormData({ username: '', password: '', confirmPassword: '' })
      // 延迟跳转，让成功动画播放完
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

  return (
    <div className="bg-white dark:bg-gray-900">
    <div className="flex justify-center h-screen">
      <div className="hidden bg-cover lg:block lg:w-2/3" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)' }}>
        <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 className="text-4xl font-bold text-white">Brand</h2>

            <p className="max-w-xl mt-3 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus molestiae</p>
          </div>
        </div>
      </div>

      {/* <div className="login"> */}
      <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div className="flex-1">
          <div className="text-center">
                      <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Brand</h2>
                      
                      <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
          </div>
          <form>

            <div className="mt-8">
              <div className="username">
              <label htmlFor="new-username">Input Username:</label>
            <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              type="text"
              id="new-username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
            />
            </div>

            <div className="password">
              <label htmlFor="reg-password-one">Input Password:</label>
            <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              type="password"
              id="reg-password-one"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            </div>

            <div className="password">
              <label htmlFor="reg-password-two">Check Password:</label>
            <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              type="password"
              id="reg-password-two"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
            />
            </div>    
            <div className="mt-6">

            <div className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"  onClick={handleSubmit}>
              <span>{loading ? 'Signing Up...' : 'Sign Up'}</span>
            </div>  
            </div>  
            </div>
          </form>
      

        <div className="mt-6 text-sm text-center text-gray-400">
        if you have an account, you may hope to login.
        <span className="text-blue-500 focus:outline-none focus:underline hover:underline" onClick={handleSwitchToLogin}>here</span>
        </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Register 
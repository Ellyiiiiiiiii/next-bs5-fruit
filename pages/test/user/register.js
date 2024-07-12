import { useState } from 'react'
import { register } from '@/services/user'
import toast, { Toaster } from 'react-hot-toast'

export default function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false, // checkbox 同意會員註冊條款
  })

  // 錯誤訊息狀態
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: '', // 呈現錯誤訊息用字串
  })

  // checkbox 呈現密碼用
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // 輸入帳號 密碼用
  const handleFieldChange = (e) => {
    console.log(e.target.name, e.target.value, e.target.type)

    if (e.target.name === 'agree') {
      setUser({ ...user, [e.target.name]: e.target.checked })
    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    // 阻擋表單預設送出行為
    e.preventDefault()

    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }

    if (!user.name) {
      newErrors.name = '姓名為必填'
    }
    if (!user.email) {
      newErrors.email = 'email為必填'
    }
    if (user.password !== user.confirmPassword) {
      newErrors.password = '密碼與確認密碼需要一致'
      newErrors.confirmPassword = '密碼與確認密碼需要一致'
    }
    if (!user.password) {
      newErrors.password = '密碼為必填'
    }
    if (!user.confirmPassword) {
      newErrors.confirmPassword = '確認密碼為必填'
    }
    if (!user.agree) {
      newErrors.agree = '請先同意會員註冊條款'
    }

    // 呈現錯誤訊息
    setErrors(newErrors)

    const res = await register(user)

    console.log(res.data)

    if (res.data.status === 'success') {
      toast.success('資訊 - 會員註冊成功')
    } else {
      toast.error(`錯誤 - 會員註冊失敗`)
    }
  }

  return (
    <>
      <h1>會員註冊</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            姓名:{' '}
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleFieldChange}
            />
          </label>
          <br />
          <span className="error">{errors.name}</span>
          <br />
        </p>
        <p>
          <label>
            電子郵件信箱:{' '}
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleFieldChange}
            />
          </label>
          <br />
          <span className="error">{errors.email}</span>
          <br />
        </p>
        <p>
          <label>
            密碼:{' '}
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={user.password}
              onChange={handleFieldChange}
            />
          </label>
          <input
          type="checkbox"
          checked={showPassword}
          onChange={(e) => {
            setShowPassword(e.target.checked)
          }}
        />{' '}
        顯示密碼
        </p>
        <span className="error">{errors.password}</span>
        <p>
          <label>
            確認密碼:{' '}
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleFieldChange}
            />
          </label>
          <input
          type="checkbox"
          checked={showConfirmPassword}
          onChange={(e) => {
            setShowConfirmPassword(e.target.checked)
          }}
        />{' '}
        顯示密碼
        </p>
        <span className="error">{errors.confirmPassword}</span>
        <p>
          <label>
            <input
              type="checkbox"
              name="agree"
              // checked={data.agree}
              // onChange={handleFieldChange}
              // onBlur={handleBlur}
            />
            我同意會員註冊條款
          </label>
        </p>
        <br />
        <button type="submit">註冊</button>
        <br />
        <button
          type="button"
          onClick={() => {
            // 測試帳號 herry/11111
            setUser({
              name: '榮恩',
              email: 'ron@test.com',
              password: '99999',
              confirmPassword: '99999',
              agree: true,
            })
          }}
        >
          一鍵填入
        </button>
      </form>
      {/* 土司訊息視窗用 */}
      <Toaster />
      <style jsx>
        {`
          .error {
            color: red;
            font-size: 12px;
          }
        `}
      </style>
    </>
  )
}

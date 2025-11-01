import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const handleLogin = () => {
    localStorage.setItem('token', 'fake-token')
    navigate('/')
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Đăng nhập hệ thống</h2>
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  )
}

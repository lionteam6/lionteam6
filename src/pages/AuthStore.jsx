export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const { login: setLogin } = useAuthStore()

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true)
    try {
      const res = await login(data)
      const { token } = res

      setCookie('accessToken', token, {
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })

      setLogin(token) // Zustand의 로그인 상태 업데이트
      alert('로그인 성공!')
      router.push('/home')
    } catch (error) {
      alert('로그인에 실패했습니다.')
      console.error('로그인 에러:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <Loading /> // 로딩 컴포넌트 표시

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 로그인 폼 */}
      </form>
    </div>
  )
}
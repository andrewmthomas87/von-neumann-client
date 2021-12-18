import {useAuth0} from '@auth0/auth0-react'
import {useEffect} from 'react'

const App: React.FC = () => {
  const {isLoading, isAuthenticated, loginWithRedirect, logout} = useAuth0()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect()
    }
  }, [isLoading, isAuthenticated])

  const onSignOut = () => logout()

  if (isLoading) {
    return <h1>Loading...</h1>
  } else if (!isAuthenticated) {
    return <h1>Redirecting to sign in...</h1>
  } else {
    return (
      <>
        <h1>Hello!</h1>
        <button onClick={onSignOut}>Sign out</button>
      </>
    )
  }
}

export default App

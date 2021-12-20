import {useAuth0} from '@auth0/auth0-react'
import {Alert} from '@mui/material'
import Loading from 'components/Loading'
import {useEffect} from 'react'
import Router from 'Router'

const App: React.FC = () => {
  const {isLoading, isAuthenticated, loginWithRedirect} = useAuth0()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect()
    }
  }, [isLoading, isAuthenticated])

  if (isLoading) {
    return <Loading />
  } else if (!isAuthenticated) {
    return <Alert severity="info">Redirecting to sign in...</Alert>
  } else {
    return <Router />
  }
}

export default App

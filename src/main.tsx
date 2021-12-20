import {Auth0Provider} from '@auth0/auth0-react'
import {CssBaseline, ThemeProvider} from '@mui/material'
import App from 'App'
import config from 'config'
import React from 'react'
import ReactDOM from 'react-dom'
import theme from 'theme'

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider domain={config.auth0.domain} clientId={config.auth0.clientID} redirectUri={config.auth0.redirectURI}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

import {Auth0Provider} from '@auth0/auth0-react'
import App from 'components/App'
import config from 'config'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
	<React.StrictMode>
		<Auth0Provider
			domain={config.auth0.domain}
			clientId={config.auth0.clientID}
			redirectUri={config.auth0.redirectURI}
		>
			<App />
		</Auth0Provider>
	</React.StrictMode>,
	document.getElementById('root')
)

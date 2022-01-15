import {Alert, CssBaseline, ThemeProvider} from '@mui/material'
import config from 'config'
import {useAuthenticate} from 'hooks/auth'
import {useColorMode} from 'hooks/colorMode'
import {useObservable, useObservableState} from 'observable-hooks'
import {combineLatestWith, map} from 'rxjs'
import {themeForColorMode} from 'theme'
import Loading from 'ui/Loading'
import Router from './Router'

const App: React.FC = () => {
	const authState$ = useAuthenticate()
	const [colorMode$, onToggleColorMode] = useColorMode(config.colorMode.storageKey)

	const content$ = useObservable(() =>
		authState$.pipe(
			map(([isLoading, isAuthenticated]) => {
				if (isLoading) {
					return <Loading />
				} else if (!isAuthenticated) {
					return <Alert severity="info">Redirecting to sign in...</Alert>
				} else {
					return <Router />
				}
			})
		)
	)
	const wrapper$ = useObservable(() =>
		colorMode$.pipe(
			map(themeForColorMode),
			combineLatestWith(content$),
			map(([theme, content]) => (
				<ThemeProvider theme={theme}>
					<CssBaseline enableColorScheme />
					{content}
				</ThemeProvider>
			))
		)
	)

	return useObservableState(wrapper$, null)
}

export default App

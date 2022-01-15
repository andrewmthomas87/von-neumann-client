import config from 'config'
import {lazy, Suspense, useMemo} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import API, {APICtx, IAPI} from 'services/api'
import Loading from 'ui/Loading'

const HomePage = lazy(() => import('../routes/home/Home'))
const ServerPage = lazy(() => import('../routes/server/Server'))

const Router: React.FC = () => {
	const api = useMemo(() => new API(config.api.baseURL) as IAPI, [])

	return (
		<APICtx.Provider value={api}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<Suspense fallback={<Loading />}>
								<HomePage />
							</Suspense>
						}
					/>
					<Route
						path="/server/:id"
						element={
							<Suspense fallback={<Loading />}>
								<ServerPage />
							</Suspense>
						}
					/>
				</Routes>
			</BrowserRouter>
		</APICtx.Provider>
	)
}

export default Router

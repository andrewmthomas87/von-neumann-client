import {useAuth0} from '@auth0/auth0-react'
import {useObservable, useSubscription} from 'observable-hooks'
import {identity, Observable} from 'rxjs'

function useAuthenticate(): Observable<readonly [boolean, boolean]> {
	const {isLoading, isAuthenticated, loginWithRedirect} = useAuth0()

	const state$ = useObservable(identity, [isLoading, isAuthenticated])

	useSubscription(state$, ([isLoading, isAuthenticated]) => {
		if (!isLoading && !isAuthenticated) {
			loginWithRedirect()
		}
	})

	return state$
}

export {useAuthenticate}

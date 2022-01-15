import {useObservableCallback, useSubscription} from 'observable-hooks'
import {concatWith, Observable, of, scan} from 'rxjs'
import {ColorMode} from 'theme'

function useColorMode(storageKey: string): readonly [Observable<ColorMode>, () => void] {
	const [onToggle, colorMode$] = useObservableCallback<ColorMode, void>(events$ => {
		const initialColorMode: ColorMode = localStorage.getItem(storageKey) === 'light' ? 'light' : 'dark'
		return of(initialColorMode).pipe(
			concatWith(events$.pipe(scan(colorMode => (colorMode === 'light' ? 'dark' : 'light'), initialColorMode)))
		)
	})

	useSubscription(colorMode$, colorMode => localStorage.setItem(storageKey, colorMode))

	return [colorMode$, onToggle] as const
}

export {useColorMode}
export type {ColorMode}

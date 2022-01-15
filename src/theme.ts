import {createTheme, Theme} from '@mui/material'

type ColorMode = 'light' | 'dark'

const lightTheme = createTheme({
	palette: {mode: 'light'},
})

const darkTheme = createTheme({
	palette: {mode: 'dark'},
})

function themeForColorMode(colorMode: ColorMode): Theme {
	switch (colorMode) {
		case 'light':
			return lightTheme
		case 'dark':
			return darkTheme
	}
}

export {lightTheme, darkTheme, themeForColorMode}
export type {ColorMode}

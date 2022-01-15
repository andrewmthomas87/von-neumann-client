const config = {
	api: {baseURL: import.meta.env.VITE_API_BASE_URL},
	auth0: {
		domain: import.meta.env.VITE_AUTH0_DOMAIN,
		clientID: import.meta.env.VITE_AUTH0_CLIENT_ID,
		redirectURI: import.meta.env.VITE_AUTH0_REDIRECT_URI,
	},
	colorMode: {storageKey: import.meta.env.VITE_COLOR_MODE_STORAGE_KEY},
	rtc: {iceServerURLs: import.meta.env.VITE_RTC_ICE_SERVER_URLS},
}

export default config

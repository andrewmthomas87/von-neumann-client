/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string

  readonly VITE_AUTH0_DOMAIN: string
  readonly VITE_AUTH0_CLIENT_ID: string
  readonly VITE_AUTH0_REDIRECT_URI: string

  readonly VITE_RTC_ICE_SERVER_URLS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

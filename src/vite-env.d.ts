/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH0_DOMAIN: string
  readonly VITE_AUTH0_CLIENT_ID: string
  readonly VITE_AUTH0_REDIRECT_URI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
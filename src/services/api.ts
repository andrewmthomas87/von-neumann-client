import {createContext} from 'react'

interface IAPI {
  listServers(): Promise<string[]>
  connect(id: string, sessionDescription: RTCSessionDescription): Promise<RTCSessionDescription>
}

class API implements IAPI {
  private _baseURL: string

  public constructor(baseURL: string) {
    this._baseURL = baseURL
  }

  private async _get<T>(path: string): Promise<T> {
    const response = await fetch(`${this._baseURL}${path}`, {method: 'GET'})
    const json = await response.json()
    if (response.ok) {
      return json
    } else {
      throw json
    }
  }

  private async _post<T>(path: string, body?: any): Promise<T> {
    const response = await fetch(`${this._baseURL}${path}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    })
    const json = await response.json()
    if (response.ok) {
      return json
    } else {
      throw json
    }
  }

  public async listServers(): Promise<string[]> {
    const servers = await this._get<string[] | null>('/list-servers')
    return servers || []
  }

  public connect(id: string, sessionDescription: RTCSessionDescription): Promise<RTCSessionDescription> {
    return this._post<RTCSessionDescription>(`/connect/${id}`, sessionDescription)
  }
}

const APICtx = createContext<IAPI>(undefined!)

export {APICtx, API as default}
export type {IAPI}

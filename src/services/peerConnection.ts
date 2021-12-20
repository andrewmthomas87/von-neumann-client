import {BehaviorSubject, Observable, Subject} from 'rxjs'

interface IPeerConnection {
  sessionDescription$: Observable<RTCSessionDescription | null>

  setRemoteDescription(remoteDescription: RTCSessionDescription): void
  send(message: string): void
}

class PeerConnection implements IPeerConnection {
  private _pc: RTCPeerConnection
  private _sendChannel: RTCDataChannel

  private _sessionDescription$: Subject<RTCSessionDescription | null> =
    new BehaviorSubject<RTCSessionDescription | null>(null)

  public get sessionDescription$(): Observable<RTCSessionDescription | null> {
    return this._sessionDescription$
  }

  public constructor(iceServerURLs: string) {
    this._pc = new RTCPeerConnection({
      iceServers: [{urls: iceServerURLs}],
    })

    this._pc.addEventListener('icecandidate', event => {
      if (event.candidate === null) {
        this._sessionDescription$.next(this._pc.localDescription)
      }
    })

    this._pc.addEventListener('negotiationneeded', () =>
      this._pc.createOffer().then(description => this._pc.setLocalDescription(description))
    )

    this._sendChannel = this._pc.createDataChannel('send')

    this._sendChannel.addEventListener('open', () => console.log('send channel open'))
    this._sendChannel.addEventListener('close', () => console.log('send channel close'))
    this._sendChannel.addEventListener('error', () => console.log('send channel error'))
    this._sendChannel.addEventListener('message', e => console.log(`send channel receieved message`, e))
  }

  public setRemoteDescription(remoteDescription: RTCSessionDescription) {
    this._pc.setRemoteDescription(remoteDescription)
  }

  public send(message: string): void {
    this._sendChannel.send(message)
  }
}

export default PeerConnection
export type {IPeerConnection}

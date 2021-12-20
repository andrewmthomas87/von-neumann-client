import {Button, Container, TextField, Typography} from '@mui/material'
import config from 'config'
import {useSubscription} from 'observable-hooks'
import {useContext, useMemo, useState} from 'react'
import {useParams} from 'react-router-dom'
import {APICtx} from 'services/api'
import PeerConnection, {IPeerConnection} from 'services/peerConnection'

const Server: React.FC = () => {
  const {id} = useParams()
  const api = useContext(APICtx)

  const peerConnection = useMemo(() => new PeerConnection(config.rtc.iceServerURLs) as IPeerConnection, [])

  const [message, setMessage] = useState('')

  useSubscription(peerConnection.sessionDescription$, sessionDescription => {
    if (sessionDescription) {
      api
        .connect(id!, sessionDescription)
        .then(remoteDescription => peerConnection.setRemoteDescription(remoteDescription))
    }
  })

  const onSend = () => peerConnection.send(message)

  return (
    <Container maxWidth="md">
      <Typography variant="h2">Server</Typography>
      <Typography variant="body1">
        <b>ID</b>: {id}
      </Typography>
      <TextField placeholder="Message" value={message} onChange={e => setMessage(e.currentTarget.value)} />
      <Button onClick={onSend}>Send</Button>
    </Container>
  )
}

export default Server

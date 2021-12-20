import {Container, Typography} from '@mui/material'
import config from 'config'
import {useSubscription} from 'observable-hooks'
import {useContext, useMemo} from 'react'
import {useParams} from 'react-router-dom'
import {APICtx} from 'services/api'
import PeerConnection, {IPeerConnection} from 'services/peerConnection'

const Server: React.FC = () => {
  const {id} = useParams()
  const api = useContext(APICtx)

  const peerConnection = useMemo(() => new PeerConnection(config.rtc.iceServerURLs) as IPeerConnection, [])

  useSubscription(peerConnection.sessionDescription$, sessionDescription => {
    if (sessionDescription) {
      api
        .connect(id!, sessionDescription)
        .then(remoteDescription => peerConnection.setRemoteDescription(remoteDescription))
    }
  })

  return (
    <Container maxWidth="md">
      <Typography variant="h2">Server</Typography>
      <Typography variant="body1">
        <b>ID</b>: {id}
      </Typography>
    </Container>
  )
}

export default Server

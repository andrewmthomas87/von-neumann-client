import {Dns as DnsIcon} from '@mui/icons-material'
import {Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from '@mui/material'
import {useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {APICtx} from 'services/api'

const Home: React.FC = () => {
	const api = useContext(APICtx)
	const navigate = useNavigate()

	const [servers, setServers] = useState<string[] | null>(null)

	useEffect(() => {
		api.listServers().then(servers => setServers(servers))
	}, [])

	const onSelect = (id: string) => navigate(`/server/${id}`)

	return (
		<Container maxWidth="md">
			<Typography variant="h1">Home</Typography>
			{servers ? <ServerList servers={servers} onSelect={onSelect} /> : null}
		</Container>
	)
}

interface IServerListProps {
	servers: string[]

	onSelect(id: string): void
}

const ServerList: React.FC<IServerListProps> = ({servers, onSelect}) => (
	<List>
		{servers.map(id => (
			<ListItem key={id}>
				<ListItemButton onClick={() => onSelect(id)}>
					<ListItemIcon>
						<DnsIcon />
					</ListItemIcon>
					<ListItemText primary={id} />
				</ListItemButton>
			</ListItem>
		))}
	</List>
)

export default Home

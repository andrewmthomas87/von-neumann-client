import {Box, CircularProgress} from '@mui/material'

const Loading: React.FC = () => (
	<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
		<CircularProgress />
	</Box>
)

export default Loading

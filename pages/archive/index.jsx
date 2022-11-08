import { Container } from '@chakra-ui/react'
import NextHead from 'next/head'

const Archive = () => {
	return (
		<>
			<NextHead>
				<title>Archive</title>
			</NextHead>

			<Container></Container>
		</>
	)
}

Archive.authentication = {
	authorized: 'Admin'
}

export default Archive

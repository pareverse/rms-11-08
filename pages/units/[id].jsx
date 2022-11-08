import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { Container, Grid, GridItem } from '@chakra-ui/react'
import Profile from 'components/units/profile'
import Details from 'components/units/details'
import Overview from 'components/units/overview'
import History from 'components/units/history'

const Unit = () => {
	const router = useRouter()
	const { id } = router.query
	const { data: unit, isFetched: isUnitFetched } = useQuery(['unit', id], () => api.get('/units', id))

	return (
		<Container>
			<Grid templateColumns={{ base: '1fr', lg: '300px 1fr' }} alignItems="start" gap={6}>
				<GridItem display="grid" gap={6}>
					<Profile id={id} unit={unit} isUnitFetched={isUnitFetched} />
					<Details unit={unit} isUnitFetched={isUnitFetched} />
				</GridItem>

				<GridItem display="grid" gap={6}>
					<Overview id={id} unit={unit} isUnitFetched={isUnitFetched} />
					<History id={id} unit={unit} isUnitFetched={isUnitFetched} />
				</GridItem>
			</Grid>
		</Container>
	)
}

Unit.authentcation = {
	authorized: 'Admin'
}

export default Unit

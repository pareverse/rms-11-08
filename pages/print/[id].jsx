import { chakra, Container, Flex, Grid, GridItem, Text } from '@chakra-ui/react'

const Print = () => {
	return (
		<chakra.div bg="white" mx="auto" my={6} h="full" minH="100vh" w="992px" color="black">
			<Container>
				<Flex direction="column" gap={6}>
					<Flex direction="column">
						<Text fontSize="sm" fontWeight="semibold">
							TSVJ Management Corp
						</Text>

						<Text fontSize="sm" fontWeight="semibold">
							Lot 6, Crispina Avenue, Pamplona Tes Las Pinas City
						</Text>

						<Text fontSize="sm" fontWeight="semibold">
							VAT TIN 010-357-903-000
						</Text>
					</Flex>

					<Grid templateColumns="256px 1fr" gap={6} border="1px solid black" p={3}>
						<GridItem>
							<Text fontSize="sm" fontWeight="semibold">
								TSVJ Center Unit No.
							</Text>

							<Text fontSize="sm" fontWeight="semibold">
								Lessee
							</Text>
						</GridItem>

						<GridItem>
							<Text fontSize="sm" fontWeight="medium">
								110
							</Text>

							<Flex direction="column">
								<Text fontSize="sm" fontWeight="medium">
									Tenant Name
								</Text>

								<Text fontSize="sm" fontWeight="medium">
									Company Name
								</Text>
							</Flex>
						</GridItem>
					</Grid>

					<chakra.div border="1px solid black">
						<Flex align="center" direction="column" p={3}>
							<Text fontSize="md" fontWeight="semibold">
								STATEMENT OF ACCOUNT
							</Text>

							<Text fontSize="sm" fontWeight="semibold">
								November 20, 2022
							</Text>
						</Flex>
					</chakra.div>
				</Flex>
			</Container>
		</chakra.div>
	)
}

export default Print

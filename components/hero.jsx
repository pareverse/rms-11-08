import { Button, Container, Flex, Text } from '@chakra-ui/react'

const Hero = () => {
	return (
		<Container>
			<Flex gap={12} h={600}>
				<Flex flex={1} justify="start" align="center">
					<Flex direction="column" align="start" gap={6}>
						<Text fontSize={80} fontWeight="semibold" lineHeight={1} color="accent-1">
							Create your success business.
						</Text>

						<Text fontSize="lg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore quam necessitatibus hic doloribus suscipit! Voluptate atque magni praesentium, asperiores inventore, eaque eos eum sunt?</Text>

						<Button size="xl" colorScheme="brand">
							Inquire Now
						</Button>
					</Flex>
				</Flex>

				<Flex flex={1} justify="end" align="center">
					<Flex bgImage="url('/assets/hero.jpg')" bgSize="cover" bgPos="center" borderRadius="100px 0 100px 0" h="full" w="full" />
				</Flex>
			</Flex>
		</Container>
	)
}

export default Hero

import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, Button, chakra, Flex, Icon, IconButton, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { FiBox, FiLogOut, FiMenu, FiMoon, FiSun } from 'react-icons/fi'

const Header = ({ onSidebarOpen }) => {
	const router = useRouter()
	const { data: session } = useSession()
	const { toggleColorMode } = useColorMode()
	const colorModeIcon = useColorModeValue(<FiMoon size={16} fill="currentColor" />, <FiSun size={16} fill="currentColor" />)
	const [isScrolling, setIsScrolling] = useState(false)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', () => {
				setIsScrolling(window.pageYOffset > 0)
			})
		}
	}, [])

	return (
		<chakra.header bg="white" position="sticky" top={0} shadow={isScrolling && 'sm'} transition=".4s" zIndex={99} _dark={{ bg: isScrolling ? 'surface' : 'system', border: 'none', shadow: isScrolling && 'dark-xl' }}>
			<Flex justify="space-between" align="center" gap={6} mx="auto" px={6} h={20} w="full" maxW={1280}>
				<Flex justify="start" align="center" gap={3}>
					{session && session.user.role === 'Admin' && <IconButton display={{ base: 'none', md: 'flex' }} variant="outline" color="accent-1" icon={<FiMenu size={16} />} onClick={onSidebarOpen} />}

					<Flex align="center" gap={2} color="accent-1">
						<Icon as={FiBox} boxSize={6} />

						<Text fontSize="lg" fontWeight="semibold">
							TSVJ CENTER
						</Text>
					</Flex>
				</Flex>

				<Flex display={{ base: 'none', md: 'flex' }} justify="end" align="center" gap={3}>
					{(!session || (session && session.user.role === 'User')) && (
						<Flex align="center" gap={8}>
							<NextLink href="/" passHref>
								<Link as="span" active={router.pathname.includes('') ? 1 : 0}>
									Home
								</Link>
							</NextLink>

							<NextLink href="/blogs" passHref>
								<Link as="span" active={router.pathname.includes('blogs') ? 1 : 0}>
									Blogs
								</Link>
							</NextLink>

							<NextLink href="/company" passHref>
								<Link as="span" active={router.pathname.includes('company') ? 1 : 0}>
									Company
								</Link>
							</NextLink>

							<NextLink href="/contact" passHref>
								<Link as="span" active={router.pathname.includes('contact') ? 1 : 0}>
									Call Us
								</Link>
							</NextLink>
						</Flex>
					)}

					{session ? (
						<Flex align="center" gap={3}>
							<IconButton variant="ghost" icon={colorModeIcon} onClick={toggleColorMode} />

							<Menu>
								<MenuButton>
									<Avatar name={session.user.name} src={session.user.image} />
								</MenuButton>

								<MenuList w={256}>
									<MenuItem>
										<Flex align="center" gap={3}>
											<Avatar name={session.user.name} src={session.user.image} />

											<Text color="accent-1" noOfLines={1}>
												{session.user.name}
											</Text>
										</Flex>
									</MenuItem>

									<MenuDivider />

									<MenuItem icon={<FiLogOut size={16} />} onClick={() => signOut()}>
										Log out
									</MenuItem>
								</MenuList>
							</Menu>
						</Flex>
					) : (
						<Flex align="center" gap={3}>
							<IconButton variant="ghost" icon={colorModeIcon} onClick={toggleColorMode} />

							<Button colorScheme="brand" onClick={() => signIn('google')}>
								Sign in
							</Button>
						</Flex>
					)}
				</Flex>

				<Flex display={{ base: 'flex', md: 'none' }} align="center" gap={3}>
					<IconButton variant="ghost" icon={colorModeIcon} onClick={toggleColorMode} />
					<IconButton variant="outline" color="accent-1" icon={<FiMenu size={16} />} onClick={onSidebarOpen} />
				</Flex>
			</Flex>
		</chakra.header>
	)
}

export default Header

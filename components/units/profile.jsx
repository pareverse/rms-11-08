import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Avatar, Button, Flex, IconButton, Skeleton, SkeletonCircle, Td, Text, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import Card from 'components/_card'
import Table from 'components/_table'
import Modal from 'components/_modal'
import Toast from 'components/_toast'

const EditModal = ({ id, company, viewDisclosure }) => {
	const queryClient = useQueryClient()
	const editDisclosure = useDisclosure()
	const [isLoading, setIsLoading] = useState(false)
	const toast = useToast()

	const editMutation = useMutation((data) => api.update('/units', id, data), {
		onSuccess: () => {
			queryClient.invalidateQueries('units')
			setIsLoading(false)
			editDisclosure.onClose()
			viewDisclosure.onClose()

			toast({
				position: 'top',
				render: () => <Toast title="Success" description="Company successfully added." />
			})
		}
	})

	const onSubmit = () => {
		setIsLoading(true)

		editMutation.mutate({
			company: {
				id: company._id
			}
		})
	}

	return (
		<Modal size="sm" header="off" toggle={(onOpen) => <IconButton variant="tinted" size="xs" colorScheme="brand" icon={<FiPlus size={16} />} onClick={onOpen} />} disclosure={editDisclosure}>
			<Flex align="center" direction="column" gap={6} p={6}>
				<Avatar size="xl" name={company.name} />

				<Flex direction="column">
					<Flex align="center" direction="column" textAlign="center">
						<Text fontWeight="semibold" color="accent-1" noOfLines={1}>
							{company.name}
						</Text>

						<Text fontSize="sm" noOfLines={1}>
							{company.email}
						</Text>
					</Flex>
				</Flex>

				<Text fontSize="sm" textAlign="center">
					Are you sure you want to add this company?
				</Text>

				<Flex align="center" gap={3}>
					<Button size="lg" colorScheme="brand" onClick={onSubmit} isLoading={isLoading}>
						Yes, sure
					</Button>

					<Button size="lg" onClick={editDisclosure.onClose}>
						No, cancel
					</Button>
				</Flex>
			</Flex>
		</Modal>
	)
}

const Profile = ({ id, unit, isUnitFetched }) => {
	const { data: company, isFetched: isCompanyFetched } = useQuery(['company', id], () => api.get('/companies', unit.company.id), { enabled: isUnitFetched && unit.company.id ? true : false })
	const { data: companies, isFetched: isCompaniesFetched } = useQuery(['companies'], () => api.all('/companies/vacant'))

	const viewDisclosure = useDisclosure()

	return (
		<Card>
			<Flex align="center" direction="column" gap={6} p={6}>
				{isUnitFetched && isCompanyFetched && unit.company.id ? (
					<>
						<Avatar size="xl" name={company.name} />

						<Flex align="center" direction="column" textAlign="center">
							<Text fontWeight="semibold" color="accent-1" noOfLines={1}>
								{company.name}
							</Text>

							<Text fontSize="sm" noOfLines={1}>
								{company.email}
							</Text>
						</Flex>
					</>
				) : (
					<>
						<SkeletonCircle size={24} />

						<Flex align="center" direction="column" gap={3}>
							<Skeleton h={2} w={148} />
							<Skeleton h={2} w={124} />
						</Flex>
					</>
				)}

				{isUnitFetched && !unit.company.id && (
					<Modal
						title="Add Company"
						size="lg"
						toggle={(onOpen) => (
							<Button size="lg" colorScheme="brand" onClick={onOpen}>
								Add Company
							</Button>
						)}
						disclosure={viewDisclosure}
					>
						<Table
							data={companies}
							fetched={isCompaniesFetched}
							td={(company) => (
								<Tr key={company._id}>
									<Td>
										<Flex align="center" gap={3}>
											<Avatar name={company.name} />

											<Text fontWeight="medium" color="accent-1" noOfLines={1}>
												{company.name}
											</Text>
										</Flex>
									</Td>

									<Td textAlign="right">
										<EditModal id={id} company={company} viewDisclosure={viewDisclosure} />
									</Td>
								</Tr>
							)}
							filters={(data, watch) => {
								return data.filter((data) =>
									['name'].some((key) =>
										data[key]
											.toString()
											.toLowerCase()
											.includes(watch('search') && watch('search').toLowerCase())
									)
								)
							}}
							settings={{
								placeholder: 'Search Company',
								searchWidth: 'full',
								show: [5]
							}}
						/>
					</Modal>
				)}
			</Flex>
		</Card>
	)
}

export default Profile

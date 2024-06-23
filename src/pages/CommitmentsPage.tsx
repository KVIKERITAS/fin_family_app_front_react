import SingleCommitmentCard from '@/components/CommitmentsComponents/SingleCommitmentCard'
import UpperBanner from '@/components/CommitmentsComponents/UpperBanner'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

const timePeriods = ['This Year', 'This Quarter', 'This Month']

const CollapsibleProject = ({ projectNumber, description, details }) => (
	<Collapsible className='w-full container'>
		<Card className='w-full py-4 my-2 px-7'>
			<CollapsibleTrigger asChild>
				<div className='h-12 flex justify-between items-center space-x-2 cursor-pointer pt-3'>
					<span className='text-l font-semibold text-muted-foreground sm:text-2xl'>
						{description} - {projectNumber} eur.
					</span>
					<ChevronsUpDown className='h-4 w-4 text-muted-foreground sm:h-6 sm:w-6' />
				</div>
			</CollapsibleTrigger>
			<CollapsibleContent className='py-2 flex justify-start'>
				<SingleCommitmentCard  commitmentInfo={details} />
			</CollapsibleContent>
		</Card>
	</Collapsible>
)

const CommitmentsPage = () => {
	const [commitmentsData, setCommitmentsData] = useState([
		{
			number: 300,
			description: 'Subscriptions',
			details: [
				{ label: 'Start Date', value: '01/01/2023' },
				{ label: 'Company', value: 'Company A' },
				{ label: 'Service', value: 'Streaming' },
				{ label: 'End Date', value: '01/01/2024' },
				{ label: 'Price', value: '300 eur.' },
			],
		},
		{
			number: 500,
			description: 'Leasing',
			details: [
				{ label: 'Start Date', value: '01/06/2023' },
				{ label: 'Company', value: 'Company B' },
				{ label: 'Service', value: 'Car Leasing' },
				{ label: 'End Date', value: '01/06/2025' },
				{ label: 'Price', value: '500 eur.' },
			],
		},
		{
			number: 300,
			description: 'Debts/mortgage/study loans',
			details: [
				{ label: 'Start Date', value: '01/09/2023' },
				{ label: 'Company', value: 'Company C' },
				{ label: 'Service', value: 'Mortgage' },
				{ label: 'End Date', value: '01/09/2033' },
				{ label: 'Price', value: '300 eur.' },
			],
		},
	])

	const handleAddCommitment = newCommitment => {
		setCommitmentsData(prevData => [
			...prevData,
			{
				number: newCommitment.price,
				description: newCommitment.commitmentType,
				details: [
					{ label: 'Start Date', value: newCommitment.paymentStart },
					{ label: 'Company', value: newCommitment.name },
					{ label: 'Service', value: newCommitment.commitmentType },
					{ label: 'End Date', value: newCommitment.commitmentEnds },
					{ label: 'Price', value: `${newCommitment.price} eur.` },
					// Add other details as needed
				],
			},
		])
	}

	return (
		<>
			<UpperBanner />
			<div className='flex flex-col items-center space-y-4 my-4'>
				<div className='flex justify-center space-x-4'>
					{timePeriods.map(period => (
						<Button
							key={period}
							variant='outline'
							className='bg-gray-400 text-white hover:bg-gray-500 hover:text-white'
						>
							{period}
						</Button>
					))}
				</div>
				<div className='flex items-center'>
					<input type='checkbox' id='commitments' className='mr-2' />
					<label htmlFor='commitments' className='text-muted-foreground'>
						Commitments ends
					</label>
				</div>

				<div className='w-full'>
					{commitmentsData.map((item, index) => (
						<CollapsibleProject
							key={index}
							projectNumber={item.number}
							description={item.description}
							details={item.details}
						/>
					))}
				</div>
			</div>
		</>
	)
}

export default CommitmentsPage

import UpperBanner from '@/components/CommitmentsComponents/UpperBanner'
import { Button } from '@/components/ui/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

const timePeriods = ['This Year', 'This Quarter', 'This Month']

const CollapsibleProject = ({ projectNumber, description, details }) => (
	<Collapsible className='w-full'>
		<CollapsibleTrigger asChild>
			<div className='flex justify-center items-center space-x-2 cursor-pointer'>
				<span className='font-bold text-xl'>
					{description} - {projectNumber} eur.
				</span>
				<ChevronsUpDown className='h-4 w-4' />
			</div>
		</CollapsibleTrigger>
		<CollapsibleContent className='p-2 flex justify-center'>
			<div className='flex space-x-4'>
				{details.map((detail, index) => (
					<span key={index}>
						{detail.label}: {detail.value}
					</span>
				))}
			</div>
		</CollapsibleContent>
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
					<label htmlFor='commitments' className='text-gray-700'>
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

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { NewCommitment } from '@/types'
import { useState } from 'react'
import LeasingAndDebtsForm from './LeasingAndDebtsForm'
import SubscriptionsAndInsuranceForm from './SubscriptionsAndInsuranceForm'

type Props = {
	onCommitmentSave: (commitmentData: NewCommitment) => void
	isLoading: boolean
}

const CommitmentForm = ({ onCommitmentSave, isLoading }: Props) => {
	const [selectedType, setSelectedType] = useState('')

	function onTypeChange(value: string) {
		setSelectedType(value)
	}

	return (
		<>
			<Select onValueChange={onTypeChange} defaultValue=''>
				<SelectTrigger>
					<SelectValue placeholder='Select commitment type' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='subscription'>Subscriptions</SelectItem>
					<SelectItem value='insurance'>Insurance</SelectItem>
					<SelectItem value='lease'>Leasing</SelectItem>
					<SelectItem value='debt'>Debts</SelectItem>
					<SelectItem value='mortgage'>Mortgage</SelectItem>
				</SelectContent>
			</Select>
			{selectedType === 'subscription' && (
				<SubscriptionsAndInsuranceForm
					commitmentType={selectedType}
					onSave={onCommitmentSave}
					isLoading={isLoading}
				/>
			)}
			{selectedType === 'insurance' && (
				<SubscriptionsAndInsuranceForm
					commitmentType={selectedType}
					onSave={onCommitmentSave}
					isLoading={isLoading}
				/>
			)}
			{selectedType === 'lease' && (
				<LeasingAndDebtsForm
					commitmentType={selectedType}
					onSave={onCommitmentSave}
					isLoading={isLoading}
				/>
			)}
			{selectedType === 'debt' && (
				<LeasingAndDebtsForm
					commitmentType={selectedType}
					onSave={onCommitmentSave}
					isLoading={isLoading}
				/>
			)}
		</>
	)
}

export default CommitmentForm;

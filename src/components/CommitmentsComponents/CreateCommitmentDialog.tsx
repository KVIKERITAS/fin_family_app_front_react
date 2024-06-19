import { useCreateCommitment } from '@/api/MyCommitmentsApi'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import CommitmentForm from '@/forms/commitment-form/CommitmentForm'
import { NewCommitment } from '@/types'

type Props = {
	trigger: React.ReactNode
}

const CreateCommitmentDialog = ({ trigger }: Props) => {
	const { createCommitment, isLoading } = useCreateCommitment()
	function onCommitmentSave(formData: NewCommitment) {
		console.log(formData)
		createCommitment(formData)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a new commitment</DialogTitle>
				</DialogHeader>
				<CommitmentForm onSave={onCommitmentSave} isLoading={isLoading}  />
			</DialogContent>
		</Dialog>
	)
}

export default CreateCommitmentDialog

// import { useCreateCommitment } from '@/api/MyCommitmentsApi'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import CommitmentForm from '@/forms/commitment-form/CommitmentForm'

type Props = {
	trigger: React.ReactNode
}

const CreateCommitmentDialog = ({ trigger }: Props) => {
	// TODO: [finApp/commitment-form-submit] - call createCommitment function, passing the formData as props. createCommitment(formData)
	// const { createCommitment, isLoading } = useCreateCommitment()

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a new commitment</DialogTitle>
				</DialogHeader>
				<CommitmentForm onSave={() => {}} isLoading={true} />
			</DialogContent>
		</Dialog>
	)
}

export default CreateCommitmentDialog

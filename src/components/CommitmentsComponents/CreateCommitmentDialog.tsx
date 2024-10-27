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
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a new commitment</DialogTitle>
				</DialogHeader>
				<CommitmentForm />
			</DialogContent>
		</Dialog>
	)
}

export default CreateCommitmentDialog

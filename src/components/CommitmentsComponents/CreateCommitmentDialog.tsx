import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import CommitmentForm from '@/forms/commitment-form/CommitmentForm';
import { useCreateCommitment } from '@/api/MyCommitmentsApi';
import { NewCommitment } from '@/types';

type Props = {
	trigger: React.ReactNode;
};

const CreateCommitmentDialog = ({ trigger }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const { createCommitment, isLoading } = useCreateCommitment();

	async function onCommitmentSave(formData: NewCommitment) {
		try {
			const res = await createCommitment(formData);
			if (res && res.ok) {
				setIsOpen(false);
			} else {
				console.error('Failed to create commitment:', res);
			}
		} catch (error) {
			console.error('An error occurred while creating commitment:', error);
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild onClick={() => setIsOpen(true)}>
				{trigger}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a new commitment</DialogTitle>
				</DialogHeader>
				<CommitmentForm
					onCommitmentSave={onCommitmentSave}
					isLoading={isLoading}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default CreateCommitmentDialog;

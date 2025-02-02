import { NewCommitment } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateCommitment = () => {
	const { getAccessTokenSilently } = useAuth0();

	const createCommitmentRequest = async (formData: NewCommitment) => {
		const accessToken = await getAccessTokenSilently();

		console.log(formData);

		const response = await fetch(
			`${API_BASE_URL}/api/my/commitment/newCommitment`,
			{
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			},
		);

		if (!response.ok) throw new Error('Failed to create commitment');

		return response;
	};

	const {
		mutateAsync: createCommitment,
		isLoading,
		isSuccess,
		error,
		reset,
	} = useMutation(createCommitmentRequest);

	if (isSuccess) {
		toast.success('Commitment created!');
		reset();
	}

	if (error) {
		toast.error(error.toString());
		reset();
	}

	return { createCommitment, isLoading };
};

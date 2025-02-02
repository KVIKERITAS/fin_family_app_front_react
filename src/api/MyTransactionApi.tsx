import { TransactionType } from '@/components/CreateTransactionDialog';
import { TransactionCategory } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetTransactionCategories = (
	transactionType: TransactionType,
) => {
	const { getAccessTokenSilently } = useAuth0();

	const getTransactionCategories = async () => {
		const accessToken = await getAccessTokenSilently();

		const response = await fetch(
			`${API_BASE_URL}/api/my/transaction/category/${transactionType}`,
			{
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) throw new Error('Failed to get transaction categories');

		return response.json();
	};

	const {
		data: transactionCategories,
		isLoading,
		error,
	} = useQuery('fetchTransactionCategories', getTransactionCategories);

	if (error) toast.error(error.toString());

	return { transactionCategories, isLoading };
};

export const useCreateTransactionCategory = () => {
	const { getAccessTokenSilently } = useAuth0();

	const createTransactionCategoryRequest = async (
		formData: TransactionCategory,
	) => {
		const accessToken = await getAccessTokenSilently();

		console.log(formData);

		const response = await fetch(
			`${API_BASE_URL}/api/my/transaction/category`,
			{
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			},
		);

		if (!response.ok) throw new Error('Failed to create category');

		return response.json();
	};

	const {
		mutateAsync: createTransactionCategory,
		isLoading,
		isSuccess,
		error,
		reset,
	} = useMutation(createTransactionCategoryRequest);

	if (isSuccess) {
		toast.success('Category created!');
		reset();
	}

	if (error) {
		toast.error(error.toString());
		reset();
	}

	return { createTransactionCategory, isLoading };
};

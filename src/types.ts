export type User = {
	id: string
	email: string
	name: string
}

export type TransactionCategory = {
	name: string
	icon: string
	type: 'income' | 'expense'
}

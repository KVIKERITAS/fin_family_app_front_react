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

export type NewCommitment = {
	type: CommitmentType
	name: string
	commitmentStart: Date
	commitmentEnd?: Date
	fee: number
	feeType: string
	interestRate?: number	// only for leasing, debts, mortgage
	initialPayment?: number // only for leasing and mortgage
}

export type CommitmentType =
	| 'Subscriptions'
	| 'Leasing'
	| 'Debts'
	| 'Mortgage'
	| 'Insurance'  

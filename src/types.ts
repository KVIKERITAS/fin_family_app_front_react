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
	name: string
	type: CommitmentType
	initialPayment: number
	paymentStart: Date
	commitmentEnds: Date
	paymentDate: Date
	price: number
	feeType: string
	interestRate: number
}

export type CommitmentType =
	| 'Subscriptions'
	| 'Leasing'
	| 'Depts-mortgage-study-loans'  

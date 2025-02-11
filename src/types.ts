export type User = {
	id: string;
	email: string;
	name: string;
};

export type TransactionCategory = {
	name: string;
	icon: string;
	type: 'income' | 'expense';
};

export type NewCommitment = {
	type: CommitmentType;
	name: string;
	commitmentStart?: Date;
	commitmentEnd?: Date;
	fee?: number;
	feeType: string;
	fullSum?: number; // only for leasing, debts, mortgage
	interestRate?: number; // only for leasing, debts, mortgage
	initialPayment?: number; // only for leasing and mortgage
	fieldForInput?: string; // only in FE for leasing and debts
};

export type CommitmentType =
	| 'subscription'
	| 'lease'
	| 'debt'
	| 'insurance'
	| 'other';

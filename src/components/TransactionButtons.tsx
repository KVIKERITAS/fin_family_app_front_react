import CreateTransactionDialog from './CreateTransactionDialog';
import { Button } from './ui/button';

const TransactionButtons = () => {
	return (
		<div>
			<div className='flex flex-wrap items-center gap-6 py-6'>
				<div className='flex items-center gap-3'>
					<CreateTransactionDialog
						trigger={
							<Button
								variant='outline'
								className='bg-emerald-600 text-white hover:bg-emerald-800 hover:text-white'
							>
								New Income
							</Button>
						}
						type='income'
					/>

					<CreateTransactionDialog
						trigger={
							<Button
								variant='outline'
								className='bg-rose-600 text-white hover:bg-rose-800 hover:text-white'
							>
								New Expense
							</Button>
						}
						type='expense'
					/>
				</div>
			</div>
		</div>
	);
};

export default TransactionButtons;

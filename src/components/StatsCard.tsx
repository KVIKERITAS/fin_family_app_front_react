import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { Card } from './ui/card';

const StatsCard = () => {
	return (
		<div className='relative flex w-full flex-wrap gap-2 md:flex-nowrap'>
			<Card className='flex h-24 w-full items-center gap-4 p-4'>
				<TrendingUp className='h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10' />
				<div className='flex flex-col items-center gap-0'>
					<p className='text-muted-foreground'>Income</p>
					<span className='font-semibold'>$ 1337</span>
				</div>
			</Card>

			<Card className='flex h-24 w-full items-center gap-4 p-4'>
				<TrendingDown className='h-12 w-12 items-center rounded-lg p-2 text-red-500 bg-red-400/10' />
				<div className='flex flex-col items-center gap-0'>
					<p className='text-muted-foreground'>Outcome</p>
					<span className='font-semibold'>$ 420</span>
				</div>
			</Card>

			<Card className='flex h-24 w-full items-center gap-4 p-4'>
				<Wallet className='h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10' />
				<div className='flex flex-col items-center gap-0'>
					<p className='text-muted-foreground'>Balance</p>
					<span className='font-semibold'>$ 69</span>
				</div>
			</Card>
		</div>
	);
};

export default StatsCard;

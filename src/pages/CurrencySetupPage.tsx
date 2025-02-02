import { CurrencyComboBox } from '@/components/CurrencyComboBox';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const CurrencySetupPage = () => {
	return (
		<div className='container flex max-w-2xl flex-col items-center justify-between gap-4'>
			<div>
				<h1 className='text-center text-3xl'>Welcome,</h1>
				<h2 className='mt-4 text-center text-base text-muted-foreground'>
					Let's get started by setting up your currency
				</h2>
				<h3 className='mt-2 text-center text-sm text-muted-foreground'>
					You can change this setting at any time later on
				</h3>
			</div>
			<Separator />
			<Card className='w-full'>
				<CardHeader>
					<CardTitle>Currency</CardTitle>
					<CardDescription>
						Set your default currency for transactions
					</CardDescription>
				</CardHeader>
				<CardContent>
					<CurrencyComboBox />
				</CardContent>
			</Card>
			<Separator />
			<Button className='w-full' asChild>
				<Link to='/dashboard'>I'm done! Take me to my dashboard</Link>
			</Button>
			<div className='mt-8 text-3xl font-bold tracking-tight text-blue-500'>
				Family Finn App
			</div>
		</div>
	);
};

export default CurrencySetupPage;

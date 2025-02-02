import { MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const MobileTopNav = () => {
	return (
		<div className='container mx-auto flex justify-between items-center py-4 md:hidden'>
			<Link to='/dashboard' className='font-bold tracking-tight text-blue-500'>
				Family Finn App
			</Link>
			<Sheet>
				<Button variant='outline' asChild>
					<SheetTrigger>
						<MenuIcon className='w-4 h-4 text-blue-500' />
					</SheetTrigger>
				</Button>

				<SheetContent className='h-screen flex-col justify-between'>
					<Sidebar />
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default MobileTopNav;

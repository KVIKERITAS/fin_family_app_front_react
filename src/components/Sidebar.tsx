import { useGetMyUser } from '@/api/MyUserApi';
import { navConfig } from '@/config/Nav';
import { cn } from '@/lib/utils';
import { useAuth0 } from '@auth0/auth0-react';
import { LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';

const Sidebar = () => {
	const { pathname } = useLocation();
	const { logout } = useAuth0();

	const { currentUser } = useGetMyUser();

	return (
		<>
			<div className='px-4 py-6'>
				<Link
					to='/dashboard'
					className='font-bold tracking-tight text-blue-500 grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs'
				>
					Family Finn App
				</Link>

				<ul className='mt-6 space-y-1'>
					{navConfig.map((item) => (
						<li key={item.title}>
							<Link
								to={item.href}
								className={cn(
									'flex rounded-lg px-4 py-2 text-sm font-medium text-gray-700 items-center gap-2',
									pathname === item.href && 'bg-gray-100',
								)}
							>
								<item.icon className='h-4 w-4' />
								<span>{item.title}</span>
							</Link>
						</li>
					))}
				</ul>
			</div>

			<div className='sticky inset-x-0 bottom-0'>
				<div className='p-4'>
					<Button
						size='lg'
						variant='outline'
						className='flex gap-2'
						onClick={() => logout()}
					>
						<LogOut className='h-4 w-4' />
					</Button>
				</div>
				<Link
					to='/user-profile'
					className='flex items-center gap-2 bg-white p-4 hover:bg-gray-50 border-t border-gray-100'
				>
					<img
						alt=''
						src='https://ashisheditz.com/wp-content/uploads/2023/11/boys-dp-instagram.jpg'
						className='size-10 rounded-full object-cover'
					/>

					<div>
						<p className='text-xs w-32 overflow-hidden text-ellipsis font-medium'>
							{currentUser?.name || 'NewUser'}
						</p>
						<p className='text-xs w-32 overflow-hidden text-ellipsis'>
							{currentUser?.email}
						</p>
					</div>
				</Link>
			</div>
		</>
	);
};

export default Sidebar;

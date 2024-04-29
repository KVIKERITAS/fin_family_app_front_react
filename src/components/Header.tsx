import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Header = () => {
	const { loginWithRedirect } = useAuth0()

	return (
		<header className='py-6'>
			<div className='container mx-auto flex justify-between items-center'>
				<Link
					to='/'
					className='text-3xl font-bold tracking-tight text-blue-500'
				>
					Family Finn App
				</Link>
				<div>
					<Button size='lg' onClick={async () => await loginWithRedirect()}>
						Login
					</Button>
				</div>
			</div>
		</header>
	)
}

export default Header

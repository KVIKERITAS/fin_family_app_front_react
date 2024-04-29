import MobileTopNav from '@/components/MobileTopNav'
import Sidebar from '@/components/Sidebar'
import React from 'react'

type Props = {
	children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
	return (
		<>
			<MobileTopNav />
			<div className='flex'>
				<div className='h-screen flex-col justify-between border-e bg-white w-64 hidden md:flex'>
					<Sidebar />
				</div>
				<div className='w-full'>{children}</div>
			</div>
		</>
	)
}

export default DashboardLayout

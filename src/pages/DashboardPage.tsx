import DashboardIntro from '@/components/DashboardIntro'
import StatsCard from '@/components/StatsCard'

const DashboardPage = () => {
	return (
		<>
			<DashboardIntro />
			<div className='container flex w-full flex-col gap-2'>
				<StatsCard />
			</div>
		</>
	)
}

export default DashboardPage

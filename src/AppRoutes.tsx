import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import DashboardLayout from './layouts/DashboardLayout'
import HeroLayout from './layouts/HeroLayout'
import AuthCallbackPage from './pages/AuthCallbackPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import UserProfilePage from './pages/UserProfilePage'

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<HeroLayout>
						<HomePage />
					</HeroLayout>
				}
			/>

			<Route path='/auth-callback' element={<AuthCallbackPage />} />

			<Route element={<ProtectedRoute />}>
				<Route
					path='/dashboard'
					element={
						<DashboardLayout>
							<DashboardPage />
						</DashboardLayout>
					}
				/>

				<Route
					path='/user-profile'
					element={
						<DashboardLayout>
							<UserProfilePage />
						</DashboardLayout>
					}
				/>
			</Route>

			<Route path='*' element={<Navigate to='/dashboard' />} />
		</Routes>
	)
}

export default AppRoutes

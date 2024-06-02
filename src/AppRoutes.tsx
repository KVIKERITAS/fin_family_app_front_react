import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import CurrencySetupLayout from './layouts/CurrencySetupLayout'
import DashboardLayout from './layouts/DashboardLayout'
import HeroLayout from './layouts/HeroLayout'
import AuthCallbackPage from './pages/AuthCallbackPage'
import CurrencySetupPage from './pages/CurrencySetupPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import PersonalFinancePage from './pages/PersonalFinancePage'
import UserProfilePage from './pages/UserProfilePage'
import CommitmentsPage from "./pages/CommitmentsPage";

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
					path='/personal-finance'
					element={
						<DashboardLayout>
							<PersonalFinancePage />
						</DashboardLayout>
					}
				/>

				<Route
					path='/commitments'
					element={
						<DashboardLayout>
							<CommitmentsPage />
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

				<Route
					path='/currency-setup'
					element={
						<CurrencySetupLayout>
							<CurrencySetupPage />
						</CurrencySetupLayout>
					}
				/>
			</Route>

			<Route path='*' element={<Navigate to='/dashboard' />} />
		</Routes>
	)
}

export default AppRoutes

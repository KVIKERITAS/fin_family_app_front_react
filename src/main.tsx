import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate'
import { Toaster } from './components/ui/sonner'
import './global.css'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Router>
			<QueryClientProvider client={queryClient}>
				<Auth0ProviderWithNavigate>
					<AppRoutes />
					<Toaster visibleToasts={1} position='bottom-right' />
				</Auth0ProviderWithNavigate>
			</QueryClientProvider>
		</Router>
	</React.StrictMode>,
)

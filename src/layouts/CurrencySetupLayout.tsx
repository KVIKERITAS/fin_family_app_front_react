type Props = {
	children: React.ReactNode
}

const CurrencySetupLayout = ({ children }: Props) => {
	return (
		<div className='relative flex h-screen w-full flex-col items-center justify-center'>
			{children}
		</div>
	)
}

export default CurrencySetupLayout

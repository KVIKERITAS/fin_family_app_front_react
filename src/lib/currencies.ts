export const Currencies = [
	{
		value: 'EUR',
		label: '€ Euro',
		locale: 'de-DE',
	},
	{
		value: 'USD',
		label: '$ Dollar',
		locale: 'en-USD',
	},
];

export type Currency = (typeof Currencies)[0];

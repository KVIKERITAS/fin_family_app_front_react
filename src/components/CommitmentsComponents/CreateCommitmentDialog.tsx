// import { useState } from 'react';
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from '@/components/ui/dialog';
//
// type Props = {
// 	trigger: React.ReactNode;
// 	onSave: (formData: any) => void;
// 	onClose: () => void;
// };
//
// const CreateCommitmentDialog = ({ trigger, onSave, onClose }: Props) => {
// 	const [commitmentType, setCommitmentType] = useState('');
// 	const [formData, setFormData] = useState({
// 		name: '',
// 		paymentStart: '',
// 		commitmentEnds: '',
// 		price: '',
// 		feeType: '',
// 		paymentDate: '',
// 		fee: '',
// 	});
//
// 	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// 		const { name, value } = e.target;
// 		setFormData((prevData) => ({
// 			...prevData,
// 			[name]: value,
// 		}));
// 	};
//
// 	const handleSave = () => {
// 		onSave({ ...formData, commitmentType });
// 		// Reset the form data
// 		setFormData({
// 			name: '',
// 			paymentStart: '',
// 			commitmentEnds: '',
// 			price: '',
// 			feeType: '',
// 			paymentDate: '',
// 			fee: '',
// 		});
// 		setCommitmentType('');
// 		onClose();
// 	};
//
// 	const renderFields = () => {
// 		if (commitmentType === 'Subscriptions') {
// 			return (
// 				<>
// 					<div className="flex items-center space-x-2">
//
// 						<input type="text" name="name" placeholder="Commitment name" onChange={handleChange} value={formData.name} />
// 					</div>
// 					<div className="flex items-center space-x-2">
// 						<label htmlFor="paymentStart">First payment: </label>
// 						<input type="date" name="paymentStart" onChange={handleChange} value={formData.paymentStart} />
// 					</div>
// 					<div className="flex items-center space-x-2">
// 						<label htmlFor="commitmentEnds">End Date: </label>
// 						<input type="date" name="commitmentEnds" onChange={handleChange} value={formData.commitmentEnds} />
// 					</div>
// 					<div className="flex items-center space-x-2">
//
// 						<input type="number" name="price" placeholder="Price" onChange={handleChange} value={formData.price} />
// 					</div>
// 					<div className="flex items-center space-x-2">
// 						<select name="feeType" onChange={handleChange} value={formData.feeType}>
// 							<option value="" disabled>Select Fee Type</option>
// 							<option value="month">Monthly</option>
// 							<option value="quarter">Quarterly</option>
// 							<option value="year">Yearly</option>
// 						</select>
// 					</div>
//
//
// 				</>
// 			);
// 		}
// 		return null;
// 	};
//
// 	return (
// 		<Dialog>
// 			<DialogTrigger asChild>{trigger}</DialogTrigger>
// 			<DialogContent>
// 				<DialogHeader>
// 					<DialogTitle>Create a new commitment</DialogTitle>
// 				</DialogHeader>
// 				<div className="grid grid-cols-2 gap-4">
// 					<select name="commitmentType" onChange={(e) => setCommitmentType(e.target.value)} value={commitmentType}>
// 						<option value="" disabled>Select Commitment Type</option>
// 						<option value="Subscriptions">Subscriptions</option>
// 						<option value="Leasing">Leasing</option>
// 						<option value="Depts/mortgage/study loans">Depts/mortgage/study loans</option>
// 					</select>
// 					{renderFields()}
// 				</div>
// 				<div className="flex justify-end mt-4">
// 					<button
// 						onClick={handleSave}
// 						className="bg-sky-500 hover:bg-green-500 text-white px-4 py-2 rounded"
// 					>
// 						Save
// 					</button>
// 				</div>
// 			</DialogContent>
// 		</Dialog>
// 	);
// };
//
// export default CreateCommitmentDialog;

import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
	trigger: React.ReactNode;
	onSave: (formData: any) => void;
	onClose: () => void;
};

const CreateCommitmentDialog = ({ trigger, onSave, onClose }: Props) => {
	const [commitmentType, setCommitmentType] = useState('');
	const [formData, setFormData] = useState({
		name: '',
		paymentStart: '',
		commitmentEnds: '',
		price: '',
		feeType: '',
		paymentDate: '',
		fee: '',
		initialPayment: '',
		interestRate: '',
		sumPayLeft: ''
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSave = () => {
		onSave({ ...formData, commitmentType });
		// Reset the form data
		setFormData({
			name: '',
			paymentStart: '',
			commitmentEnds: '',
			price: '',
			feeType: '',
			paymentDate: '',
			fee: '',
			initialPayment: '',
			interestRate: '',
			sumPayLeft: ''
		});
		setCommitmentType('');
		onClose();
	};

	const renderFields = () => {
		switch (commitmentType) {
			case 'Subscriptions':
				return (
					<>
						<div className="flex items-center space-x-2">

													<input type="text" name="name" placeholder="Commitment name" onChange={handleChange} value={formData.name} /></div>
											<div className="flex items-center space-x-2">
						 						<label htmlFor="paymentStart">First payment: </label>
											<input type="date" name="paymentStart" onChange={handleChange} value={formData.paymentStart} />
											</div>
						 					<div className="flex items-center space-x-2">
												<label htmlFor="commitmentEnds">End Date: </label>
												<input type="date" name="commitmentEnds" onChange={handleChange} value={formData.commitmentEnds} />
										</div>
											<div className="flex items-center space-x-2">

											<input type="number" name="price" placeholder="Price" onChange={handleChange} value={formData.price} />
											</div>
											<div className="flex items-center space-x-2">
												<select name="feeType" onChange={handleChange} value={formData.feeType}><option value="" disabled>Select Fee Type</option>
													<option value="month">Monthly</option>
												<option value="quarter">Quarterly</option>
						 							<option value="year">Yearly</option>
												</select>
										</div>

					</>
				);
			case 'Leasing':
				return (
					<>
						<div className="flex items-center space-x-2">

							<input type="text" name="name" placeholder="Commitment name" onChange={handleChange} value={formData.name} />
						</div>
						<div className="flex items-center space-x-2">
							<label htmlFor="paymentStart">Start Date: </label>
							<input type="date" name="paymentStart" onChange={handleChange} value={formData.paymentStart} />
						</div>
						<div className="flex items-center space-x-2">
							<label htmlFor="commitmentEnds">End Date: </label>
							<input type="date" name="commitmentEnds" onChange={handleChange} value={formData.commitmentEnds} />
						</div>
						<div className="flex items-center space-x-2">

							<input type="number" name=" price" placeholder="Monthly price" onChange={handleChange} value={formData.price} />
						</div>
						<div className="flex items-center space-x-2">

							<input type="number" name="initialPayment" placeholder="Initial Payment" onChange={handleChange} value={formData.initialPayment} />
						</div>
						<div className="flex items-center space-x-2">

							<input type="number" name="interestRate" placeholder="Interest Rate" onChange={handleChange} value={formData.interestRate} />
						</div>
					</>
				);
			case 'Depts/mortgage/study loans':
				return (
					<>
						<div className="flex items-center space-x-2">

							<input type="text" name="name" placeholder="Commitment name" onChange={handleChange} value={formData.name} />
						</div>
						<div className="flex items-center space-x-2">
							<label htmlFor="paymentStart">Start Date: </label>
							<input type="date" name="paymentStart" onChange={handleChange} value={formData.paymentStart} />
						</div>
						<div className="flex items-center space-x-2">
							<label htmlFor="commitmentEnds">End Date: </label>
							<input type="date" name="commitmentEnds" onChange={handleChange} value={formData.commitmentEnds} />
						</div>
						<div className="flex items-center space-x-2">

							<input type="number" name=" price" placeholder="Monthly price" onChange={handleChange} value={formData.price} />
						</div>
						<div className="flex items-center space-x-2">

							<input type="number" name="initialPayment" placeholder="Initial Payment" onChange={handleChange} value={formData.initialPayment} />
						</div>
						<div className="flex items-center space-x-2">

							<input type="number" name="interestRate" placeholder="Interest Rate" onChange={handleChange} value={formData.interestRate} />
						</div>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a new commitment</DialogTitle>
				</DialogHeader>
				<div className="grid grid-cols-2 gap-4">
					<select name="commitmentType" onChange={(e) => setCommitmentType(e.target.value)} value={commitmentType}>
						<option value="" disabled>Select Commitment Type</option>
						<option value="Subscriptions">Subscriptions</option>
						<option value="Leasing">Leasing</option>
						<option value="Depts/mortgage/study loans">Depts/mortgage/study loans</option>
					</select>
					{renderFields()}
				</div>
				<div className="flex justify-end mt-4">
					<button
						onClick={handleSave}
						className="bg-sky-500 hover:bg-green-500 text-white px-4 py-2 rounded"
					>
						Save
					</button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CreateCommitmentDialog;

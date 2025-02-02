import { Card, CardContent, CardHeader } from '../ui/card';

const SingleCommitmentCard = ({ commitmentInfo }) => {
	return (
		<Card className='mt-5 mb-2'>
			<CardHeader className='font-bold text-muted-foreground'>
				Commitment Name
			</CardHeader>
			<CardContent className='flex flex-col'>
				{commitmentInfo.map((detail, index) => (
					<span key={index}>
						{detail.label}: {detail.value}
					</span>
				))}
			</CardContent>
		</Card>
	);
};

export default SingleCommitmentCard;

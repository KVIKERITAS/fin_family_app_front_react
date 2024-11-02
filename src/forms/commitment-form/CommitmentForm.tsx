import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';
import { useCreateCommitment } from '@/api/MyCommitmentsApi';
import { NewCommitment } from '@/types';
import SubscriptionsAndInsuranceForm from "./SubscriptionsAndInsuranceForm";
import LeasingAndDebtsForm from "./LeasingAndDebtsForm";

const CommitmentForm = () => {
  const [selectedType, setSelectedType] = useState('');

  const { createCommitment, isLoading } = useCreateCommitment();
	function onCommitmentSave(formData: NewCommitment) {
		createCommitment(formData)
	}

  function onTypeChange(value: string) {
    setSelectedType(value);
  }

  return (
    <>
      <Select onValueChange={onTypeChange} defaultValue=''>
        <SelectTrigger>
          <SelectValue placeholder="Select commitment type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Subscriptions">Subscriptions</SelectItem>
          <SelectItem value="Insurance">Insurance</SelectItem>
          <SelectItem value="Leasing">Leasing</SelectItem>
          <SelectItem value="Debts">Debts</SelectItem>
          <SelectItem value="Mortgage">Mortgage</SelectItem>
        </SelectContent>
      </Select>
      { selectedType === "Subscriptions" && <SubscriptionsAndInsuranceForm commitmentType={selectedType} onSave={onCommitmentSave} isLoading={isLoading} />}
      { selectedType === "Insurance" && <SubscriptionsAndInsuranceForm commitmentType={selectedType} onSave={onCommitmentSave} isLoading={isLoading} />}
      { selectedType === "Leasing" && <LeasingAndDebtsForm  commitmentType={selectedType} onSave={onCommitmentSave} isLoading={isLoading} />}
      { selectedType === "Debts" && <LeasingAndDebtsForm  commitmentType={selectedType} onSave={onCommitmentSave} isLoading={isLoading} />}
    </>
  );
};

export default CommitmentForm;

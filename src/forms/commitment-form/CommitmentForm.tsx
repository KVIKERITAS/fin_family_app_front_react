import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';
import { NewCommitment } from '@/types';
import SubscriptionsAndInsuranceForm from "./SubscriptionsAndInsuranceForm";
import LeasingAndDebtsForm from "./LeasingAndDebtsForm";

type Props = {
  onCommitmentSave: (commitmentData: NewCommitment) => void;
  isLoading: boolean;
};

const CommitmentForm = ({onCommitmentSave, isLoading }: Props) => {
  const [selectedType, setSelectedType] = useState('');

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

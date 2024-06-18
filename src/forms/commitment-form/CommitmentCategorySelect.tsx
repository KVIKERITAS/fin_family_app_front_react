 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
	onChange: (value: string) => void
}
 
export function CommitmentCategorySelect({ onChange }: Props) {
  return (
    <Select>
      <SelectTrigger className="w-100">
        <SelectValue placeholder="Select commitment type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Subscriptions">Subscriptions</SelectItem>
          <SelectItem value="Leasing">Leasing</SelectItem>
          <SelectItem value="Debts-mortgage-study-loans">Debts/mortgage/study loans</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
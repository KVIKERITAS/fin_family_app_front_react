 
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
   
  export function CommitmentFeeTypeSelect({ onChange }: Props) {
    return (
      <Select>
        <SelectTrigger className="w-100">
          <SelectValue placeholder="Select commitment type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="month">Monthly</SelectItem>
            <SelectItem value="quarter">Quarterly</SelectItem>
            <SelectItem value="year">Yearly</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }
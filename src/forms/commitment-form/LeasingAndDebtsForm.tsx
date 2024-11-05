import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CommitmentType, NewCommitment } from "@/types";

const FormSchema = z.object({
  name: z
    .string()
    .max(30, { message: "Name must be at most 30 characters long" })
    .min(1, { message: "Commitment name cannot be empty" }),
  fullSum: z.coerce.number().positive().multipleOf(0.01),
  interestRate: z.coerce.number().nonnegative().multipleOf(0.01).optional(),
  feeType: z.union([
    z.literal("month"),
    z.literal("quarter"),
    z.literal("year"),
    z.literal("all-at-once"),
  ]),
  fee: z.coerce.number().positive().multipleOf(0.01).optional(),
  commitmentStart: z.coerce.date().optional(),
  commitmentEnds: z.coerce.date().optional(),
  initialPayment: z.coerce.number().multipleOf(0.01).optional(), // only for leasing
  fieldForInput: z.string().optional(), // for radiobutton - we let choose for input one of these: fee or commitment_end. Other is automatically calculated
})
.refine((data) => {
  // If feeType is "all-at-once", commitmentStart should be optional and commitmentEnds required
  if (data.feeType === "all-at-once") {
    return data.commitmentEnds !== undefined;
  }
  return true;
}, {
  message: "Please enter commitment end",
  path: ["commitmentEnds"],
})
.refine((data) => {
  // If feeType is not "all-at-once", then commitmentStart should be required
  if (data.feeType !== "all-at-once") {
    return data.commitmentStart !== undefined;
  }
  return true;
}, {
  message: "Please enter commitment start",
  path: ["commitmentStart"],
});

type LeasingAndDebtsFormData = z.infer<typeof FormSchema>;

type Props = {
  commitmentType: CommitmentType;
  onSave: (commitmentData: NewCommitment) => void;
  isLoading: boolean;
};

const LeasingAndDebtsForm = ({commitmentType, onSave, isLoading }: Props) => {
  const form = useForm<LeasingAndDebtsFormData>({
    resolver: zodResolver(FormSchema),
  });

  const { control, handleSubmit, watch, setValue } = form;
  const currentDate = new Date().toISOString().split("T")[0];
  const feeType = watch("feeType");
  const fullSum = watch("fullSum");
  const interestRate = watch("interestRate");
  const initialPayment = watch("initialPayment") || 0;
  const commitmentEnds = watch("commitmentEnds");
  const commitmentStart = watch("commitmentStart");
  const fieldForInput = watch("fieldForInput");  
  const fee = watch("fee");

  const [errorMsgForFee, setErrorMsgForFee] = useState("");
  const [errorMsgForCommitmentEnd, setErrorMsgForCommitmentEnd] = useState("");

  useEffect(() => { 
    if (fieldForInput === "commitment_end") { countFee(); }
  }, [commitmentEnds, feeType, fullSum, initialPayment, interestRate, commitmentStart]);

  useEffect(() => {
    if (fieldForInput === "fee") { countCommitmentEndDate(); }
  }, [fee, feeType, fullSum, initialPayment, interestRate, commitmentStart]);

  function onSubmit(data: LeasingAndDebtsFormData) {
    const newCommitmentData: NewCommitment = Object.assign({type: commitmentType}, data);
    delete newCommitmentData.fieldForInput;
    onSave(newCommitmentData);
  }

  // Calculate and set the fee based on feeType, fullSum, initialPayment, interestRate, commitmentStart, commitmentEnds
  function countFee() {
    if (!commitmentEnds) {
      return;
    } else if (!fullSum) {
      setErrorMsgForFee("Enter full sum");
      return;
    } else if (!feeType) {
      setErrorMsgForFee("Enter fee type");
      return;
    } else if (!commitmentStart && feeType !== "all-at-once") { // for feeType "all-at-once" commitmentStart is unnecessary
      setErrorMsgForFee("Enter commitment start");
      return;
    } 

    let calculatedFee = 0;
    if ( feeType === "all-at-once" ) { // If pays all at once, fee is full sum
        calculatedFee = fullSum * (1 + ((interestRate || 0) / 100));
    } else { // Calculate the difference in months between commitmentEnds and commitmentStart		
      const startDate = new Date(commitmentStart);
      const endDate = new Date(commitmentEnds);
        const totalMonths = endDate.getFullYear() * 12 + endDate.getMonth() - (startDate.getFullYear() * 12 + startDate.getMonth());

      const sumToPay = fullSum - (initialPayment || 0);
      let rate = 0; // recalculated interest rate
      let howManyPayments = 0;

      if (totalMonths > 0) {
        if (feeType === "month") {
          rate = (interestRate || 0) / 12 / 100;
          howManyPayments = totalMonths;
        } else if (feeType === "quarter") {
          rate = (interestRate || 0) / 4 / 100;
          howManyPayments = totalMonths / 3; // number of quarters - we pay every three months
        } else if (feeType === "year") {
          rate = (interestRate || 0) / 100;
          howManyPayments = totalMonths / 12; // number of years
        }

        if (rate) {
          calculatedFee = sumToPay * rate * (1 + rate) ** howManyPayments / ((1 + rate) ** howManyPayments - 1); // annuity formula
        } else {
          calculatedFee = sumToPay / howManyPayments;
        }
        // Update the fee field
        setValue("fee", calculatedFee.toFixed(2));
      } else {
        setErrorMsgForFee("Please ensure the end date is after the start date");
      }
    }
  }

  // Calculate and set the CommitmentEnd Date based on fee, feeType, fullSum, initialPayment, interestRate, commitmentStart
  function countCommitmentEndDate() {
    if (!fee) {
      return;
    } else if (!fullSum) {
      setErrorMsgForCommitmentEnd("Enter full sum");
      return;
    } else if (!feeType) {
      setErrorMsgForCommitmentEnd("Enter fee type");
      return;
    } else if (!commitmentStart && feeType !== "all-at-once") { // for feeType "all-at-once" commitmentStart is unnecessary
      setErrorMsgForCommitmentEnd("Enter commitment start");
      return;
    } 
    if (!fee || !commitmentStart || fee <= 0 ) { return; }
    const payment = Number(fee);
    const sumToPay = (fullSum || 0) - (initialPayment || 0);
    if (sumToPay <= 0) { return; }
    let rate = 0; // recalculated interest rate
    let howManyMonthsBetweenPayments = 1;

    if (feeType === "month") {
      rate = (interestRate || 0) / 12 / 100;
      howManyMonthsBetweenPayments = 1;
    } else if (feeType === "quarter") {
      rate = (interestRate || 0) / 4 / 100;
      howManyMonthsBetweenPayments = 3;
    } else if (feeType === "year") {
      rate = (interestRate || 0) / 100;
      howManyMonthsBetweenPayments = 12;
    }

    let timePeriods = sumToPay / payment;
    if (rate) { timePeriods = Math.log(payment / (payment - sumToPay * rate)) / Math.log(1 + rate); } // rearranged annuity formula 

    const totalMonths = timePeriods * howManyMonthsBetweenPayments;
    const startDate = new Date(commitmentStart);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + totalMonths);
    const formattedEndDate = endDate.toISOString().split("T")[0];

    // Update the commitmentEnds field
    setValue("commitmentEnds", formattedEndDate);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3 mt-3">
          <FormField
            control={control}
            name="name"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {commitmentType === "Leasing" && (
            <FormField
              control={control}
              name="initialPayment"
              defaultValue={0}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Payment</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={control}
            name="fullSum"
            defaultValue={0}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Sum</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="interestRate"
            defaultValue={0}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Rate</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="feeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fee Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fee type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="month">Monthly</SelectItem>
                    <SelectItem value="quarter">Quarterly</SelectItem>
                    <SelectItem value="year">Yearly</SelectItem>
                    {commitmentType === "Debts" && (
                      <SelectItem value="all-at-once">All at once</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {feeType !== "all-at-once" && (
            <FormField
              control={control}
              name="commitmentStart"
              defaultValue={currentDate}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Start</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {feeType === "all-at-once" &&
            <FormField
              control={control}
              name="commitmentEnds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commitment End</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          }
          {feeType !== "all-at-once" && 
            <FormField
              control={control}
              name="fieldForInput"
              defaultValue={""}
              render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Please choose which information you know: fee or commitment end date, and we'll calculate the rest</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex space-x-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="fee" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Fee
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="commitment_end" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Commitment end
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        }
        { feeType !== "all-at-once" && fieldForInput === "commitment_end" && <>
          <FormField
            control={control}
            name="commitmentEnds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commitment End</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          { fee ? 
            <>
              <FormLabel className="flex space-y-3">Fee: {fee || 0}</FormLabel>
              <span className="italic text-muted-foreground text-xs">Please check if commitment fee is correct before saving.</span>
            </>
            :
            <FormMessage>{ errorMsgForFee }</FormMessage>
          }</>
        }
        { feeType !== "all-at-once" && fieldForInput === "fee" && <>
          <FormField
            control={control}
            name="fee"
            defaultValue={0}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fee</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          { commitmentEnds ? 
            <>
              <FormLabel className="flex space-y-3">Commitment end: {(new Date(commitmentEnds)).toISOString().split("T")[0]}</FormLabel>
              <span className="italic text-muted-foreground text-xs">Please check if commitment end date is correct before saving.</span>
            </>
            :
            <FormMessage>{ errorMsgForCommitmentEnd }</FormMessage>
          }</>
        }
        </div>
        <Button type="submit" disabled={isLoading} className="mt-6">
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default LeasingAndDebtsForm;

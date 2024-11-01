import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
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
import { useEffect } from "react";
import { CommitmentType, NewCommitment } from "@/types";

const FormSchema = z.object({
  name: z.string(),
  fullSum: z.coerce.number().positive().multipleOf(0.01),
  interestRate: z.coerce.number().nonnegative().multipleOf(0.01).optional(),
  feeType: z.union([
    z.literal("month"),
    z.literal("quarter"),
    z.literal("year"),
    z.literal("all-at-once"),
  ]),
  fee: z.coerce.number().positive().multipleOf(0.01),
  commitmentStart: z.coerce.date(),
  commitmentEnds: z.coerce.date().optional(),
  initialPayment: z.coerce.number().multipleOf(0.01).optional(), // only for leasing
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
    const fee = watch("fee");

    useEffect(() => {
        countFee();
    }, [fullSum, feeType, interestRate, commitmentEnds, commitmentStart]);

    useEffect(() => {
        // countCommitmentEndDate();
    }, [fee]);

  function onSubmit(data: LeasingAndDebtsFormData) {
    const newCommitmentData = Object.assign({type: commitmentType}, data);
    onSave(newCommitmentData);
  }

  // Calculate and set the fee based on feeType, fullSum, initialPayment, interestRate, commitmentStart, commitmentEnds
  function countFee() {
    if (!(commitmentStart || feeType === "all-at-once") || !commitmentEnds || fullSum <= 0 || !feeType ) { return; }

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
        }
    }
    // Update the fee field
    setValue("fee", calculatedFee.toFixed(2));	
  }

  // Calculate and set the CommitmentEnd Date based on fee, feeType, fullSum, initialPayment, interestRate, commitmentStart
  function countCommitmentEndDate() {
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
    const formattedEndDate = endDate.toISOString().split('T')[0];

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
                    </FormItem>
                )}
            />
        )}
        <FormField
            control={control}
            name="fullSum"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Full Sum</FormLabel>
                    <FormControl>
                        <Input defaultValue={0} type="number" {...field} />
                    </FormControl>
                </FormItem>
            )}
        />
        <FormField
            control={control}
            name="interestRate"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Interest Rate</FormLabel>
                    <FormControl>
                        <Input defaultValue={0} type="number" {...field} />
                    </FormControl>
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
                        {(commitmentType === "Debts") && (
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
                    </FormItem>
                )}
            />
        )}
        <FormField
            control={control}
            name="commitmentEnds"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Commitment End</FormLabel>
                    <FormControl>
                        <Input type="date" {...field} />
                    </FormControl>
                </FormItem>
            )}
        />  
        <FormField
            control={control}
            name="fee"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Fee</FormLabel>
                <FormControl>
                    <Input defaultValue={0} type="number" {...field} />
                </FormControl>
            </FormItem>
            )}
        />
        </div>
        <Button type="submit" disabled={isLoading} className="mt-6">
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default LeasingAndDebtsForm;

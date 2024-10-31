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
  initialPayment: z.coerce.number().optional(), // only for leasing
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
    const initialPayment = watch("initialPayment") || 0;
    const commitmentEnds = watch("commitmentEnds");
    const commitmentStart = watch("commitmentStart");
    const fee = watch("fee");

    // Calculate and set the fee based on fullSum, feeType, interestRate, commitmentStart, and commitmentEnds
    useEffect(() => {
        if (!(commitmentStart || feeType === "all-at-once") || !commitmentEnds || fullSum <= 0 || !feeType ) { return; }

        let calculatedFee = 0;
        if ( feeType === "all-at-once" ) { // If pays all at once, fee is full sum
            calculatedFee = fullSum;
        } else { // Calculate the difference in months between commitmentEnds and commitmentStart		
            const startDate = new Date(commitmentStart);
            const endDate = new Date(commitmentEnds);
            const totalMonths = endDate.getFullYear() * 12 + endDate.getMonth() - (startDate.getFullYear() * 12 + startDate.getMonth());

            if (totalMonths > 0) {
                if (feeType === "month") {
                    calculatedFee = fullSum / totalMonths;
                } else if (feeType === "quarter") {
                    calculatedFee = fullSum / (totalMonths / 3);
                } else if (feeType === "year") {
                    calculatedFee = fullSum / (totalMonths / 12);
                } 
            }
        }

        // Update the fee field
        setValue("fee", calculatedFee);	
        // TODO count in interest rate if given
    }, [fullSum, feeType, commitmentEnds, commitmentStart, setValue]);

    // Calculate and set the commitmentEnds date when the fee changes
    useEffect(() => {
        if (!fee || !commitmentStart || fee <= 0 ) { return; }
        const commitmentSum = fullSum - initialPayment;

        let totalMonths = 0;
        if (feeType === "month") {
            totalMonths = commitmentSum / fee;
        } else if (feeType === "quarter") {
            totalMonths = (commitmentSum / fee) * 3;
        } else if (feeType === "year") {
            totalMonths = (commitmentSum / fee) * 12;
        }

        const startDate = new Date(commitmentStart);
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + totalMonths);
        const formattedEndDate = endDate.toISOString().split('T')[0];

        // Update the commitmentEnds field
        setValue("commitmentEnds", formattedEndDate);
        // TODO count in interest rate if given
    }, [fee]);

  function onSubmit(data: LeasingAndDebtsFormData) {
    const newCommitmentData = Object.assign({type: commitmentType}, data);
    onSave(newCommitmentData);
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
                        {/* TODO {(selectedType === "Debts") && (
                        <SelectItem value="all-at-once">All at once</SelectItem>
                        )} */}
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

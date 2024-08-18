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

const FormSchema = z.object({
  type: z.union([
    z.literal("Subscriptions"),
    z.literal("Leasing"),
    z.literal("Debts"),
    z.literal("Mortgage"),
    z.literal("Insurance"),
  ]),
  name: z.string(),
  fullSum: z.coerce.number().positive().multipleOf(0.01),
  feeType: z.union([
    z.literal("month"),
    z.literal("quarter"),
    z.literal("year"),
    z.literal("all-at-once"),
  ]),
  fee: z.coerce.number().positive().multipleOf(0.01),
  paymentStart: z.coerce.date(),
  commitmentEnds: z.coerce.date().optional(),
  // price: z.coerce.number().positive().multipleOf(0.01), //deleted in form for now, because there is no such field in backend model
  initialPayment: z.coerce.number().nonnegative().multipleOf(0.01).optional(),
  interestRate: z.coerce.number().nonnegative().multipleOf(0.01).optional(),
  sumPayLeft: z.coerce.number().nonnegative().multipleOf(0.01).optional(),
});

type CommitmentFormData = z.infer<typeof FormSchema>;

type Props = {
  onSave: (commitmentData: CommitmentFormData) => void;
  isLoading: boolean;
};

const CommitmentForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<CommitmentFormData>({
    resolver: zodResolver(FormSchema),
  });

  const { control, handleSubmit, watch, setValue } = form;
  const selectedType = watch("type");
  const feeType = watch("feeType");
  const fullSum = watch("fullSum");
  const commitmentEnds = watch("commitmentEnds");
  const paymentStart = watch("paymentStart");
  const fee = watch("fee");

  // Calculate and set the fee based on fullSum, feeType, paymentStart, and commitmentEnds
  useEffect(() => {
	if (!(paymentStart || feeType === "all-at-once") || !commitmentEnds || fullSum <= 0 || !feeType ) { return; }

	let calculatedFee = 0;
	if ( feeType === "all-at-once" ) { // If pays all at once, fee is full sum
		calculatedFee = fullSum;
	} else { // Calculate the difference in months between commitmentEnds and paymentStart		
		const startDate = new Date(paymentStart);
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
  }, [fullSum, feeType, commitmentEnds, paymentStart]);

	// Calculate and set the commitmentEnds date when the fee changes
	useEffect(() => {
		if (!fee || !paymentStart || fee <= 0 ) { return; }

		const startDate = new Date(paymentStart);
		let totalMonths = 0;

		if (feeType === "month") {
		totalMonths = fullSum / fee;
		} else if (feeType === "quarter") {
		totalMonths = (fullSum / fee) * 3;
		} else if (feeType === "year") {
		totalMonths = (fullSum / fee) * 12;
		}

		const endDate = new Date(startDate);
		endDate.setMonth(startDate.getMonth() + totalMonths);
		const formattedEndDate = endDate.toISOString().split("T")[0];

		// Update the commitmentEnds field
		setValue("commitmentEnds", formattedEndDate);
		// TODO count in interest rate if given
	}, [fee]);

  function onSubmit(data: CommitmentFormData) {
    onSave(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commitment Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select commitment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Subscriptions">Subscriptions</SelectItem>
                  <SelectItem value="Leasing">Leasing</SelectItem>
                  <SelectItem value="Debts">Debts</SelectItem>
                  <SelectItem value="Insurance">Insurance</SelectItem>
                  <SelectItem value="Mortgage">Mortgage</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {selectedType && (
          <div className="space-y-3 mt-3">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {(selectedType === "Debts" || selectedType === "Leasing") && (
              <FormField
                control={control}
                name="fullSum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Sum</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
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
                      {(selectedType === "Debts") && (
                        <SelectItem value="all-at-once">All at once</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {(selectedType === "Subscriptions" || selectedType === "Insurance") && 
				<FormField
					control={control}
					name="fee"
					render={({ field }) => (
					<FormItem>
						<FormLabel>Fee</FormLabel>
						<FormControl>
						<Input type="number" {...field} />
						</FormControl>
					</FormItem>
					)}
				/>
			}
            {feeType !== "all-at-once" && (
              <FormField
                control={control}
                name="paymentStart"
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
            {selectedType === "Mortgage" && (
              <FormField
                control={control}
                name="initialPayment"
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
            {(selectedType === "Mortgage" || selectedType === "Debts" || selectedType === "Leasing") && (
              <FormField
                control={control}
                name="interestRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interest Rate</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            {selectedType === "Mortgage" && (
              <FormField
                control={control}
                name="sumPayLeft"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Left To Pay</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
			{(selectedType !== "Subscriptions" && selectedType !== "Insurance") && 
				<FormField
					control={control}
					name="fee"
					render={({ field }) => (
					<FormItem>
						<FormLabel>Fee</FormLabel>
						<FormControl>
						<Input type="number" {...field} />
						</FormControl>
					</FormItem>
					)}
				/>
			}
          </div>
        )}
        <Button type="submit" disabled={isLoading} className="mt-6">
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default CommitmentForm;

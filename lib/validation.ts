import { z } from 'zod'

export const TransactionFormValidation = z.object({
  amount: z.string().min(1, "Amount cannot be empty").refine(value => {
    const amount = parseFloat(value);
    return amount !== 0;
  }, {
    message: "Amount cannot be 0.00",
  }),
  description: z.string().min(1, "Description cannot be empty"),
  date: z.date().refine((date) => date <= new Date(), "Date cannot be in the future"),
  accountId: z.string().min(1, 'Account not selected'),
});

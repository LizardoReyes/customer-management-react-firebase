import z from "zod";

export const DraftCustomerSchema = z.object({
  name: z.string().min(1, "The name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(1, "The phone number is required"),
  address: z.string().min(1, "The address is required"),
});

export const CustomerSchema = DraftCustomerSchema.extend({
  id: z.string(),
});

export const SearchCustomerSchema = z.object({
  name: z.string().min(1, "The name is required"),
});

export const SupportedLangs = {
  EN: "en",
  ES: "es",
} as const;

export type Language = typeof SupportedLangs[keyof typeof SupportedLangs];

export type Customer = z.infer<typeof CustomerSchema>;
export type DraftCustomer = z.infer<typeof DraftCustomerSchema>;

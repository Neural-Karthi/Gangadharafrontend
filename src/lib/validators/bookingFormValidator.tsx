
import { z } from 'zod';

export const bookingFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone_number: z.string().regex(/^\d{10}$/, { message: 'Please enter a valid 10-digit phone number.' }),
  profession: z.enum(['Student', 'Employee', 'Businessman'], { required_error: 'Please select your profession.' }),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

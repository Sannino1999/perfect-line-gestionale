import {z} from 'zod';
const dateString=z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
export const loginSchema=z.object({email:z.string().trim().email().max(190),password:z.string().min(1).max(200)});
export const memberSchema=z.object({
  firstName:z.string().trim().min(1).max(100),
  lastName:z.string().trim().min(1).max(100),
  birthDate:dateString.optional().or(z.literal('')),
  startDate:dateString.optional().or(z.literal('')),
  email:z.string().trim().email().max(190).optional().or(z.literal('')),
  phone:z.string().trim().max(40).optional().or(z.literal('')),
  address:z.string().trim().max(255).optional().or(z.literal('')),
  taxCode:z.string().trim().max(32).optional().or(z.literal('')),
  notes:z.string().trim().max(2000).optional().or(z.literal('')),
  planId:z.string().uuid()
});
export const paymentSchema=z.object({
  memberId:z.string().uuid(),membershipId:z.string().uuid().optional().or(z.literal('')),
  amount:z.coerce.number().positive().max(100000),
  status:z.enum(['PAID','PARTIAL','UNPAID']).default('PAID'),
  method:z.enum(['CASH','CARD','BANK_TRANSFER','OTHER']).default('OTHER'),
  dueDate:dateString.optional().or(z.literal('')),
  note:z.string().trim().max(500).optional().or(z.literal(''))
});
export const renewalSchema=z.object({
  planId:z.string().uuid(),
  startDate:dateString.optional().or(z.literal('')),
  paymentAmount:z.coerce.number().positive().max(100000).optional(),
  paymentStatus:z.enum(['PAID','PARTIAL','UNPAID']).default('PAID'),
  paymentMethod:z.enum(['CASH','CARD','BANK_TRANSFER','OTHER']).default('OTHER'),
  paymentNote:z.string().trim().max(500).optional().or(z.literal(''))
});

export const tenantSettingsSchema=z.object({name:z.string().trim().min(2).max(160).optional(),timezone:z.string().trim().min(1).max(64).optional(),currency:z.string().trim().length(3).optional(),address:z.string().trim().max(255).optional().or(z.literal('')),phone:z.string().trim().max(40).optional().or(z.literal('')),email:z.string().trim().email().max(190).optional().or(z.literal('')),logoUrl:z.string().url().max(500).optional().or(z.literal('')),primaryColor:z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),expiryWarningDays:z.coerce.number().int().min(1).max(30).optional()});
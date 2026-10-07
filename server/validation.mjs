import {z} from 'zod';
export const loginSchema=z.object({email:z.string().trim().email().max(190),password:z.string().min(1).max(200)});
export const memberSchema=z.object({
  firstName:z.string().trim().min(1).max(100),lastName:z.string().trim().min(1).max(100),
  birthDate:z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/).optional().or(z.literal('')),
  email:z.string().trim().email().max(190).optional().or(z.literal('')),
  phone:z.string().trim().max(40).optional().or(z.literal('')),
  address:z.string().trim().max(255).optional().or(z.literal('')),
  taxCode:z.string().trim().max(32).optional().or(z.literal('')),
  notes:z.string().trim().max(2000).optional().or(z.literal('')),
  planId:z.string().uuid()
});
export const paymentSchema=z.object({memberId:z.string().uuid(),membershipId:z.string().uuid().optional().or(z.literal('')),amount:z.coerce.number().positive().max(100000),status:z.enum(['PAID','PARTIAL','UNPAID']).default('PAID'),method:z.enum(['CASH','CARD','BANK_TRANSFER','OTHER']).default('OTHER'),dueDate:z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/).optional().or(z.literal('')),note:z.string().trim().max(500).optional().or(z.literal(''))});

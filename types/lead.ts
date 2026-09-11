import { z } from "zod";
import { LEAD_SOURCES, LEAD_STATUS } from "@/lib/constants";

export const leadFormSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo").max(120),
  phone: z
    .string()
    .trim()
    .min(10, "Informe um WhatsApp válido com DDD")
    .max(20),
  email: z.string().trim().email("Informe um e-mail válido").max(160),
  interest: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().max(1000).optional().default(""),
  // honeypot anti-spam: deve chegar vazio; se vier preenchido, é bot
  website: z.string().max(0).optional().default(""),
  source: z.enum(LEAD_SOURCES).optional().default("site"),
  utm_source: z.string().max(120).optional().nullable(),
  utm_medium: z.string().max(120).optional().nullable(),
  utm_campaign: z.string().max(120).optional().nullable(),
  utm_content: z.string().max(120).optional().nullable(),
  utm_term: z.string().max(120).optional().nullable(),
  landing_page: z.string().max(300).optional().nullable(),
  referrer: z.string().max(300).optional().nullable(),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;

export type LeadStatus = (typeof LEAD_STATUS)[number];

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string | null;
  interest: string | null;
  source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  landing_page: string | null;
  referrer: string | null;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

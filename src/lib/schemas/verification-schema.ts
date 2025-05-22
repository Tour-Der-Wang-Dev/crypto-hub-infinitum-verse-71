
import { z } from "zod";

// Regular expressions for validation
const nameRegex = /^[a-zA-Z\s\-'.]+$/;
const documentNumberRegex = /^[A-Za-z0-9\-]+$/;

// File validation types
export type AcceptedFileTypes = 'image/jpeg' | 'image/png' | 'image/webp' | 'application/pdf';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_FILE_TYPES: AcceptedFileTypes[] = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

// Validation for file uploads
export const fileSchema = z.object({
  name: z.string().min(1, "File name is required"),
  size: z.number().max(MAX_FILE_SIZE, "File size must be less than 5MB"),
  type: z.enum(ACCEPTED_FILE_TYPES as [AcceptedFileTypes, ...AcceptedFileTypes[]]),
});

// Schema for the verification form
export const verificationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters")
    .regex(nameRegex, "Name contains invalid characters"),
    
  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(100, "Country must be less than 100 characters"),
    
  documentType: z.enum(['Passport', "Driver's License", 'ID Card'], {
    required_error: "Please select a document type",
  }),
  
  documentNumber: z
    .string()
    .min(3, "Document number must be at least 3 characters")
    .max(30, "Document number must be less than 30 characters")
    .regex(documentNumberRegex, "Document number contains invalid characters"),
    
  frontSide: z.optional(fileSchema),
  backSide: z.optional(fileSchema),
  selfie: z.optional(fileSchema),
  
  csrfToken: z.string().optional(),
});

// Type for form data
export type VerificationFormValues = z.infer<typeof verificationSchema>;

// Default values for form initialization
export const defaultVerificationValues: Partial<VerificationFormValues> = {
  fullName: "",
  country: "",
  documentType: "Passport",
  documentNumber: "",
};

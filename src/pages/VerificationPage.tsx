
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  verificationSchema, 
  defaultVerificationValues, 
  VerificationFormValues,
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE
} from '@/lib/schemas/verification-schema';
import { useCsrfToken } from '@/lib/security/csrf';
import { sanitizeInput } from '@/lib/security/sanitize';
import { toast } from '@/components/ui/use-toast';
import { Upload, Check, AlertTriangle } from 'lucide-react';

const VerificationPage = () => {
  const { csrfToken } = useCsrfToken();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File | null>>({
    frontSide: null,
    backSide: null,
    selfie: null
  });

  // Initialize form with React Hook Form and Zod validation
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: defaultVerificationValues,
    mode: 'onBlur'
  });

  const validateFile = (file: File | null, fieldName: string): boolean => {
    if (!file) {
      if (fieldName === 'frontSide' || fieldName === 'selfie') {
        setFileErrors(prev => ({ ...prev, [fieldName]: 'This file is required' }));
        return false;
      }
      return true; // Back side is optional
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setFileErrors(prev => ({ ...prev, [fieldName]: 'File size must be less than 5MB' }));
      return false;
    }

    // Check file type
    if (!ACCEPTED_FILE_TYPES.includes(file.type as any)) {
      setFileErrors(prev => ({ 
        ...prev, 
        [fieldName]: 'Only JPG, PNG, WebP and PDF files are accepted' 
      }));
      return false;
    }

    setFileErrors(prev => ({ ...prev, [fieldName]: '' }));
    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = event.target.files?.[0] || null;
    setFiles(prev => ({ ...prev, [fieldName]: file }));
    validateFile(file, fieldName);
  };

  const onSubmit = async (data: VerificationFormValues) => {
    // Validate required files
    const frontSideValid = validateFile(files.frontSide, 'frontSide');
    const backSideValid = validateFile(files.backSide, 'backSide');
    const selfieValid = validateFile(files.selfie, 'selfie');

    if (!frontSideValid || !selfieValid) {
      return; // Don't proceed if required files are missing or invalid
    }

    // Add CSRF token to the form data
    data.csrfToken = csrfToken;

    // Sanitize text inputs
    const sanitizedData = {
      ...data,
      fullName: sanitizeInput(data.fullName),
      country: sanitizeInput(data.country),
      documentNumber: sanitizeInput(data.documentNumber),
    };

    setIsSubmitting(true);

    try {
      // This is where you would send the data to your API
      console.log('Form data submitted:', sanitizedData);
      console.log('Files to upload:', files);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message
      toast({
        title: "Verification Submitted",
        description: "Your identity verification has been submitted successfully. We'll review it shortly.",
      });

      // Reset the form
      form.reset();
      setFiles({
        frontSide: null,
        backSide: null,
        selfie: null
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your verification. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Identity Verification</h1>
          <p className="text-gray-300">
            Complete your verification process to unlock all features of InfiWorld Crypto Hub. Your data is
            securely encrypted and handled with the highest privacy standards.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="card-glass p-6 rounded-lg mb-8 space-y-6">
            <div className="flex justify-between items-center p-4 mb-4 border-b border-infi-gold/20">
              <div className="font-semibold">Verification</div>
              <div className="text-sm text-gray-400">Status</div>
            </div>

            {/* Hidden CSRF Token */}
            <input type="hidden" name="csrf_token" value={csrfToken} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your legal full name"
                        className="w-full px-4 py-3 rounded-md bg-infi-dark-blue/80 border border-infi-gold/20 focus:border-infi-gold"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country of Residence</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your country"
                        className="w-full px-4 py-3 rounded-md bg-infi-dark-blue/80 border border-infi-gold/20 focus:border-infi-gold"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="documentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Type</FormLabel>
                    <FormControl>
                      <select
                        className="w-full px-4 py-3 rounded-md bg-infi-dark-blue/80 border border-infi-gold/20 focus:border-infi-gold"
                        {...field}
                      >
                        <option value="Passport">Passport</option>
                        <option value="Driver's License">Driver's License</option>
                        <option value="ID Card">ID Card</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="documentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter document number"
                        className="w-full px-4 py-3 rounded-md bg-infi-dark-blue/80 border border-infi-gold/20 focus:border-infi-gold"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Label className="block text-gray-300 mb-4">Document Upload</Label>
              <p className="text-sm text-gray-400 mb-4">
                Please upload clear, high-resolution images of your documents
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Front Side Upload */}
                <div className={`border-2 border-dashed ${fileErrors.frontSide ? 'border-red-500' : 'border-infi-gold/30'} rounded-lg p-4 text-center`}>
                  <div className="mb-2">Front Side</div>
                  <div className="text-xs text-gray-400">Required</div>
                  <div className="mt-4 flex justify-center">
                    <label htmlFor="frontSide" className="cursor-pointer">
                      {files.frontSide ? (
                        <Check className="text-green-500" size={24} />
                      ) : (
                        <Upload className="text-gray-400" size={24} />
                      )}
                    </label>
                    <input
                      type="file"
                      id="frontSide"
                      accept=".jpg,.jpeg,.png,.webp,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, 'frontSide')}
                    />
                  </div>
                  <div className="mt-2 text-xs">
                    {files.frontSide ? files.frontSide.name : 'Upload front side'}
                  </div>
                  {fileErrors.frontSide && (
                    <div className="mt-1 text-xs text-red-500 flex items-center justify-center">
                      <AlertTriangle size={12} className="mr-1" />
                      {fileErrors.frontSide}
                    </div>
                  )}
                </div>

                {/* Back Side Upload */}
                <div className={`border-2 border-dashed ${fileErrors.backSide ? 'border-red-500' : 'border-infi-gold/30'} rounded-lg p-4 text-center`}>
                  <div className="mb-2">Back Side</div>
                  <div className="text-xs text-gray-400">If applicable</div>
                  <div className="mt-4 flex justify-center">
                    <label htmlFor="backSide" className="cursor-pointer">
                      {files.backSide ? (
                        <Check className="text-green-500" size={24} />
                      ) : (
                        <Upload className="text-gray-400" size={24} />
                      )}
                    </label>
                    <input
                      type="file"
                      id="backSide"
                      accept=".jpg,.jpeg,.png,.webp,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, 'backSide')}
                    />
                  </div>
                  <div className="mt-2 text-xs">
                    {files.backSide ? files.backSide.name : 'Upload back side'}
                  </div>
                  {fileErrors.backSide && (
                    <div className="mt-1 text-xs text-red-500 flex items-center justify-center">
                      <AlertTriangle size={12} className="mr-1" />
                      {fileErrors.backSide}
                    </div>
                  )}
                </div>

                {/* Selfie Upload */}
                <div className={`border-2 border-dashed ${fileErrors.selfie ? 'border-red-500' : 'border-infi-gold/30'} rounded-lg p-4 text-center`}>
                  <div className="mb-2">Selfie with ID</div>
                  <div className="text-xs text-gray-400">Required</div>
                  <div className="mt-4 flex justify-center">
                    <label htmlFor="selfie" className="cursor-pointer">
                      {files.selfie ? (
                        <Check className="text-green-500" size={24} />
                      ) : (
                        <Upload className="text-gray-400" size={24} />
                      )}
                    </label>
                    <input
                      type="file"
                      id="selfie"
                      accept=".jpg,.jpeg,.png,.webp"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, 'selfie')}
                    />
                  </div>
                  <div className="mt-2 text-xs">
                    {files.selfie ? files.selfie.name : 'Upload selfie with ID'}
                  </div>
                  {fileErrors.selfie && (
                    <div className="mt-1 text-xs text-red-500 flex items-center justify-center">
                      <AlertTriangle size={12} className="mr-1" />
                      {fileErrors.selfie}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full gold-gradient" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Verification'}
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default VerificationPage;

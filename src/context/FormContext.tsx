import React, { createContext, useContext, useState } from 'react';

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Professional Information
  position: string;
  experience: string;
  availability: string;
  startDate: string;
  salaryExpectation: string;
  
  // Education & Certifications
  education: string;
  certifications: string;
  
  // Skills & Experience
  jewelryExperience: string;
  designSkills: string;
  softwareSkills: string;
  customerServiceExperience: string;
  
  // References
  reference1Name: string;
  reference1Contact: string;
  reference1Relationship: string;
  reference2Name: string;
  reference2Contact: string;
  reference2Relationship: string;
  
  // Additional Information
  additionalInfo: string;
  howDidYouHear: string;
  
  // Consent & Agreement
  agreeToTerms: boolean;
}

interface FormContextType {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  currentStep: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  totalSteps: number;
  isFormValid: () => boolean;
  isStepValid: () => boolean;
  submissionStatus: 'idle' | 'submitting' | 'success' | 'error';
  setSubmissionStatus: (status: 'idle' | 'submitting' | 'success' | 'error') => void;
  referenceNumber: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  
  position: '',
  experience: '',
  availability: '',
  startDate: '',
  salaryExpectation: '',
  
  education: '',
  certifications: '',
  
  jewelryExperience: '',
  designSkills: '',
  softwareSkills: '',
  customerServiceExperience: '',
  
  reference1Name: '',
  reference1Contact: '',
  reference1Relationship: '',
  reference2Name: '',
  reference2Contact: '',
  reference2Relationship: '',
  
  additionalInfo: '',
  howDidYouHear: '',
  
  agreeToTerms: false,
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [referenceNumber, setReferenceNumber] = useState('');
  
  const totalSteps = 5;
  
  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Handle form submission
      handleSubmission();
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const isStepValid = () => {
    switch (currentStep) {
      case 1: // Personal Information
        return Boolean(
          formData.firstName && 
          formData.lastName && 
          formData.email && 
          formData.phone
        );
      case 2: // Professional Information
        return Boolean(
          formData.position && 
          formData.experience && 
          formData.availability
        );
      case 3: // Skills & Experience
        return Boolean(formData.jewelryExperience);
      case 4: // References
        return Boolean(
          formData.reference1Name && 
          formData.reference1Contact
        );
      case 5: // Final agreements
        return formData.agreeToTerms;
      default:
        return false;
    }
  };
  
  const isFormValid = () => {
    return Boolean(
      // Required fields from all sections
      formData.firstName && 
      formData.lastName && 
      formData.email && 
      formData.phone &&
      formData.position && 
      formData.experience && 
      formData.availability &&
      formData.jewelryExperience &&
      formData.reference1Name && 
      formData.reference1Contact &&
      formData.agreeToTerms
    );
  };
  
  const handleSubmission = () => {
    if (isFormValid()) {
      setSubmissionStatus('submitting');
      
      // Simulate API call
      setTimeout(() => {
        // Generate a reference number
        const reference = `FJ-${Date.now().toString().slice(-6)}`;
        setReferenceNumber(reference);
        setSubmissionStatus('success');
      }, 1500);
    } else {
      setSubmissionStatus('error');
    }
  };
  
  return (
    <FormContext.Provider 
      value={{ 
        formData, 
        updateFormData, 
        currentStep, 
        goToNextStep, 
        goToPreviousStep, 
        totalSteps,
        isFormValid,
        isStepValid,
        submissionStatus,
        setSubmissionStatus,
        referenceNumber
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
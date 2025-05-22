import React from 'react';
import FormField from '../ui/FormField';
import Button from '../ui/Button';
import { useFormContext } from '../../context/FormContext';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const ReferencesSection = () => {
  const { formData, updateFormData, goToNextStep, goToPreviousStep, isStepValid } = useFormContext();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    updateFormData(id as keyof typeof formData, value);
  };
  
  return (
    <div className="animate-fadeIn">
      <h3 className="text-xl font-serif text-navy mb-4">Professional References</h3>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-navy mb-3">Reference 1</h4>
        
        <FormField
          label="Full Name"
          type="text"
          id="reference1Name"
          value={formData.reference1Name}
          onChange={handleChange}
          required
          placeholder="Enter reference's full name"
        />
        
        <FormField
          label="Contact Information"
          type="text"
          id="reference1Contact"
          value={formData.reference1Contact}
          onChange={handleChange}
          required
          placeholder="Enter reference's email or phone number"
        />
        
        <FormField
          label="Relationship"
          type="text"
          id="reference1Relationship"
          value={formData.reference1Relationship}
          onChange={handleChange}
          placeholder="e.g., Manager, Colleague, Mentor"
        />
      </div>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-navy mb-3">Reference 2 (Optional)</h4>
        
        <FormField
          label="Full Name"
          type="text"
          id="reference2Name"
          value={formData.reference2Name}
          onChange={handleChange}
          placeholder="Enter reference's full name"
        />
        
        <FormField
          label="Contact Information"
          type="text"
          id="reference2Contact"
          value={formData.reference2Contact}
          onChange={handleChange}
          placeholder="Enter reference's email or phone number"
        />
        
        <FormField
          label="Relationship"
          type="text"
          id="reference2Relationship"
          value={formData.reference2Relationship}
          onChange={handleChange}
          placeholder="e.g., Manager, Colleague, Mentor"
        />
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button 
          onClick={goToPreviousStep} 
          variant="outline"
          className="flex items-center"
        >
          <ChevronLeft size={18} className="mr-1" /> Previous
        </Button>
        
        <Button 
          onClick={goToNextStep} 
          disabled={!isStepValid()}
          className="flex items-center"
        >
          Continue <ChevronRight size={18} className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default ReferencesSection;
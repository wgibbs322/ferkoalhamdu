import React from 'react';
import FormField from '../ui/FormField';
import Button from '../ui/Button';
import { useFormContext } from '../../context/FormContext';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const ProfessionalInfoSection = () => {
  const { formData, updateFormData, goToNextStep, goToPreviousStep, isStepValid } = useFormContext();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    updateFormData(id as keyof typeof formData, value);
  };
  
  const positionOptions = [
    { value: 'jeweler', label: 'Jeweler' },
    { value: 'designer', label: 'Jewelry Designer' },
    { value: 'sales', label: 'Sales Associate' },
    { value: 'manager', label: 'Store Manager' },
    { value: 'appraiser', label: 'Jewelry Appraiser' },
    { value: 'goldsmith', label: 'Goldsmith' },
    { value: 'other', label: 'Other' },
  ];
  
  const experienceOptions = [
    { value: 'less-than-1', label: 'Less than 1 year' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: 'more-than-10', label: 'More than 10 years' },
  ];
  
  const availabilityOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'seasonal', label: 'Seasonal' },
    { value: 'flexible', label: 'Flexible' },
  ];
  
  return (
    <div className="animate-fadeIn">
      <h3 className="text-xl font-serif text-navy mb-4">Professional Information</h3>
      
      <FormField
        label="Position Applied For"
        type="text"
        id="position"
        value={formData.position}
        onChange={handleChange}
        required
        as="select"
        options={positionOptions}
        placeholder="Select the position you're applying for"
      />
      
      <FormField
        label="Years of Experience in Jewelry Industry"
        type="text"
        id="experience"
        value={formData.experience}
        onChange={handleChange}
        required
        as="select"
        options={experienceOptions}
      />
      
      <FormField
        label="Availability"
        type="text"
        id="availability"
        value={formData.availability}
        onChange={handleChange}
        required
        as="select"
        options={availabilityOptions}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Earliest Start Date"
          type="date"
          id="startDate"
          value={formData.startDate}
          onChange={handleChange}
          placeholder="Select your earliest available start date"
        />
        
        <FormField
          label="Salary Expectation"
          type="text"
          id="salaryExpectation"
          value={formData.salaryExpectation}
          onChange={handleChange}
          placeholder="Enter your salary expectation"
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

export default ProfessionalInfoSection;
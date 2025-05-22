import React from 'react';
import FormField from '../ui/FormField';
import Button from '../ui/Button';
import { useFormContext } from '../../context/FormContext';
import { ChevronRight } from 'lucide-react';

const PersonalInfoSection = () => {
  const { formData, updateFormData, goToNextStep, isStepValid } = useFormContext();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    updateFormData(id as keyof typeof formData, value);
  };
  
  return (
    <div className="animate-fadeIn">
      <h3 className="text-xl font-serif text-navy mb-4">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="First Name"
          type="text"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          placeholder="Enter your first name"
        />
        
        <FormField
          label="Last Name"
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          placeholder="Enter your last name"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Email Address"
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email address"
        />
        
        <FormField
          label="Phone Number"
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Enter your phone number"
        />
      </div>
      
      <FormField
        label="Street Address"
        type="text"
        id="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Enter your street address"
      />
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <FormField
          label="City"
          type="text"
          id="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter your city"
          className="col-span-2 md:col-span-1"
        />
        
        <FormField
          label="State"
          type="text"
          id="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="Enter your state"
        />
        
        <FormField
          label="Zip Code"
          type="text"
          id="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="Enter your zip code"
        />
      </div>
      
      <div className="mt-8 flex justify-end">
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

export default PersonalInfoSection;
import React from 'react';
import FormField from '../ui/FormField';
import Button from '../ui/Button';
import { useFormContext } from '../../context/FormContext';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const SkillsSection = () => {
  const { formData, updateFormData, goToNextStep, goToPreviousStep, isStepValid } = useFormContext();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    updateFormData(id as keyof typeof formData, value);
  };
  
  return (
    <div className="animate-fadeIn">
      <h3 className="text-xl font-serif text-navy mb-4">Skills & Experience</h3>
      
      <FormField
        label="Education & Training"
        type="text"
        id="education"
        value={formData.education}
        onChange={handleChange}
        as="textarea"
        placeholder="Describe your educational background, including any degrees, diplomas, or relevant coursework"
      />
      
      <FormField
        label="Certifications & Credentials"
        type="text"
        id="certifications"
        value={formData.certifications}
        onChange={handleChange}
        as="textarea"
        placeholder="List any relevant certifications or credentials (e.g., GIA certification, etc.)"
      />
      
      <FormField
        label="Jewelry Experience"
        type="text"
        id="jewelryExperience"
        value={formData.jewelryExperience}
        onChange={handleChange}
        required
        as="textarea"
        placeholder="Describe your experience in the jewelry industry, including specific roles and responsibilities"
      />
      
      <FormField
        label="Design Skills"
        type="text"
        id="designSkills"
        value={formData.designSkills}
        onChange={handleChange}
        as="textarea"
        placeholder="Detail your design skills and experience (if applicable)"
      />
      
      <FormField
        label="Software Proficiency"
        type="text"
        id="softwareSkills"
        value={formData.softwareSkills}
        onChange={handleChange}
        as="textarea"
        placeholder="List any jewelry-related software you are proficient in (e.g., CAD software, inventory management systems)"
      />
      
      <FormField
        label="Customer Service Experience"
        type="text"
        id="customerServiceExperience"
        value={formData.customerServiceExperience}
        onChange={handleChange}
        as="textarea"
        placeholder="Describe your experience with customer service, particularly in luxury retail settings"
      />
      
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

export default SkillsSection;
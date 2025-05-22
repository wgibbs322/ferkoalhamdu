import React from 'react';
import FormField from '../ui/FormField';
import Button from '../ui/Button';
import { useFormContext } from '../../context/FormContext';
import { ChevronLeft, Upload, Loader } from 'lucide-react';

const FinalSection = () => {
  const { 
    formData, 
    updateFormData, 
    goToNextStep, 
    goToPreviousStep, 
    isStepValid,
    submissionStatus 
  } = useFormContext();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    updateFormData(id as keyof typeof formData, type === 'checkbox' ? checked : value);
  };

  const howDidYouHearOptions = [
    { value: 'website', label: 'Company Website' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'job-board', label: 'Job Board' },
    { value: 'referral', label: 'Employee Referral' },
    { value: 'walk-in', label: 'Walk-in' },
    { value: 'other', label: 'Other' },
  ];
  
  return (
    <div className="animate-fadeIn">
      <h3 className="text-xl font-serif text-navy mb-4">Additional Information</h3>
      
      <FormField
        label="Additional Information"
        type="text"
        id="additionalInfo"
        value={formData.additionalInfo}
        onChange={handleChange}
        as="textarea"
        placeholder="Please provide any additional information that you believe would be relevant to your application"
      />
      
      <FormField
        label="How did you hear about this position?"
        type="text"
        id="howDidYouHear"
        value={formData.howDidYouHear}
        onChange={handleChange}
        as="select"
        options={howDidYouHearOptions}
      />
      
      <div className="mt-8 p-4 bg-cream rounded-lg border border-gold/30">
        <h4 className="font-medium text-navy mb-3">Submit Your Resume (Optional)</h4>
        <p className="text-sm text-gray-600 mb-3">
          You may upload your resume or portfolio to supplement your application.
        </p>
        
        <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
            Drag and drop your file here, or click to select a file
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Maximum file size: 5MB. Supported formats: PDF, DOC, DOCX, JPG
          </p>
          <button className="mt-3 px-4 py-1.5 bg-gray-100 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-200 transition-colors">
            Select File
          </button>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-navy/5 rounded-lg">
        <FormField
          label=""
          type="checkbox"
          id="agreeToTerms"
          value={formData.agreeToTerms}
          onChange={handleChange}
          required
          placeholder="I certify that all information provided in this application is true and complete to the best of my knowledge. I understand that any false information or omission may disqualify me from further consideration for employment and may result in my dismissal if discovered at a later date."
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
          disabled={!isStepValid() || submissionStatus === 'submitting'}
          className="flex items-center"
        >
          {submissionStatus === 'submitting' ? (
            <>
              <Loader size={18} className="mr-2 animate-spin" /> Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </Button>
      </div>
    </div>
  );
};

export default FinalSection;
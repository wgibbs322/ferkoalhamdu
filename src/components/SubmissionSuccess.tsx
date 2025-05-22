import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useFormContext } from '../context/FormContext';

const SubmissionSuccess = () => {
  const { referenceNumber } = useFormContext();
  
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8 md:p-12 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle size={72} className="text-emerald-500" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-serif text-navy mb-4">
            Application Submitted Successfully
          </h2>
          
          <p className="text-gray-600 mb-6">
            Thank you for applying to Ferkos Fine Jewelry. We have received your application and will review it shortly.
          </p>
          
          <div className="bg-cream p-4 rounded-lg inline-block mb-8">
            <p className="text-gray-700 font-medium">Your Reference Number</p>
            <p className="text-2xl text-navy font-serif tracking-wide">{referenceNumber}</p>
            <p className="text-sm text-gray-500 mt-2">Please save this number for your records</p>
          </div>
          
          <p className="text-gray-600">
            Our team will contact you if your qualifications match our current openings. If you have any questions, please contact our HR department.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
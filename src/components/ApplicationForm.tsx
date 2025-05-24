import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    streetAddress: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    email: '',
    felonyConviction: '',
    heardFrom: [],
    paymentMethod: '',
    salaryType: '',
    bankName: '',
    termsAccepted: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name === 'heardFrom') {
        setFormData(prev => ({
          ...prev,
          heardFrom: checkbox.checked 
            ? [...prev.heardFrom, value]
            : prev.heardFrom.filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checkbox.checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      setError('Please accept the terms and conditions');
      return;
    }

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'phone', 'email', 'streetAddress', 'city', 'state', 'postalCode', 'country'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://ferkoalhamdu.onrender.com/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          heardFrom: Array.isArray(formData.heardFrom) ? formData.heardFrom : []
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.details || data?.error || 'Failed to submit application');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit application. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-navy mb-4">Application Submitted Successfully</h2>
          <p className="text-gray-600">Thank you for applying to Ferkos Fine Jewelry. We will review your application and contact you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-serif text-navy mb-6">FERKOS FINE JEWELRY ONLINE APPLICATION</h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Name Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                required
              />
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Street Address</label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Address Line 2</label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">State/Region</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                required
              />
            </div>

            {/* Felony Question */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Ever been convicted of a felony?</label>
              <select
                name="felonyConviction"
                value={formData.felonyConviction}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                required
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* How did you hear about us */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">How did you hear about us?</label>
              <div className="space-y-2">
                {['FACEBOOK', 'INSTAGRAM', 'TIKTOK'].map(platform => (
                  <label key={platform} className="flex items-center">
                    <input
                      type="checkbox"
                      name="heardFrom"
                      value={platform.toLowerCase()}
                      checked={formData.heardFrom.includes(platform.toLowerCase())}
                      onChange={handleChange}
                      className="w-4 h-4 text-gold focus:ring-gold/50 border-gray-300 rounded"
                    />
                    <span className="ml-2">{platform}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                  required
                >
                  <option value="">Select payment method</option>
                  <option value="direct_deposit">Direct Deposit</option>
                  <option value="check">Check</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Salary Type</label>
                <select
                  name="salaryType"
                  value={formData.salaryType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                  required
                >
                  <option value="">Select salary type</option>
                  <option value="weekly">WEEKLY</option>
                  <option value="monthly">MONTHLY</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="w-4 h-4 mt-1 text-gold focus:ring-gold/50 border-gray-300 rounded"
                  required
                />
                <span className="ml-2 text-sm text-gray-600">
                  By posting our brand items, you agree to these Terms of Service - We retain ownership of all brand items, including images, logos, and content. We grant you a non-exclusive, revocable license to use our brand items for promotional purposes only. Post only approved brand items. Use brand items in their original form, without modifications. Credit our brand with a clear mention or tag. Avoid posting sensitive or confidential information. Do not use brand items for commercial purposes beyond promotion. Do not imply endorsement or affiliation without explicit permission. Do not post harmful, offensive, or inappropriate content. We reserve the right to terminate this agreement and request removal of brand items at any time. You agree to indemnify us against any claims or damages arising from your posting of our brand items.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!formData.termsAccepted || isSubmitting}
              className="w-full bg-gold hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
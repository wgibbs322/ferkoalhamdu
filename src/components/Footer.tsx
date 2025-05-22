import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-navy text-cream py-4 text-center text-sm">
      <div className="container mx-auto px-4">
        <p>© {new Date().getFullYear()} Ferkos Fine Jewelry. All Rights Reserved.</p>
        <p className="mt-1 text-xs text-cream/70">
          Do not submit confidential information such as credit card details, mobile and ATM PINs, OTPs, account passwords, etc.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
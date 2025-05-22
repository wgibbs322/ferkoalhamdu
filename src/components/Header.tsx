import React from 'react';
import { Diamond } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-navy text-cream py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Diamond size={28} className="text-gold" />
          <h1 className="text-xl md:text-2xl font-serif tracking-wide">
            FERKOS FINE JEWELRY
          </h1>
        </div>
      </div>
    </header>
  );
}

export default Header;
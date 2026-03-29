import React from 'react';

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <img 
    src="https://storage.googleapis.com/aistudio-build-assets/3obsvayrmxfpx44asrww57/logo_3.png" 
    alt="Building Connections Logo"
    className={`object-contain select-none pointer-events-none ${className}`}
    referrerPolicy="no-referrer"
    loading="eager"
    decoding="async"
    style={{ imageRendering: 'auto' }}
  />
);

export default Logo;

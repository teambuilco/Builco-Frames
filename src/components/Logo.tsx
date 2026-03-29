import React from 'react';

const Logo = ({ className = "w-8 h-8", src }: { className?: string, src?: string }) => {
  const defaultLogo = "https://storage.googleapis.com/aistudio-build-assets/3obsvayrmxfpx44asrww57/logo_4.png";
  const logoUrl = src || defaultLogo;
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: 'currentColor',
        WebkitMaskImage: `url(${logoUrl})`,
        maskImage: `url(${logoUrl})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
      role="img"
      aria-label="Building Connections Logo"
    />
  );
};

export default Logo;

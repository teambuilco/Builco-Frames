import React from 'react';

const Logo = ({ className = "w-8 h-8", src }: { className?: string, src?: string }) => {
  if (src) {
    return (
      <div 
        className={`relative overflow-hidden ${className}`}
        style={{
          backgroundColor: 'currentColor',
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center', 
        }}
        role="img"
        aria-label="Partner Logo"
      />
    );
  }

  return (
    <svg 
      viewBox="0 0 32 32" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Building Connections Logo"
    >
      <path d="M16 4L4 16L16 28L28 16L16 4Z" fill="#DFB069" fillOpacity="0.1" />
      <path 
        d="M21 11L11 21M9 13L13 9M19 23L23 19M11 11C8.5 13.5 8.5 18.5 11 21L21 11C23.5 8.5 23.5 13.5 21 16L16 21" 
        stroke="#E1B46D" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

export default Logo;

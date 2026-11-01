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
      viewBox="0 0 1000 1000" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Building Connections Logo"
    >
      <path 
        fill="currentColor" 
        fillRule="evenodd" 
        d="M 300.23,725.23 L 157.02,582.02 A 116.0 116.0 0 0 1 157.02,417.98 L 417.98,157.02 A 116.0 116.0 0 0 1 582.02,157.02 L 842.98,417.98 A 116.0 116.0 0 0 1 842.98,582.02 L 582.02,842.98 A 116.0 116.0 0 0 1 417.98,842.98 C 354.34,779.34 411.61,694.45 397.47,588.39 C 383.33,482.32 431.04,268.41 367.4,332.05 L 219.25,480.2 A 28.0 28.0 0 0 0 219.25,519.8 L 362.45,663.0 Z M 780.75,519.8 A 28.0 28.0 0 0 0 780.75,480.2 L 632.6,332.05 C 576.03,374.47 471.69,496.46 485.83,588.39 C 499.97,680.31 498.25,703.31 554.82,745.73 L 780.75,519.8 Z" 
      />
    </svg>
  );
};

export default Logo;

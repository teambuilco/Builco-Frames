import React from 'react';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  src?: string;
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "w-8 h-8", 
  src, 
  alt = "Building Connections Logo",
  style,
  ...props 
}) => {
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
          ...style,
        }}
        role="img"
        aria-label={alt || "Partner Logo"}
      />
    );
  }

  return (
    <img 
      src="/assets/aistudio/ISOTIPO_SIN_FONDO_29c17ee8.png"
      alt={alt}
      className={`object-contain aspect-square select-none shrink-0 ${className}`}
      loading="eager"
      decoding="async"
      draggable={false}
      style={{
        imageRendering: 'auto',
        ...style,
      }}
      {...props}
    />
  );
};

export default Logo;


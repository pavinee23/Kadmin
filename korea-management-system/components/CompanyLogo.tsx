import Image from 'next/image';

interface CompanyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function CompanyLogo({ size = 'md', className = '' }: CompanyLogoProps) {
  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative flex items-center justify-center`}>
      <Image
        src="/kenergysave-logo.avif"
        alt="K Energy Save Logo"
        width={sizeMap[size]}
        height={sizeMap[size]}
        className="object-contain"
        priority
      />
    </div>
  );
}

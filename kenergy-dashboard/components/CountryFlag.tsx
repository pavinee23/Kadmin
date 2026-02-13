interface CountryFlagProps {
  country: "thailand" | "korea" | "uk";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function CountryFlag({ country, size = "md", className = "" }: CountryFlagProps) {
  const sizeClasses = {
    sm: "w-4 h-3",
    md: "w-6 h-4",
    lg: "w-8 h-6",
  };

  if (country === "uk") {
    return (
      <div className={`${sizeClasses[size]} rounded-sm overflow-hidden inline-block ${className}`}>
        <svg viewBox="0 0 60 30" className="w-full h-full">
          {/* Blue background */}
          <rect width="60" height="30" fill="#012169" />
          
          {/* White diagonals */}
          <path d="M 0,0 L 60,30 M 60,0 L 0,30" stroke="white" strokeWidth="6" />
          
          {/* Red diagonals */}
          <path d="M 0,0 L 60,30 M 60,0 L 0,30" stroke="#C8102E" strokeWidth="4" />
          
          {/* White cross */}
          <path d="M 30,0 L 30,30 M 0,15 L 60,15" stroke="white" strokeWidth="10" />
          
          {/* Red cross */}
          <path d="M 30,0 L 30,30 M 0,15 L 60,15" stroke="#C8102E" strokeWidth="6" />
        </svg>
      </div>
    );
  }

  if (country === "thailand") {
    return (
      <div className={`${sizeClasses[size]} rounded-sm overflow-hidden inline-block ${className}`}>
        <svg viewBox="0 0 30 20" className="w-full h-full">
          <rect width="30" height="20" fill="#ED1C24" />
          <rect y="3" width="30" height="14" fill="white" />
          <rect y="6" width="30" height="8" fill="#241D4F" />
          <rect y="9" width="30" height="2" fill="#241D4F" />
        </svg>
      </div>
    );
  }

  // Korea flag
  return (
    <div className={`${sizeClasses[size]} rounded-sm overflow-hidden inline-block ${className}`}>
      <svg viewBox="0 0 900 600" className="w-full h-full">
        <rect width="900" height="600" fill="white" />
        
        {/* Taegeuk (yin-yang) */}
        <g transform="translate(450, 300)">
          {/* Red half */}
          <path d="M 0,-100 A 100,100 0 0,1 0,100 A 50,50 0 0,1 0,0 A 50,50 0 0,0 0,-100" fill="#C60C30" />
          {/* Blue half */}
          <path d="M 0,-100 A 100,100 0 0,0 0,100 A 50,50 0 0,0 0,0 A 50,50 0 0,1 0,-100" fill="#003478" />
          {/* Small circles */}
          <circle cy="-50" r="16.67" fill="#003478" />
          <circle cy="50" r="16.67" fill="#C60C30" />
        </g>

        {/* Top-left trigram (Geon) */}
        <g transform="translate(180, 150)">
          <rect x="0" y="0" width="120" height="20" fill="#000" />
          <rect x="0" y="30" width="120" height="20" fill="#000" />
          <rect x="0" y="60" width="120" height="20" fill="#000" />
        </g>

        {/* Top-right trigram (Gam) */}
        <g transform="translate(600, 150) rotate(45 60 40)">
          <rect x="0" y="0" width="40" height="20" fill="#000" />
          <rect x="0" y="30" width="120" height="20" fill="#000" />
          <rect x="0" y="60" width="40" height="20" fill="#000" />
          <rect x="80" y="0" width="40" height="20" fill="#000" />
          <rect x="80" y="60" width="40" height="20" fill="#000" />
        </g>

        {/* Bottom-left trigram (Gon) */}
        <g transform="translate(180, 430) rotate(-45 60 40)">
          <rect x="0" y="0" width="40" height="20" fill="#000" />
          <rect x="0" y="30" width="40" height="20" fill="#000" />
          <rect x="0" y="60" width="120" height="20" fill="#000" />
          <rect x="80" y="0" width="40" height="20" fill="#000" />
          <rect x="80" y="30" width="40" height="20" fill="#000" />
        </g>

        {/* Bottom-right trigram (Yi) */}
        <g transform="translate(600, 430)">
          <rect x="0" y="0" width="40" height="20" fill="#000" />
          <rect x="0" y="30" width="40" height="20" fill="#000" />
          <rect x="0" y="60" width="40" height="20" fill="#000" />
          <rect x="80" y="0" width="40" height="20" fill="#000" />
          <rect x="80" y="30" width="40" height="20" fill="#000" />
          <rect x="80" y="60" width="40" height="20" fill="#000" />
        </g>
      </svg>
    </div>
  );
}

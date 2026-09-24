import React from 'react';

interface IssuerBadgeProps {
  issuerCode: 'AWS' | 'GCP' | 'CNCF' | 'META' | 'HASHICORP' | 'HACKERRANK' | 'ROADMAP' | 'CODESQUADZ' | 'OTHER';
  className?: string;
}

export const IssuerBadge: React.FC<IssuerBadgeProps> = ({ issuerCode, className = 'w-10 h-10' }) => {
  switch (issuerCode) {
    case 'CODESQUADZ':
      return (
        <div className={`flex items-center justify-center rounded-xl bg-blue-600/15 border border-blue-500/40 text-blue-400 font-mono font-bold text-xs ${className}`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#0066CC" />
            <path d="M12 4.5L6.5 16.5H10L12 11.5L14 16.5H17.5L12 4.5Z" fill="white" />
            <path d="M12 9.2L10.2 13.5H13.8L12 9.2Z" fill="#0066CC" />
          </svg>
        </div>
      );
    case 'HACKERRANK':
      return (
        <div className={`flex items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs ${className}`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm-1.8 17.1h-2.1V6.9h2.1v4.05h3.6V6.9h2.1v10.2h-2.1v-4.2h-3.6z" />
          </svg>
        </div>
      );
    case 'ROADMAP':
      return (
        <div className={`flex items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono font-bold text-xs ${className}`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" />
            <path d="M9 3v15" />
            <path d="M15 6v15" />
          </svg>
        </div>
      );
    case 'AWS':
      return (
        <div className={`flex items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold text-xs ${className}`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 14a8 8 0 0 0 16 0" />
            <path d="m17 11 3 3-3 3" />
            <path d="M7 6 4 9l3 3" />
            <path d="M4 9h8a5 5 0 0 1 5 5" />
          </svg>
        </div>
      );
    case 'CNCF':
      return (
        <div className={`flex items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono font-bold text-xs ${className}`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" />
            <path d="m12 3 4 5h-8l4-5z" />
            <path d="m12 21 4-5h-8l4 5z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
      );
    case 'GCP':
      return (
        <div className={`flex items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs ${className}`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            <path d="m12 12 3 3-3 3" />
          </svg>
        </div>
      );
    case 'META':
      return (
        <div className={`flex items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-xs ${className}`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M8 12c-2.5-3.5-5-3.5-5 0s2.5 3.5 5 0c2.5 3.5 5 3.5 5 0s-2.5-3.5-5 0" />
            <path d="M16 12c2.5-3.5 5-3.5 5 0s-2.5 3.5-5 0c-2.5 3.5-5 3.5-5 0s2.5-3.5 5 0" />
          </svg>
        </div>
      );
    case 'HASHICORP':
      return (
        <div className={`flex items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono font-bold text-xs ${className}`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 2 4 6.5v11L12 22l8-4.5v-11L12 2z" />
            <path d="M12 7v10" />
            <path d="m8 9.5 8 5" />
            <path d="m16 9.5-8 5" />
          </svg>
        </div>
      );
    default:
      return (
        <div className={`flex items-center justify-center rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono font-bold text-xs ${className}`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      );
  }
};

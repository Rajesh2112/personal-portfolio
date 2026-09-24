import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check, ShieldCheck, Printer, Calendar, Award } from 'lucide-react';
import { Certificate, Profile } from '../types/portfolio';
import { IssuerBadge } from './IssuerBadges';

interface CertificateDetailModalProps {
  certificate: Certificate | null;
  profile: Profile;
  onClose: () => void;
}

export const CertificateDetailModal: React.FC<CertificateDetailModalProps> = ({
  certificate,
  profile,
  onClose,
}) => {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!certificate) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(certificate.credentialId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(certificate.credentialUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Digital Accreditation Verification</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              title="Print Certificate"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Decorative Canvas / Certificate Frame */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-neutral-900 to-neutral-950">
          <div className="border-2 border-dashed border-amber-500/30 rounded-xl p-6 sm:p-8 bg-neutral-950/70 relative overflow-hidden">
            {/* Ambient Watermark Crest */}
            <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none">
              <Award className="w-64 h-64 text-amber-400" />
            </div>

            {/* Header with Issuer Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80">
              <div className="flex items-center gap-3">
                <IssuerBadge issuerCode={certificate.issuerCode} className="w-12 h-12" />
                <div>
                  <div className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold">
                    Official Issuer
                  </div>
                  <div className="text-base font-semibold text-white">
                    {certificate.issuer}
                  </div>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs text-neutral-500 font-mono">Credential ID</div>
                <div className="text-xs font-mono text-neutral-300 font-semibold flex items-center gap-1.5 sm:justify-end">
                  <span>{certificate.credentialId}</span>
                  <button
                    onClick={handleCopyId}
                    className="p-1 hover:text-amber-400 text-neutral-500 transition-colors"
                    title="Copy Credential ID"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Certificate Core Statement */}
            <div className="py-8 text-center space-y-3">
              <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                Certificate of Competency & Accreditation
              </div>

              <h2 id="cert-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {certificate.title}
              </h2>

              <p className="text-xs text-neutral-400">Awarded to</p>
              <div className="text-xl font-bold text-amber-400 tracking-wide font-sans">
                {profile.fullName}
              </div>

              {certificate.scoreOrDistinction && (
                <div className="inline-block text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mt-2">
                  {certificate.scoreOrDistinction}
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-2 pb-6 border-t border-neutral-800/80">
              {certificate.description}
            </p>

            {/* Verified Skills */}
            <div className="space-y-2 pb-6">
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Demonstrated & Verified Competencies:
              </div>
              <div className="flex flex-wrap gap-2">
                {certificate.verifiedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs text-neutral-300 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Dates & Validity Footer */}
            <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                <span>Issued: <strong className="text-neutral-200">{certificate.issueDate}</strong></span>
                {certificate.expiryDate && (
                  <>
                    <span className="text-neutral-600">·</span>
                    <span>Valid Through: <strong className="text-neutral-200">{certificate.expiryDate}</strong></span>
                  </>
                )}
              </div>

              <div className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Cryptographically Authenticated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-neutral-950 border-t border-neutral-800">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg border border-neutral-700 transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Verification URL'}</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
            >
              <span>Verify on {certificate.issuer}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg border border-neutral-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

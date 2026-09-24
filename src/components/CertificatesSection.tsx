import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, ShieldCheck, Eye, Plus, Calendar, Award } from 'lucide-react';
import { Certificate, CertificateCategory, Profile } from '../types/portfolio';
import { IssuerBadge } from './IssuerBadges';
import { CertificateDetailModal } from './CertificateDetailModal';

interface CertificatesSectionProps {
  certificates: Certificate[];
  profile: Profile;
  onAddCertificate?: () => void;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  certificates,
  profile,
  onAddCertificate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalCert, setActiveModalCert] = useState<Certificate | null>(null);

  const categories: Array<{ id: string; label: string }> = [
    { id: 'All', label: 'All Accreditations' },
    { id: 'Course Training', label: 'Training Courses' },
    { id: 'Frontend Engineering', label: 'Frontend' },
    { id: 'Databases & SQL', label: 'SQL & Databases' },
  ];

  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) => {
      const matchesCategory =
        selectedCategory === 'All' || cert.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        cert.credentialId.toLowerCase().includes(q) ||
        cert.verifiedSkills.some((s) => s.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [certificates, selectedCategory, searchQuery]);

  return (
    <section id="certificates" className="py-20 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-800/80">
          <div>
            <div className="text-xs font-mono tracking-widest text-amber-400 uppercase font-semibold">
              01. Industry Credentials
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Verified Certifications & Accreditations
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl leading-relaxed">
              Third-party verified technical credentials from leading cloud providers and foundational software authorities, backed by real performance examinations.
            </p>
          </div>

          {onAddCertificate && (
            <button
              onClick={onAddCertificate}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors whitespace-nowrap self-start md:self-auto"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Add Certificate</span>
            </button>
          )}
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="pt-6 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Functional Segmented Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900/90 border border-neutral-800 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by title, issuer, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-900/90 border border-neutral-800 focus:border-amber-400/80 rounded-xl text-neutral-200 placeholder-neutral-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Certificates Grid */}
        {filteredCertificates.length === 0 ? (
          <div className="p-12 text-center bg-neutral-900/40 border border-neutral-800/80 rounded-2xl">
            <Award className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <div className="text-base font-medium text-neutral-300">No certifications found</div>
            <p className="text-xs text-neutral-500 mt-1">Try adjusting your search query or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                className="group flex flex-col justify-between p-6 bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700/90 rounded-2xl transition-all shadow-sm hover:shadow-lg"
              >
                {/* Top Badge & Issuer Header */}
                <div>
                  <div className="flex items-start justify-between gap-3 pb-4">
                    <div className="flex items-center gap-3">
                      <IssuerBadge issuerCode={cert.issuerCode} className="w-11 h-11 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-neutral-400">{cert.issuer}</div>
                        <div className="text-[11px] font-mono text-neutral-500">{cert.category}</div>
                      </div>
                    </div>

                    {cert.scoreOrDistinction && (
                      <span className="text-[11px] font-mono text-amber-400/90 text-right shrink-0">
                        {cert.scoreOrDistinction}
                      </span>
                    )}
                  </div>

                  {/* Certificate Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  {/* Clean unboxed metadata separator */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mt-2.5">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-neutral-500" />
                      {cert.issueDate}
                    </span>
                    <span aria-hidden="true" className="text-neutral-700">·</span>
                    <span className="font-mono text-neutral-400 truncate max-w-[140px]" title={cert.credentialId}>
                      ID: {cert.credentialId}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-neutral-300 leading-relaxed mt-3.5 line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Verified Skills list */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/80">
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 mb-2">
                      Verified Competencies:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.verifiedSkills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] text-neutral-300 bg-neutral-950/70 border border-neutral-800/80 px-2 py-0.5 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.verifiedSkills.length > 4 && (
                        <span className="text-[11px] text-neutral-500 px-1 py-0.5">
                          +{cert.verifiedSkills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModalCert(cert)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>View Certificate</span>
                  </button>

                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-amber-400 transition-colors"
                    title="Verify on issuer official portal"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Verification Guarantee Trust Banner */}
        <div className="mt-10 p-4 sm:p-5 bg-neutral-900/60 border border-neutral-800/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Cryptographically Verifiable Credentials</div>
              <div className="text-xs text-neutral-400">All credentials can be inspected live via Amazon, Google Cloud, and CNCF databases.</div>
            </div>
          </div>

          <a
            href="#contact"
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 hover:underline underline-offset-4 self-start sm:self-auto"
          >
            Inquire for specific compliance certifications →
          </a>
        </div>
      </div>

      {/* Detail Inspection Modal */}
      <CertificateDetailModal
        certificate={activeModalCert}
        profile={profile}
        onClose={() => setActiveModalCert(null)}
      />
    </section>
  );
};

import React from 'react';
import { X, Printer, Download, Mail, MapPin, Globe, Phone } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface ResumePrintModalProps {
  data: PortfolioData;
  isOpen: boolean;
  onClose: () => void;
}

export const ResumePrintModal: React.FC<ResumePrintModalProps> = ({ data, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const { profile, certificates, experiences, education, skills } = data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto no-print">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Modal Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">Curriculum Vitae Preview</span>
            <span className="text-xs text-neutral-400 font-mono">(Print & PDF Ready)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet View */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-neutral-100 text-neutral-900 font-sans print:p-0 print:m-0 print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b-2 border-neutral-900 pb-5">
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950">
              {profile.fullName}
            </h1>
            <div className="text-base font-semibold text-amber-700 mt-0.5">
              {profile.professionalTitle}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-600 mt-3 font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> {profile.email}
              </span>
              {profile.phone && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> {profile.phone}
                  </span>
                </>
              )}
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {profile.location}
              </span>
              <span>·</span>
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 underline text-neutral-800">
                github.com/Rajesh2112
              </a>
              <span>·</span>
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 underline text-neutral-800">
                linkedin.com/in/rajesh-kumar
              </a>
            </div>

            <p className="text-xs text-neutral-700 leading-relaxed mt-3 max-w-3xl">
              {profile.bio}
            </p>
          </div>

          {/* Section: Professional Experience */}
          <div className="py-5 border-b border-neutral-300">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
              Professional Work Experience
            </h2>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between text-sm">
                    <div className="font-bold text-neutral-900">
                      {exp.role} <span className="font-semibold text-neutral-600">· {exp.company}</span>
                    </div>
                    <div className="text-xs font-mono text-neutral-600">
                      {exp.startDate} – {exp.endDate}
                    </div>
                  </div>

                  <div className="text-xs text-neutral-500 italic mt-0.5">
                    {exp.location} · {exp.type}
                  </div>

                  <p className="text-xs text-neutral-700 leading-relaxed mt-1">
                    {exp.summary}
                  </p>

                  <ul className="list-disc list-inside space-y-1 mt-1.5 text-xs text-neutral-700">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx} className="leading-snug">{item}</li>
                    ))}
                  </ul>

                  <div className="text-[11px] font-mono text-neutral-600 mt-1.5">
                    <strong>Technologies:</strong> {exp.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Industry Certifications */}
          <div className="py-5 border-b border-neutral-300">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
              Industry Certifications & Credentials
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {certificates.map((cert) => (
                <div key={cert.id} className="p-2.5 bg-neutral-200/60 rounded border border-neutral-300">
                  <div className="font-bold text-neutral-900">{cert.title}</div>
                  <div className="text-neutral-600">{cert.issuer} · Issued {cert.issueDate}</div>
                  <div className="font-mono text-[10px] text-neutral-500 mt-1">Credential ID: {cert.credentialId}</div>
                  <div className="text-[11px] text-neutral-700 mt-1">{cert.verifiedSkills.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Technical Skills */}
          <div className="py-5 border-b border-neutral-300">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Technical Competencies & Tools
            </h2>
            <div className="text-xs text-neutral-800 leading-relaxed">
              <strong>Core Engineering:</strong> {skills.map((s) => s.name).join(' · ')}
            </div>
          </div>

          {/* Section: Education */}
          <div className="pt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
              Education & Degrees
            </h2>

            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between text-sm">
                    <div className="font-bold text-neutral-900">
                      {edu.degree} · <span className="text-neutral-700">{edu.institution}</span>
                    </div>
                    <div className="text-xs font-mono text-neutral-600">
                      {edu.startYear} – {edu.endYear}
                    </div>
                  </div>
                  <div className="text-xs text-neutral-600 mt-0.5">
                    {edu.field} {edu.honors && <span>— {edu.honors}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

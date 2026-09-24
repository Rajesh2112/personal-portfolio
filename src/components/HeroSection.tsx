import React, { useState } from 'react';
import { ArrowUpRight, Award, CheckCircle2, Copy, Check, Calendar, Github, Linkedin, ShieldCheck, Phone } from 'lucide-react';
import { Profile } from '../types/portfolio';
import { IssuerBadge } from './IssuerBadges';

interface HeroSectionProps {
  profile: Profile;
  onOpenScheduleModal?: () => void;
  onOpenPrintModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile, onOpenPrintModal }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="top" className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-neutral-800/80 overflow-hidden">
      {/* Subtle radial ambient backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-amber-500/10 via-amber-500/3 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Editorial Headline, Bio, and Direct Inquiries */}
          <div className="lg:col-span-7 space-y-6">
            {/* Availability Indicator */}
            <div className="inline-flex items-center gap-2.5 text-xs text-neutral-300 bg-neutral-900/90 border border-neutral-800 px-3.5 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-emerald-400">{profile.availability}</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-400">{profile.location}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] [text-wrap:balance]">
              {profile.professionalTitle}
            </h1>

            {/* Tagline / Subtitle */}
            <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl">
              {profile.tagline}
            </p>

            {/* Editorial Bio */}
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl">
              {profile.bio}
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md hover:shadow-amber-400/25"
              >
                <span>Hire / Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#certificates"
                onClick={(e) => handleScrollTo(e, '#certificates')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>View Certifications ({profile.certificationsCount})</span>
              </a>

              {onOpenPrintModal && (
                <button
                  onClick={onOpenPrintModal}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-neutral-400 hover:text-neutral-200 bg-transparent hover:bg-neutral-900 rounded-lg transition-colors border border-transparent hover:border-neutral-800"
                >
                  <span>Download CV</span>
                </button>
              )}
            </div>

            {/* Direct Contact & Social Links */}
            <div className="pt-4 flex flex-wrap items-center gap-5 text-xs text-neutral-400 border-t border-neutral-800/80">
              <div className="flex items-center gap-2">
                <span className="font-mono text-neutral-300">{profile.email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="p-1 text-neutral-500 hover:text-amber-400 transition-colors rounded"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                {copiedEmail && <span className="text-emerald-400 text-[11px]">Copied!</span>}
              </div>

              {profile.phone && (
                <>
                  <span className="text-neutral-700 hidden sm:inline">|</span>
                  <a
                    href={`tel:${profile.phone}`}
                    className="inline-flex items-center gap-1.5 font-mono text-neutral-300 hover:text-amber-400 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{profile.phone}</span>
                  </a>
                </>
              )}

              <span className="text-neutral-700 hidden sm:inline">|</span>

              <div className="flex items-center gap-4">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Quantitative Rigor & Credential Badge Showcase */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
              {/* Card Header: Credentials Summary */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>Academic & Industry Credentials</span>
                </div>
                <span className="text-xs font-mono text-neutral-400">Roll: 2384200163</span>
              </div>

              {/* Grid of Verified Issuers */}
              <div>
                <div className="text-xs text-neutral-400 mb-3 flex items-center justify-between">
                  <span>Accreditation Issuing Bodies</span>
                  <span className="text-[11px] text-amber-400/90 font-medium">Actively Certified</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  <div className="flex flex-col items-center gap-1.5 p-2 bg-neutral-950/60 rounded-xl border border-neutral-800/80 hover:border-neutral-700 transition-colors">
                    <IssuerBadge issuerCode="CODESQUADZ" className="w-9 h-9" />
                    <span className="text-[10px] font-mono text-neutral-400">CodeSquadz</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-2 bg-neutral-950/60 rounded-xl border border-neutral-800/80 hover:border-neutral-700 transition-colors">
                    <IssuerBadge issuerCode="HACKERRANK" className="w-9 h-9" />
                    <span className="text-[10px] font-mono text-neutral-400">HackerRank</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-2 bg-neutral-950/60 rounded-xl border border-neutral-800/80 hover:border-neutral-700 transition-colors">
                    <IssuerBadge issuerCode="ROADMAP" className="w-9 h-9" />
                    <span className="text-[10px] font-mono text-neutral-400">Roadmap.sh</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-2 bg-neutral-950/60 rounded-xl border border-neutral-800/80 hover:border-neutral-700 transition-colors">
                    <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono font-bold text-xs">
                      Java
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">Java / OOP</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-2 bg-neutral-950/60 rounded-xl border border-neutral-800/80 hover:border-neutral-700 transition-colors">
                    <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono font-bold text-xs">
                      SQL
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">MySQL</span>
                  </div>
                </div>
              </div>

              {/* 4 Quantitative Proof Metric Blocks from Resume */}
              <div className="grid grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 bg-neutral-950/70 border border-neutral-800/80 rounded-xl">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
                    71.5%
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">M.C.A. (G.L.A. Univ)</div>
                </div>

                <div className="p-4 bg-neutral-950/70 border border-neutral-800/80 rounded-xl">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
                    77.4%
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">B.C.A. (DBRAU)</div>
                </div>

                <div className="p-4 bg-neutral-950/70 border border-neutral-800/80 rounded-xl">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
                    2
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">Shipped Web Projects</div>
                </div>

                <div className="p-4 bg-neutral-950/70 border border-neutral-800/80 rounded-xl">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 tabular-nums">
                    3
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">Verified Certifications</div>
                </div>
              </div>

              {/* Consultation availability callout */}
              <div className="pt-2 p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl flex items-start gap-3 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">G.L.A. University, Mathura (2023 - 2025)</div>
                  <div className="text-neutral-400 mt-0.5 leading-relaxed">
                    Eager to contribute as a Software Developer, Full-Stack / Frontend Engineer, or Java Specialist.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

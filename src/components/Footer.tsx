import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Sliders } from 'lucide-react';
import { Profile } from '../types/portfolio';

interface FooterProps {
  profile: Profile;
  onOpenCustomizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenCustomizer }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="font-semibold text-neutral-200">
            {profile.fullName} <span className="font-normal text-neutral-500">· {profile.professionalTitle}</span>
          </div>
          <div className="text-neutral-500 mt-1">
            Available for remote advisory, architecture reviews, and high-impact engineering contracts.
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-amber-400 transition-colors"
          >
            {profile.email}
          </a>
          <button
            onClick={onOpenCustomizer}
            className="hover:text-amber-400 transition-colors inline-flex items-center gap-1"
          >
            <Sliders className="w-3 h-3" />
            <span>Customize</span>
          </button>
          <button
            onClick={scrollToTop}
            className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

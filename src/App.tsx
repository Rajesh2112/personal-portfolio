import React, { useState, useEffect } from 'react';
import { initialPortfolioData } from './data/initialPortfolioData';
import { PortfolioData } from './types/portfolio';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CertificatesSection } from './components/CertificatesSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PortfolioCustomizerModal } from './components/PortfolioCustomizerModal';
import { ResumePrintModal } from './components/ResumePrintModal';
import { DiscoveryCallModal } from './components/DiscoveryCallModal';
import { CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'portfolio_data_rajesh_v8';

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.profile && parsed.certificates && parsed.skills) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load portfolio data from localStorage:', e);
    }
    return initialPortfolioData;
  });

  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSavePortfolioData = (newData: PortfolioData) => {
    setPortfolioData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      showToast('Portfolio changes saved & updated!');
    } catch (e) {
      console.error('Failed to save portfolio data:', e);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all portfolio content back to the default template? Any custom edits will be cleared.')) {
      setPortfolioData(initialPortfolioData);
      try {
        localStorage.removeItem(STORAGE_KEY);
        showToast('Reset to default portfolio template.');
      } catch (e) {
        console.error('Failed to remove stored data:', e);
      }
      setIsCustomizerOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-neutral-900 border border-emerald-500/40 text-neutral-100 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-2 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        profile={portfolioData.profile}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          profile={portfolioData.profile}
          onOpenPrintModal={() => setIsPrintModalOpen(true)}
        />

        {/* 01. Certificates Showcase */}
        <CertificatesSection
          certificates={portfolioData.certificates}
          profile={portfolioData.profile}
          onAddCertificate={() => setIsCustomizerOpen(true)}
        />

        {/* 02. Skills Matrix */}
        <SkillsSection
          skills={portfolioData.skills}
          selectedSkill={selectedSkillFilter}
          onSelectSkillFilter={(skillName) => setSelectedSkillFilter(skillName || null)}
        />

        {/* 03. Work Experience */}
        <ExperienceSection
          experiences={portfolioData.experiences}
          selectedSkill={selectedSkillFilter}
          onAddExperience={() => setIsCustomizerOpen(true)}
        />

        {/* 04. Education */}
        <EducationSection
          education={portfolioData.education}
          onAddEducation={() => setIsCustomizerOpen(true)}
        />

        {/* 05. Projects & Systems */}
        <ProjectsSection
          projects={portfolioData.projects}
          selectedSkill={selectedSkillFilter}
        />

        {/* 06. Contact Inquiries & Client Brief Form */}
        <ContactSection
          profile={portfolioData.profile}
          onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        profile={portfolioData.profile}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Customizer Modal */}
      <PortfolioCustomizerModal
        data={portfolioData}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onSave={handleSavePortfolioData}
        onResetToDefault={handleResetToDefault}
      />

      {/* Resume Print Modal */}
      <ResumePrintModal
        data={portfolioData}
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
      />

      {/* Discovery Call Booking Modal */}
      <DiscoveryCallModal
        profile={portfolioData.profile}
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
    </div>
  );
}

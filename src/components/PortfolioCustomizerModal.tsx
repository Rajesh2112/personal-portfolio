import React, { useState } from 'react';
import { X, Save, RotateCcw, Download, Upload, Plus, Trash2, Award, Briefcase, GraduationCap, Cpu, User } from 'lucide-react';
import { PortfolioData, Certificate, Experience, Education, SkillItem, Profile } from '../types/portfolio';

interface PortfolioCustomizerModalProps {
  data: PortfolioData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newData: PortfolioData) => void;
  onResetToDefault: () => void;
}

export const PortfolioCustomizerModal: React.FC<PortfolioCustomizerModalProps> = ({
  data,
  isOpen,
  onClose,
  onSave,
  onResetToDefault,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'certificates' | 'skills' | 'experience' | 'education' | 'json'>('profile');
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [jsonText, setJsonText] = useState(JSON.stringify(data, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Sync state when opened
  React.useEffect(() => {
    setFormData(data);
    setJsonText(JSON.stringify(data, null, 2));
  }, [data, isOpen]);

  if (!isOpen) return null;

  const handleProfileChange = (field: keyof Profile, value: any) => {
    setFormData({
      ...formData,
      profile: {
        ...formData.profile,
        [field]: value,
      },
    });
  };

  const handleAddCertificate = () => {
    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      title: 'New Professional Certificate',
      issuer: 'Certification Authority',
      issuerCode: 'OTHER',
      issueDate: '2025',
      credentialId: `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
      credentialUrl: 'https://example.com/verify',
      category: 'Cloud & DevOps',
      description: 'Certification details and core competencies demonstrated.',
      verifiedSkills: ['Distributed Systems', 'System Design'],
    };
    setFormData({
      ...formData,
      certificates: [newCert, ...formData.certificates],
    });
  };

  const handleDeleteCertificate = (id: string) => {
    setFormData({
      ...formData,
      certificates: formData.certificates.filter((c) => c.id !== id),
    });
  };

  const handleAddExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      role: 'Senior Engineering Role',
      company: 'Tech Enterprises Inc.',
      location: 'Remote',
      type: 'Full-time',
      startDate: '2024',
      endDate: 'Present',
      isCurrent: true,
      summary: 'Delivered high-throughput software and cloud infrastructure.',
      achievements: ['Architected core platform modules', 'Improved performance and reduced latency'],
      technologies: ['React', 'TypeScript', 'Node.js', 'AWS'],
      keyMetric: '+40% developer velocity',
    };
    setFormData({
      ...formData,
      experiences: [newExp, ...formData.experiences],
    });
  };

  const handleDeleteExperience = (id: string) => {
    setFormData({
      ...formData,
      experiences: formData.experiences.filter((e) => e.id !== id),
    });
  };

  const handleAddEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      degree: 'Bachelor of Science in Computer Science',
      field: 'Software Engineering',
      institution: 'University Name',
      location: 'City, Country',
      startYear: '2016',
      endYear: '2020',
      description: 'Foundational coursework in computer systems, algorithms, and software engineering.',
      coursework: ['Data Structures', 'Operating Systems', 'Algorithms'],
      achievements: ['Dean\'s List', 'Capstone Project Award'],
    };
    setFormData({
      ...formData,
      education: [newEdu, ...formData.education],
    });
  };

  const handleDeleteEducation = (id: string) => {
    setFormData({
      ...formData,
      education: formData.education.filter((e) => e.id !== id),
    });
  };

  const handleSaveAll = () => {
    onSave(formData);
    onClose();
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_${formData.profile.fullName.toLowerCase().replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile && parsed.certificates && parsed.skills) {
          setFormData(parsed);
          setJsonText(JSON.stringify(parsed, null, 2));
          setJsonError(null);
        } else {
          setJsonError('Invalid portfolio JSON structure');
        }
      } catch (err: any) {
        setJsonError(`JSON Parse error: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div>
            <h2 className="text-lg font-bold text-white">Customize Portfolio Content</h2>
            <p className="text-xs text-neutral-400">Update your bio, certificates, skills, work experience, and education.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-neutral-800 bg-neutral-950/70 overflow-x-auto">
          {[
            { id: 'profile', label: 'Personal Bio', icon: User },
            { id: 'certificates', label: `Certificates (${formData.certificates.length})`, icon: Award },
            { id: 'skills', label: `Skills (${formData.skills.length})`, icon: Cpu },
            { id: 'experience', label: `Experience (${formData.experiences.length})`, icon: Briefcase },
            { id: 'education', label: `Education (${formData.education.length})`, icon: GraduationCap },
            { id: 'json', label: 'Backup / JSON', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-t-lg transition-colors whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? 'border-amber-400 text-white bg-neutral-900'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-amber-400" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.profile.fullName}
                    onChange={(e) => handleProfileChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={formData.profile.professionalTitle}
                    onChange={(e) => handleProfileChange('professionalTitle', e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Headline / Tagline</label>
                <input
                  type="text"
                  value={formData.profile.tagline}
                  onChange={(e) => handleProfileChange('tagline', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Bio Summary</label>
                <textarea
                  rows={3}
                  value={formData.profile.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Primary Email</label>
                  <input
                    type="email"
                    value={formData.profile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.profile.location}
                    onChange={(e) => handleProfileChange('location', e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Availability Status</label>
                  <select
                    value={formData.profile.availability}
                    onChange={(e) => handleProfileChange('availability', e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Available for Contracts">Available for Contracts</option>
                    <option value="Open for Full-Time">Open for Full-Time</option>
                    <option value="Selective Advisory">Selective Advisory</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={formData.profile.githubUrl}
                    onChange={(e) => handleProfileChange('githubUrl', e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.profile.linkedinUrl}
                    onChange={(e) => handleProfileChange('linkedinUrl', e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Certificates Tab */}
          {activeTab === 'certificates' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-medium text-neutral-400">Manage Your Professional Certifications</span>
                <button
                  type="button"
                  onClick={handleAddCertificate}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Certificate</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.certificates.map((cert, index) => (
                  <div key={cert.id} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-mono text-amber-400 font-semibold">#{index + 1} {cert.issuer}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteCertificate(cert.id)}
                        className="text-neutral-500 hover:text-red-400 p-1"
                        title="Delete this certificate"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-0.5">Certificate Title</label>
                        <input
                          type="text"
                          value={cert.title}
                          onChange={(e) => {
                            const updated = [...formData.certificates];
                            updated[index].title = e.target.value;
                            setFormData({ ...formData, certificates: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-0.5">Issuer</label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => {
                            const updated = [...formData.certificates];
                            updated[index].issuer = e.target.value;
                            setFormData({ ...formData, certificates: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-0.5">Category</label>
                        <select
                          value={cert.category}
                          onChange={(e) => {
                            const updated = [...formData.certificates];
                            updated[index].category = e.target.value as any;
                            setFormData({ ...formData, certificates: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                        >
                          <option value="Course Training">Course Training</option>
                          <option value="Frontend Engineering">Frontend Engineering</option>
                          <option value="Databases & SQL">Databases & SQL</option>
                          <option value="Cloud & DevOps">Cloud & DevOps</option>
                          <option value="Software Architecture">Software Architecture</option>
                          <option value="Backend Systems">Backend Systems</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-0.5">Issue Date</label>
                        <input
                          type="text"
                          value={cert.issueDate}
                          onChange={(e) => {
                            const updated = [...formData.certificates];
                            updated[index].issueDate = e.target.value;
                            setFormData({ ...formData, certificates: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-0.5">Credential ID</label>
                        <input
                          type="text"
                          value={cert.credentialId}
                          onChange={(e) => {
                            const updated = [...formData.certificates];
                            updated[index].credentialId = e.target.value;
                            setFormData({ ...formData, certificates: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-medium text-neutral-400">Manage Career History & Seniority</span>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.experiences.map((exp, index) => (
                  <div key={exp.id} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-mono text-amber-400 font-semibold">{exp.role} @ {exp.company}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="text-neutral-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-0.5">Role Title</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const updated = [...formData.experiences];
                            updated[index].role = e.target.value;
                            setFormData({ ...formData, experiences: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-0.5">Company Name</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = [...formData.experiences];
                            updated[index].company = e.target.value;
                            setFormData({ ...formData, experiences: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-0.5">Start Date</label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => {
                            const updated = [...formData.experiences];
                            updated[index].startDate = e.target.value;
                            setFormData({ ...formData, experiences: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-0.5">End Date</label>
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => {
                            const updated = [...formData.experiences];
                            updated[index].endDate = e.target.value;
                            setFormData({ ...formData, experiences: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-0.5">Proof Metric</label>
                        <input
                          type="text"
                          value={exp.keyMetric || ''}
                          onChange={(e) => {
                            const updated = [...formData.experiences];
                            updated[index].keyMetric = e.target.value;
                            setFormData({ ...formData, experiences: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-0.5">Summary</label>
                      <textarea
                        rows={2}
                        value={exp.summary}
                        onChange={(e) => {
                          const updated = [...formData.experiences];
                          updated[index].summary = e.target.value;
                          setFormData({ ...formData, experiences: updated });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-medium text-neutral-400">Manage Academic Degrees</span>
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Degree</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.education.map((edu, index) => (
                  <div key={edu.id} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-mono text-amber-400 font-semibold">{edu.degree}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteEducation(edu.id)}
                        className="text-neutral-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-0.5">Degree Title</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const updated = [...formData.education];
                            updated[index].degree = e.target.value;
                            setFormData({ ...formData, education: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-0.5">Institution / University</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => {
                            const updated = [...formData.education];
                            updated[index].institution = e.target.value;
                            setFormData({ ...formData, education: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-0.5">Field of Study</label>
                        <input
                          type="text"
                          value={edu.field}
                          onChange={(e) => {
                            const updated = [...formData.education];
                            updated[index].field = e.target.value;
                            setFormData({ ...formData, education: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-0.5">Years (e.g. 2013 – 2017)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={edu.startYear}
                            onChange={(e) => {
                              const updated = [...formData.education];
                              updated[index].startYear = e.target.value;
                              setFormData({ ...formData, education: updated });
                            }}
                            className="w-1/2 px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                          />
                          <input
                            type="text"
                            value={edu.endYear}
                            onChange={(e) => {
                              const updated = [...formData.education];
                              updated[index].endYear = e.target.value;
                              setFormData({ ...formData, education: updated });
                            }}
                            className="w-1/2 px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-0.5">Honors / GPA</label>
                        <input
                          type="text"
                          value={edu.honors || ''}
                          onChange={(e) => {
                            const updated = [...formData.education];
                            updated[index].honors = e.target.value;
                            setFormData({ ...formData, education: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <span className="text-xs font-medium text-neutral-400">Technical Skills Matrix ({formData.skills.length} skills)</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formData.skills.slice(0, 10).map((skill, index) => (
                  <div key={skill.id} className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{skill.name}</span>
                      <span className="text-amber-400 font-mono">{skill.level}%</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={100}
                      value={skill.level}
                      onChange={(e) => {
                        const updated = [...formData.skills];
                        updated[index].level = Number(e.target.value);
                        setFormData({ ...formData, skills: updated });
                      }}
                      className="w-full accent-amber-400"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* JSON Backup Tab */}
          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-neutral-400">Directly export or import your complete portfolio dataset:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleExportJSON}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg border border-neutral-700"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Download JSON Backup</span>
                  </button>

                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg border border-neutral-700 cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>Upload JSON</span>
                    <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                  </label>
                </div>
              </div>

              {jsonError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-xs">
                  {jsonError}
                </div>
              )}

              <textarea
                rows={12}
                value={jsonText}
                onChange={(e) => {
                  setJsonText(e.target.value);
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setFormData(parsed);
                    setJsonError(null);
                  } catch (err: any) {
                    setJsonError(`Invalid JSON: ${err.message}`);
                  }
                }}
                className="w-full p-3 font-mono text-[11px] bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-300 focus:outline-none focus:border-amber-400"
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-800 bg-neutral-950">
          <button
            type="button"
            onClick={onResetToDefault}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-red-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default Template</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 rounded-lg transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveAll}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Apply Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

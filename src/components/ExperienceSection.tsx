import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, TrendingUp, CheckCircle, Plus } from 'lucide-react';
import { Experience } from '../types/portfolio';

interface ExperienceSectionProps {
  experiences: Experience[];
  selectedSkill?: string | null;
  onAddExperience?: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  selectedSkill,
  onAddExperience,
}) => {
  const [filterType, setFilterType] = useState<string>('All');

  const filteredExperiences = experiences.filter((exp) => {
    const matchesType = filterType === 'All' || exp.type.includes(filterType);
    if (!selectedSkill) return matchesType;

    const matchesSkill = exp.technologies.some(
      (tech) =>
        tech.toLowerCase().includes(selectedSkill.toLowerCase()) ||
        selectedSkill.toLowerCase().includes(tech.toLowerCase())
    );

    return matchesType && matchesSkill;
  });

  return (
    <section id="experience" className="py-20 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-800/80">
          <div>
            <div className="text-xs font-mono tracking-widest text-amber-400 uppercase font-semibold">
              03. Track Record & Work Experience
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Professional Work Experience
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl leading-relaxed">
              Documented professional experience with verified service and relieving credentials.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            {onAddExperience && (
              <button
                onClick={onAddExperience}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Add Role</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="pt-6 pb-8 flex items-center justify-between">
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900/90 border border-neutral-800 rounded-xl">
            {['All', 'Full-time', 'Contract'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  filterType === type
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {type === 'All' ? 'All Roles' : type}
              </button>
            ))}
          </div>

          {selectedSkill && (
            <span className="text-xs text-amber-400 font-mono">
              Filtered for: {selectedSkill}
            </span>
          )}
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-neutral-800 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-12">
          {filteredExperiences.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Bullet Node */}
              <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                exp.isCurrent
                  ? 'bg-amber-400 border-neutral-950 ring-4 ring-amber-400/20'
                  : 'bg-neutral-800 border-neutral-950 group-hover:bg-amber-400 transition-colors'
              }`} />

              {/* Main Card */}
              <div className="p-6 sm:p-7 bg-neutral-900/70 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl transition-all shadow-sm">
                {/* Header: Role, Company & Period */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-neutral-800/80">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                        {exp.role}
                      </h3>
                      {exp.isCurrent && (
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-300 mt-1">
                      <span className="font-semibold">{exp.company}</span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span className="text-neutral-400">{exp.type}</span>
                    </div>
                  </div>

                  {/* Period & Location */}
                  <div className="text-left sm:text-right space-y-1 shrink-0">
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <div className="flex items-center sm:justify-end gap-1.5 text-xs text-neutral-400">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Key Quantitative Proof Metric */}
                {exp.keyMetric && (
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/25 rounded-lg text-xs font-mono text-amber-300">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                    <span>Validated Impact: <strong>{exp.keyMetric}</strong></span>
                  </div>
                )}

                {/* Role Summary */}
                <p className="text-sm text-neutral-300 leading-relaxed mt-4">
                  {exp.summary}
                </p>

                {/* Achievements List */}
                <div className="mt-4 space-y-2">
                  <div className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
                    Key Technical Deliverables:
                  </div>
                  <ul className="space-y-2">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Used */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-neutral-500 font-mono mr-1">Stack:</span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-neutral-300 bg-neutral-950/80 border border-neutral-800 px-2.5 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

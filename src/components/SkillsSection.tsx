import React, { useState, useMemo } from 'react';
import { Layers, Search, Cpu, Cloud, Database, Code, Shield, Sparkles } from 'lucide-react';
import { SkillItem } from '../types/portfolio';

interface SkillsSectionProps {
  skills: SkillItem[];
  onSelectSkillFilter?: (skillName: string) => void;
  selectedSkill?: string | null;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  onSelectSkillFilter,
  selectedSkill,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'All', label: 'All Disciplines', icon: Layers },
    { id: 'Frontend', label: 'Frontend', icon: Code },
    { id: 'Backend', label: 'Backend & APIs', icon: Cpu },
    { id: 'Cloud & DevOps', label: 'Cloud & Kubernetes', icon: Cloud },
    { id: 'System Architecture', label: 'Architecture', icon: Shield },
    { id: 'Databases & Tools', label: 'Databases & Observability', icon: Database },
  ];

  const filteredSkills = useMemo(() => {
    return skills.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [skills, activeCategory, searchQuery]);

  return (
    <section id="skills" className="py-20 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-8 border-b border-neutral-800/80">
          <div className="text-xs font-mono tracking-widest text-amber-400 uppercase font-semibold">
            02. Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Technical Skills & Engineering Stack
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl leading-relaxed">
            Deep specialized proficiency across contemporary web frameworks, high-concurrency backend services, and automated cloud orchestration.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="pt-6 pb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900/90 border border-neutral-800 rounded-xl">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-neutral-800 text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-amber-400" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Filter by technology or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-900/90 border border-neutral-800 focus:border-amber-400/80 rounded-xl text-neutral-200 placeholder-neutral-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkill === skill.name;
            return (
              <div
                key={skill.id}
                onClick={() => onSelectSkillFilter && onSelectSkillFilter(isSelected ? '' : skill.name)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                    : 'bg-neutral-900/70 hover:bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {/* Header: Skill Name & Category */}
                <div className="flex items-start justify-between gap-2 pb-2">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-white flex items-center gap-1.5">
                      <span>{skill.name}</span>
                      {skill.highlight && (
                        <span title="Core Specialty" className="inline-flex">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        </span>
                      )}
                    </h3>
                    <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                      {skill.category}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-amber-400 tabular-nums">
                      {skill.level}%
                    </span>
                    <div className="text-[10px] text-neutral-400 tabular-nums">
                      {skill.years} yrs exp
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-neutral-950 rounded-full h-1.5 overflow-hidden my-3 border border-neutral-800">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-neutral-300 bg-neutral-950/80 border border-neutral-800/80 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Skill Context Notice */}
        {selectedSkill && (
          <div className="mt-6 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-xs text-amber-300">
            <span>
              Filtering experience and projects matching skill: <strong>{selectedSkill}</strong>
            </span>
            <button
              onClick={() => onSelectSkillFilter && onSelectSkillFilter('')}
              className="px-2.5 py-1 text-xs font-medium text-amber-200 hover:text-white bg-amber-500/20 rounded hover:bg-amber-500/30 transition-colors"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

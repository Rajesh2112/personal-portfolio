import React from 'react';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, Plus } from 'lucide-react';
import { Education } from '../types/portfolio';

interface EducationSectionProps {
  education: Education[];
  onAddEducation?: () => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  onAddEducation,
}) => {
  return (
    <section id="education" className="py-20 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-800/80">
          <div>
            <div className="text-xs font-mono tracking-widest text-amber-400 uppercase font-semibold">
              04. Academic Foundation
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Education & Advanced Studies
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl leading-relaxed">
              Formal computer science foundations, systems programming principles, and advanced reliability engineering specializations.
            </p>
          </div>

          {onAddEducation && (
            <button
              onClick={onAddEducation}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors whitespace-nowrap self-start md:self-auto"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Add Degree</span>
            </button>
          )}
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="p-7 bg-neutral-900/70 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-800">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {edu.degree}
                      </h3>
                      <div className="text-sm text-neutral-300 font-medium mt-0.5">
                        {edu.institution}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="inline-flex items-center gap-1 text-xs font-mono text-amber-400">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>{edu.startYear} – {edu.endYear}</span>
                    </div>
                    <div className="flex items-center justify-end gap-1 text-xs text-neutral-400 mt-1">
                      <MapPin className="w-3 h-3 text-neutral-500" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>

                {/* Field & Honors */}
                <div className="py-4 space-y-2">
                  <div className="text-xs text-neutral-400">
                    Focus: <strong className="text-neutral-200">{edu.field}</strong>
                  </div>

                  {edu.honors && (
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>{edu.honors}</span>
                      {edu.gpa && <span>(GPA: {edu.gpa})</span>}
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-2">
                    {edu.description}
                  </p>
                </div>

                {/* Coursework */}
                {edu.coursework.length > 0 && (
                  <div className="pt-4 border-t border-neutral-800/80">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 mb-2.5 uppercase tracking-wider">
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      <span>Advanced Relevant Coursework:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="text-[11px] text-neutral-300 bg-neutral-950/80 border border-neutral-800/90 px-2.5 py-1 rounded"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Academic Highlights */}
              {edu.achievements.length > 0 && (
                <div className="mt-6 pt-4 border-t border-neutral-800">
                  <div className="text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-wider">
                    Academic Highlights & Honors:
                  </div>
                  <ul className="space-y-1.5">
                    {edu.achievements.map((item, idx) => (
                      <li key={idx} className="text-xs text-neutral-300 leading-relaxed flex items-start gap-2">
                        <span className="text-amber-400 font-bold mt-0.5">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

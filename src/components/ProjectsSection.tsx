import React from 'react';
import { ExternalLink, Github, Terminal, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { Project } from '../types/portfolio';
import { GitHubActivitySection } from './GitHubActivitySection';

interface ProjectsSectionProps {
  projects: Project[];
  selectedSkill?: string | null;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, selectedSkill }) => {
  const filteredProjects = projects.filter((proj) => {
    if (!selectedSkill) return true;
    return proj.technologies.some(
      (tech) =>
        tech.toLowerCase().includes(selectedSkill.toLowerCase()) ||
        selectedSkill.toLowerCase().includes(tech.toLowerCase())
    );
  });

  return (
    <section id="projects" className="py-20 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-8 mb-8 border-b border-neutral-800/80">
          <div className="text-xs font-mono tracking-widest text-amber-400 uppercase font-semibold">
            05. Architecture Case Studies & GitHub Proof
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Featured Systems & Open-Source Telemetry
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl leading-relaxed">
            Real-world systems, open-source repositories, and verified live GitHub activity demonstrating hands-on code execution.
          </p>
        </div>

        {/* Dynamic GitHub Contribution & Activity Telemetry */}
        <GitHubActivitySection />

        {/* Projects Subheading */}
        <div className="flex items-center justify-between pb-4 pt-4">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-neutral-300">
              Highlighted Software Projects ({filteredProjects.length})
            </h3>
          </div>
          {selectedSkill && (
            <span className="text-xs font-mono text-amber-400">
              Filtered for: {selectedSkill}
            </span>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`p-7 bg-neutral-900/70 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl transition-all flex flex-col justify-between ${
                idx === 0 ? 'lg:col-span-2' : 'lg:col-span-1'
              }`}
            >
              <div>
                {/* Category & Links */}
                <div className="flex items-center justify-between pb-3">
                  <span className="text-xs font-mono text-amber-400 font-semibold">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-white transition-colors"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-amber-400 transition-colors"
                        title="Live Architecture Demo"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold text-white mt-1">
                  {project.title}
                </h3>
                <div className="text-xs text-neutral-400 mt-0.5 font-medium">
                  {project.subtitle}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mt-4">
                  {project.description}
                </p>

                {/* Quantitative Metric */}
                <div className="mt-4 p-3 bg-neutral-950/80 border border-neutral-800/80 rounded-xl text-xs font-mono text-amber-300 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Metric: <strong>{project.metrics}</strong></span>
                </div>
              </div>

              {/* Technologies */}
              <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono text-neutral-300 bg-neutral-950/80 border border-neutral-800 px-2 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

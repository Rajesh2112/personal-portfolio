import React, { useState } from 'react';
import { Mail, CheckCircle2, Clock, Send, Copy, Check, Calendar, MessageSquare, ArrowRight, ShieldCheck, Sparkles, AlertCircle, Phone } from 'lucide-react';
import { Profile, ClientInquiry } from '../types/portfolio';

interface ContactSectionProps {
  profile: Profile;
  onOpenScheduleModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  profile,
  onOpenScheduleModal,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Full-Stack Web Application',
    budgetRange: '$15,000 – $30,000',
    timeline: '1 – 2 Months',
    message: '',
  });

  const [submittedInquiry, setSubmittedInquiry] = useState<ClientInquiry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedDirectEmail, setCopiedDirectEmail] = useState(false);
  const [showInquiryHistory, setShowInquiryHistory] = useState(false);
  const [inquiryHistory, setInquiryHistory] = useState<ClientInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('client_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = 'Please provide a brief description (at least 15 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newInquiry: ClientInquiry = {
        id: `INQ-${Math.floor(100000 + Math.random() * 900000)}`,
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || 'Undisclosed / Individual',
        projectType: formData.projectType,
        budgetRange: formData.budgetRange,
        timeline: formData.timeline,
        message: formData.message.trim(),
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      const updatedHistory = [newInquiry, ...inquiryHistory];
      setInquiryHistory(updatedHistory);
      try {
        localStorage.setItem('client_inquiries', JSON.stringify(updatedHistory));
      } catch (err) {
        console.error('Failed saving inquiry to storage:', err);
      }

      setSubmittedInquiry(newInquiry);
      setIsSubmitting(false);
    }, 700);
  };

  const handleCopySummary = () => {
    if (!submittedInquiry) return;
    const summaryText = `Project Inquiry [${submittedInquiry.id}]
Client: ${submittedInquiry.name} (${submittedInquiry.email})
Company: ${submittedInquiry.company}
Project Focus: ${submittedInquiry.projectType}
Budget: ${submittedInquiry.budgetRange}
Timeline: ${submittedInquiry.timeline}
Message:
${submittedInquiry.message}`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2200);
  };

  const handleCopyDirectEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedDirectEmail(true);
    setTimeout(() => setCopiedDirectEmail(false), 2200);
  };

  const createMailtoLink = (inquiry: ClientInquiry) => {
    const subject = encodeURIComponent(`Project Inquiry: ${inquiry.projectType} (${inquiry.name})`);
    const body = encodeURIComponent(
      `Hello ${profile.fullName},\n\n` +
      `I would like to discuss a potential project:\n\n` +
      `Client: ${inquiry.name}\n` +
      `Company: ${inquiry.company}\n` +
      `Project Scope: ${inquiry.projectType}\n` +
      `Estimated Budget: ${inquiry.budgetRange}\n` +
      `Timeline: ${inquiry.timeline}\n\n` +
      `Brief Description:\n${inquiry.message}\n\n` +
      `Looking forward to connecting!\n`
    );
    return `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 border-b border-neutral-800/80 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-8 border-b border-neutral-800/80">
          <div className="text-xs font-mono tracking-widest text-amber-400 uppercase font-semibold">
            06. Initiate Collaboration
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Let's Discuss Your Architecture or Next Product
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl leading-relaxed">
            Ready to deploy resilient infrastructure, stabilize existing systems, or build your high-fidelity frontend? Send a brief overview below.
          </p>
        </div>

        {/* Main Grid: Form on Left, Contact Card & Testimonials on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10">
          {/* Left Form Column (7 Cols) */}
          <div className="lg:col-span-7">
            {submittedInquiry ? (
              /* Success State */
              <div className="p-8 bg-neutral-900/90 border border-emerald-500/30 rounded-2xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Inquiry Received Successfully</h3>
                    <div className="text-xs font-mono text-emerald-400 mt-0.5">
                      Tracking Reference: {submittedInquiry.id}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed">
                  Thank you, <strong>{submittedInquiry.name}</strong>. Your project brief has been recorded. You can also open an immediate email draft with these details pre-filled or book a quick intro call.
                </p>

                {/* Inquiry Summary Box */}
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl text-xs space-y-2 font-mono">
                  <div className="text-neutral-400">
                    <span className="text-neutral-500">Scope:</span> {submittedInquiry.projectType}
                  </div>
                  <div className="text-neutral-400">
                    <span className="text-neutral-500">Budget:</span> {submittedInquiry.budgetRange} · <span className="text-neutral-500">Timeline:</span> {submittedInquiry.timeline}
                  </div>
                  <div className="text-neutral-300 pt-2 border-t border-neutral-900 line-clamp-3">
                    "{submittedInquiry.message}"
                  </div>
                </div>

                {/* Instant Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={createMailtoLink(submittedInquiry)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open Email Client with Draft</span>
                  </a>

                  <button
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-700"
                  >
                    {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSummary ? 'Summary Copied!' : 'Copy Summary'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setSubmittedInquiry(null);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        projectType: 'Full-Stack Web Application',
                        budgetRange: '$15,000 – $30,000',
                        timeline: '1 – 2 Months',
                        message: '',
                      });
                    }}
                    className="text-xs text-neutral-400 hover:text-white px-3 py-2 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              /* Active Form */
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-neutral-900/80 border border-neutral-800 rounded-2xl shadow-xl space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-neutral-300">
                      Your Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Elena Rostova"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3.5 py-2.5 text-sm bg-neutral-950 border rounded-xl text-neutral-200 placeholder-neutral-500 focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500/80' : 'border-neutral-800 focus:border-amber-400'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-red-400">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-neutral-300">
                      Work Email <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="elena@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3.5 py-2.5 text-sm bg-neutral-950 border rounded-xl text-neutral-200 placeholder-neutral-500 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500/80' : 'border-neutral-800 focus:border-amber-400'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-400">{errors.email}</p>}
                  </div>
                </div>

                {/* Company / Organization */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-300">
                    Company / Organization <span className="text-neutral-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Cloud Corp / Stealth Startup"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl text-neutral-200 placeholder-neutral-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Project Focus & Budget Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-neutral-300">
                      Project Scope / Focus
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl text-neutral-200 focus:outline-none transition-colors"
                    >
                      <option>Full-Stack Web Application</option>
                      <option>Cloud & Kubernetes Migration</option>
                      <option>High-Throughput Backend & APIs</option>
                      <option>Architecture & Security Audit</option>
                      <option>Ongoing Staff Advisory / Retainer</option>
                      <option>Other Specialized Consultation</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-neutral-300">
                      Target Budget Range
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl text-neutral-200 focus:outline-none transition-colors"
                    >
                      <option>$5,000 – $15,000 (Small sprint / review)</option>
                      <option>$15,000 – $30,000 (Standard MVP / milestone)</option>
                      <option>$30,000 – $60,000+ (Comprehensive build)</option>
                      <option>Monthly Advisory Retainer</option>
                      <option>Flexible / To Be Scoped</option>
                    </select>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-300">
                    Desired Delivery Timeline
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Immediate (< 3 wks)', '1 – 2 Months', 'Flexible / Q1'].map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setFormData({ ...formData, timeline: t })}
                        className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${
                          formData.timeline === t
                            ? 'bg-amber-500/10 border-amber-400 text-amber-300'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Description Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-300">
                    Project Overview & Goals <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell me about your product requirements, current architecture hurdles, or what you'd like to achieve..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm bg-neutral-950 border rounded-xl text-neutral-200 placeholder-neutral-500 focus:outline-none transition-colors ${
                      errors.message ? 'border-red-500/80' : 'border-neutral-800 focus:border-amber-400'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-red-400">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-xl transition-all shadow-md hover:shadow-amber-400/25"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Brief...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Client Inquiry</span>
                      </>
                    )}
                  </button>

                  <span className="text-xs text-neutral-400 hidden sm:inline-block">
                    SLA: Response in &lt; 24h
                  </span>
                </div>
              </form>
            )}

            {/* Inquiries History link if any exist */}
            {inquiryHistory.length > 0 && (
              <div className="mt-4 text-left">
                <button
                  onClick={() => setShowInquiryHistory(!showInquiryHistory)}
                  className="text-xs text-neutral-500 hover:text-amber-400 transition-colors inline-flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>
                    {showInquiryHistory ? 'Hide Sent Inquiries' : `Review Sent Inquiries (${inquiryHistory.length})`}
                  </span>
                </button>

                {showInquiryHistory && (
                  <div className="mt-3 p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3">
                    <div className="text-xs font-semibold text-neutral-300">Previous Local Submissions:</div>
                    {inquiryHistory.map((item) => (
                      <div key={item.id} className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80 text-xs space-y-1">
                        <div className="flex items-center justify-between text-neutral-400">
                          <span className="font-mono text-amber-400">{item.id}</span>
                          <span>{item.timestamp}</span>
                        </div>
                        <div className="text-neutral-200 font-medium">{item.projectType} · {item.company}</div>
                        <p className="text-neutral-400 text-[11px] line-clamp-2">"{item.message}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Direct Channels & Social Proof Testimonials (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Channel Card */}
            <div className="p-6 sm:p-7 bg-neutral-900/90 border border-neutral-800 rounded-2xl space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-800">
                <Mail className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Direct Communication Channels</h3>
              </div>

              {/* Direct Email */}
              <div>
                <div className="text-xs text-neutral-400">Primary Email</div>
                <div className="mt-1 flex items-center justify-between p-3 bg-neutral-950 border border-neutral-800 rounded-xl">
                  <span className="text-xs sm:text-sm font-mono text-neutral-200 truncate">{profile.email}</span>
                  <button
                    onClick={handleCopyDirectEmail}
                    className="p-1.5 text-neutral-400 hover:text-amber-400 transition-colors"
                    title="Copy direct email"
                  >
                    {copiedDirectEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Direct Phone */}
              {profile.phone && (
                <div>
                  <div className="text-xs text-neutral-400">Direct Phone / WhatsApp</div>
                  <div className="mt-1 flex items-center justify-between p-3 bg-neutral-950 border border-neutral-800 rounded-xl">
                    <a href={`tel:${profile.phone}`} className="text-xs sm:text-sm font-mono text-neutral-200 hover:text-amber-400 transition-colors flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{profile.phone}</span>
                    </a>
                    <span className="text-[10px] text-neutral-500 font-mono">IST / India</span>
                  </div>
                </div>
              )}

              {/* Discovery Call Button */}
              <div>
                <button
                  type="button"
                  onClick={onOpenScheduleModal}
                  className="w-full inline-flex items-center justify-center gap-2 p-3 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-xs font-semibold text-white transition-colors"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Schedule 15-Min Intro Call</span>
                </button>
              </div>

              {/* Response SLA & Availability */}
              <div className="pt-2 border-t border-neutral-800/80 space-y-2.5 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Guaranteed response within <strong>24 business hours</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Open for Full-Time Software Developer & Web Roles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

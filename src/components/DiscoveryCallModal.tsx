import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Video, Globe, ArrowRight } from 'lucide-react';
import { Profile } from '../types/portfolio';

interface DiscoveryCallModalProps {
  profile: Profile;
  isOpen: boolean;
  onClose: () => void;
}

export const DiscoveryCallModal: React.FC<DiscoveryCallModalProps> = ({
  profile,
  isOpen,
  onClose,
}) => {
  const [selectedDay, setSelectedDay] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM PST');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [callTopic, setCallTopic] = useState('New Project Architecture & Scoping');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const days = [
    { label: 'Tomorrow', date: 'Oct 2' },
    { label: 'Thursday', date: 'Oct 3' },
    { label: 'Friday', date: 'Oct 4' },
    { label: 'Monday', date: 'Oct 7' },
  ];

  const slots = [
    '09:30 AM PST',
    '10:00 AM PST',
    '11:30 AM PST',
    '01:30 PM PST',
    '03:00 PM PST',
    '04:30 PM PST',
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
            <Video className="w-4 h-4 text-amber-400" />
            <span>15-Minute Architecture Discovery Call</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isBooked ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white">Discovery Call Confirmed!</h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              We're scheduled for <strong>{selectedDay} at {selectedSlot}</strong>. A Google Meet calendar invitation has been prepared for <strong>{clientEmail}</strong>.
            </p>

            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-xs text-neutral-400 space-y-1">
              <div>Topic: <span className="text-neutral-200">{callTopic}</span></div>
              <div>Host: <span className="text-neutral-200">{profile.fullName}</span> ({profile.email})</div>
            </div>

            <button
              onClick={() => {
                setIsBooked(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="p-6 space-y-5">
            <div>
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                1. Select Preferred Day
              </div>
              <div className="grid grid-cols-4 gap-2">
                {days.map((day) => (
                  <button
                    type="button"
                    key={day.label}
                    onClick={() => setSelectedDay(day.label)}
                    className={`p-2.5 rounded-xl border text-center transition-colors ${
                      selectedDay === day.label
                        ? 'bg-amber-500/10 border-amber-400 text-amber-300'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-semibold">{day.label}</div>
                    <div className="text-[10px] text-neutral-500 font-mono mt-0.5">{day.date}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                2. Select Available Slot
              </div>
              <div className="grid grid-cols-3 gap-2">
                {slots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-3 rounded-lg border text-xs font-mono transition-colors ${
                      selectedSlot === slot
                        ? 'bg-amber-500/10 border-amber-400 text-amber-300'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Alex Wright"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-lg text-neutral-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="alex@enterprise.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-lg text-neutral-200 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Primary Discussion Topic</label>
              <select
                value={callTopic}
                onChange={(e) => setCallTopic(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-lg text-neutral-200 focus:outline-none"
              >
                <option>New Project Architecture & Scoping</option>
                <option>Cloud Infrastructure & Cost Optimization</option>
                <option>Microservice & Kubernetes Consultation</option>
                <option>Senior Staff Engineering Advisory</option>
              </select>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-neutral-500 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>PST / Remote Video Meeting</span>
              </span>

              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
              >
                Confirm Discovery Call
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

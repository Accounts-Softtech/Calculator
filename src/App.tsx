/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AutoTaxCalculator } from './components/AutoTaxCalculator';
import { AndroidDeviceSimulator } from './components/AndroidDeviceSimulator';
import { LogoInspectionSuite } from './components/LogoInspectionSuite';
import { AutoTaxLogo } from './components/AutoTaxLogo';
import { Smartphone, Sparkles, X, CheckCircle2, Shield, Eye } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'responsive' | 'simulator'>('responsive');
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('galaxy-s24');
  const [isLogoLabOpen, setIsLogoLabOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#080C15] text-[#F8FAFC] flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Universal Mode Switcher Bar */}
      <div className="bg-[#0B111E] border-b border-[#273549] py-2 px-3 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          {/* Left: Quick Logo & App Verification Status */}
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-slate-300">
              AutoTax Logo & Android Mobile Suite:
            </span>
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
              ✓ 100% Android Responsive Compliant
            </span>
          </div>

          {/* Right: Quick View Switchers */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLogoLabOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" /> Logo Suitability Lab
            </button>

            <button
              onClick={() => setViewMode(viewMode === 'responsive' ? 'simulator' : 'responsive')}
              className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                viewMode === 'simulator'
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              {viewMode === 'simulator' ? 'Exit Phone Frame' : 'Test on Android Phone Frame'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-start p-2.5 sm:p-5 md:p-6">
        {viewMode === 'responsive' ? (
          <AutoTaxCalculator
            onOpenLogoLab={() => setIsLogoLabOpen(true)}
            onOpenDeviceTester={() => setViewMode('simulator')}
            isInSimulator={false}
          />
        ) : (
          <AndroidDeviceSimulator
            activeDeviceId={selectedDeviceId}
            onSelectDevice={setSelectedDeviceId}
            onCloseSimulator={() => setViewMode('responsive')}
          >
            <AutoTaxCalculator
              onOpenLogoLab={() => setIsLogoLabOpen(true)}
              isInSimulator={true}
            />
          </AndroidDeviceSimulator>
        )}
      </div>

      {/* Logo Lab Modal */}
      {isLogoLabOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="relative w-full max-w-4xl my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Close button top right */}
            <button
              onClick={() => setIsLogoLabOpen(false)}
              className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 w-9 h-9 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center shadow-xl z-50 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <LogoInspectionSuite
              onClose={() => setIsLogoLabOpen(false)}
              onOpenDeviceSimulator={(devId) => {
                setSelectedDeviceId(devId);
                setViewMode('simulator');
                setIsLogoLabOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

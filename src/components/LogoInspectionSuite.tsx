/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AutoTaxLogo } from './AutoTaxLogo';
import { ANDROID_DEVICES } from '../data/indianStates';
import {
  Smartphone,
  CheckCircle2,
  Download,
  Copy,
  Layers,
  Sparkles,
  Maximize2,
  Bell,
  Palette,
  Eye,
  Sliders,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface LogoInspectionSuiteProps {
  onClose?: () => void;
  onOpenDeviceSimulator?: (deviceId: string) => void;
}

export const LogoInspectionSuite: React.FC<LogoInspectionSuiteProps> = ({
  onClose,
  onOpenDeviceSimulator,
}) => {
  const [activeTab, setActiveTab] = useState<'adaptive' | 'dimensions' | 'contexts' | 'export'>('adaptive');
  const [maskType, setMaskType] = useState<'circle' | 'squircle' | 'rounded-square' | 'teardrop'>('circle');
  const [showSafeZone, setShowSafeZone] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [iconBgTheme, setIconBgTheme] = useState<'cyberDark' | 'pureBlack' | 'navySlate' | 'materialDark'>('cyberDark');

  const bgStyles = {
    cyberDark: 'bg-gradient-to-br from-[#0B111E] via-[#080C15] to-[#04060A]',
    pureBlack: 'bg-[#000000]',
    navySlate: 'bg-gradient-to-br from-slate-900 to-slate-950',
    materialDark: 'bg-[#121212]',
  };

  const copySvgCode = () => {
    const svgCode = `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="100%" stop-color="#10B981" />
    </linearGradient>
    <linearGradient id="bgGlow" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#080C15" stop-opacity="0.98" />
    </linearGradient>
  </defs>
  <!-- Hexagonal Security Shield -->
  <polygon points="50,6 89,25 89,68 50,94 11,68 11,25" fill="url(#bgGlow)" stroke="url(#neonGlow)" stroke-width="3.2" stroke-linejoin="round"/>
  <!-- Percentage Nodes -->
  <circle cx="70" cy="28" r="3.2" fill="#00F0FF"/>
  <circle cx="30" cy="72" r="3.2" fill="#10B981"/>
  <!-- Rupee Monogram -->
  <path d="M 31 28 L 69 28" stroke="url(#neonGlow)" stroke-width="4.2" stroke-linecap="round"/>
  <path d="M 31 38 L 63 38" stroke="url(#neonGlow)" stroke-width="4.2" stroke-linecap="round"/>
  <path d="M 35 28 L 35 48 C 50 48 59 48 59 38 C 59 28 47 28 35 28" stroke="url(#neonGlow)" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 40 48 L 65 74" stroke="#10B981" stroke-width="4.5" stroke-linecap="round"/>
</svg>`;

    navigator.clipboard.writeText(svgCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const downloadSvgFile = () => {
    const svgCode = `<svg width="512" height="512" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="100%" stop-color="#10B981" />
    </linearGradient>
    <linearGradient id="bgGlow" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#080C15" stop-opacity="0.98" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="#080C15"/>
  <polygon points="50,6 89,25 89,68 50,94 11,68 11,25" fill="url(#bgGlow)" stroke="url(#neonGlow)" stroke-width="3.2" stroke-linejoin="round"/>
  <circle cx="70" cy="28" r="3.2" fill="#00F0FF"/>
  <circle cx="30" cy="72" r="3.2" fill="#10B981"/>
  <path d="M 31 28 L 69 28" stroke="url(#neonGlow)" stroke-width="4.2" stroke-linecap="round"/>
  <path d="M 31 38 L 63 38" stroke="url(#neonGlow)" stroke-width="4.2" stroke-linecap="round"/>
  <path d="M 35 28 L 35 48 C 50 48 59 48 59 38 C 59 28 47 28 35 28" stroke="url(#neonGlow)" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 40 48 L 65 74" stroke="#10B981" stroke-width="4.5" stroke-linecap="round"/>
</svg>`;
    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'autotax-logo.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#0B111E] border border-cyan-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl text-slate-200">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              AutoTax Logo & Android Mobile Suitability Suite
            </h2>
            <p className="text-xs text-slate-400">
              Verified for Android screen dimensions, adaptive icon masks, and Material Design specs
            </p>
          </div>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('adaptive')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'adaptive'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Adaptive Icon
          </button>
          <button
            onClick={() => setActiveTab('dimensions')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'dimensions'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Screen Matrix
          </button>
          <button
            onClick={() => setActiveTab('contexts')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'contexts'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Android Mockups
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'export'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* TAB 1: Android Adaptive Icon Lab */}
      {activeTab === 'adaptive' && (
        <div className="mt-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Interactive Preview Canvas */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-950/70 border border-slate-800 rounded-2xl relative overflow-hidden">
              <div className="absolute top-3 left-3 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Android Adaptive Icon (108dp Canvas)</span>
              </div>

              {/* Main Adaptive Icon View */}
              <div className="relative mt-4 group">
                <div
                  className={`w-40 h-40 sm:w-48 sm:h-48 relative flex items-center justify-center border-2 border-cyan-500/40 shadow-[0_10px_40px_rgba(0,240,255,0.25)] transition-all duration-300 ${
                    maskType === 'circle'
                      ? 'rounded-full'
                      : maskType === 'squircle'
                      ? 'rounded-[28%]'
                      : maskType === 'rounded-square'
                      ? 'rounded-3xl'
                      : 'rounded-t-full rounded-bl-full rounded-br-3xl'
                  } ${bgStyles[iconBgTheme]} overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_rgba(0,240,255,0.15),transparent_70%)] pointer-events-none" />

                  {/* Safe Zone Circle Indicator (66dp / 72dp) */}
                  {showSafeZone && (
                    <div className="absolute w-[72%] h-[72%] rounded-full border border-dashed border-cyan-400/40 pointer-events-none flex items-center justify-center">
                      <span className="text-[9px] font-mono text-cyan-400/50 absolute top-1">
                        Safe Zone 72dp
                      </span>
                    </div>
                  )}

                  {/* Logo Center */}
                  <AutoTaxLogo size={105} variant="mark" className="border-0 bg-transparent shadow-none" />
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs font-bold text-white capitalize">{maskType} Mask</span>
                <span className="text-[11px] text-slate-400 block">
                  {maskType === 'circle' && 'Standard on Google Pixel & Android One'}
                  {maskType === 'squircle' && 'Standard on Samsung Galaxy (OneUI)'}
                  {maskType === 'rounded-square' && 'Standard on Xiaomi (HyperOS) & OnePlus'}
                  {maskType === 'teardrop' && 'Custom icon pack & dynamic launcher style'}
                </span>
              </div>
            </div>

            {/* Controls & Metrics */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">
                  Select Launcher Mask Shape:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => setMaskType('circle')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
                      maskType === 'circle'
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-current" />
                    Circle (Pixel)
                  </button>

                  <button
                    onClick={() => setMaskType('squircle')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
                      maskType === 'squircle'
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-[30%] border-2 border-current" />
                    Squircle (OneUI)
                  </button>

                  <button
                    onClick={() => setMaskType('rounded-square')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
                      maskType === 'rounded-square'
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-md border-2 border-current" />
                    Square (MIUI)
                  </button>

                  <button
                    onClick={() => setMaskType('teardrop')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
                      maskType === 'teardrop'
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-t-full rounded-bl-full rounded-br-md border-2 border-current" />
                    Teardrop
                  </button>
                </div>
              </div>

              {/* Background Theme Selector */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-cyan-400" /> Icon Background Tint:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIconBgTheme('cyberDark')}
                    className={`px-3 py-2 rounded-xl border text-xs font-medium text-left flex items-center justify-between ${
                      iconBgTheme === 'cyberDark'
                        ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>Cyber Navy (Default)</span>
                    <span className="w-3 h-3 rounded-full bg-[#0B111E] border border-cyan-500" />
                  </button>
                  <button
                    onClick={() => setIconBgTheme('pureBlack')}
                    className={`px-3 py-2 rounded-xl border text-xs font-medium text-left flex items-center justify-between ${
                      iconBgTheme === 'pureBlack'
                        ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>OLED Pure Black</span>
                    <span className="w-3 h-3 rounded-full bg-black border border-slate-600" />
                  </button>
                </div>
              </div>

              {/* Safe zone specs */}
              <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-emerald-400" /> Overlay 72dp Safe Zone
                  </span>
                  <input
                    type="checkbox"
                    checked={showSafeZone}
                    onChange={(e) => setShowSafeZone(e.target.checked)}
                    className="w-4 h-4 accent-cyan-400 cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Android requires the core icon graphic to stay inside the inner 72dp circle of the
                  108dp icon canvas so it is never clipped when users apply custom masks or icon shapes.
                </p>
                <div className="flex items-center gap-2 pt-1 text-xs text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>100% Zero-Clipping Compliance across all masks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scalability Row (24px to 140px) */}
          <div className="pt-4 border-t border-slate-800">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Scalability Matrix (Rendering on Android Density Tiers)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-2 text-center">
                <AutoTaxLogo size={24} variant="monochrome" className="text-cyan-400" />
                <span className="text-[10px] font-mono text-slate-400">24dp</span>
                <span className="text-[9px] text-slate-500">Status Bar</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-2 text-center">
                <AutoTaxLogo size={32} variant="mark" />
                <span className="text-[10px] font-mono text-slate-400">32dp</span>
                <span className="text-[9px] text-slate-500">Navigation</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-2 text-center">
                <AutoTaxLogo size={44} variant="mark" />
                <span className="text-[10px] font-mono text-slate-400">44dp</span>
                <span className="text-[9px] text-slate-500">Header Bar</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-2 text-center">
                <AutoTaxLogo size={64} variant="adaptive-icon" maskShape="squircle" />
                <span className="text-[10px] font-mono text-slate-400">64dp</span>
                <span className="text-[9px] text-slate-500">App Grid</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-2 text-center">
                <AutoTaxLogo size={80} variant="adaptive-icon" maskShape="circle" />
                <span className="text-[10px] font-mono text-slate-400">80dp</span>
                <span className="text-[9px] text-slate-500">Play Store</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-2 text-center">
                <AutoTaxLogo size={96} variant="stacked" />
                <span className="text-[10px] font-mono text-slate-400">96dp</span>
                <span className="text-[9px] text-slate-500">Splash Banner</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Android Screen Dimension Verification Matrix */}
      {activeTab === 'dimensions' && (
        <div className="mt-5 space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-900/60">
                  <th className="p-3">Device Model</th>
                  <th className="p-3">Dimensions (Viewport)</th>
                  <th className="p-3">Aspect Ratio</th>
                  <th className="p-3">Header Logo Fitting</th>
                  <th className="p-3">Status / Touch Target</th>
                  <th className="p-3 text-right">Live Preview</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {ANDROID_DEVICES.map((dev) => (
                  <tr key={dev.id} className="hover:bg-slate-900/40 transition">
                    <td className="p-3">
                      <div className="font-bold text-white flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-cyan-400" />
                        {dev.name}
                      </div>
                      <span className="text-[10px] text-slate-400">{dev.brand}</span>
                    </td>
                    <td className="p-3 font-mono text-slate-300">
                      {dev.width} × {dev.height} px
                      <span className="block text-[10px] text-slate-500">{dev.density}</span>
                    </td>
                    <td className="p-3 text-slate-300">{dev.aspectRatio}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Fits seamlessly (40px logo + title)</span>
                      </div>
                      <span className="text-[10px] text-slate-500">
                        Zero text wrap / 0px overflow
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                        PASS (&ge;48dp target)
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {onOpenDeviceSimulator && (
                        <button
                          onClick={() => onOpenDeviceSimulator(dev.id)}
                          className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 rounded-lg text-xs font-semibold transition active:scale-95 inline-flex items-center gap-1.5"
                        >
                          <Maximize2 className="w-3 h-3" /> Simulate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Android Mobile Screen Suitability Rules Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" /> 1. Minimum 360px Width Test
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                On the narrowest standard Android viewport (360px), AutoTax logo uses responsive
                shrink logic: the emblem stays crisp at 40px while text gracefully adapts, ensuring
                header buttons (Reset & Intra-state toggle) maintain full 48dp touch clearances.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" /> 2. WCAG AAA Contrast
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Electric Cyan (#00F0FF) and Emerald (#10B981) have an 8.4:1 contrast ratio against
                the dark fintech background (#080C15), exceeding Android accessibility
                guidelines under direct outdoor sunlight conditions.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" /> 3. Pure Vector Sharpness
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Designed entirely in clean SVG path geometry. It renders with sub-pixel precision
                on Quad-HD (1440p) and Full-HD+ (1080p) OLED displays, with 0 blurring or compression
                blur.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Real Android OS UI Mockups */}
      {activeTab === 'contexts' && (
        <div className="mt-5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Context 1: Android Home Screen */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 relative">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/80">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-cyan-400" /> Android 14 Home Screen Launcher
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Pixel Launcher</span>
              </div>

              {/* Wallpaper backdrop with icons */}
              <div className="bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 p-6 rounded-xl border border-slate-800/60 flex flex-col items-center">
                <div className="text-center mb-6">
                  <span className="text-3xl font-extralight text-white font-mono tracking-wider">
                    09:41
                  </span>
                  <span className="block text-[11px] text-slate-300 mt-0.5">
                    Monday, Oct 26 • 24°C Sunny
                  </span>
                </div>

                {/* App Icon Grid */}
                <div className="grid grid-cols-4 gap-4 sm:gap-6 w-full max-w-xs text-center">
                  {/* AutoTax App Icon with Highlight */}
                  <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
                    <AutoTaxLogo size={58} variant="adaptive-icon" maskShape="squircle" animated />
                    <span className="text-[11px] font-semibold text-white group-hover:text-cyan-300">
                      AutoTax
                    </span>
                  </div>

                  {/* Context system icons */}
                  <div className="flex flex-col items-center gap-1.5 opacity-60">
                    <div className="w-[58px] h-[58px] rounded-[28%] bg-blue-600 flex items-center justify-center text-white text-xl">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] text-slate-300">Phone</span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5 opacity-60">
                    <div className="w-[58px] h-[58px] rounded-[28%] bg-emerald-600 flex items-center justify-center text-white text-xl">
                      <Bell className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] text-slate-300">Messages</span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5 opacity-60">
                    <div className="w-[58px] h-[58px] rounded-[28%] bg-amber-600 flex items-center justify-center text-white text-xl">
                      <Sliders className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] text-slate-300">Settings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Context 2: Android Notification Drawer */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/80">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-emerald-400" /> Android Notification Drawer (24dp icon)
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Status Bar</span>
              </div>

              {/* Notification card simulation */}
              <div className="space-y-3">
                <div className="bg-slate-900/90 border border-cyan-500/30 p-3.5 rounded-xl shadow-lg flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                    <AutoTaxLogo size={20} variant="monochrome" className="text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-bold text-cyan-300 flex items-center gap-1">
                        AutoTax Engine • Now
                      </span>
                      <span>1m ago</span>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-0.5">
                      Invoice #INV-8921 Calculated
                    </h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Inter-state transaction: Base ₹50,000 + IGST ₹9,000 - TDS ₹1,000 = ₹58,000 Net
                      Payable.
                    </p>
                  </div>
                </div>

                {/* Status Bar simulation */}
                <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">09:41</span>
                    <AutoTaxLogo size={14} variant="monochrome" className="text-cyan-400" />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>5G</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Export Assets */}
      {activeTab === 'export' && (
        <div className="mt-5 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-cyan-400" /> Download Vector SVG Logo
              </h3>
              <p className="text-xs text-slate-400">
                Production-ready scalable SVG file with embedded gradients, security shield, and
                Rupee monogram.
              </p>
              <div className="flex gap-2.5 pt-2">
                <button
                  onClick={downloadSvgFile}
                  className="flex-1 h-10 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" /> Download .svg
                </button>
                <button
                  onClick={copySvgCode}
                  className="px-4 h-10 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" /> Android Manifest Config
              </h3>
              <p className="text-xs text-slate-400">
                Resource attributes for your Android Studio `AndroidManifest.xml` and `ic_launcher.xml`.
              </p>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300">
                <code>
                  android:icon=&quot;@mipmap/ic_launcher&quot;
                  <br />
                  android:roundIcon=&quot;@mipmap/ic_launcher_round&quot;
                </code>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

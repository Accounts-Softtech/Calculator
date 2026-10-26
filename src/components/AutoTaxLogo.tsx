/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface AutoTaxLogoProps {
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'mark' | 'full' | 'stacked' | 'adaptive-icon' | 'monochrome';
  animated?: boolean;
  className?: string;
  maskShape?: 'circle' | 'squircle' | 'rounded-square' | 'teardrop' | 'none';
  onClick?: () => void;
}

const sizeMap = {
  xs: 24,
  sm: 32,
  md: 44,
  lg: 64,
  xl: 96,
  '2xl': 140,
};

export const AutoTaxLogo: React.FC<AutoTaxLogoProps> = ({
  size = 'md',
  variant = 'full',
  animated = false,
  className = '',
  maskShape = 'none',
  onClick,
}) => {
  const pixelSize = typeof size === 'number' ? size : sizeMap[size] || 44;

  // Modern Fintech / Automated Tax Emblem: Geometric Shield, Rupee Monogram, Percentage & Computation Matrix
  const renderEmblem = (s: number, mono = false) => {
    const idSuffix = React.useId().replace(/:/g, '');
    const cyanGrad = `cyanGrad_${idSuffix}`;
    const greenGrad = `greenGrad_${idSuffix}`;
    const glowFilter = `glow_${idSuffix}`;

    if (mono) {
      // Monochrome for Android status bar / notifications (24dp)
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          {/* Hex Shield */}
          <polygon
            points="50,7 89,26 89,68 50,93 11,68 11,26"
            stroke="currentColor"
            strokeWidth="5"
            fill="none"
            strokeLinejoin="round"
          />
          {/* Rupee Monogram */}
          <path
            d="M 33 26 L 67 26 M 33 36 L 62 36 M 33 26 L 33 46 C 45 46 56 46 56 36 C 56 26 42 26 33 26 M 37 46 L 65 74"
            stroke="currentColor"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Calculation Percentage Dots */}
          <circle cx="68" cy="27" r="3.5" fill="currentColor" />
          <circle cx="32" cy="73" r="3.5" fill="currentColor" />
        </svg>
      );
    }

    return (
      <svg
        width={s}
        height={s}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${animated ? 'animate-pulse' : ''}`}
      >
        <defs>
          <linearGradient id={cyanGrad} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          <linearGradient id={greenGrad} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>

          <linearGradient id={`goldGrad_${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          <linearGradient id={`bgShield_${idSuffix}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#080C15" stopOpacity="0.98" />
          </linearGradient>

          <filter id={glowFilter} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagonal Security & Compliance Shield */}
        <polygon
          points="50,6 89,25 89,68 50,94 11,68 11,25"
          fill={`url(#bgShield_${idSuffix})`}
          stroke={`url(#${cyanGrad})`}
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Inner Geometric Grid Lines (Automated Computation Mesh) */}
        <polygon
          points="50,14 81,29 81,64 50,86 19,64 19,29"
          stroke={`url(#${greenGrad})`}
          strokeWidth="1.2"
          strokeDasharray="3 3"
          strokeLinejoin="round"
          opacity="0.55"
        />

        {/* Dynamic Calculation Percentage Nodes */}
        {/* Top-Right Percent Node */}
        <circle cx="70" cy="28" r="3.2" fill="#00F0FF" opacity="0.9" filter={`url(#${glowFilter})`} />
        {/* Bottom-Left Percent Node */}
        <circle cx="30" cy="72" r="3.2" fill="#10B981" opacity="0.9" filter={`url(#${glowFilter})`} />
        {/* Modern Percentage Division Slash */}
        <line
          x1="66"
          y1="34"
          x2="34"
          y2="66"
          stroke="#00F0FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Central Automated Indian Rupee (₹) Monogram with Cyber Chamfers */}
        <g filter={`url(#${glowFilter})`}>
          {/* Top Primary Horizontal Bar */}
          <path
            d="M 31 28 L 69 28"
            stroke={`url(#${cyanGrad})`}
            strokeWidth="4.2"
            strokeLinecap="round"
          />

          {/* Secondary Sub-Horizontal Bar */}
          <path
            d="M 31 38 L 63 38"
            stroke={`url(#${cyanGrad})`}
            strokeWidth="4.2"
            strokeLinecap="round"
          />

          {/* Vertical Stem & Semicircular Upper Loop */}
          <path
            d="M 35 28 L 35 48 C 50 48 59 48 59 38 C 59 28 47 28 35 28"
            stroke={`url(#${cyanGrad})`}
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Downward Angled Speed Leg (Automated Vector) */}
          <path
            d="M 40 48 L 65 74"
            stroke={`url(#${greenGrad})`}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </g>

        {/* Apex Security Core Accent (Lower shield lock) */}
        <polygon points="50,83 54,87 50,90 46,87" fill="#10B981" opacity="0.9" />

        {/* Precision Speed Accents on Left & Right Flanks */}
        <line x1="16" y1="46" x2="22" y2="46" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <line x1="78" y1="46" x2="84" y2="46" stroke="#10B981" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      </svg>
    );
  };

  const getMaskClass = () => {
    switch (maskShape) {
      case 'circle':
        return 'rounded-full';
      case 'squircle':
        return 'rounded-[28%]';
      case 'rounded-square':
        return 'rounded-2xl';
      case 'teardrop':
        return 'rounded-t-full rounded-bl-full rounded-br-2xl';
      default:
        return 'rounded-2xl';
    }
  };

  if (variant === 'adaptive-icon') {
    return (
      <div
        onClick={onClick}
        className={`relative flex items-center justify-center bg-gradient-to-br from-slate-900 via-[#0B111E] to-[#04060A] border border-cyan-500/30 shadow-[0_8px_30px_rgba(0,240,255,0.15)] overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 ${getMaskClass()} ${className}`}
        style={{ width: pixelSize, height: pixelSize }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 flex items-center justify-center">
          {renderEmblem(pixelSize * 0.72)}
        </div>
      </div>
    );
  }

  if (variant === 'monochrome') {
    return (
      <div onClick={onClick} className={`inline-flex items-center justify-center ${className}`}>
        {renderEmblem(pixelSize, true)}
      </div>
    );
  }

  if (variant === 'mark') {
    return (
      <div
        onClick={onClick}
        className={`relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-[#0F172A] border border-cyan-500/30 p-1.5 shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-transform hover:scale-105 active:scale-95 cursor-pointer ${className}`}
        style={{ width: pixelSize, height: pixelSize }}
      >
        {renderEmblem(pixelSize * 0.82)}
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex flex-col items-center text-center gap-2 select-none ${className}`}
      >
        <div
          className="relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-[#0F172A] border border-cyan-500/30 p-2.5 shadow-[0_0_25px_rgba(0,240,255,0.25)] transition-transform hover:scale-105"
          style={{ width: pixelSize, height: pixelSize }}
        >
          {renderEmblem(pixelSize * 0.8)}
        </div>
        <div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-black tracking-tight text-white text-xl">AUTO</span>
            <span className="font-black tracking-tight bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent text-xl">
              TAX
            </span>
          </div>
          <p className="text-[10px] tracking-wider font-semibold text-slate-400 uppercase mt-0.5">
            Automated GST & TDS Engine
          </p>
        </div>
      </div>
    );
  }

  // Default: Full Horizontal
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 sm:gap-3 select-none transition-all ${className}`}
    >
      <div
        className="relative shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-[#0F172A] border border-cyan-500/30 shadow-[0_0_18px_rgba(0,240,255,0.2)] overflow-hidden transition-transform duration-200 group-hover:scale-105"
        style={{ width: pixelSize, height: pixelSize }}
      >
        {renderEmblem(pixelSize * 0.82)}
      </div>

      <div className="leading-tight">
        <div className="flex items-center gap-1.5">
          <span className="text-base sm:text-xl font-extrabold tracking-tight text-white">
            AUTO
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              TAX
            </span>
          </span>
          <span className="hidden xs:inline-flex text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 tracking-wider">
            PRO
          </span>
        </div>
        <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-tight">
          Automated GST & TDS
        </p>
      </div>
    </div>
  );
};

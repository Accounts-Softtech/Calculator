/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ANDROID_DEVICES, AndroidDeviceSpec } from '../data/indianStates';
import { AutoTaxLogo } from './AutoTaxLogo';
import {
  Smartphone,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Wifi,
  BatteryCharging,
  Signal,
  X,
  Info,
  CheckCircle2,
} from 'lucide-react';

interface AndroidDeviceSimulatorProps {
  children: React.ReactNode;
  activeDeviceId: string;
  onSelectDevice: (id: string) => void;
  onCloseSimulator: () => void;
}

export const AndroidDeviceSimulator: React.FC<AndroidDeviceSimulatorProps> = ({
  children,
  activeDeviceId,
  onSelectDevice,
  onCloseSimulator,
}) => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(0.85);

  const device =
    ANDROID_DEVICES.find((d) => d.id === activeDeviceId) || ANDROID_DEVICES[0];

  const currentWidth = isLandscape ? device.height : device.width;
  const currentHeight = isLandscape ? device.width : device.height;

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen w-full bg-[#04060A] p-2 sm:p-4">
      {/* Top Device Simulator Controller Bar */}
      <div className="w-full max-w-4xl bg-slate-900/95 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-3 sm:px-5 mb-4 shadow-2xl flex flex-wrap items-center justify-between gap-3 sticky top-2 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Android Screen Dimension Tester</span>
            <span className="text-[10px] text-cyan-400 font-mono">
              {device.name} ({currentWidth}px × {currentHeight}px • {device.aspectRatio})
            </span>
          </div>
        </div>

        {/* Device Select Dropdown */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={activeDeviceId}
            onChange={(e) => onSelectDevice(e.target.value)}
            className="h-9 bg-slate-800 border border-slate-700 rounded-xl px-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            {ANDROID_DEVICES.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.width}×{d.height})
              </option>
            ))}
          </select>

          {/* Rotate Button */}
          <button
            onClick={() => setIsLandscape(!isLandscape)}
            title="Rotate Device"
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 flex items-center justify-center transition active:scale-95"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* Zoom controls */}
          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-1">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.65, z - 0.1))}
              className="w-7 h-8 text-slate-400 hover:text-white flex items-center justify-center"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-slate-300 px-1">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.0, z + 0.1))}
              className="w-7 h-8 text-slate-400 hover:text-white flex items-center justify-center"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Close / Return to full app */}
          <button
            onClick={onCloseSimulator}
            className="px-3 h-9 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
          >
            <Maximize className="w-3.5 h-3.5" /> Exit Frame
          </button>
        </div>
      </div>

      {/* Device Specifications Info Pill */}
      <div className="flex items-center gap-2 mb-3 px-3 py-1 bg-slate-900/60 rounded-full border border-slate-800 text-[11px] text-slate-400">
        <Info className="w-3.5 h-3.5 text-cyan-400" />
        <span>Testing AutoTax Logo header scaling & touch targets at {device.width}px CSS width ({device.density})</span>
      </div>

      {/* Simulated Android Phone Frame */}
      <div
        className="transition-transform duration-300 origin-top flex justify-center pb-12"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <div
          className="relative bg-[#080C15] rounded-[48px] border-[10px] border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(0,240,255,0.15)] overflow-hidden flex flex-col"
          style={{
            width: currentWidth,
            height: currentHeight,
          }}
        >
          {/* Top Notch / Punch Hole Camera & Speaker */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-none">
            <div className="w-4 h-4 rounded-full bg-black border border-slate-800 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
            </div>
          </div>

          {/* Android Status Bar */}
          <div className="w-full h-8 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between text-[11px] font-medium text-slate-300 z-40 select-none shrink-0 border-b border-slate-900">
            {/* Clock & Notification icons */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">09:41</span>
              {/* Mini AutoTax notification icon in Android status bar */}
              <div className="flex items-center text-cyan-400" title="AutoTax Engine Active">
                <AutoTaxLogo size={12} variant="monochrome" className="text-cyan-400" />
              </div>
            </div>

            {/* Status Icons: Wi-Fi, Signal, Battery */}
            <div className="flex items-center gap-2 text-slate-300">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-1">
                <span className="text-[10px]">100%</span>
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Scrollable Device Content Area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden phone-scroll bg-[#080C15] p-2.5">
            {children}
          </div>

          {/* Android Gesture Navigation Pill Bar */}
          <div className="w-full h-5 bg-slate-950 flex items-center justify-center shrink-0 z-40 select-none">
            <div className="w-32 h-1 bg-slate-500 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

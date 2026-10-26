/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AutoTaxLogo } from './AutoTaxLogo';
import {
  INDIAN_STATES,
  STANDARD_GST_SLABS,
  TDS_SLABS,
} from '../data/indianStates';
import {
  RotateCcw,
  ArrowLeftRight,
  Sliders,
  FileText,
  Printer,
  X,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Layers,
  Building2,
  Percent,
} from 'lucide-react';

interface AutoTaxCalculatorProps {
  onOpenLogoLab?: () => void;
  onOpenDeviceTester?: () => void;
  isInSimulator?: boolean;
}

export const AutoTaxCalculator: React.FC<AutoTaxCalculatorProps> = ({
  onOpenLogoLab,
  onOpenDeviceTester,
  isInSimulator = false,
}) => {
  const [sellerState, setSellerState] = useState<string>('Maharashtra');
  const [buyerState, setBuyerState] = useState<string>('Delhi');
  const [taxableAmount, setTaxableAmount] = useState<number>(50000);
  const [igstRate, setIgstRate] = useState<number>(18);
  const [cgstRate, setCgstRate] = useState<number>(9);
  const [sgstRate, setSgstRate] = useState<number>(9);
  const [tdsRate, setTdsRate] = useState<number>(2.0);
  const [isReceiptOpen, setIsReceiptOpen] = useState<boolean>(false);

  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        // Ignore
      }
    }
  };

  const isSameState = sellerState === buyerState && Boolean(sellerState);

  // Sync CGST / SGST when IGST changes
  const handleIgstChange = (val: number) => {
    setIgstRate(val);
    setCgstRate(Number((val / 2).toFixed(1)));
    setSgstRate(Number((val / 2).toFixed(1)));
  };

  const handleCgstSgstChange = (cgst: number, sgst: number) => {
    setCgstRate(cgst);
    setSgstRate(sgst);
    setIgstRate(Number((cgst + sgst).toFixed(1)));
  };

  const setTaxSlab = (rate: number) => {
    triggerHaptic();
    handleIgstChange(rate);
  };

  const swapStates = () => {
    triggerHaptic();
    const temp = sellerState;
    setSellerState(buyerState);
    setBuyerState(temp);
  };

  const setSameStateQuick = () => {
    triggerHaptic();
    if (sellerState) {
      setBuyerState(sellerState);
    } else {
      setSellerState('Maharashtra');
      setBuyerState('Maharashtra');
    }
  };

  const resetAll = () => {
    triggerHaptic();
    setSellerState('Maharashtra');
    setBuyerState('Delhi');
    setTaxableAmount(50000);
    handleIgstChange(18);
    setTdsRate(2.0);
  };

  // Calculations
  const base = Math.max(0, taxableAmount || 0);

  let taxAmount = 0;
  let igstAmt = 0;
  let cgstAmt = 0;
  let sgstAmt = 0;

  if (isSameState) {
    cgstAmt = (base * cgstRate) / 100;
    sgstAmt = (base * sgstRate) / 100;
    taxAmount = cgstAmt + sgstAmt;
  } else {
    igstAmt = (base * igstRate) / 100;
    taxAmount = igstAmt;
  }

  const totalInvoice = base + taxAmount;
  const tdsAmount = (base * tdsRate) / 100;
  const netPayable = Math.max(0, totalInvoice - tdsAmount);

  const formatCurrency = (num: number) => {
    return '₹' + num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const sellerStateObj = INDIAN_STATES.find((s) => s.name === sellerState);
  const buyerStateObj = INDIAN_STATES.find((s) => s.name === buyerState);

  return (
    <div className="w-full flex flex-col justify-between max-w-6xl mx-auto space-y-4 sm:space-y-6">
      {/* Top Navigation & App Header with AutoTax Logo */}
      <header className="w-full bg-[#111827]/90 backdrop-blur-md border border-[#273549] rounded-2xl p-3 sm:p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 sticky top-1 z-30">
        {/* Brand Logo & Title */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-2">
          <div className="cursor-pointer group" onClick={onOpenLogoLab}>
            <AutoTaxLogo size="md" variant="full" />
          </div>

          {/* Quick Buttons for Mobile Header */}
          <div className="flex items-center gap-1.5 sm:hidden">
            {onOpenLogoLab && (
              <button
                onClick={onOpenLogoLab}
                title="Logo Suitability Lab"
                className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-center active:scale-95"
              >
                <Layers className="w-4 h-4" />
              </button>
            )}

            {!isInSimulator && onOpenDeviceTester && (
              <button
                onClick={onOpenDeviceTester}
                title="Android Device Simulator"
                className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center active:scale-95"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={resetAll}
              title="Reset"
              className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop / Tablet Controls & Regime Badge */}
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          {/* Regime Badge */}
          <div className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold flex items-center justify-center sm:justify-start gap-2 shadow-inner">
            <span
              className={`w-2 h-2 rounded-full ${
                isSameState ? 'bg-emerald-400' : 'bg-cyan-400'
              } animate-pulse`}
            />
            <span className="text-slate-300 font-mono text-[11px] sm:text-xs">
              {isSameState ? 'Intra-State (CGST+SGST)' : 'Inter-State (IGST)'}
            </span>
          </div>

          {/* Logo Lab Modal Button */}
          {onOpenLogoLab && (
            <button
              onClick={onOpenLogoLab}
              className="hidden sm:inline-flex px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold items-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" /> Logo Lab
            </button>
          )}

          {/* Android Device Simulator Button */}
          {!isInSimulator && onOpenDeviceTester && (
            <button
              onClick={onOpenDeviceTester}
              className="hidden sm:inline-flex px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold items-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> Test on Phone
            </button>
          )}

          <button
            onClick={resetAll}
            className="hidden sm:inline-flex px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold items-center gap-1.5 transition active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </header>

      {/* Main Grid Section */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 flex-grow">
        {/* Left Side: Parameters Form (7 Cols) */}
        <section className="lg:col-span-7 bg-[#111827] border border-[#273549] rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
          {/* Header of Section */}
          <div className="flex items-center justify-between pb-3 border-b border-[#273549]">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" /> Transaction & GST Parameters
            </h2>
            <button
              type="button"
              onClick={setSameStateQuick}
              className="text-xs bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded-lg transition active:scale-95 font-medium cursor-pointer"
            >
              Same State (Intra)
            </button>
          </div>

          {/* State Selection Grid with 1-Tap Swap */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            {/* Seller State */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Seller Origin State
                </span>
                {sellerStateObj && (
                  <span className="text-[10px] text-cyan-400 font-mono">
                    Code: {sellerStateObj.code}
                  </span>
                )}
              </label>
              <select
                value={sellerState}
                onChange={(e) => setSellerState(e.target.value)}
                className="w-full h-11 bg-slate-900 border border-[#273549] rounded-xl px-3 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition cursor-pointer"
              >
                {INDIAN_STATES.map((state) => (
                  <option key={state.name} value={state.name}>
                    {state.name} {state.isUT ? '(UT)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-2 sm:my-0 sm:absolute sm:left-1/2 sm:top-7 sm:-translate-x-1/2 z-10">
              <button
                type="button"
                onClick={swapStates}
                title="Swap States"
                className="w-9 h-9 rounded-full bg-slate-800 border border-[#273549] text-cyan-400 shadow-lg hover:bg-slate-700 active:rotate-180 transition-transform duration-300 flex items-center justify-center cursor-pointer"
              >
                <ArrowLeftRight className="w-4 h-4 rotate-90 sm:rotate-0" />
              </button>
            </div>

            {/* Buyer State */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" /> Buyer Destination State
                </span>
                {buyerStateObj && (
                  <span className="text-[10px] text-emerald-400 font-mono">
                    Code: {buyerStateObj.code}
                  </span>
                )}
              </label>
              <select
                value={buyerState}
                onChange={(e) => setBuyerState(e.target.value)}
                className="w-full h-11 bg-slate-900 border border-[#273549] rounded-xl px-3 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition cursor-pointer"
              >
                {INDIAN_STATES.map((state) => (
                  <option key={state.name} value={state.name}>
                    {state.name} {state.isUT ? '(UT)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Taxable Amount Input with Quick Amount Chips */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-300">
                Taxable Base Amount (Invoice Value Before Taxes)
              </label>
              <span className="text-[11px] text-emerald-400 font-mono">
                {formatCurrency(base)}
              </span>
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg pointer-events-none">
                ₹
              </span>
              <input
                type="number"
                inputMode="decimal"
                value={taxableAmount || ''}
                onChange={(e) => setTaxableAmount(parseFloat(e.target.value) || 0)}
                placeholder="50000"
                className="w-full h-12 bg-slate-900 border border-[#273549] rounded-xl pl-9 pr-3 text-white text-lg sm:text-xl font-bold tracking-wide focus:outline-none focus:border-emerald-400 transition shadow-inner"
              />
            </div>

            {/* Quick Chips */}
            <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1 text-xs">
              {[10000, 50000, 100000, 250000, 500000, 1000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    triggerHaptic();
                    setTaxableAmount(amt);
                  }}
                  className={`px-2.5 py-1 rounded-lg border font-mono transition text-[11px] shrink-0 cursor-pointer ${
                    taxableAmount === amt
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  ₹{(amt >= 100000 ? `${amt / 100000} Lakh` : `${amt / 1000}k`)}
                </button>
              ))}
            </div>
          </div>

          {/* Tax Rates Configuration Grid */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Tax Rates Configuration (%):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* IGST */}
              <div
                className={`bg-slate-900/90 border rounded-xl p-2.5 transition ${
                  !isSameState ? 'border-cyan-500/50 shadow-sm shadow-cyan-500/20' : 'border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
                  <span>IGST (%)</span>
                  {!isSameState && <span className="text-[9px] text-cyan-400">ACTIVE</span>}
                </div>
                <input
                  type="number"
                  inputMode="decimal"
                  value={igstRate}
                  onChange={(e) => handleIgstChange(parseFloat(e.target.value) || 0)}
                  disabled={isSameState}
                  className="w-full h-9 bg-slate-800 border border-slate-700 rounded-lg text-white font-bold text-center text-sm focus:outline-none focus:border-cyan-400 disabled:opacity-50"
                />
              </div>

              {/* CGST */}
              <div
                className={`bg-slate-900/90 border rounded-xl p-2.5 transition ${
                  isSameState ? 'border-emerald-500/50 shadow-sm shadow-emerald-500/20' : 'border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
                  <span>CGST (%)</span>
                  {isSameState && <span className="text-[9px] text-emerald-400">ACTIVE</span>}
                </div>
                <input
                  type="number"
                  inputMode="decimal"
                  value={cgstRate}
                  onChange={(e) => {
                    const c = parseFloat(e.target.value) || 0;
                    handleCgstSgstChange(c, sgstRate);
                  }}
                  disabled={!isSameState}
                  className="w-full h-9 bg-slate-800 border border-slate-700 rounded-lg text-white font-bold text-center text-sm focus:outline-none focus:border-emerald-400 disabled:opacity-50"
                />
              </div>

              {/* SGST */}
              <div
                className={`bg-slate-900/90 border rounded-xl p-2.5 transition ${
                  isSameState ? 'border-emerald-500/50 shadow-sm shadow-emerald-500/20' : 'border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
                  <span>SGST (%)</span>
                  {isSameState && <span className="text-[9px] text-emerald-400">ACTIVE</span>}
                </div>
                <input
                  type="number"
                  inputMode="decimal"
                  value={sgstRate}
                  onChange={(e) => {
                    const s = parseFloat(e.target.value) || 0;
                    handleCgstSgstChange(cgstRate, s);
                  }}
                  disabled={!isSameState}
                  className="w-full h-9 bg-slate-800 border border-slate-700 rounded-lg text-white font-bold text-center text-sm focus:outline-none focus:border-emerald-400 disabled:opacity-50"
                />
              </div>

              {/* TDS */}
              <div className="bg-slate-900/90 border border-[#273549] rounded-xl p-2.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-amber-400 mb-1">
                  <span>TDS (%)</span>
                  <span className="text-[9px] text-amber-400">194C/H/J</span>
                </div>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  value={tdsRate}
                  onChange={(e) => setTdsRate(parseFloat(e.target.value) || 0)}
                  className="w-full h-9 bg-slate-800 border border-slate-700 rounded-lg text-white font-bold text-center text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Standard GST Slabs Selector */}
          <div>
            <span className="block text-[11px] font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Standard Indian GST Slabs:</span>
              <span className="text-[10px] text-cyan-400 font-mono font-bold">Selected: {igstRate}%</span>
            </span>
            <div className="grid grid-cols-4 gap-2">
              {STANDARD_GST_SLABS.map((slab) => (
                <button
                  key={slab.rate}
                  type="button"
                  title={slab.desc}
                  onClick={() => setTaxSlab(slab.rate)}
                  className={`h-9 border rounded-xl text-xs font-bold transition-all duration-150 active:scale-95 cursor-pointer flex items-center justify-center ${
                    igstRate === slab.rate
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.25)] ring-1 ring-cyan-400/40'
                      : 'bg-slate-900 border-[#273549] text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800/80'
                  }`}
                >
                  {slab.label}
                </button>
              ))}
            </div>
          </div>

          {/* TDS Slabs Quick Selector */}
          <div className="pt-2 border-t border-[#273549]/80">
            <span className="block text-[11px] font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>TDS Quick rates (Section 194C, 194H, 194J, 94I, 92B):</span>
              <span className="text-[10px] text-amber-400 font-mono font-bold">Selected: {tdsRate}%</span>
            </span>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {TDS_SLABS.map((slab) => (
                <button
                  key={slab.rate}
                  type="button"
                  title={slab.desc}
                  onClick={() => {
                    triggerHaptic();
                    setTdsRate(slab.rate);
                  }}
                  className={`h-9 border rounded-xl text-xs font-bold transition-all duration-150 active:scale-95 cursor-pointer flex flex-col items-center justify-center ${
                    tdsRate === slab.rate
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/40'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800/80'
                  }`}
                >
                  <span>{slab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Right Side: Invoice Summary & Net Payable (5 Cols) */}
        <section className="lg:col-span-5 bg-[#111827] border border-[#273549] rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#273549] mb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" /> Invoice Breakdown
              </h2>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-lg border font-bold ${
                  isSameState
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                }`}
              >
                {isSameState ? 'CGST + SGST' : 'IGST Applied'}
              </span>
            </div>

            {/* Line Items */}
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-2 px-3 bg-slate-900/80 rounded-xl border border-[#273549]">
                <span className="text-slate-400">Taxable Base</span>
                <span className="font-bold text-white font-mono">{formatCurrency(base)}</span>
              </div>

              {/* Dynamic IGST row */}
              {!isSameState && (
                <div className="flex justify-between items-center py-2 px-3 bg-slate-900/80 rounded-xl border border-[#273549]">
                  <span className="text-slate-400">IGST ({igstRate}%)</span>
                  <span className="font-bold text-cyan-300 font-mono">{formatCurrency(igstAmt)}</span>
                </div>
              )}

              {/* Intra State CGST + SGST rows */}
              {isSameState && (
                <>
                  <div className="flex justify-between items-center py-2 px-3 bg-slate-900/80 rounded-xl border border-[#273549]">
                    <span className="text-slate-400">CGST ({cgstRate}%)</span>
                    <span className="font-bold text-emerald-300 font-mono">
                      {formatCurrency(cgstAmt)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 bg-slate-900/80 rounded-xl border border-[#273549]">
                    <span className="text-slate-400">SGST ({sgstRate}%)</span>
                    <span className="font-bold text-emerald-300 font-mono">
                      {formatCurrency(sgstAmt)}
                    </span>
                  </div>
                </>
              )}

              {/* Total Invoice */}
              <div className="flex justify-between items-center py-2 px-3 bg-slate-900 rounded-xl border border-slate-700/80 font-semibold">
                <span className="text-slate-200">Total Invoice (GST Inc.)</span>
                <span className="font-extrabold text-white font-mono text-sm sm:text-base">
                  {formatCurrency(totalInvoice)}
                </span>
              </div>

              {/* TDS Deduction */}
              <div className="flex justify-between items-center py-2 px-3 bg-slate-900/80 rounded-xl border border-[#273549]">
                <span className="text-amber-400 font-medium">Less: TDS ({tdsRate}%)</span>
                <span className="font-bold text-amber-400 font-mono">
                  - {formatCurrency(tdsAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Net Payable Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-[#080C15] border border-emerald-500/40 rounded-2xl p-4 sm:p-5 shadow-[0_0_25px_rgba(16,185,129,0.2)] relative overflow-hidden">
            <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Net Payable / Receivable Amount
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-4 font-mono">
              {formatCurrency(netPayable)}
            </div>

            <button
              type="button"
              onClick={() => {
                triggerHaptic();
                setIsReceiptOpen(true);
              }}
              className="w-full h-11 sm:h-12 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
            >
              <Printer className="w-4 h-4" /> View & Print Receipt
            </button>
          </div>
        </section>
      </main>

      {/* Mobile Sticky Dock Bar (Only on compact screens) */}
      <aside className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111827]/95 backdrop-blur-xl border-t border-[#273549] p-2.5 px-4 shadow-[0_-5px_25px_rgba(0,0,0,0.6)] flex items-center justify-between gap-3">
        <div className="leading-tight">
          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wide block">
            Net Payable
          </span>
          <span className="text-base sm:text-lg font-black text-white font-mono">
            {formatCurrency(netPayable)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {onOpenLogoLab && (
            <button
              onClick={onOpenLogoLab}
              className="h-9 px-2.5 bg-slate-800 text-cyan-300 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-700"
            >
              <Layers className="w-3.5 h-3.5" /> Logo
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              triggerHaptic();
              setIsReceiptOpen(true);
            }}
            className="h-9 px-3.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 active:scale-95 shadow-md shadow-emerald-500/20"
          >
            <Printer className="w-3.5 h-3.5" /> Receipt
          </button>
        </div>
      </aside>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-slate-500 pt-4 pb-16 lg:pb-4 border-t border-[#273549] flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AutoTaxLogo size={20} variant="mark" />
          <span className="font-bold text-slate-400">AUTOTAX PRO</span>
          <span>• Automated GST & TDS Engine</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span>GST Rule 2026 Ready</span>
          <span>•</span>
          <span>Android Mobile Responsive</span>
        </div>
      </footer>

      {/* Tax Breakdown Receipt Modal */}
      {isReceiptOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#111827] border border-[#273549] rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#273549] mb-4">
              <div className="flex items-center gap-2">
                <AutoTaxLogo size={32} variant="mark" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  GST & TDS Computation Receipt
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsReceiptOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm space-y-2.5 mb-5 font-sans">
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                <div>
                  <span className="block text-[10px] uppercase">Seller (Origin):</span>
                  <strong className="text-white text-xs">{sellerState}</strong>
                  <span className="block text-cyan-400 font-mono">Code {sellerStateObj?.code}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase">Buyer (Destination):</span>
                  <strong className="text-white text-xs">{buyerState}</strong>
                  <span className="block text-emerald-400 font-mono">Code {buyerStateObj?.code}</span>
                </div>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-400">Tax Regime:</span>
                <span className="font-bold text-cyan-400">
                  {isSameState ? 'Intra-State (CGST + SGST)' : 'Inter-State (IGST)'}
                </span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-400">Taxable Base:</span>
                <span className="font-bold text-white font-mono">{formatCurrency(base)}</span>
              </div>

              {!isSameState && (
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">IGST ({igstRate}%):</span>
                  <span className="font-bold text-cyan-400 font-mono">{formatCurrency(igstAmt)}</span>
                </div>
              )}

              {isSameState && (
                <>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">CGST ({cgstRate}%):</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      {formatCurrency(cgstAmt)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">SGST ({sgstRate}%):</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      {formatCurrency(sgstAmt)}
                    </span>
                  </div>
                </>
              )}

              <div className="flex justify-between py-1.5 border-t border-slate-800 font-bold">
                <span className="text-slate-200">Total Invoice (GST Inc.):</span>
                <span className="text-white font-mono">{formatCurrency(totalInvoice)}</span>
              </div>

              <div className="flex justify-between py-1 text-amber-400">
                <span>TDS Deduction ({tdsRate}%):</span>
                <span className="font-bold font-mono">- {formatCurrency(tdsAmount)}</span>
              </div>

              <div className="flex justify-between pt-2 border-t border-slate-800 text-sm sm:text-base font-extrabold text-emerald-400">
                <span>Net Payable:</span>
                <span className="font-mono">{formatCurrency(netPayable)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 h-11 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Print Receipt
              </button>
              <button
                type="button"
                onClick={() => setIsReceiptOpen(false)}
                className="px-4 h-11 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs sm:text-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

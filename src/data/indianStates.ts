/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StateInfo {
  name: string;
  code: string;
  isUT: boolean;
}

export const INDIAN_STATES: StateInfo[] = [
  { name: 'Andhra Pradesh', code: '37', isUT: false },
  { name: 'Arunachal Pradesh', code: '12', isUT: false },
  { name: 'Assam', code: '18', isUT: false },
  { name: 'Bihar', code: '10', isUT: false },
  { name: 'Chhattisgarh', code: '22', isUT: false },
  { name: 'Goa', code: '30', isUT: false },
  { name: 'Gujarat', code: '24', isUT: false },
  { name: 'Haryana', code: '06', isUT: false },
  { name: 'Himachal Pradesh', code: '02', isUT: false },
  { name: 'Jharkhand', code: '20', isUT: false },
  { name: 'Karnataka', code: '29', isUT: false },
  { name: 'Kerala', code: '32', isUT: false },
  { name: 'Madhya Pradesh', code: '23', isUT: false },
  { name: 'Maharashtra', code: '27', isUT: false },
  { name: 'Manipur', code: '14', isUT: false },
  { name: 'Meghalaya', code: '17', isUT: false },
  { name: 'Mizoram', code: '15', isUT: false },
  { name: 'Nagaland', code: '13', isUT: false },
  { name: 'Odisha', code: '21', isUT: false },
  { name: 'Punjab', code: '03', isUT: false },
  { name: 'Rajasthan', code: '08', isUT: false },
  { name: 'Sikkim', code: '11', isUT: false },
  { name: 'Tamil Nadu', code: '33', isUT: false },
  { name: 'Telangana', code: '36', isUT: false },
  { name: 'Tripura', code: '16', isUT: false },
  { name: 'Uttar Pradesh', code: '09', isUT: false },
  { name: 'Uttarakhand', code: '05', isUT: false },
  { name: 'West Bengal', code: '19', isUT: false },
  // Union Territories
  { name: 'Andaman & Nicobar Islands', code: '35', isUT: true },
  { name: 'Chandigarh', code: '04', isUT: true },
  { name: 'Dadra & Nagar Haveli and Daman & Diu', code: '26', isUT: true },
  { name: 'Delhi', code: '07', isUT: true },
  { name: 'Jammu & Kashmir', code: '01', isUT: true },
  { name: 'Ladakh', code: '38', isUT: true },
  { name: 'Lakshadweep', code: '31', isUT: true },
  { name: 'Puducherry', code: '34', isUT: true },
];

export const STANDARD_GST_SLABS = [
  { rate: 0, label: '0%', desc: 'Nil Rated / Exempt goods & services' },
  { rate: 3, label: '3%', desc: 'Gold, silver, jewelry & precious metals' },
  { rate: 5, label: '5%', desc: 'Essential commodities & transport' },
  { rate: 18, label: '18%', desc: 'Standard business goods & services' },
];

export const TDS_SLABS = [
  { rate: 1.0, label: '1.0%', desc: 'Section 194C (Individual/HUF Contractors)' },
  { rate: 2.0, label: '2.0%', desc: 'Section 194C (Company & Subcontractors)' },
  { rate: 5.0, label: '5.0%', desc: 'Section 194H (Commission & Brokerage)' },
  { rate: 10.0, label: '10%', desc: 'Section 194J / 94I (Professional Fees & Rent)' },
  { rate: 20.0, label: '20.0%', desc: 'Section 92B / 206AA (Higher Rate / Non-PAN)' },
];

export interface AndroidDeviceSpec {
  id: string;
  name: string;
  brand: string;
  width: number;
  height: number;
  density: string;
  aspectRatio: string;
  notes: string;
}

export const ANDROID_DEVICES: AndroidDeviceSpec[] = [
  {
    id: 'galaxy-s24',
    name: 'Samsung Galaxy S24',
    brand: 'Samsung (OneUI)',
    width: 412,
    height: 915,
    density: 'xxxhdpi (416 ppi)',
    aspectRatio: '19.5:9',
    notes: 'Primary benchmark for premium Android market',
  },
  {
    id: 'pixel-8',
    name: 'Google Pixel 8 / 9',
    brand: 'Google (Stock Android)',
    width: 412,
    height: 892,
    density: 'xxhdpi (428 ppi)',
    aspectRatio: '20:9',
    notes: 'Reference hardware for Google Material You & Adaptive Icons',
  },
  {
    id: 'redmi-note',
    name: 'Redmi Note 13 / Xiaomi',
    brand: 'Xiaomi (HyperOS)',
    width: 393,
    height: 873,
    density: 'xxhdpi (395 ppi)',
    aspectRatio: '20:9',
    notes: 'High-volume mid-range device in India and global markets',
  },
  {
    id: 'compact-android',
    name: 'Compact Android (A14/E20)',
    brand: 'Compact Tier',
    width: 360,
    height: 800,
    density: 'hdpi/xhdpi (280-320 ppi)',
    aspectRatio: '20:9',
    notes: 'Baseline minimum standard test for compact Android screens',
  },
  {
    id: 'android-tablet',
    name: 'Galaxy Tab / Fold Unfolded',
    brand: 'Foldable / Tablet',
    width: 600,
    height: 960,
    density: 'xhdpi',
    aspectRatio: '16:10',
    notes: 'Corporate office desk & tablet experience',
  },
];

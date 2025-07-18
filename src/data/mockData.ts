export interface PortfolioHolding {
  id: string;
  name: string;
  symbol: string;
  sector: string;
  allocation: number;
  value: number;
  change: number;
  changePercent: number;
  risk: 'Low' | 'Medium' | 'High';
  beta: number;
  sharpeRatio: number;
  volatility: number;
}

export interface AssetAllocation {
  category: string;
  value: number;
  percentage: number;
  color: string;
}

export interface RiskMetric {
  name: string;
  value: number;
  benchmark: number;
  status: 'Good' | 'Warning' | 'Critical';
  description: string;
}

export interface PerformanceData {
  date: string;
  portfolio: number;
  benchmark: number;
}

// Khazanah's actual portfolio holdings (simplified)
export const portfolioHoldings: PortfolioHolding[] = [
  {
    id: '1',
    name: 'Malaysia Airlines Berhad',
    symbol: 'MAS',
    sector: 'Transportation',
    allocation: 8.5,
    value: 2850000000,
    change: -125000000,
    changePercent: -4.2,
    risk: 'High',
    beta: 1.45,
    sharpeRatio: -0.12,
    volatility: 28.5
  },
  {
    id: '2',
    name: 'Telekom Malaysia Berhad',
    symbol: 'TM',
    sector: 'Telecommunications',
    allocation: 12.3,
    value: 4125000000,
    change: 85000000,
    changePercent: 2.1,
    risk: 'Medium',
    beta: 0.85,
    sharpeRatio: 0.45,
    volatility: 18.2
  },
  {
    id: '3',
    name: 'CIMB Group Holdings',
    symbol: 'CIMB',
    sector: 'Financial Services',
    allocation: 15.7,
    value: 5265000000,
    change: 195000000,
    changePercent: 3.8,
    risk: 'Medium',
    beta: 1.12,
    sharpeRatio: 0.62,
    volatility: 22.1
  },
  {
    id: '4',
    name: 'Tenaga Nasional Berhad',
    symbol: 'TNB',
    sector: 'Utilities',
    allocation: 18.2,
    value: 6105000000,
    change: 245000000,
    changePercent: 4.2,
    risk: 'Low',
    beta: 0.65,
    sharpeRatio: 0.78,
    volatility: 15.3
  },
  {
    id: '5',
    name: 'Axiata Group Berhad',
    symbol: 'AXIATA',
    sector: 'Telecommunications',
    allocation: 9.8,
    value: 3285000000,
    change: 125000000,
    changePercent: 3.9,
    risk: 'Medium',
    beta: 0.92,
    sharpeRatio: 0.55,
    volatility: 19.7
  },
  {
    id: '6',
    name: 'UEM Group Berhad',
    symbol: 'UEM',
    sector: 'Infrastructure',
    allocation: 11.4,
    value: 3825000000,
    change: -85000000,
    changePercent: -2.2,
    risk: 'Medium',
    beta: 1.05,
    sharpeRatio: 0.28,
    volatility: 24.6
  },
  {
    id: '7',
    name: 'Iskandar Investment',
    symbol: 'IIB',
    sector: 'Real Estate',
    allocation: 7.3,
    value: 2450000000,
    change: 65000000,
    changePercent: 2.7,
    risk: 'High',
    beta: 1.35,
    sharpeRatio: 0.15,
    volatility: 31.2
  },
  {
    id: '8',
    name: 'Proton Holdings',
    symbol: 'PROTON',
    sector: 'Automotive',
    allocation: 5.9,
    value: 1980000000,
    change: -45000000,
    changePercent: -2.2,
    risk: 'High',
    beta: 1.58,
    sharpeRatio: -0.05,
    volatility: 35.8
  },
  {
    id: '9',
    name: 'Malaysia Building Society',
    symbol: 'MBSB',
    sector: 'Financial Services',
    allocation: 6.2,
    value: 2080000000,
    change: 35000000,
    changePercent: 1.7,
    risk: 'Medium',
    beta: 0.98,
    sharpeRatio: 0.42,
    volatility: 20.5
  },
  {
    id: '10',
    name: 'Technology Park Malaysia',
    symbol: 'TPM',
    sector: 'Technology',
    allocation: 4.7,
    value: 1575000000,
    change: 95000000,
    changePercent: 6.4,
    risk: 'Medium',
    beta: 1.25,
    sharpeRatio: 0.85,
    volatility: 26.3
  }
];

export const assetAllocation: AssetAllocation[] = [
  {
    category: 'Financial Services',
    value: 7345000000,
    percentage: 21.9,
    color: 'hsl(var(--chart-1))'
  },
  {
    category: 'Utilities',
    value: 6105000000,
    percentage: 18.2,
    color: 'hsl(var(--chart-2))'
  },
  {
    category: 'Telecommunications',
    value: 7410000000,
    percentage: 22.1,
    color: 'hsl(var(--chart-3))'
  },
  {
    category: 'Infrastructure',
    value: 3825000000,
    percentage: 11.4,
    color: 'hsl(var(--chart-4))'
  },
  {
    category: 'Transportation',
    value: 2850000000,
    percentage: 8.5,
    color: 'hsl(var(--chart-5))'
  },
  {
    category: 'Real Estate',
    value: 2450000000,
    percentage: 7.3,
    color: 'hsl(220 70% 50%)'
  },
  {
    category: 'Automotive',
    value: 1980000000,
    percentage: 5.9,
    color: 'hsl(160 60% 45%)'
  },
  {
    category: 'Technology',
    value: 1575000000,
    percentage: 4.7,
    color: 'hsl(280 65% 60%)'
  }
];

export const riskMetrics: RiskMetric[] = [
  {
    name: 'Portfolio Beta',
    value: 1.08,
    benchmark: 1.0,
    status: 'Warning',
    description: 'Measures portfolio sensitivity to market movements'
  },
  {
    name: 'Sharpe Ratio',
    value: 0.42,
    benchmark: 0.50,
    status: 'Warning',
    description: 'Risk-adjusted return measure'
  },
  {
    name: 'Portfolio Volatility',
    value: 22.3,
    benchmark: 18.0,
    status: 'Critical',
    description: 'Standard deviation of returns (%)'
  },
  {
    name: 'Value at Risk (95%)',
    value: 8.5,
    benchmark: 6.0,
    status: 'Critical',
    description: 'Maximum expected loss over 1 month (%)'
  },
  {
    name: 'Maximum Drawdown',
    value: 15.2,
    benchmark: 12.0,
    status: 'Warning',
    description: 'Largest peak-to-trough decline (%)'
  },
  {
    name: 'Correlation to KLCI',
    value: 0.78,
    benchmark: 0.70,
    status: 'Good',
    description: 'Correlation with Kuala Lumpur Composite Index'
  }
];

export const performanceData: PerformanceData[] = [
  { date: '2024-01', portfolio: 100, benchmark: 100 },
  { date: '2024-02', portfolio: 102.5, benchmark: 101.8 },
  { date: '2024-03', portfolio: 98.2, benchmark: 99.5 },
  { date: '2024-04', portfolio: 105.8, benchmark: 103.2 },
  { date: '2024-05', portfolio: 108.3, benchmark: 105.7 },
  { date: '2024-06', portfolio: 104.9, benchmark: 107.1 },
  { date: '2024-07', portfolio: 112.4, benchmark: 109.8 },
  { date: '2024-08', portfolio: 109.7, benchmark: 108.3 },
  { date: '2024-09', portfolio: 115.2, benchmark: 112.5 },
  { date: '2024-10', portfolio: 118.6, benchmark: 115.2 },
  { date: '2024-11', portfolio: 122.3, benchmark: 118.7 },
  { date: '2024-12', portfolio: 125.8, benchmark: 121.4 }
];

export const kpiData = {
  totalValue: 33540000000, // RM 33.54 billion
  totalReturn: 25.8, // 25.8% YTD return
  monthlyReturn: 3.2, // 3.2% monthly return
  volatility: 22.3, // 22.3% annualized volatility
  sharpeRatio: 0.42,
  beta: 1.08,
  maxDrawdown: 15.2,
  activeHoldings: 10
};
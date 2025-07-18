export interface PortfolioData {
  id: string
  name: string
  value: number
  change: number
  changePercent: number
  allocation: number
  sector: string
  riskLevel: 'Low' | 'Medium' | 'High'
  lastUpdated: string
}

export interface PerformanceData {
  date: string
  value: number
  benchmark: number
}

export interface AssetAllocation {
  name: string
  value: number
  percentage: number
  color: string
}

export interface RiskMetrics {
  volatility: number
  sharpeRatio: number
  maxDrawdown: number
  beta: number
  alpha: number
}

export interface KPIData {
  totalValue: number
  totalReturn: number
  totalReturnPercent: number
  ytdReturn: number
  ytdReturnPercent: number
  monthlyReturn: number
  monthlyReturnPercent: number
}

export type TimeFrame = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL'
// API Service for Portfolio Data Integration
// This file contains examples and utilities for connecting to various financial APIs

export interface PortfolioData {
  holdings: Holding[]
  performance: PerformanceData
  allocation: AllocationData
  riskMetrics: RiskMetrics
}

export interface Holding {
  symbol: string
  name: string
  quantity: number
  currentPrice: number
  marketValue: number
  costBasis: number
  unrealizedGainLoss: number
  percentOfPortfolio: number
}

export interface PerformanceData {
  totalValue: number
  totalReturn: number
  totalReturnPercent: number
  dayChange: number
  dayChangePercent: number
  ytdReturn: number
  ytdReturnPercent: number
}

export interface AllocationData {
  byAssetClass: { name: string; value: number; percentage: number }[]
  bySector: { name: string; value: number; percentage: number }[]
  byRegion: { name: string; value: number; percentage: number }[]
}

export interface RiskMetrics {
  beta: number
  sharpeRatio: number
  volatility: number
  maxDrawdown: number
  var95: number
}

// Alpha Vantage API Service
export class AlphaVantageService {
  constructor(private apiKey: string) {}

  async getStockQuote(symbol: string) {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.apiKey}`
    )
    const data = await response.json()
    return data['Global Quote']
  }

  async getTimeSeriesDaily(symbol: string) {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.apiKey}`
    )
    const data = await response.json()
    return data['Time Series (Daily)']
  }

  async getCompanyOverview(symbol: string) {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${this.apiKey}`
    )
    return response.json()
  }
}

// Yahoo Finance API Service (Free, no API key required)
export class YahooFinanceService {
  async getQuote(symbol: string) {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`
    )
    const data = await response.json()
    return data.chart.result[0]
  }

  async getHistoricalData(symbol: string, period: string = '1y') {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=${period}&interval=1d`
    )
    const data = await response.json()
    return data.chart.result[0]
  }

  async getMultipleQuotes(symbols: string[]) {
    const promises = symbols.map(symbol => this.getQuote(symbol))
    return Promise.all(promises)
  }
}

// Financial Modeling Prep API Service
export class FinancialModelingPrepService {
  constructor(private apiKey: string) {}

  async getCompanyProfile(symbol: string) {
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${this.apiKey}`
    )
    return response.json()
  }

  async getFinancialRatios(symbol: string) {
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/ratios/${symbol}?apikey=${this.apiKey}`
    )
    return response.json()
  }

  async getKeyMetrics(symbol: string) {
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/key-metrics/${symbol}?apikey=${this.apiKey}`
    )
    return response.json()
  }
}

// Custom Portfolio API Service
export class CustomPortfolioService {
  constructor(private baseUrl: string, private apiKey: string) {}

  async getPortfolioData(): Promise<PortfolioData> {
    const response = await fetch(`${this.baseUrl}/portfolio`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    })
    return response.json()
  }

  async getHoldings(): Promise<Holding[]> {
    const response = await fetch(`${this.baseUrl}/holdings`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    })
    return response.json()
  }

  async getPerformance(period: string = '1y'): Promise<PerformanceData> {
    const response = await fetch(`${this.baseUrl}/performance?period=${period}`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    })
    return response.json()
  }

  async getAllocation(): Promise<AllocationData> {
    const response = await fetch(`${this.baseUrl}/allocation`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    })
    return response.json()
  }

  async getRiskMetrics(): Promise<RiskMetrics> {
    const response = await fetch(`${this.baseUrl}/risk-metrics`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    })
    return response.json()
  }
}

// Utility functions for data transformation
export const transformYahooQuoteToHolding = (quote: any, symbol: string): Partial<Holding> => {
  const meta = quote.meta
  const currentPrice = meta.regularMarketPrice
  
  return {
    symbol,
    name: meta.longName || symbol,
    currentPrice,
    // Note: quantity, costBasis, etc. would come from your portfolio data
  }
}

export const calculatePortfolioMetrics = (holdings: Holding[]): PerformanceData => {
  const totalValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0)
  const totalCost = holdings.reduce((sum, holding) => sum + holding.costBasis, 0)
  const totalReturn = totalValue - totalCost
  const totalReturnPercent = (totalReturn / totalCost) * 100

  return {
    totalValue,
    totalReturn,
    totalReturnPercent,
    dayChange: 0, // Would need historical data
    dayChangePercent: 0,
    ytdReturn: 0, // Would need YTD calculation
    ytdReturnPercent: 0
  }
}

export const calculateAllocation = (holdings: Holding[]): Partial<AllocationData> => {
  const totalValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0)
  
  // This is a simplified example - you'd need sector/region data for each holding
  const byAssetClass = [
    { name: 'Stocks', value: totalValue * 0.7, percentage: 70 },
    { name: 'Bonds', value: totalValue * 0.2, percentage: 20 },
    { name: 'Cash', value: totalValue * 0.1, percentage: 10 }
  ]

  return { byAssetClass }
}

// Error handling wrapper
export const withErrorHandling = async <T>(
  apiCall: () => Promise<T>,
  fallbackValue: T
): Promise<T> => {
  try {
    return await apiCall()
  } catch (error) {
    console.error('API call failed:', error)
    return fallbackValue
  }
}

// Rate limiting utility
export class RateLimiter {
  private calls: number[] = []
  
  constructor(private maxCalls: number, private timeWindow: number) {}
  
  async throttle(): Promise<void> {
    const now = Date.now()
    this.calls = this.calls.filter(time => now - time < this.timeWindow)
    
    if (this.calls.length >= this.maxCalls) {
      const oldestCall = Math.min(...this.calls)
      const waitTime = this.timeWindow - (now - oldestCall)
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }
    
    this.calls.push(now)
  }
}

// Example usage:
/*
// Initialize services
const alphaVantage = new AlphaVantageService('YOUR_API_KEY')
const yahooFinance = new YahooFinanceService()
const customAPI = new CustomPortfolioService('https://your-api.com', 'YOUR_TOKEN')

// Fetch data
const portfolioData = await customAPI.getPortfolioData()
const stockQuote = await yahooFinance.getQuote('AAPL')
const companyData = await alphaVantage.getCompanyOverview('AAPL')

// Use with error handling
const safePortfolioData = await withErrorHandling(
  () => customAPI.getPortfolioData(),
  { holdings: [], performance: {}, allocation: {}, riskMetrics: {} }
)
*/
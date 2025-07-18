import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, Calendar, Activity } from 'lucide-react'
import { performanceData } from '@/data/mockData'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const timeframes = [
  { id: '1M', label: '1M', active: false },
  { id: '3M', label: '3M', active: false },
  { id: '6M', label: '6M', active: false },
  { id: '1Y', label: '1Y', active: true },
  { id: 'ALL', label: 'All', active: false }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-lg p-4 border border-border/50 backdrop-blur-xl">
        <p className="font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-muted-foreground">{entry.name}</span>
            </div>
            <span className="text-sm font-medium">{entry.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function PerformanceChart() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y')
  const [chartType, setChartType] = useState<'line' | 'area'>('area')
  
  const latestPortfolio = performanceData[performanceData.length - 1]?.portfolio || 0
  const latestBenchmark = performanceData[performanceData.length - 1]?.benchmark || 0
  const outperformance = latestPortfolio - latestBenchmark

  return (
    <Card className="glass border-border/50 card-hover group">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/20 text-primary group-hover:glow-primary transition-all duration-300">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Performance Analysis</CardTitle>
              <p className="text-sm text-muted-foreground">
                Portfolio vs Benchmark comparison
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={cn(
              'border',
              outperformance > 0 
                ? 'bg-accent/20 text-accent border-accent/30' 
                : 'bg-destructive/20 text-destructive border-destructive/30'
            )}>
              {outperformance > 0 ? '+' : ''}{outperformance.toFixed(1)}% vs Benchmark
            </Badge>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2">
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe.id}
                variant={selectedTimeframe === timeframe.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe.id)}
                className={cn(
                  "h-8 px-3 text-xs transition-all duration-300",
                  selectedTimeframe === timeframe.id 
                    ? "glow-primary" 
                    : "hover:bg-accent/50"
                )}
              >
                {timeframe.label}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={chartType === 'line' ? "default" : "ghost"}
              size="sm"
              onClick={() => setChartType('line')}
              className="h-8 px-3 text-xs"
            >
              Line
            </Button>
            <Button
              variant={chartType === 'area' ? "default" : "ghost"}
              size="sm"
              onClick={() => setChartType('area')}
              className="h-8 px-3 text-xs"
            >
              Area
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="hsl(var(--border))" 
                  opacity={0.3}
                />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="portfolio"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#portfolioGradient)"
                  name="Portfolio"
                />
                <Area
                  type="monotone"
                  dataKey="benchmark"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  fill="url(#benchmarkGradient)"
                  name="Benchmark"
                />
              </AreaChart>
            ) : (
              <LineChart data={performanceData}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="hsl(var(--border))" 
                  opacity={0.3}
                />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="portfolio"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                  name="Portfolio"
                />
                <Line
                  type="monotone"
                  dataKey="benchmark"
                  stroke="hsl(var(--accent))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(var(--accent))', strokeWidth: 2 }}
                  name="Benchmark"
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
        
        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Portfolio Return</span>
            </div>
            <p className="text-xl font-bold text-primary">
              +{(latestPortfolio - 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">Since inception</p>
          </div>
          
          <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Benchmark Return</span>
            </div>
            <p className="text-xl font-bold text-accent">
              +{(latestBenchmark - 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">KLCI Index</p>
          </div>
          
          <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-foreground" />
              <span className="text-sm font-medium">Outperformance</span>
            </div>
            <p className={cn(
              "text-xl font-bold",
              outperformance > 0 ? "text-accent" : "text-destructive"
            )}>
              {outperformance > 0 ? '+' : ''}{outperformance.toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">vs Benchmark</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
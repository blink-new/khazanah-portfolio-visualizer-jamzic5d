import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { assetAllocation } from '@/data/mockData'
import { PieChart as PieChartIcon, TrendingUp } from 'lucide-react'

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(220 70% 50%)',
  'hsl(160 60% 45%)',
  'hsl(280 65% 60%)'
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="glass rounded-lg p-3 border border-border/50 backdrop-blur-xl">
        <p className="font-medium text-foreground">{data.category}</p>
        <p className="text-sm text-muted-foreground">
          Value: RM {(data.value / 1e9).toFixed(1)}B
        </p>
        <p className="text-sm text-muted-foreground">
          Allocation: {data.percentage.toFixed(1)}%
        </p>
      </div>
    )
  }
  return null
}

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      {payload?.map((entry: any, index: number) => (
        <div key={index} className="flex items-center space-x-2 text-sm">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground truncate">{entry.value}</span>
          <span className="text-xs text-muted-foreground ml-auto">
            {assetAllocation.find(item => item.category === entry.value)?.percentage.toFixed(1)}%
          </span>
        </div>
      ))}
    </div>
  )
}

export function AssetAllocationChart() {
  const totalValue = assetAllocation.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <Card className="glass border-border/50 card-hover group">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/20 text-primary group-hover:glow-primary transition-all duration-300">
              <PieChartIcon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Asset Allocation</CardTitle>
              <p className="text-sm text-muted-foreground">
                Total: RM {(totalValue / 1e9).toFixed(1)}B
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-xs text-accent">
            <TrendingUp className="h-3 w-3" />
            <span>Diversified</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={assetAllocation}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {assetAllocation.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-80 transition-opacity duration-200"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Top allocations summary */}
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Top Allocations</h4>
          {assetAllocation
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 3)
            .map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[assetAllocation.indexOf(item)] }}
                  />
                  <span className="text-sm font-medium">{item.category}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{item.percentage.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground">
                    RM {(item.value / 1e9).toFixed(1)}B
                  </p>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
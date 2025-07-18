import { KPICards } from '@/components/dashboard/KPICards'
import { PerformanceChart } from '@/components/charts/PerformanceChart'
import { AssetAllocationChart } from '@/components/charts/AssetAllocationChart'
import { RiskMetricsPanel } from '@/components/dashboard/RiskMetricsPanel'
import { PortfolioTable } from '@/components/tables/PortfolioTable'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, Clock, Wifi } from 'lucide-react'

export function Dashboard() {
  const currentTime = new Date().toLocaleString('en-MY', {
    timeZone: 'Asia/Kuala_Lumpur',
    hour12: false,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Portfolio Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time analytics and performance insights
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Card className="glass border-border/50 px-4 py-2">
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Last updated:</span>
              <span className="font-medium">{currentTime} MYT</span>
            </div>
          </Card>
          
          <Badge className="bg-accent/20 text-accent border-accent/30 px-3 py-1">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <Wifi className="h-3 w-3" />
              <span>Live</span>
            </div>
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <Activity className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Key Performance Indicators</h2>
        </div>
        <KPICards />
      </section>

      {/* Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <PerformanceChart />
        </div>
        <div>
          <AssetAllocationChart />
        </div>
      </section>

      {/* Risk Analysis */}
      <section>
        <RiskMetricsPanel />
      </section>

      {/* Portfolio Holdings Table */}
      <section>
        <PortfolioTable />
      </section>

      {/* Footer Info */}
      <Card className="glass border-border/50 mt-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Data Sources</h4>
              <p className="text-xs text-muted-foreground">
                Bursa Malaysia, Bloomberg Terminal, Reuters
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Update Frequency</h4>
              <p className="text-xs text-muted-foreground">
                Real-time during market hours (9:00 AM - 5:00 PM MYT)
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Benchmark</h4>
              <p className="text-xs text-muted-foreground">
                FTSE Bursa Malaysia KLCI Index
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Shield, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react'
import { riskMetrics } from '@/data/mockData'
import { cn } from '@/lib/utils'

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Good':
      return <CheckCircle className="h-4 w-4 text-accent" />
    case 'Warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    case 'Critical':
      return <XCircle className="h-4 w-4 text-destructive" />
    default:
      return <Info className="h-4 w-4 text-muted-foreground" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Good':
      return 'bg-accent/20 text-accent border-accent/30'
    case 'Warning':
      return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30 dark:text-yellow-400'
    case 'Critical':
      return 'bg-destructive/20 text-destructive border-destructive/30'
    default:
      return 'bg-muted/20 text-muted-foreground border-muted/30'
  }
}

const getProgressColor = (status: string) => {
  switch (status) {
    case 'Good':
      return 'bg-accent'
    case 'Warning':
      return 'bg-yellow-500'
    case 'Critical':
      return 'bg-destructive'
    default:
      return 'bg-muted-foreground'
  }
}

export function RiskMetricsPanel() {
  const overallRiskScore = riskMetrics.reduce((acc, metric) => {
    const score = metric.status === 'Good' ? 100 : metric.status === 'Warning' ? 60 : 30
    return acc + score
  }, 0) / riskMetrics.length

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'Low Risk', color: 'text-accent', bg: 'bg-accent/20' }
    if (score >= 60) return { level: 'Medium Risk', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/20' }
    return { level: 'High Risk', color: 'text-destructive', bg: 'bg-destructive/20' }
  }

  const riskLevel = getRiskLevel(overallRiskScore)

  return (
    <Card className="glass border-border/50 card-hover group">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/20 text-primary group-hover:glow-primary transition-all duration-300">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Risk Analysis</CardTitle>
              <p className="text-sm text-muted-foreground">Portfolio risk assessment</p>
            </div>
          </div>
          <Badge className={cn('border', riskLevel.bg, riskLevel.color)}>
            {riskLevel.level}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Risk Score */}
        <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium">Overall Risk Score</h4>
            <span className="text-lg font-bold">{overallRiskScore.toFixed(0)}/100</span>
          </div>
          <Progress 
            value={overallRiskScore} 
            className="h-2"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Based on {riskMetrics.length} key risk metrics
          </p>
        </div>

        {/* Risk Metrics */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">Risk Metrics</h4>
          {riskMetrics.map((metric, index) => {
            const progressValue = metric.status === 'Good' ? 100 : 
                                 metric.status === 'Warning' ? 60 : 30
            
            return (
              <div key={index} className="group/metric p-4 rounded-xl border border-border/30 hover:border-border/60 transition-all duration-300 hover:bg-muted/20">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(metric.status)}
                    <div>
                      <h5 className="text-sm font-medium">{metric.name}</h5>
                      <p className="text-xs text-muted-foreground">{metric.description}</p>
                    </div>
                  </div>
                  <Badge className={cn('text-xs border', getStatusColor(metric.status))}>
                    {metric.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current</span>
                    <span className="font-medium">{metric.value}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Benchmark</span>
                    <span className="font-medium">{metric.benchmark}</span>
                  </div>
                  
                  {/* Visual indicator */}
                  <div className="relative h-2 bg-muted/50 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        'absolute left-0 top-0 h-full rounded-full transition-all duration-500',
                        getProgressColor(metric.status)
                      )}
                      style={{ width: `${progressValue}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Risk Summary */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-border/50">
          <h4 className="text-sm font-medium mb-2">Risk Summary</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-accent">
                {riskMetrics.filter(m => m.status === 'Good').length}
              </p>
              <p className="text-xs text-muted-foreground">Good</p>
            </div>
            <div>
              <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                {riskMetrics.filter(m => m.status === 'Warning').length}
              </p>
              <p className="text-xs text-muted-foreground">Warning</p>
            </div>
            <div>
              <p className="text-lg font-bold text-destructive">
                {riskMetrics.filter(m => m.status === 'Critical').length}
              </p>
              <p className="text-xs text-muted-foreground">Critical</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
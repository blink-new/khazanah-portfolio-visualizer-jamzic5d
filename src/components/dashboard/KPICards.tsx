import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, TrendingDown, DollarSign, Activity, Shield, Target } from 'lucide-react'
import { kpiData } from '@/data/mockData'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ElementType
  description: string
  gradient?: string
}

function KPICard({ title, value, change, changeType, icon: Icon, description, gradient }: KPICardProps) {
  return (
    <Card className="relative overflow-hidden card-hover glass border-border/50 group">
      {/* Animated background gradient */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        gradient || "bg-gradient-to-br from-primary/5 to-accent/5"
      )}></div>
      
      <CardContent className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            "p-3 rounded-xl transition-all duration-300",
            changeType === 'positive' ? 'bg-accent/20 text-accent' :
            changeType === 'negative' ? 'bg-destructive/20 text-destructive' :
            'bg-primary/20 text-primary'
          )}>
            <Icon className="h-5 w-5" />
          </div>
          {change && (
            <div className={cn(
              "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
              changeType === 'positive' ? 'bg-accent/20 text-accent' :
              changeType === 'negative' ? 'bg-destructive/20 text-destructive' :
              'bg-muted/50 text-muted-foreground'
            )}>
              {changeType === 'positive' ? (
                <TrendingUp className="h-3 w-3" />
              ) : changeType === 'negative' ? (
                <TrendingDown className="h-3 w-3" />
              ) : null}
              <span>{change}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            {value}
          </p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className={cn(
            "absolute inset-0 rounded-lg",
            changeType === 'positive' ? 'shadow-lg shadow-accent/10' :
            changeType === 'negative' ? 'shadow-lg shadow-destructive/10' :
            'shadow-lg shadow-primary/10'
          )}></div>
        </div>
      </CardContent>
    </Card>
  )
}

export function KPICards() {
  const formatCurrency = (value: number) => {
    if (value >= 1e9) {
      return `RM ${(value / 1e9).toFixed(1)}B`
    }
    return `RM ${(value / 1e6).toFixed(0)}M`
  }

  const kpis = [
    {
      title: 'Total Portfolio Value',
      value: formatCurrency(kpiData.totalValue),
      change: '+2.4%',
      changeType: 'positive' as const,
      icon: DollarSign,
      description: 'Total assets under management',
      gradient: 'bg-gradient-to-br from-accent/10 to-primary/10'
    },
    {
      title: 'YTD Return',
      value: `${kpiData.totalReturn.toFixed(1)}%`,
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: 'Year-to-date performance',
      gradient: 'bg-gradient-to-br from-accent/10 to-accent/5'
    },
    {
      title: 'Monthly Return',
      value: `${kpiData.monthlyReturn.toFixed(1)}%`,
      change: '+1.8%',
      changeType: 'positive' as const,
      icon: Activity,
      description: 'Current month performance',
      gradient: 'bg-gradient-to-br from-primary/10 to-primary/5'
    },
    {
      title: 'Portfolio Volatility',
      value: `${kpiData.volatility.toFixed(1)}%`,
      change: '+2.1%',
      changeType: 'negative' as const,
      icon: Shield,
      description: 'Annualized volatility measure',
      gradient: 'bg-gradient-to-br from-destructive/10 to-destructive/5'
    },
    {
      title: 'Sharpe Ratio',
      value: kpiData.sharpeRatio.toFixed(2),
      change: '-0.08',
      changeType: 'negative' as const,
      icon: Target,
      description: 'Risk-adjusted return metric',
      gradient: 'bg-gradient-to-br from-muted/20 to-muted/10'
    },
    {
      title: 'Active Holdings',
      value: kpiData.activeHoldings.toString(),
      change: 'Stable',
      changeType: 'neutral' as const,
      icon: Activity,
      description: 'Number of portfolio positions',
      gradient: 'bg-gradient-to-br from-primary/10 to-accent/10'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  )
}
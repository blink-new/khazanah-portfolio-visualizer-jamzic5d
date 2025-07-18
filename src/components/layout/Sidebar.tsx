import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Shield, 
  Briefcase,
  Activity,
  Zap,
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigation = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: BarChart3,
    description: 'Overview & KPIs'
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    icon: Briefcase,
    description: 'Holdings & Assets'
  },
  {
    id: 'performance',
    name: 'Performance',
    icon: TrendingUp,
    description: 'Returns & Analytics'
  },
  {
    id: 'allocation',
    name: 'Allocation',
    icon: PieChart,
    description: 'Asset Distribution'
  },
  {
    id: 'risk',
    name: 'Risk Analysis',
    icon: Shield,
    description: 'Risk Metrics'
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: Settings,
    description: 'Customize & Configure'
  }
]

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card/50 backdrop-blur-xl border-r border-border/50 lg:block hidden">
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-border/50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center glow-primary">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Khazanah
            </h1>
            <p className="text-xs text-muted-foreground">Portfolio Analytics</p>
          </div>
        </div>
        <ThemeToggle />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group relative overflow-hidden',
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20 glow-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50 border border-transparent'
              )}
            >
              {/* Animated background for active state */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl"></div>
              )}
              
              <div className={cn(
                'relative z-10 p-2 rounded-lg transition-all duration-300',
                isActive 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-muted/50 group-hover:bg-accent/30'
              )}>
                <Icon className="h-4 w-4" />
              </div>
              
              <div className="relative z-10 flex-1 min-w-0">
                <p className={cn(
                  'text-sm font-medium transition-colors',
                  isActive ? 'text-primary' : 'group-hover:text-foreground'
                )}>
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {item.description}
                </p>
              </div>
              
              {/* Active indicator */}
              {isActive && (
                <div className="relative z-10 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/50">
        <div className="glass rounded-xl p-4 neon-border">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">Real-time Data</p>
              <p className="text-xs text-muted-foreground">Live updates</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Connected</span>
            </div>
            <span className="text-xs text-accent font-medium">99.9%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
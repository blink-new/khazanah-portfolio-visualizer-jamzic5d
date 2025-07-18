import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter,
  ArrowUpDown,
  Briefcase,
  Download
} from 'lucide-react'
import { portfolioHoldings } from '@/data/mockData'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function PortfolioTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<string>('allocation')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const filteredHoldings = portfolioHoldings
    .filter(holding => 
      holding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.sector.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField as keyof typeof a]
      const bValue = b[sortField as keyof typeof b]
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      return sortDirection === 'asc' 
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    })

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const formatCurrency = (value: number) => {
    if (value >= 1e9) {
      return `RM ${(value / 1e9).toFixed(1)}B`
    }
    return `RM ${(value / 1e6).toFixed(0)}M`
  }

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-accent/20 text-accent border-accent/30'
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30 dark:text-yellow-400'
      case 'High':
        return 'bg-destructive/20 text-destructive border-destructive/30'
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30'
    }
  }

  return (
    <Card className="glass border-border/50 card-hover group">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/20 text-primary group-hover:glow-primary transition-all duration-300">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Portfolio Holdings</CardTitle>
              <p className="text-sm text-muted-foreground">
                {filteredHoldings.length} of {portfolioHoldings.length} holdings
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="glass border-border/50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
        
        {/* Search and Filter */}
        <div className="flex items-center space-x-4 pt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search holdings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass border-border/50"
            />
          </div>
          <Button variant="outline" size="sm" className="glass border-border/50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-muted/30">
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Company</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort('sector')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Sector</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors text-right"
                  onClick={() => handleSort('allocation')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Allocation</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors text-right"
                  onClick={() => handleSort('value')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Value</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors text-right"
                  onClick={() => handleSort('changePercent')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Change</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort('risk')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Risk</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors text-right"
                  onClick={() => handleSort('beta')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Beta</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHoldings.map((holding) => (
                <TableRow 
                  key={holding.id} 
                  className="border-border/50 hover:bg-muted/30 transition-colors group/row"
                >
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground group-hover/row:text-primary transition-colors">
                        {holding.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{holding.symbol}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="glass border-border/50">
                      {holding.sector}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div>
                      <p className="font-medium">{holding.allocation.toFixed(1)}%</p>
                      <div className="w-16 h-1 bg-muted/50 rounded-full ml-auto mt-1">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${(holding.allocation / 20) * 100}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(holding.value)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className={cn(
                      "flex items-center justify-end space-x-1",
                      holding.changePercent > 0 ? "text-accent" : "text-destructive"
                    )}>
                      {holding.changePercent > 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span className="font-medium">
                        {holding.changePercent > 0 ? '+' : ''}{holding.changePercent.toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground text-right">
                      {formatCurrency(holding.change)}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn('border text-xs', getRiskBadgeColor(holding.risk))}>
                      {holding.risk}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div>
                      <p className="font-medium">{holding.beta.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">
                        SR: {holding.sharpeRatio.toFixed(2)}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredHoldings.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No holdings found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
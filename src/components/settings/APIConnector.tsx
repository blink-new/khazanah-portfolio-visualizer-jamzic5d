import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Globe, 
  Key, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Database,
  TrendingUp,
  DollarSign,
  BarChart3
} from 'lucide-react'

interface APIConfig {
  name: string
  endpoint: string
  apiKey: string
  status: 'connected' | 'disconnected' | 'testing'
  description: string
  icon: React.ReactNode
}

const defaultAPIs: APIConfig[] = [
  {
    name: 'Alpha Vantage',
    endpoint: 'https://www.alphavantage.co/query',
    apiKey: '',
    status: 'disconnected',
    description: 'Stock prices, financial indicators, and market data',
    icon: <TrendingUp className="h-4 w-4" />
  },
  {
    name: 'Yahoo Finance',
    endpoint: 'https://query1.finance.yahoo.com/v8/finance/chart',
    apiKey: '',
    status: 'disconnected',
    description: 'Real-time stock quotes and historical data',
    icon: <DollarSign className="h-4 w-4" />
  },
  {
    name: 'Financial Modeling Prep',
    endpoint: 'https://financialmodelingprep.com/api/v3',
    apiKey: '',
    status: 'disconnected',
    description: 'Financial statements, ratios, and company data',
    icon: <BarChart3 className="h-4 w-4" />
  },
  {
    name: 'Custom API',
    endpoint: '',
    apiKey: '',
    status: 'disconnected',
    description: 'Connect your own portfolio data API',
    icon: <Database className="h-4 w-4" />
  }
]

export function APIConnector() {
  const [apis, setApis] = useState<APIConfig[]>(defaultAPIs)
  const [testingAPI, setTestingAPI] = useState<string | null>(null)

  const updateAPI = (index: number, field: keyof APIConfig, value: string) => {
    const newApis = [...apis]
    newApis[index] = { ...newApis[index], [field]: value }
    setApis(newApis)
  }

  const testConnection = async (index: number) => {
    const api = apis[index]
    setTestingAPI(api.name)
    
    try {
      // Simulate API test - replace with actual API calls
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock test result
      const success = Math.random() > 0.3 // 70% success rate for demo
      
      const newApis = [...apis]
      newApis[index].status = success ? 'connected' : 'disconnected'
      setApis(newApis)
    } catch (error) {
      const newApis = [...apis]
      newApis[index].status = 'disconnected'
      setApis(newApis)
    } finally {
      setTestingAPI(null)
    }
  }

  const getStatusIcon = (status: APIConfig['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'disconnected':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'testing':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
    }
  }

  const getStatusBadge = (status: APIConfig['status']) => {
    switch (status) {
      case 'connected':
        return <Badge variant="default" className="bg-green-500">Connected</Badge>
      case 'disconnected':
        return <Badge variant="destructive">Disconnected</Badge>
      case 'testing':
        return <Badge variant="secondary">Testing...</Badge>
    }
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          API Connections
        </CardTitle>
        <CardDescription>
          Connect to external data sources for real-time portfolio data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="configure" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="configure">Configure APIs</TabsTrigger>
            <TabsTrigger value="examples">Code Examples</TabsTrigger>
          </TabsList>
          
          <TabsContent value="configure" className="space-y-6">
            {apis.map((api, index) => (
              <Card key={api.name} className="border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {api.icon}
                      <div>
                        <CardTitle className="text-lg">{api.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {api.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(api.status)}
                      {getStatusBadge(api.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`endpoint-${index}`}>API Endpoint</Label>
                      <Input
                        id={`endpoint-${index}`}
                        value={api.endpoint}
                        onChange={(e) => updateAPI(index, 'endpoint', e.target.value)}
                        placeholder="https://api.example.com/v1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`apikey-${index}`}>API Key</Label>
                      <Input
                        id={`apikey-${index}`}
                        type="password"
                        value={api.apiKey}
                        onChange={(e) => updateAPI(index, 'apiKey', e.target.value)}
                        placeholder="Enter your API key"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => testConnection(index)}
                    disabled={!api.endpoint || !api.apiKey || testingAPI === api.name}
                    className="w-full md:w-auto"
                  >
                    {testingAPI === api.name ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Testing Connection...
                      </>
                    ) : (
                      <>
                        <Key className="h-4 w-4 mr-2" />
                        Test Connection
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="examples" className="space-y-6">
            <Alert>
              <Database className="h-4 w-4" />
              <AlertDescription>
                Here are code examples for integrating with popular financial APIs
              </AlertDescription>
            </Alert>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Alpha Vantage Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`// Fetch stock data from Alpha Vantage
const fetchStockData = async (symbol: string) => {
  const response = await fetch(
    \`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=\${symbol}&apikey=\${API_KEY}\`
  )
  const data = await response.json()
  return data['Time Series (Daily)']
}

// Usage
const stockData = await fetchStockData('AAPL')`}
                  </pre>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Yahoo Finance Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`// Fetch real-time quotes from Yahoo Finance
const fetchYahooQuote = async (symbol: string) => {
  const response = await fetch(
    \`https://query1.finance.yahoo.com/v8/finance/chart/\${symbol}\`
  )
  const data = await response.json()
  return data.chart.result[0]
}

// Usage
const quote = await fetchYahooQuote('AAPL')`}
                  </pre>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Custom Portfolio API</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`// Create a service for your portfolio API
export class PortfolioAPI {
  constructor(private baseUrl: string, private apiKey: string) {}
  
  async getPortfolioData() {
    const response = await fetch(\`\${this.baseUrl}/portfolio\`, {
      headers: {
        'Authorization': \`Bearer \${this.apiKey}\`,
        'Content-Type': 'application/json'
      }
    })
    return response.json()
  }
  
  async getAssetAllocation() {
    const response = await fetch(\`\${this.baseUrl}/allocation\`, {
      headers: { 'Authorization': \`Bearer \${this.apiKey}\` }
    })
    return response.json()
  }
}`}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
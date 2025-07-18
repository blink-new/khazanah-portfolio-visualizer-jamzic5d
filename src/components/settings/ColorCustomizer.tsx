import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Palette, RotateCcw } from 'lucide-react'

interface ColorScheme {
  primary: string
  accent: string
  chart1: string
  chart2: string
  chart3: string
  chart4: string
  chart5: string
}

const defaultColors: ColorScheme = {
  primary: '#6366f1',
  accent: '#10b981',
  chart1: '#6366f1',
  chart2: '#10b981',
  chart3: '#fbbf24',
  chart4: '#ef4444',
  chart5: '#a855f7'
}

const presetSchemes = {
  khazanah: {
    primary: '#1E40AF',
    accent: '#059669',
    chart1: '#1E40AF',
    chart2: '#059669',
    chart3: '#F59E0B',
    chart4: '#DC2626',
    chart5: '#7C3AED'
  },
  ocean: {
    primary: '#0EA5E9',
    accent: '#06B6D4',
    chart1: '#0EA5E9',
    chart2: '#06B6D4',
    chart3: '#8B5CF6',
    chart4: '#EC4899',
    chart5: '#F97316'
  },
  forest: {
    primary: '#059669',
    accent: '#65A30D',
    chart1: '#059669',
    chart2: '#65A30D',
    chart3: '#CA8A04',
    chart4: '#DC2626',
    chart5: '#7C3AED'
  },
  sunset: {
    primary: '#EA580C',
    accent: '#DC2626',
    chart1: '#EA580C',
    chart2: '#DC2626',
    chart3: '#F59E0B',
    chart4: '#EC4899',
    chart5: '#8B5CF6'
  }
}

export function ColorCustomizer() {
  const [colors, setColors] = useState<ColorScheme>(defaultColors)

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
      : '0 0 0'
  }

  const applyColors = (newColors: ColorScheme) => {
    const root = document.documentElement
    root.style.setProperty('--primary', hexToRgb(newColors.primary))
    root.style.setProperty('--accent', hexToRgb(newColors.accent))
    root.style.setProperty('--chart-1', hexToRgb(newColors.chart1))
    root.style.setProperty('--chart-2', hexToRgb(newColors.chart2))
    root.style.setProperty('--chart-3', hexToRgb(newColors.chart3))
    root.style.setProperty('--chart-4', hexToRgb(newColors.chart4))
    root.style.setProperty('--chart-5', hexToRgb(newColors.chart5))
    root.style.setProperty('--ring', hexToRgb(newColors.primary))
    root.style.setProperty('--sidebar-primary', hexToRgb(newColors.primary))
    root.style.setProperty('--sidebar-ring', hexToRgb(newColors.primary))
    root.style.setProperty('--glow-primary', hexToRgb(newColors.primary))
    root.style.setProperty('--glow-accent', hexToRgb(newColors.accent))
    setColors(newColors)
  }

  const resetColors = () => {
    applyColors(defaultColors)
  }

  const applyPreset = (preset: ColorScheme) => {
    applyColors(preset)
  }

  const updateColor = (key: keyof ColorScheme, value: string) => {
    const newColors = { ...colors, [key]: value }
    applyColors(newColors)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Color Customizer
        </CardTitle>
        <CardDescription>
          Customize the color scheme of your portfolio dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="presets" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="presets">Presets</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
          
          <TabsContent value="presets" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(presetSchemes).map(([name, scheme]) => (
                <Button
                  key={name}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2"
                  onClick={() => applyPreset(scheme)}
                >
                  <div className="flex gap-1">
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: scheme.primary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: scheme.accent }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: scheme.chart3 }}
                    />
                  </div>
                  <span className="capitalize text-sm">{name}</span>
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primary">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primary"
                    type="color"
                    value={colors.primary}
                    onChange={(e) => updateColor('primary', e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={colors.primary}
                    onChange={(e) => updateColor('primary', e.target.value)}
                    placeholder="#6366f1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accent">Accent Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="accent"
                    type="color"
                    value={colors.accent}
                    onChange={(e) => updateColor('accent', e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={colors.accent}
                    onChange={(e) => updateColor('accent', e.target.value)}
                    placeholder="#10b981"
                  />
                </div>
              </div>
              
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="space-y-2">
                  <Label htmlFor={`chart${num}`}>Chart Color {num}</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`chart${num}`}
                      type="color"
                      value={colors[`chart${num}` as keyof ColorScheme]}
                      onChange={(e) => updateColor(`chart${num}` as keyof ColorScheme, e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={colors[`chart${num}` as keyof ColorScheme]}
                      onChange={(e) => updateColor(`chart${num}` as keyof ColorScheme, e.target.value)}
                      placeholder={`#${num === 1 ? '6366f1' : num === 2 ? '10b981' : num === 3 ? 'fbbf24' : num === 4 ? 'ef4444' : 'a855f7'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button onClick={resetColors} variant="outline" className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset to Default
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
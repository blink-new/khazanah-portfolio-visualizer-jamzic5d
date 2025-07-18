import React from 'react'
import { ColorCustomizer } from '@/components/settings/ColorCustomizer'
import { APIConnector } from '@/components/settings/APIConnector'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Settings as SettingsIcon, Palette, Globe } from 'lucide-react'

export function Settings() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Customize your dashboard appearance and configure data sources
          </p>
        </div>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="apis" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Data Sources
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance" className="mt-6">
          <div className="flex justify-center">
            <ColorCustomizer />
          </div>
        </TabsContent>
        
        <TabsContent value="apis" className="mt-6">
          <div className="flex justify-center">
            <APIConnector />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Settings, HelpCircle, Zap, Camera, Mic, Workflow, Clock } from "lucide-react"

export function LiquidGlassOverlay() {
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [isIdle, setIsIdle] = useState(false)
  const [lastActivity, setLastActivity] = useState(Date.now())

  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now())
      setIsIdle(false)
    }

    const checkIdle = () => {
      if (Date.now() - lastActivity > 5000) {
        setIsIdle(true)
      }
    }

    const interval = setInterval(checkIdle, 1000)

    // Listen for mouse movement and clicks to detect activity
    document.addEventListener("mousemove", handleActivity)
    document.addEventListener("click", handleActivity)
    document.addEventListener("keydown", handleActivity)

    return () => {
      clearInterval(interval)
      document.removeEventListener("mousemove", handleActivity)
      document.removeEventListener("click", handleActivity)
      document.removeEventListener("keydown", handleActivity)
    }
  }, [lastActivity])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      {/* Background pattern for better glass effect visibility */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-yellow-300 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-pink-300 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-300 rounded-full blur-xl"></div>
      </div>

      {/* Main Overlay Container */}
      <div className="relative max-w-md mx-auto">
        {/* Drag Region Header */}
        <div className="glass drag-region h-6 rounded-t-xl border-b border-white/10 mb-4" data-tauri-drag-region>
          <div className="flex items-center justify-between h-full px-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-400 rounded-full opacity-60"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-60"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>

        <Card
          className={`glass-overlay-enhanced p-6 space-y-6 transition-all duration-700 ease-in-out ${
            isIdle ? "idle-shrink" : ""
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">AI Assistant</h1>
              <p className="text-sm text-gray-700">Voice • Vision • Intelligence</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="glass-button text-gray-800 hover:text-gray-900"
                onClick={() => setShowShortcuts(!showShortcuts)}
              >
                <HelpCircle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="glass-button text-gray-800 hover:text-gray-900">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center space-x-3">
            <Badge className="glass-nodrag bg-green-500/30 text-green-900 border-green-400/40">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
              Active
            </Badge>
            <Badge className="glass-nodrag bg-blue-500/30 text-blue-900 border-blue-400/40">Voice Ready</Badge>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button className="glass-button-enhanced flex-col h-16 text-gray-800 hover:text-gray-900">
              <Mic className="w-5 h-5 mb-1" />
              <span className="text-xs">Voice</span>
            </Button>
            <Button className="glass-button-enhanced flex-col h-16 text-gray-800 hover:text-gray-900">
              <Camera className="w-5 h-5 mb-1" />
              <span className="text-xs">Screenshot</span>
            </Button>
            <Button className="glass-button-enhanced flex-col h-16 text-gray-800 hover:text-gray-900">
              <Workflow className="w-5 h-5 mb-1" />
              <span className="text-xs">Workflow</span>
            </Button>
            <Button className="glass-button-enhanced flex-col h-16 text-gray-800 hover:text-gray-900">
              <Clock className="w-5 h-5 mb-1" />
              <span className="text-xs">Recent</span>
            </Button>
          </div>

          {/* Recent Activity */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-800">Recent Activity</h3>
            <div className="space-y-2">
              <div className="glass-card p-3">
                <p className="text-sm text-gray-900">Voice command processed</p>
                <p className="text-xs text-gray-600">2 minutes ago</p>
              </div>
              <div className="glass-card p-3">
                <p className="text-sm text-gray-900">Screenshot analyzed</p>
                <p className="text-xs text-gray-600">5 minutes ago</p>
              </div>
            </div>
          </div>
        </Card>

        <Button
          className="glass-fab fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          size="icon"
        >
          <Zap className="w-6 h-6 text-gray-900" />
        </Button>

        {/* Shortcuts Help Popover */}
        {showShortcuts && (
          <div className="glass-overlay-enhanced glass-fade-in absolute top-full mt-4 left-0 right-0 p-4 z-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Keyboard Shortcuts</h3>
              <Button
                variant="ghost"
                size="sm"
                className="glass-button text-gray-800 hover:text-gray-900"
                onClick={() => setShowShortcuts(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Toggle overlay</span>
                <Badge className="glass-nodrag bg-gray-800/20 text-gray-900 border-gray-600/30">Cmd + \</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Voice input</span>
                <Badge className="glass-nodrag bg-gray-800/20 text-gray-900 border-gray-600/30">Cmd + Shift + A</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Screenshot</span>
                <Badge className="glass-nodrag bg-gray-800/20 text-gray-900 border-gray-600/30">Cmd + Shift + S</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Audio capture</span>
                <Badge className="glass-nodrag bg-gray-800/20 text-gray-900 border-gray-600/30">Cmd + Shift + M</Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

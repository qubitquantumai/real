'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <div className="w-full h-full relative">
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-gray-900/20 rounded-2xl">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
              <span className="text-gray-400 text-sm">Loading 3D Experience...</span>
            </div>
          </div>
        }
      >
        <div className="w-full h-full overflow-hidden">
          <Spline
            scene={scene}
            className={`${className} pointer-events-auto`}
            style={{
              width: '100%',
              height: '100%',
              transform: 'scale(1)',
              transformOrigin: 'center center'
            }}
          />
        </div>
      </Suspense>
    </div>
  )
}
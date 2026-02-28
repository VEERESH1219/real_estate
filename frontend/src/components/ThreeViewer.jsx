import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Environment } from '@react-three/drei'
import { useState } from 'react'

function House({ dimensions, colors }) {
  const { width, length, height } = dimensions
  const wallHeight = height * 0.7
  const roofHeight = height * 0.3

  return (
    <group>
      <mesh position={[0, wallHeight / 2, 0]}>
        <boxGeometry args={[width, wallHeight, length]} />
        <meshStandardMaterial color={colors.wall} />
      </mesh>
      
      <mesh position={[0, wallHeight + roofHeight / 2, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[width * 0.8, roofHeight, 4]} />
        <meshStandardMaterial color={colors.roof} />
      </mesh>
      
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color={colors.ground} />
      </mesh>
    </group>
  )
}

function PlotDimensions({ dimensions }) {
  const { width, length, height } = dimensions
  
  return (
    <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      <h3 className="font-bold text-lg mb-2">Plot Dimensions</h3>
      <p>Width: {width} ft</p>
      <p>Length: {length} ft</p>
      <p>Height: {height} ft</p>
      <p className="mt-2 font-semibold">Area: {width * length} sq ft</p>
    </div>
  )
}

export default function ThreeViewer({ plotData, plot3dData }) {
  const dimensions = plot3dData?.dimensions || { width: 10, length: 10, height: 3 }
  const colors = plot3dData?.colors || { wall: '#f5f5dc', roof: '#8b4513', ground: '#228b22' }

  const [autoRotate, setAutoRotate] = useState(true)

  return (
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [20, 20, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, 10, -5]} intensity={0.3} />
        
        <House dimensions={dimensions} colors={colors} />
        
        <Grid 
          infiniteGrid 
          cellSize={1} 
          cellThickness={0.5}
          sectionSize={5}
          sectionThickness={1}
          fadeDistance={50}
          fadeStrength={1}
        />
        
        <OrbitControls 
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          enablePan={true}
          enableZoom={true}
          minDistance={10}
          maxDistance={50}
        />
        
        <Environment preset="sunset" />
      </Canvas>
      
      <PlotDimensions dimensions={dimensions} />
      
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={autoRotate}
            onChange={(e) => setAutoRotate(e.target.checked)}
            className="w-4 h-4"
          />
          <span>Auto Rotate</span>
        </label>
      </div>
      
      <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
        <p className="text-sm text-gray-600">Use mouse to:</p>
        <p className="text-sm">🖱️ Left click + drag to rotate</p>
        <p className="text-sm">🖱️ Right click + drag to pan</p>
        <p className="text-sm">🖱️ Scroll to zoom</p>
      </div>
    </div>
  )
}

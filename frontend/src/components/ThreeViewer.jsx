import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Html, Text } from '@react-three/drei'
import { useState } from 'react'

function DimensionLine({ start, end, label, color = '#333' }) {
  const midPoint = [(start[0] + end[0]) / 2, start[1], (start[2] + end[2]) / 2]
  const length = Math.sqrt(
    Math.pow(end[0] - start[0], 2) + Math.pow(end[2] - start[2], 2)
  )
  const angle = Math.atan2(end[2] - start[2], end[0] - start[0])

  return (
    <group>
      <mesh position={midPoint} rotation={[0, -angle, 0]}>
        <boxGeometry args={[length, 0.1, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={start}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={end}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Html position={midPoint} center style={{ pointerEvents: 'none' }}>
        <div style={{
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '4px 10px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap'
        }}>
          {label}
        </div>
      </Html>
    </group>
  )
}

function House({ dimensions, colors }) {
  const { width, length, height } = dimensions
  const wallHeight = height * 0.65
  const roofHeight = height * 0.35

  return (
    <group>
      <mesh position={[0, wallHeight / 2, 0]}>
        <boxGeometry args={[width, wallHeight, length]} />
        <meshStandardMaterial color={colors.wall} />
      </mesh>
      
      <mesh position={[0, wallHeight + roofHeight / 2, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[width * 0.85, roofHeight, 4]} />
        <meshStandardMaterial color={colors.roof} />
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color={colors.ground} />
      </mesh>
    </group>
  )
}

export default function ThreeViewer({ plotData, plot3dData }) {
  const dimensions = plot3dData?.dimensions || { width: 10, length: 10, height: 3 }
  const colors = plot3dData?.colors || { wall: '#f5f5dc', roof: '#8b4513', ground: '#228b22' }

  const [autoRotate, setAutoRotate] = useState(false)
  const [showDimensions, setShowDimensions] = useState(true)

  const halfWidth = dimensions.width / 2
  const halfLength = dimensions.length / 2

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas camera={{ position: [30, 25, 30], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[20, 30, 10]} intensity={1} />
        <directionalLight position={[-10, 20, -10]} intensity={0.3} />
        
        <House dimensions={dimensions} colors={colors} />
        
        {showDimensions && (
          <group>
            <DimensionLine 
              start={[-halfWidth - 3, 0.5, 0]} 
              end={[halfWidth + 3, 0.5, 0]} 
              label={`Width: ${dimensions.width} ft`}
            />
            <DimensionLine 
              start={[0, 0.5, -halfLength - 3]} 
              end={[0, 0.5, halfLength + 3]} 
              label={`Length: ${dimensions.length} ft`}
            />
            <DimensionLine 
              start={[halfWidth + 5, 0, 0]} 
              end={[halfWidth + 5, dimensions.height, 0]} 
              label={`Height: ${dimensions.height} ft`}
            />
          </group>
        )}
        
        <Grid 
          infiniteGrid 
          cellSize={2} 
          sectionSize={10}
          fadeDistance={100}
          fadeStrength={1}
        />
        
        <OrbitControls 
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          enablePan={true}
          enableZoom={true}
          minDistance={20}
          maxDistance={80}
        />
      </Canvas>

      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        background: 'rgba(0,0,0,0.85)',
        color: 'white',
        padding: '20px',
        borderRadius: '12px',
        minWidth: '200px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 'bold', borderBottom: '2px solid #667eea', paddingBottom: '10px' }}>
          📐 Plot Dimensions
        </h3>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ color: '#667eea', fontWeight: 'bold' }}>↔️ Width:</span>
          <span style={{ marginLeft: '10px', fontWeight: '600' }}>{dimensions.width} ft</span>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ color: '#667eea', fontWeight: 'bold' }}>↕️ Length:</span>
          <span style={{ marginLeft: '10px', fontWeight: '600' }}>{dimensions.length} ft</span>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ color: '#667eea', fontWeight: 'bold' }}>↗️ Height:</span>
          <span style={{ marginLeft: '10px', fontWeight: '600' }}>{dimensions.height} ft</span>
        </div>
        <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #444' }}>
          <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '18px' }}>
            📐 Total Area: {dimensions.width * dimensions.length} sq ft
          </span>
        </div>
      </div>
      
      <div style={{
        position: 'absolute',
        top: 20,
        right: 20,
        background: 'rgba(0,0,0,0.85)',
        color: 'white',
        padding: '15px',
        borderRadius: '10px'
      }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px' }}>
          <input 
            type="checkbox" 
            checked={showDimensions}
            onChange={(e) => setShowDimensions(e.target.checked)}
            style={{ width: '18px', height: '18px' }}
          />
          Show Dimensions
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px', marginTop: '10px' }}>
          <input 
            type="checkbox" 
            checked={autoRotate}
            onChange={(e) => setAutoRotate(e.target.checked)}
            style={{ width: '18px', height: '18px' }}
          />
          Auto Rotate
        </label>
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.85)',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '25px',
        display: 'flex',
        gap: '30px'
      }}>
        <span><span style={{ background: '#444', padding: '4px 10px', borderRadius: '4px', marginRight: '8px' }}>Left Drag</span> Rotate</span>
        <span><span style={{ background: '#444', padding: '4px 10px', borderRadius: '4px', marginRight: '8px' }}>Right Drag</span> Pan</span>
        <span><span style={{ background: '#444', padding: '4px 10px', borderRadius: '4px', marginRight: '8px' }}>Scroll</span> Zoom</span>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Canvas } from '@react-three/fiber'
import ThreeViewer from '../components/ThreeViewer'

const samplePlot3D = {
  _id: '3d1',
  plotId: '1',
  dimensions: {
    width: 40,
    length: 60,
    height: 12
  },
  colors: {
    wall: '#f5f5dc',
    roof: '#8b4513',
    ground: '#228b22'
  }
}

export default function Plot3DPage() {
  const { plotId } = useParams()
  const [plot, setPlot] = useState(null)
  const [plot3d, setPlot3d] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      axios.get(`/api/plots/${plotId}`),
      axios.get(`/api/plot/${plotId}`)
    ])
      .then(([plotRes, plot3dRes]) => {
        setPlot(plotRes.data)
        setPlot3d(plot3dRes.data)
      })
      .catch(() => {
        setPlot({
          _id: plotId,
          plotNumber: 'A1',
          area: 2400,
          status: 'available',
          price: 2500000
        })
        setPlot3d(samplePlot3D)
      })
      .finally(() => setLoading(false))
  }, [plotId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading 3D Model...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link to={`/lands/1/plots`} className="text-blue-600 hover:underline text-sm">← Back to Plots</Link>
            <h1 className="text-2xl font-bold mt-1">
              3D View - Plot {plot?.plotNumber}
            </h1>
          </div>
          <div className="flex gap-4 items-center">
            {plot?.price && (
              <div className="text-right">
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-xl font-bold text-green-600">₹{plot.price.toLocaleString()}</p>
              </div>
            )}
            {plot?.status === 'available' && (
              <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors">
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="h-[calc(100vh-120px)] bg-gray-900">
        <Canvas>
          <ThreeViewer plotData={plot} plot3dData={plot3d} />
        </Canvas>
      </div>
    </div>
  )
}

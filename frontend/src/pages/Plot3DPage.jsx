import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import ThreeViewer from '../components/ThreeViewer'

const samplePlot3D = {
  id: '3d1',
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
          id: plotId,
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ 
        background: 'white', 
        padding: '15px 30px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to={`/lands/1/plots`} style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>
            ← Back to Plots
          </Link>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>
            3D View - Plot {plot?.plotNumber}
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {plot?.price && (
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Price</p>
              <p style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#10b981' }}>
                ₹{plot.price.toLocaleString()}
              </p>
            </div>
          )}
          {plot?.status === 'available' && (
            <button style={{
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}>
              Book Now
            </button>
          )}
        </div>
      </div>
      
      <div style={{ flex: 1 }}>
        <ThreeViewer plotData={plot} plot3dData={plot3d} />
      </div>
    </div>
  )
}

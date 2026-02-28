import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import MapView from '../components/MapView'

const samplePlots = [
  {
    _id: '1',
    landId: '1',
    plotNumber: 'A1',
    area: 2400,
    coordinates: [[17.382, 78.485], [17.383, 78.485], [17.383, 78.486], [17.382, 78.486]],
    status: 'available',
    price: 2500000
  },
  {
    _id: '2',
    landId: '1',
    plotNumber: 'A2',
    area: 2400,
    coordinates: [[17.384, 78.485], [17.385, 78.485], [17.385, 78.486], [17.384, 78.486]],
    status: 'sold',
    price: 2500000
  },
  {
    _id: '3',
    landId: '1',
    plotNumber: 'B1',
    area: 3000,
    coordinates: [[17.382, 78.487], [17.383, 78.487], [17.383, 78.488], [17.382, 78.488]],
    status: 'available',
    price: 3200000
  },
  {
    _id: '4',
    landId: '1',
    plotNumber: 'B2',
    area: 3000,
    coordinates: [[17.384, 78.487], [17.385, 78.487], [17.385, 78.488], [17.384, 78.488]],
    status: 'available',
    price: 3200000
  }
]

export default function PlotsPage() {
  const { landId } = useParams()
  const [plots, setPlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPlot, setSelectedPlot] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`/api/plots/land/${landId}`)
      .then(res => {
        if (res.data.length > 0) {
          setPlots(res.data)
        } else {
          setPlots(samplePlots)
        }
      })
      .catch(() => {
        setPlots(samplePlots)
      })
      .finally(() => setLoading(false))
  }, [landId])

  const handlePlotClick = (plot) => {
    setSelectedPlot(plot)
  }

  const handleView3D = (plot) => {
    navigate(`/plots/${plot._id}/3d`)
  }

  const availableCount = plots.filter(p => p.status === 'available').length
  const soldCount = plots.filter(p => p.status === 'sold').length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/" className="text-blue-600 hover:underline text-sm">← Back to Lands</Link>
            <h1 className="text-2xl font-bold mt-1">Plots in Land</h1>
          </div>
          <div className="flex gap-4">
            <div className="bg-green-100 px-4 py-2 rounded">
              <span className="text-green-600 font-semibold">{availableCount}</span> Available
            </div>
            <div className="bg-red-100 px-4 py-2 rounded">
              <span className="text-red-600 font-semibold">{soldCount}</span> Sold
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex h-[calc(100vh-140px)]">
        <div className="w-1/3 bg-white shadow-lg overflow-y-auto">
          <div className="p-4">
            <div className="space-y-4">
              {plots.map(plot => (
                <div 
                  key={plot._id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPlot?._id === plot._id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handlePlotClick(plot)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">Plot {plot.plotNumber}</h3>
                    <span className={`px-2 py-1 rounded text-sm ${
                      plot.status === 'available' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {plot.status}
                    </span>
                  </div>
                  <p className="text-gray-600">Area: {plot.area.toLocaleString()} sq ft</p>
                  {plot.price && (
                    <p className="text-gray-600">Price: ₹{plot.price.toLocaleString()}</p>
                  )}
                  {plot.dimensions && (
                    <p className="text-sm text-gray-500">
                      {plot.dimensions.width} × {plot.dimensions.length} ft
                    </p>
                  )}
                  {plot.status === 'available' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleView3D(plot)
                      }}
                      className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                    >
                      View 3D
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-2/3">
          <MapView 
            plots={selectedPlot ? [selectedPlot] : plots}
            onPlotClick={handlePlotClick}
            center={plots[0]?.coordinates?.[0] || [17.385, 78.486]}
            zoom={16}
          />
        </div>
      </div>
    </div>
  )
}

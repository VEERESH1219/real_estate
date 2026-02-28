import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MapView from '../components/MapView'

const sampleLands = [
  {
    _id: '1',
    name: 'Green Valley Township',
    location: 'Hyderabad, Telangana',
    totalArea: 50000,
    coordinates: [[17.38, 78.48], [17.39, 78.48], [17.39, 78.49], [17.38, 78.49]],
    description: 'A beautiful township with parks and modern amenities',
  },
  {
    _id: '2',
    name: 'Sunrise Gardens',
    location: 'Banjara Hills, Hyderabad',
    totalArea: 35000,
    coordinates: [[17.40, 78.44], [17.41, 78.44], [17.41, 78.45], [17.40, 78.45]],
    description: 'Luxury plots in the heart of the city',
  }
]

export default function LandsPage() {
  const [lands, setLands] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedLand, setSelectedLand] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/lands')
      .then(res => {
        if (res.data.length > 0) {
          setLands(res.data)
        } else {
          setLands(sampleLands)
        }
      })
      .catch(() => {
        setLands(sampleLands)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleLandClick = (land) => {
    setSelectedLand(land)
  }

  const handleViewPlots = (land) => {
    navigate(`/lands/${land._id}/plots`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="w-1/3 bg-white shadow-lg overflow-y-auto">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Available Lands</h1>
          <div className="space-y-4">
            {lands.map(land => (
              <div 
                key={land._id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedLand?._id === land._id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleLandClick(land)}
              >
                <h3 className="font-bold text-lg">{land.name}</h3>
                <p className="text-gray-600">{land.location}</p>
                <p className="text-sm text-gray-500 mt-2">Area: {land.totalArea.toLocaleString()} sq ft</p>
                {land.description && (
                  <p className="text-sm text-gray-500 mt-1">{land.description}</p>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleViewPlots(land)
                  }}
                  className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                >
                  View Plots
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-2/3">
        <MapView 
          lands={selectedLand ? [selectedLand] : lands}
          onLandClick={handleLandClick}
          onPlotClick={(plot) => navigate(`/plots/${plot._id}/3d`)}
        />
      </div>
    </div>
  )
}

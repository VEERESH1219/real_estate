import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MapView from '../components/MapView'

const sampleLands = [
  {
    id: '1',
    name: 'Green Valley Township',
    location: 'Hyderabad, Telangana',
    totalArea: 50000,
    coordinates: [[17.38, 78.48], [17.39, 78.48], [17.39, 78.49], [17.38, 78.49]],
    description: 'A beautiful township with parks and modern amenities',
  },
  {
    id: '2',
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
  const [animated, setAnimated] = useState(false)
  const navigate = useNavigate()
  const getEntityId = (entity) => entity?.id ?? entity?._id

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
      .finally(() => {
        setLoading(false)
        setTimeout(() => setAnimated(true), 100)
      })
  }, [])

  const handleLandClick = (land) => {
    setSelectedLand(land)
  }

  const handleViewPlots = (land) => {
    navigate(`/lands/${getEntityId(land)}/plots`)
  }

  if (loading) {
    return (
      <div className="loading-page">
        <div className="loader-wrapper">
          <div className="loader">
            <div className="loader-circle"></div>
            <div className="loader-circle"></div>
            <div className="loader-circle"></div>
          </div>
          <p>Loading Properties...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="lands-page">
      <style>{`
        .lands-page {
          height: calc(100vh - 80px);
          display: flex;
          background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
          animation: pageEnter 0.6s ease-out;
        }

        @keyframes pageEnter {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .loading-page {
          height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
        }

        .loader-wrapper {
          text-align: center;
        }

        .loader-wrapper p {
          margin-top: 20px;
          color: #667eea;
          font-weight: 600;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .loader {
          width: 80px;
          height: 80px;
          position: relative;
          margin: 0 auto;
        }

        .loader-circle {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 3px solid transparent;
          animation: spin 1.5s linear infinite;
        }

        .loader-circle:nth-child(1) {
          border-top-color: #667eea;
          animation-delay: 0s;
        }

        .loader-circle:nth-child(2) {
          border-right-color: #764ba2;
          animation-delay: 0.15s;
          width: 70%;
          height: 70%;
          top: 15%;
          left: 15%;
        }

        .loader-circle:nth-child(3) {
          border-bottom-color: #f093fb;
          animation-delay: 0.3s;
          width: 40%;
          height: 40%;
          top: 30%;
          left: 30%;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .lands-sidebar {
          width: 380px;
          padding: 25px;
          overflow-y: auto;
          animation: slideInLeft 0.6s ease-out 0.2s both;
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .lands-title {
          font-size: 28px;
          font-weight: 700;
          color: #333;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .lands-title::before {
          content: '';
          width: 5px;
          height: 30px;
          background: linear-gradient(to bottom, #667eea, #764ba2);
          border-radius: 3px;
        }

        .lands-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .land-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 2px solid transparent;
          opacity: 0;
          transform: translateY(20px);
          animation: cardEnter 0.5s ease-out forwards;
        }

        .land-card:nth-child(1) { animation-delay: 0.3s; }
        .land-card:nth-child(2) { animation-delay: 0.4s; }

        @keyframes cardEnter {
          to { opacity: 1; transform: translateY(0); }
        }

        .land-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
        }

        .land-card.selected {
          border-color: #667eea;
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3);
        }

        .land-card.selected::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
          border-radius: 20px 20px 0 0;
        }

        .land-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .land-name {
          font-size: 18px;
          font-weight: 700;
          color: #333;
        }

        .land-badge {
          padding: 4px 12px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }

        .land-location {
          color: #666;
          font-size: 14px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .land-stats {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
        }

        .land-stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #888;
        }

        .land-stat span:first-child {
          font-size: 16px;
        }

        .land-desc {
          font-size: 13px;
          color: #666;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .view-plots-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .view-plots-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .view-plots-btn::after {
          content: '→';
          transition: transform 0.3s ease;
        }

        .view-plots-btn:hover::after {
          transform: translateX(5px);
        }

        .lands-map {
          flex: 1;
          border-radius: 20px;
          margin: 20px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          animation: zoomIn 0.6s ease-out 0.4s both;
        }

        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 900px) {
          .lands-page {
            flex-direction: column;
          }
          
          .lands-sidebar {
            width: 100%;
            max-height: 40vh;
          }
          
          .lands-map {
            margin: 0;
            border-radius: 20px 20px 0 0;
          }
        }
      `}</style>

      <div className="lands-sidebar">
        <h1 className="lands-title">Available Lands</h1>
        <div className="lands-grid">
          {lands.map((land, index) => (
            <div 
              key={getEntityId(land)}
              className={`land-card ${getEntityId(selectedLand) === getEntityId(land) ? 'selected' : ''}`}
              onClick={() => handleLandClick(land)}
              style={{ position: 'relative' }}
            >
              <div className="land-header">
                <h3 className="land-name">{land.name}</h3>
                <span className="land-badge">Premium</span>
              </div>
              <p className="land-location">📍 {land.location}</p>
              <div className="land-stats">
                <div className="land-stat">
                  <span>📐</span>
                  <span>{land.totalArea.toLocaleString()} sq ft</span>
                </div>
                <div className="land-stat">
                  <span>🏠</span>
                  <span>20 Plots</span>
                </div>
              </div>
              {land.description && (
                <p className="land-desc">{land.description}</p>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleViewPlots(land)
                }}
                className="view-plots-btn"
              >
                View Plots
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="lands-map">
        <MapView 
          lands={selectedLand ? [selectedLand] : lands}
          onLandClick={handleLandClick}
          onPlotClick={(plot) => navigate(`/plots/${getEntityId(plot)}/3d`)}
        />
      </div>
    </div>
  )
}

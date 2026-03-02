import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import MapView from '../components/MapView'

const samplePlots = [
  {
    id: '1',
    landId: '1',
    plotNumber: 'A1',
    area: 2400,
    coordinates: [[17.382, 78.485], [17.383, 78.485], [17.383, 78.486], [17.382, 78.486]],
    status: 'available',
    price: 2500000
  },
  {
    id: '2',
    landId: '1',
    plotNumber: 'A2',
    area: 2400,
    coordinates: [[17.384, 78.485], [17.385, 78.485], [17.385, 78.486], [17.384, 78.486]],
    status: 'sold',
    price: 2500000
  },
  {
    id: '3',
    landId: '1',
    plotNumber: 'B1',
    area: 3000,
    coordinates: [[17.382, 78.487], [17.383, 78.487], [17.383, 78.488], [17.382, 78.488]],
    status: 'available',
    price: 3200000
  },
  {
    id: '4',
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
  const getEntityId = (entity) => entity?.id ?? entity?._id

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
    navigate(`/plots/${getEntityId(plot)}/3d`)
  }

  const availableCount = plots.filter(p => p.status === 'available').length
  const soldCount = plots.filter(p => p.status === 'sold').length

  if (loading) {
    return (
      <div className="loading-page">
        <div className="loader-wrapper">
          <div className="loader">
            <div className="loader-circle"></div>
            <div className="loader-circle"></div>
            <div className="loader-circle"></div>
          </div>
          <p>Loading Plots...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="plots-page">
      <style>{`
        .plots-page {
          height: calc(100vh - 80px);
          display: flex;
          flex-direction: column;
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
        }

        .loader-circle:nth-child(2) {
          border-right-color: #764ba2;
          width: 70%;
          height: 70%;
          top: 15%;
          left: 15%;
        }

        .loader-circle:nth-child(3) {
          border-bottom-color: #f093fb;
          width: 40%;
          height: 40%;
          top: 30%;
          left: 30%;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .plots-header {
          background: white;
          padding: 20px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          animation: slideDown 0.5s ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .header-left {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .back-link {
          color: #667eea;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.3s ease;
        }

        .back-link:hover {
          transform: translateX(-5px);
        }

        .plots-title {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .plots-title::before {
          content: '';
          width: 4px;
          height: 25px;
          background: linear-gradient(to bottom, #667eea, #764ba2);
          border-radius: 2px;
        }

        .header-stats {
          display: flex;
          gap: 15px;
        }

        .stat-badge {
          padding: 10px 20px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          animation: popIn 0.5s ease-out both;
        }

        .stat-badge:nth-child(1) { animation-delay: 0.2s; }
        .stat-badge:nth-child(2) { animation-delay: 0.3s; }

        @keyframes popIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        .stat-badge.available {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }

        .stat-badge.sold {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
        }

        .plots-content {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .plots-sidebar {
          width: 380px;
          padding: 25px;
          overflow-y: auto;
          animation: slideInLeft 0.6s ease-out 0.2s both;
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .plots-grid {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .plot-card {
          background: white;
          border-radius: 18px;
          padding: 22px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          border: 2px solid transparent;
          opacity: 0;
          transform: translateX(-20px);
          animation: cardSlide 0.5s ease-out forwards;
        }

        .plot-card:nth-child(1) { animation-delay: 0.3s; }
        .plot-card:nth-child(2) { animation-delay: 0.4s; }
        .plot-card:nth-child(3) { animation-delay: 0.5s; }
        .plot-card:nth-child(4) { animation-delay: 0.6s; }

        @keyframes cardSlide {
          to { opacity: 1; transform: translateX(0); }
        }

        .plot-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.2);
        }

        .plot-card.selected {
          border-color: #667eea;
        }

        .plot-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .plot-number {
          font-size: 20px;
          font-weight: 700;
          color: #333;
        }

        .plot-status {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .plot-status.available {
          background: #d1fae5;
          color: #059669;
        }

        .plot-status.sold {
          background: #fee2e2;
          color: #dc2626;
        }

        .plot-details {
          display: flex;
          gap: 20px;
          margin-bottom: 15px;
        }

        .plot-detail {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #666;
        }

        .plot-price {
          font-size: 22px;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 18px;
        }

        .view-3d-btn {
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

        .view-3d-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .view-3d-btn::before {
          content: '🎯';
        }

        .plots-map {
          flex: 1;
          border-radius: 20px;
          margin: 20px;
          margin-left: 0;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          animation: zoomIn 0.6s ease-out 0.4s both;
        }

        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 900px) {
          .plots-content {
            flex-direction: column;
          }
          
          .plots-sidebar {
            width: 100%;
            max-height: 40vh;
          }
          
          .plots-map {
            margin: 0;
            border-radius: 20px 20px 0 0;
          }
          
          .plots-header {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="plots-header">
        <div className="header-left">
          <Link to="/" className="back-link">← Back to Lands</Link>
          <h1 className="plots-title">Plots in Land</h1>
        </div>
        <div className="header-stats">
          <div className="stat-badge available">
            <span>✓</span>
            <span>{availableCount} Available</span>
          </div>
          <div className="stat-badge sold">
            <span>✕</span>
            <span>{soldCount} Sold</span>
          </div>
        </div>
      </div>
      
      <div className="plots-content">
        <div className="plots-sidebar">
          <div className="plots-grid">
            {plots.map(plot => (
              <div 
                key={getEntityId(plot)}
                className={`plot-card ${getEntityId(selectedPlot) === getEntityId(plot) ? 'selected' : ''}`}
                onClick={() => handlePlotClick(plot)}
              >
                <div className="plot-header">
                  <h3 className="plot-number">Plot {plot.plotNumber}</h3>
                  <span className={`plot-status ${plot.status}`}>
                    {plot.status}
                  </span>
                </div>
                <div className="plot-details">
                  <div className="plot-detail">
                    <span>📐</span>
                    <span>{plot.area.toLocaleString()} sq ft</span>
                  </div>
                  <div className="plot-detail">
                    <span>📏</span>
                    <span>40 × 60 ft</span>
                  </div>
                </div>
                <div className="plot-price">
                  ₹{plot.price?.toLocaleString()}
                </div>
                {plot.status === 'available' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleView3D(plot)
                    }}
                    className="view-3d-btn"
                  >
                    View 3D
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="plots-map">
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

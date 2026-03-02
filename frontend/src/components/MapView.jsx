import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'

function MapCenter({ center }) {
  const map = useMap()
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom())
    }
  }, [center, map])
  return null
}

export default function MapView({ 
  lands = [], 
  plots = [], 
  onLandClick, 
  onPlotClick, 
  center = [17.385044, 78.486671],
  zoom = 13 
}) {
  const getEntityId = (entity) => entity?.id ?? entity?._id

  const getPolygonColor = (type, status) => {
    if (type === 'land') return '#3b82f6'
    return status === 'available' ? '#22c55e' : '#ef4444'
  }

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapCenter center={center} />
      
      {lands.map((land) => (
        <Polygon
          key={getEntityId(land)}
          positions={land.coordinates}
          pathOptions={{ 
            color: getPolygonColor('land'),
            fillColor: getPolygonColor('land'),
            fillOpacity: 0.3
          }}
          eventHandlers={{
            click: () => onLandClick?.(land)
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{land.name}</h3>
              <p>{land.location}</p>
              <p>Area: {land.totalArea} sq ft</p>
            </div>
          </Popup>
        </Polygon>
      ))}
      
      {plots.map((plot) => (
        <Polygon
          key={getEntityId(plot)}
          positions={plot.coordinates}
          pathOptions={{ 
            color: getPolygonColor('plot', plot.status),
            fillColor: getPolygonColor('plot', plot.status),
            fillOpacity: 0.5
          }}
          eventHandlers={{
            click: () => onPlotClick?.(plot)
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">Plot {plot.plotNumber}</h3>
              <p>Area: {plot.area} sq ft</p>
              <p>Status: <span className={plot.status === 'available' ? 'text-green-600' : 'text-red-600'}>{plot.status}</span></p>
              {plot.price && <p>Price: ₹{plot.price.toLocaleString()}</p>}
            </div>
          </Popup>
        </Polygon>
      ))}
    </MapContainer>
  )
}

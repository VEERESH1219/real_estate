import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LandsPage from './pages/LandsPage'
import PlotsPage from './pages/PlotsPage'
import Plot3DPage from './pages/Plot3DPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-blue-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="text-xl font-bold">🏡 Real Estate</Link>
              <div className="flex space-x-4">
                <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">Lands</Link>
              </div>
            </div>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<LandsPage />} />
          <Route path="/lands/:landId/plots" element={<PlotsPage />} />
          <Route path="/plots/:plotId/3d" element={<Plot3DPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

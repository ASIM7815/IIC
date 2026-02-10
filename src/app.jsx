import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Register from './pages/register.jsx'
import Failed from './pages/failed.jsx'
import Ticket from './Ticket.jsx'
import Invoice from './pages/invoice.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Ticket />} />
        <Route path="/failed" element={<Failed />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </Router>
  )
}

export default App

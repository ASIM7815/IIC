import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Register from './pages/register.jsx'
import Payment from './pages/payment.jsx'
import Success from './pages/success.jsx'
import Failed from './pages/failed.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failed" element={<Failed />} />
      </Routes>
    </Router>
  )
}

export default App

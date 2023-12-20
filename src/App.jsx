
import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
 
  const navigate= useNavigate();

  return (
    <>
      <div className="main-wrap">
        <h2>Manage Users</h2>
        <button onClick={()=>{
          navigate('/users')
        }}>Go to Dashboard</button>
      </div>
    </>
  )
}

export default App

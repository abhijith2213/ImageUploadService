import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Signup from "./components/Signup/Signup"
import Login from './components/Login/Login'
import Home from './components/home/Home'
import UserPage from './pages/user/UserPage'
import Collection from './components/collection/Collection'
import Thumbnails from './components/thumbnails/Thumbnails'
import ProtectedRoute from './utils/protectedRoute/ProtectedRoute'
import Notfound from './components/404 Component/Notfound'


function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route element={<UserPage/>}>
          <Route element={<ProtectedRoute/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/collection' element={<Collection/>}/>
          <Route path='/thumbnails/:image' element={<Thumbnails/>}/>
          </Route>
          </Route>
          <Route path='*' element={<Notfound/>}/>
        </Routes>
      </Router>
      
    </div>
  )
}

export default App

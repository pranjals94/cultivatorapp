
import './App.css';
import { Routes, Route,  useLocation ,} from 'react-router-dom'

//-------------page/ component imports---------------
import CultivatorHomePage from './Components/CultivatorAppHomePage'
import LogIn from './Components/Login'
import UserHomepage from './Components/UsersHomePage';
import TempleActivities from './Components/TempleActivities';


function App() {
  const location= useLocation()

  return (
    <>
      <AppRoutes/>
    </>
  )
function AppRoutes(){
    return (
        <Routes>
          <Route path='/' element={<CultivatorHomePage />} />
          <Route path='/app/login' element={<LogIn/>} />
          <Route path='/app/userhomepage' element={<UserHomepage userRole={location.state} />} />
          <Route path='/app/templeactivities' element={<TempleActivities />} />
          <Route path='*' element={<div><h4>From react: Page Not Found</h4></div>} />
        </Routes>
    )
  }

}



export default App;

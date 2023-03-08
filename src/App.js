
import './App.css';
import { Routes, Route,  useLocation ,} from 'react-router-dom'

//-------------page/ component imports---------------
import CultivatorHomePage from './Components/CultivatorAppHomePage'
import LogIn from './Components/Login'
import UserHomepage from './Components/UsersHomePage';
import CultivatorAppStates from './context/CultivatorAppStates';


function App() {
  return (
    <>
      <div className="axiosLoading"></div>
      <AppRoutes/>
    </>
  )
function AppRoutes(){
    return (
      <CultivatorAppStates>
        <Routes>
          <Route path='/' element={<CultivatorHomePage />} />
          <Route path='/app/login' element={<LogIn/>} />
          <Route path='/app/userhomepage' element={<UserHomepage/>} />
          <Route path='*' element={<div><h4>From React JS: Page Not Found</h4></div>} />
        </Routes>
      </CultivatorAppStates>  
    )
  }

}



export default App;

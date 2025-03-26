import { UserMoneyInfoProvider } from './store/UserMoneyInfoStore'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WelcomeComponent from './Pages/WelcomePage/welcome';
import UserInfo from './Pages/GatherUserInforPage/userInformation';
import './App.css'



function App() {
  return (
    <UserMoneyInfoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeComponent/>} />
          <Route path="/get-started" element={<UserInfo/>}/>

          
        </Routes>
      </BrowserRouter>
    </UserMoneyInfoProvider>
  );
}

export default App


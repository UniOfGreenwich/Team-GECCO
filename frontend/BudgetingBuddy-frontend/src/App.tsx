import { UserMoneyInfoProvider } from './store/UserMoneyInfoStore'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WelcomeComponent from './Components/Welcome-Component/welcome';
import './App.css'



function App() {
  return (
    <UserMoneyInfoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeComponent/>} />

          
        </Routes>
      </BrowserRouter>
    </UserMoneyInfoProvider>
  );
}

export default App



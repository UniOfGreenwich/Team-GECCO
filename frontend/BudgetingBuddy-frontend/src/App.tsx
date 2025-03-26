import { UserMoneyInfoProvider } from './store/UserMoneyInfoStore';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomeComponent from './Pages/WelcomePage/welcome';
import UserInfo from './Pages/GatherUserInforPage/userInformation';
import AboutUs from './Pages/AboutUsPage/aboutus';
import Contact from './Pages/ContactPage/contact';
import Help from './Pages/HelpPage/help';
import Privacy from './Pages/PrivacyPage/privacy';
import './App.css';

function App() {
  return (
    <UserMoneyInfoProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomeComponent />} />
          <Route path='/get-started' element={<UserInfo />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/help' element={<Help />} />
          <Route path='/privacy' element={<Privacy />} />
        </Routes>
      </BrowserRouter>
    </UserMoneyInfoProvider>
  );
}

export default App;

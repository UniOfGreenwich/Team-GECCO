import { UserMoneyInfoProvider } from "./store/UserMoneyInfoStore";
import { UserInfoContextTypeProvider } from "./store/UserInformationStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WelcomeComponent from "./Pages/WelcomePage/welcome";
import UserInfo from "./Pages/GatherUserInforPage/userInformation";
import AboutUs from "./Pages/AboutUsPage/aboutus";
import Contact from "./Pages/ContactPage/contact";
import Help from "./Pages/HelpPage/help";
import Privacy from "./Pages/PrivacyPage/privacy";
import SignIn from "./Pages/SignInPage/signin";
import Dashboard from "./Pages/DashboardPage/dashboard";
import Selection from "./Pages/SelectionPage/selection";

import Car from "./Pages/CarFinancePage/CarFinancePage";
import Mortgage from "./Pages/MortgagePage/mortgage";
import MortgageCalculatorPage from "./Pages/MortgageCalculator/mortgageCalculator";
import CarFinancePage from "./Pages/CarFinancePage/CarFinancePage";
import FinancialQuizPage from "./Pages/FinancialQuizPage/FinancialQuizPage";
function App() {
  return (
    <UserInfoContextTypeProvider>
      <UserMoneyInfoProvider>
        <BrowserRouter>
          <Routes>
            {/* Existing Routes */}
            <Route path="/" element={<WelcomeComponent />} />
            <Route path="/get-started" element={<UserInfo />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/selection" element={<Selection />} />

            <Route path="/car" element={<Car />} />
            <Route path="/mortgage" element={<Mortgage />} />
            <Route path="/mortgage-page" element={<MortgageCalculatorPage />} />
            <Route path="/car-finance-page" element={<CarFinancePage />} />

            <Route path="/financial-quiz" element={<FinancialQuizPage />} />
          </Routes>
        </BrowserRouter>
      </UserMoneyInfoProvider>
    </UserInfoContextTypeProvider>
  );
}

export default App;

# ELEE1149-Project-Template

INTRODUCTION/OVERVIEW 
 This project involves creating a budget-saving website that helps users track their savings goals. The website will allow users to select different savings categories (e.g., mortgage, car, custom) and calculate how much they need to save over time. The platform will provide visualizations of the savings progress via a dashboard with pie charts. Users can either create an account to save their data or use the website without an account, with the option to export their dashboard data as a PDF. This will be targeting towards individuals looking to plan and track their savings goals, such as saving for a house, car, or other custom financial goals. Individuals who lack disicpline and have little money and therefore need to budget, or those who are just not good at budgeting. 

 PROJECT GOALS
 User registration and authentication (optional for basic functionality).
 Savings goal creation (mortgage, car, customer, etc.).
 Automated calculation of required savings.
 Pie chart dashboard visualization for savings goals.
 Option to save dashboards and data.
 PDF export functionality for unauthenticated users.
 In terms of user stories:
 As a user, I can create an account to save my goals and access them later.
 As a user, I can select different types of savings (mortgage, car, etc.) and calculate how much I need to save monthly or weekly.
 As a user, I can view a visual pie chart of my savings progress.
 As a user, I can print my savings dashboard or save it as a PDF without needing an account.
 
PERFORMANCE REQUIREMENTS
Load times- Page should load within 3 seconds.
Dashboard data should render dynamically without delay.
Scalability- The system should be able to handle up to 1000 active users concurrently without performance degradation.
API calls- API calls should return results within 2 seconds for calculations and dashboard/pie chart updates

FRONT END
Technologies:
HTML5, SCSS, TypeScript for core frontend development.
React.js  for building interactive components like forms, dashboards, and charts.
Chart.js for creating dynamic, interactive pie charts for savings goals.
Key Components:
Dashboard: Displays pie charts of current savings progress for selected goals.
Savings Calculator: Allows users to input their target amounts, timeframe, and calculates monthly or weekly savings needed.
Goal Type Selection: Dropdown or option menu for selecting mortgage, car, or custom savings goals.
Account Management: Forms for account creation, login, and dashboard access (if authenticated).
PDF Export: Button for users to export/save their dashboard as a PDF (available for unauthenticated users too).
UI/UX Requirements:
Clean, simple design with easy navigation.
Mobile-responsive to ensure accessibility on all devices.
Real-time pie chart updates based on user input.
Intuitive user input forms with validation (e.g., amounts, dates, etc.).

BACK END
Technologies:
Springboot and java for RESTful API endpoints.
Database: MongoDB 
Authentication: JWT tokens for session management and user authentication.
Key Features:
User Registration and Login: Endpoints for user registration, login, and account management (e.g., password reset).
Savings Goal Creation and Management: API endpoints for creating, updating, and deleting savings goals.
Calculations: Backend logic to calculate savings per goal (monthly or weekly), based on user input.
PDF Generation: Use a library like pdf-lib 
Database Requirements:
Users: Store user credentials (encrypted), account details.
Savings Goals: Store each user’s savings goals, amounts, timeframes, and progress.
Analytics: Track usage metrics (optional for future reporting).22

TESTING REQUIREMENTS
Unit Testing:
Unit tests for backend calculations and logic (e.g., savings goal calculation).
Frontend tests for user interactions (e.g., form submissions, chart updates).
Integration Testing:
Test API endpoints with mock data to ensure proper functionality.
Test frontend-backend interaction (e.g., submitting a savings goal and updating the dashboard).
Performance Testing:
Load testing to ensure the website can handle high traffic
User Acceptance Testing:
Real-world testing with end-users to verify the usability of the platform.

FUTURE WORK & PRODUCT MAINTENANCE
Future Features:
Multi-currency support (for international users).
Integration with third-party financial tools (e.g., bank APIs, budgeting tools).
Mobile app version for greater user accessibility.
AI-driven recommendations for saving strategies based on user data.
Product Maintenance:
Regular bug fixes, especially after major releases.
Security updates and patching to protect user data.
Performance optimisations based on usage analytics.
Continuous feature updates based on user feedback.


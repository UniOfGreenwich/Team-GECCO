# Budgeting Buddy Requirements Gathering

INTRODUCTION/OVERVIEW 
This project involves creating a budget-saving website that helps users track their savings goals. The website will allow users to select different savings categories (e.g., mortgage, car, custom-saving) and calculate how much they need to save over time. The platform will provide visualizations of how a user can budget their monthly wage between: monthly expenses (inputted by the user), any budget they interactive with (mortgage deposit saving, car finance etc) and work with the user to get to a place they feel confident with how they spend their money. Users can either create an account to save their data for when the next log on or use the website without an account and have their data available only temporarily. This will be targeting towards individuals looking to plan and track their savings goals, such as saving for a house, car, or other custom financial goals. As well as individuals who lack financial disicpline and visualising spending money habits which therefore making the need to budget apparant.

 PROJECT GOALS
 User registration and authentication (optional for basic functionality).
 Savings goal creation (mortgage, car, customer, etc.).
 Automated calculation of required savings.
 Option to save dashboards and data.
 In terms of user stories:
 As a user, I can create an account to save my goals and access them later.
 As a user, I can select different types of savings (mortgage, car, etc.) and calculate how much I need to save monthly.
 As a user, I can revisit my savings dashboard in order to achieve long term goals.
 
PERFORMANCE REQUIREMENTS
Load times - Page should load within 3 seconds.
Dashboard data should render dynamically without delay.
Scalability - The system should be able to handle up to 1000 active users concurrently without performance degradation.
API calls - API calls should return results within 2 seconds for calculations and dashboard updates.

FRONT END
Technologies:
HTML5, SCSS, TypeScript for core frontend development.
React.js  for building interactive components like forms, dashboards, and charts.
Chart.js for creating dynamic, interactive pie charts for savings goals.
Key Components:
Dashboard: Displays dashboard of current savings progress for selected goals.
Savings Calculator: Allows users to input their target amounts, timeframe, and calculates monthly or weekly savings needed.
Goal Type Selection: Option menu for selecting mortgage, car, or custom savings goals.
Account Management: Forms for account creation, login, and dashboard access (if authenticated).
UI/UX Requirements:
Clean, simple design with easy navigation.
Mobile-responsive to ensure accessibility on all devices.
Real-time dashboard updates based on user input.
Intuitive user input forms with validation (e.g., amounts, dates, etc.).

BACK END
Technologies:
Springboot and java for RESTful API endpoints.
Database: SQL 
Key Features:
User Registration and Login: Endpoints for user registration, login, and account management (e.g., password reset).
Savings Goal Creation and Management: API endpoints for creating savings goals.
Calculations: Backend logic to calculate savings per goal (monthly or weekly), based on user input.
Database Requirements:
Users: Store user credentials (encrypted), account details.
Savings Goals: Store each user’s savings goals, amounts, timeframes, and progress.
Analytics: Track usage metrics (optional for future reporting).22

TESTING REQUIREMENTS
Unit Testing:
Unit tests for backend calculations and logic (e.g., savings goal calculation).
Frontend tests for user interactions (e.g., form submissions, chart updates).
Integration Testing:
Test API endpoints with mock data to ensure thorough testing of functionality.
Test frontend-backend interaction (e.g., submitting a savings goal and updating the dashboard).
Performance Testing:
Load testing to ensure the website can handle high traffic
User Acceptance Testing:
Real-world testing with end-users to verify the usability of the platform.

FUTURE WORK & PRODUCT MAINTENANCE
Future Features:
Integration with third-party financial tools (e.g., bank APIs, budgeting tools).
Mobile app version for greater user accessibility.
AI-driven recommendations for saving strategies based on user data.
Product Maintenance:
Regular bug fixes, especially after major releases.
Security updates and patching to protect user data.
Performance optimisations based on usage analytics.
Continuous feature updates based on user feedback.


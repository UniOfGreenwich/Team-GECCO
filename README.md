# ELEE1149-Project-Template

## To start the application

### Frontend:

1) Clone the repository and open the folder in prefered IDE (recommended VSCode).
2) Type: "cd frontend" in your preferred IDE terminal.
3) Run "npm install" in terminal.
4) Run "npm run dev" in terminal.
5) Follow the link to loalhost:PORT


### Backend:

1) Clone the repository and open the folder in the preferred IDE (recommeneded Intellji)
2) Type "cd backend" into your preferred IDE terminal.

Option 1: Log-In System:
3) type "cd LogInSystem"
4) run "./gradlew clean build"
5) start the application when ready.

Option 2: Budgeting Calculator
3) tupe "cd budgetingCalculator" in your preferred IDE terminal.
4) run "./gradlew clean build" in preferred IDE terminal.
5) start the application when ready.



## Branching Strategy 

The branching strategy employs a naming convention that clearly links branches to specific to Kanban tickets, promoting traceability and organization. The "Feature/" prefix indicates a new feature branch, differentiating it from other branch types like bug fixes or hotfixes. The subsequent components ("Ticket-frontendDiscovery-design") directly reflect the Kanban ticket's information, specifically highlighting the project ("Budgeting Project" implied but not explicitly included for brevity), the component ("Frontend"), and the stage of development ("Discovery," "Design"). This granular approach allows developers to easily identify the purpose of each branch, simplifies merging and management, and provides a clear audit trail linking code changes to specific requirements. The strategy enhances collaboration by providing a standardized and readily understandable system for managing multiple parallel development efforts within a larger project.

Main -> Feature[Insert Specific Branch] -> Ticket[Insert Specific Workload]

An example of a ticket called "Budgeting Project | Frontend | Discovery | Design" would have a Branch Name of: "Feature/Ticket-frontendDiscovery-design"
Another example of a ticket called "Budgeting Project | Backend | Discovery | Architecture Set Up" would have a Branch Name of: "Feature/Ticket-backendDiscovery-architectureSetUp"


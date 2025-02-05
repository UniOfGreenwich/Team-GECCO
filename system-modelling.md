## Architecture Diagram

```mermaid
flowchart TD
    C("Finance Frontend") --> R{"Register Backend"}
    R -- Sends username, password & email --> DB["Database"]
    DB -- Stores hashed password, username & email --> R
    R -- On success, sends 200
        on error, sends error --> C
    C <-- (Sends token + username to backend)
    ______
    (if succesful sends back the data to the user) --> U{"User Data Backend"}
    U <-- sends token + username to the db runs check and sends back required data --> DB
    L{"Login Backend"} <-- username sent to db to grab right user data
    ____
    sends back the required data --> DB
    n5["n5"] <-- sends username + password --> L
    n2["n2"]
    n4["n4"]
    n5@{ shape: anchor}
    n2@{ shape: anchor}
    n4@{ shape: anchor}
     U:::tokenNote
    classDef tokenNote fill:#f7f7f7,stroke:#f00,stroke-width:1px

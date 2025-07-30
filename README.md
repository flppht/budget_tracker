# Budget Tracker application

* create .env file in client and add `REACT_APP_SERVER_URL=http://localhost:3001`
* create .env file in server and add 
            `DB_USERNAME=username or postgres`
            `DB_DATABASE=name of the database`
            `DB_PASSWORD=your postgres password`
            `JWT_SECRET=your secret`
* create .env file in docker and add 
            `POSTGRES_USER=username or postgres`
            `POSTGRES_PASSWORD=your postgres password`
            `POSTGRES_DB=name of the database`

to run application locally with docker, navigate to docker folder and run "docker-compose up -d --build"


deployed application -> https://budget-tracker-app-flp.netlify.app

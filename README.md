# TheAACodingAssessment

A simple car CRUD app built with Next.js 13+, TypeScript, TailwindCSS, and the App Router.

## Features
View a list of cars
Add a new car
View details of a car
Delete a car
In-memory data (no database required)

## Tech Stack

Next.js 13+
TypeScript
Tailwind CSS
App Router (src/app)
API Routes via app/api/
Jest + RTL

## Starting the App:
1. Clone the Repository:
```
    git clone https://github.com/J-Tajheria/TheAACodingAssessment.git
    cd car-app
```

2. Install Dependencies:
```
    npm install
```

3.  Run the Development Server:
```
    npm run dev
```
Then open your browser and go to:
    http://localhost:3000

## Usage Guide:
### Home Page:
    Displays all cars in a responsive grid
        Shows:
            Make & model
            Year
            VRN (Vehicle Reg No.)
            Health status (Good / Fair / Poor)
            Fault count

### Add a Car
    Click “+ Create New Car” (top right)
    Fill out the form:
        Make, Model, Year, VRN
        HealthStatus and FaultCount are randomly generated
        Click Submit to save

### View a Car's Details
    Click on any car in the list
    Opens a detail page showing:
        All car info
        Health status badge

### Delete a Car
    On the home page, click “Delete” under a car
    This removes it from the in-memory store

## Running Tests:
Basic tests are set up using Jest + React Testing Library.
```
npm run test
```

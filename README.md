# React Tutorial using MERN stack
Build a complete React app, step-by-step with the MERN stack

## Introduction
This is a tutorial to get started with React, using the MERN stack. You will
not only learn React, but also associated environment and complimentary tools
such as Mongo, Express, gulp etc.

The complete step-by-step instructions will be available on [Hashnode](https://hashnode.com)
in a story titled React Tutorial using MERN stack. I will update the actual link
here once I am done publishing that story.

## 1. Hello World

### 1.1 index.html as a file
Create index.html as a file, use all scripts (react, react-dom, babel) from CDN.
Write a Hello World element within the HTML between `<script>` tags.

### 1.2 Serve it up
Use Node and Express to serve the HTML file.

## 2. Organize
Transform the JSX into JS at build-time rather than at run-time.

### 2.1 Split HTML and JSX
Split JSX and HTML into separate files.

### 2.2 Manual transform
Serve a transformed JSX rather than the JSX itself.

## 3. Compose Components
Start building a simple CRUD app.

### 3.1 Use React.createClass
Use React.createClass to create a class and render it instead of rendering
a DOM element directly in ReactDOM.render().

### 3.2 Compose
Create a component by using other components.

### 3.3 Communicate
Communicate between components using props

### 3.4 Dynamic composition
Create multiple components dynamically based on data

## 4. Dynamic Updates
Dynamically update the data model and re-render.

### 4.1 Create initial state
Start using state, prepare for dynamic updates.

### 4.2 Update state
Dynamically update the state and see the magic.

### 4.3
Communicate from child to a parent component.

## 5. Data on server
Move data to the server.

### 5.1 GET API
Implement a GET API on the server to return a list of records.

### 5.2 POST API
Implement a POST API to add a new record.

### 5.3 Use the GET API
Change client code to fetch data from server.

### 5.4 Use the POST API
Change client code to send data to server for Add record.

## 6. Save to database
Persist the data in a database.

### 6.1 Initialize
Write a script to initialize a MongoDB collection.

### 6.2 Connect and Read
Create a permanent connection to the DB, change GET API to read from DB.

### 6.3 Write to DB
Change POST API to insert a record into the DB.

## 7. Build and Bundle
Modularize, use browserify to serve a bundle of all scripts.

### 7.1 browserify
Use browserify to create a bundle manually.

### 7.2 Automate with gulp
Use gulp to automate the manual tasks.

### 7.3 Watchify
Use watchify to watch the source file for changes and auto-build.

### 7.4 Error handling
Log errors in the source file while watching.

### 7.5 Modularize
Split the single source file into multiple.

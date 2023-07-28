# Geo Tracking App
Use `Geo Tracking App` when you need to explore and create new places all over the world. Just launch the app, log in and can now create, retrieve and manipulate the information you need.\
The application is `responsive` to all display types.

## Usage
`Geo Tracking App` allows logged in users to browse the map using integrated map component of `Google Maps API` as well as create new locations. There is a navigation bar through which users can access the various pages of the application.

`Map` page - from the map page, users can create their own locations by first marking the desired location by double-clicking on the map, after which they must fill in additional information about their location such as name, description, and category. For a better UX, there are checks implemented for all fields from the map page.
All fields in the map page for creating a new location are checked for the length of the entered text. There is a check if a location is selected before creation. When trying to create a location with the same coordinates, an alert window pops up. There is also a notification when a new location is successfully created.\

`Points List` page - users can view already created locations as well as edit, delete and mark them directly on the map using the corresponding buttons for this. Users can filter by name, description or category among already created locations, as well as sort in ascending and descending order by name, description or category. Created text length check in `edit form' fields.

`Login` page - when user try to log in, a check is made for the correct email format and length of user's password.

## Technologies involved
The following technologies are used in the Geo Tracking App:\
`JavaScript, React, HTML, CSS`

## How to start the app
All you have to do is run the following commands in the project directory:

`npm install` - to install the required "Dependencies" 
`npm start` - to start the app

The application will then run in your browser on [http://localhost:3000](http://localhost:3000)\
The page will reload when you make changes. You may also see any errors in the console.


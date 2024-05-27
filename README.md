# TickIt - Frontend

## Demo & Snippets

- An example of an empty to-do list

  ![alt text](<screenshots/Screenshot 2024-05-27 185623.png>)

- An example of a to-do list with some basic examples

  ![alt text](<screenshots/Screenshot 2024-05-27 184850.png>)

- An example of an entry in edit mode.

  ![alt text](<screenshots/Screenshot 2024-05-27 184957.png>)

- An example of the user notifications.

  ![alt text](<screenshots/Screenshot 2024-05-27 185037.png>)

---

## Description / Requirements

TickIt is a fully functional to-do list application, with the ability to create, update and delete to-do entries, as well as the ability to "tickit" off and mark the task as completed. The application was built using a React TypeScript frontend, with a Java SpringBoot backend and a MySQL database. 

With this project, the plan was to practice and implement how to:

- Create and implement all parts of a functional fullstack application. 
- Use SpringBoot to act as a backend between a MySQL database and a React TypeScript frontend.
- Use React TypeScript as a frontend framework.
- Handle errors in both the front and backends correctly and efficiently.
- Perform CRUD operations in a fullstack format.
- Integrate React-Testing Library to test the frontend functionality. 
- Integrate Swagger-UI and Log4j into the backend, for better developer and user experience, as well as accurate and useful documentation. 

Project Requirements:

Create a backend with Spring that can create, update, read and delete todos from a MySQL database. Along with this create a frontend application with React that interacts with this backend.

Frontend:

- Ability to add, complete, delete and edit to-dos
- Typescript & testing with React Test Library
- All errors must be handled and passed on properly back to the user (toast notifications are a good way of doing this)
- Must look polished, there is an example image attached to this spec and there are hundreds of examples of good looking todo apps online

Backend:

- All endpoints must be error handled such that they return the correct status codes and messages.
- Implement a logging strategy for requests being processed (there are loads of recourse you can find via google to do this)
  - Log4j
- Use spring swagger to generate documentation for your API

---

## Build Steps

Clone the repository, and from the directory, run the following commands:

```
npm install
```

```
npm run dev
```

**Note:** To use this application correctly, you must have the backend and database setup and running correctly. 
The link to the backend repository: https://github.com/iHeslop/TickIt-backend

---

## Design Goals / Approach

- I wanted TickIt to be a minimalistic and efficient application, which smoothly and cohesively allows the user to add, update and delete entries easily.
- I wanted to integrate toast notifications as efficiently as possible to relay messages to the user easily and simply.
- Whilst the concept of this application is relatively simple, I wanted to use clean coding practices as much as possible, including using contexts where necessary instead of prop drilling, as well as having organized and well thought out components that are easy to scale and update/change in the future if add any extra features.
- Wanted to keep the whole application as a SPA, for ease of user use and functionality. 

---

## Features

- **Create Entries:** Ability to create a to-entry.
- **Update and Delete:** Ability to update and delete to-do entries.
- **Toast Notifications:** Updates on the backend are passed onto the user through toast notifications, to enhance overall user experience. (e.g. "To-do Entry deleted")
- **Incomplete/Completed Tabs:** To-do entries are filtered into those that have been completed and those that haven't, so users can keep track of completed entries, as well as easily display the incomplete entries. 
- **Testing:** In-depth testing of each component, to make sure the application functions and works as intended. 
- **Design and Aesthetic:** Simple minimalistic design for ease of user use as well as for overall aesthetic and design.

---

## Technologies:

- **React**
- **TypeScript**
- **SCSS**

---

## Known issues

- If backend fails then the application does not function. Reliant on the backend and database to be set up and operating correctly to work.

---

## Future Goals

- Search feature
- More in-depth sort and filtering systems
- Add categories to the entries
- User Authentication
- Pagination (rather than scrolling)
- Mobile Responsive Design
- Deploy application

---

## Struggles

- Management of state and context, being an SPA, making sure everything updated and displayed correctly.
- Passing user information from the backend in the frontend. 

---

## More Information

- This project is paired with the backend repository: https://github.com/iHeslop/TickIt-backend

---

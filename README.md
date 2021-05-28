# Focus

Focus is a productivity app developed using ReactJs and Firebase

**Click [Here](https://distracted-johnson-10e2a4.netlify.app/) to give it a try or watch the [Demo](https://youtu.be/UOmQNyJLYKw)**



## Technology Used

- **React** (FrontEnd)
  - **Material-UI** 
  - **react-router-dom**
  - **react-modal** 
  - **react-bootstrap** 
  - **react-datepicker**
- **Firebase** - Baas (Backend as a Service)
  - **Firestore** 
  - **Authentication**
    - LogIn & SignUp functionality using Email and Password verification    
  - **Storage** 
 

## Functionalities

### Add tasks

User can add a task and schedule it. The task gets categorized based on the schedule and importance(Appears in the Inbox). User can later update the task as complete or delete the task.

### Add notes

User can create a new project and store the notes related to it. User can update the note or delete the project.


### Context API

- **useAuth** - This provides the functions related to Login and Logout and help in better state management.


## Setup (deveopment)

- Clone the repo, and cd into it
- Install all the dependcies from package.json
- Create a firebase project and enable Email-Password Authentication
- Place your firebase project Keys inside the Firebase.js file
- Run app by typing `npm start` in command line

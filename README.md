# Chattastic

Chattastic is a real-time chat application designed to provide seamless communication. Leveraging the power of Next.js v14 and TypeScript, this application offers a modern and efficient chatting experience. The styling is crafted using the expressive and utility-first CSS framework, Tailwind CSS.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Authentication](#authentication)
- [Chat Features](#chat-features)
- [User Status and Last Online Time](#user-status-and-last-online-time)
- [Deployment](#deployment)
- [License](#license)

## Features
- **Real-Time Communication:** Enjoy instant messaging with real-time updates, creating a dynamic and responsive chat environment.
- **Firebase Integration:** Chattastic utilizes Firebase as a "backend" for storing and managing chat data, ensuring reliability and scalability.
- **User Authentication:** Secure your chats with user authentication, allowing only authorized users to participate in the conversation.
- **Responsive Design:** Chattastic is built with a responsive design, ensuring an optimal experience across various devices and screen sizes.

## Technologies
- **Next.js v14:** The application is developed on the latest version of Next.js, providing a powerful and flexible framework for building React applications.
- **TypeScript:** Chattastic is predominantly written in TypeScript, offering static typing for improved code quality and developer productivity.
- **Tailwind CSS:** Styling is done using Tailwind CSS, facilitating rapid development and easy customization.
- **Firebase:** Firebase serves as the "backend" for Chattastic, offering real-time database functionality, authentication, and more.

## Getting Started
To get started with Chattastic, follow these steps:

1. Clone the repository: `git clone https://github.com/RuanCampello/chattastic.git`
2. Install dependencies: `npm install`
3. Set up Firebase:
    - Create a project on the [Firebase Console](https://console.firebase.google.com/).
    - Obtain your Firebase configuration (API keys, etc.).
    - Add the configuration to the appropriate file in your project.
4. Run the development server: `npm run dev`

## Usage
Once the application is set up, users can register with the following information:
- Name
- E-mail
- Username (important for searching and connecting with other users)
- Password

To find and connect with other users, use their usernames. For logging in, users only need to provide their e-mail and password.

## Authentication
Chattastic's authentication process involves collecting user details during the registration process, including a name, e-mail, username, and password. To search for and connect with other users, the username is crucial. However, for logging in, users only need to provide their e-mail and password.

## Chat Features
Chattastic's chat functionality includes:
- **Real-Time Messaging:** Experience instant communication with real-time updates.
- **Multimedia Support:** Share images and emojis in your messages.
- **Message Timestamps:** View the time of each message for better context.
- **Message Replies:** Enhance interactivity by replying to your own or another user's messages.

## User Status and Last Online Time
Chattastic enhances user engagement with the following features:
- **User Status:** Easily identify whether a user is online, away, or offline.
- **Last Online Time:** If a user is offline, Chattastic displays their last online time, providing additional context.

## Deployment
The application is deployed on Vercel. You can access the live version at [https://chattastic.vercel.app/](https://chattastic.vercel.app/).

## License
This project is licensed under the [MIT License](LICENSE).

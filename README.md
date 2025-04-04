# Store App (React Native/ Expo CLI)
This is a full-featured e-commerce mobile application built with React Native and Firebase. The app provides users with a seamless shopping experience, including product browsing, cart management, favorites, and secure checkout, etc.

## Features
- User authentication (Login/Signup/Logout)
- Product catalog using API call to fakestoreapi.com
- Favorites system
- Shopping cart system
- Secure checkout process
- Receipt Generation

## Screenshots
<div class="inline-block">
  <img src="https://github.com/KetanPaliwal2000/StoreApp/blob/main/Screenshot%201.png" alt="Screenshot 1" width="200">
  &nbsp;
  <img src="https://github.com/KetanPaliwal2000/StoreApp/blob/main/Screenshot%202.png" alt="Screenshot 2" width="200">
  &nbsp;
  <img src="https://github.com/KetanPaliwal2000/StoreApp/blob/main/Screenshot%203.png" alt="Screenshot 3" width="200">
  &nbsp;
  <img src="https://github.com/KetanPaliwal2000/StoreApp/blob/main/Screenshot%204.png" alt="Screenshot 4" width="200">
  &nbsp;
  <img src="https://github.com/KetanPaliwal2000/StoreApp/blob/main/Screenshot%205.png" alt="Screenshot 5" width="200">
  &nbsp;
  <img src="https://github.com/KetanPaliwal2000/StoreApp/blob/main/Screenshot%206.png" alt="Screenshot 6" width="200">
  &nbsp;
  <img src="https://github.com/KetanPaliwal2000/StoreApp/blob/main/Screenshot%207.png" alt="Screenshot 7" width="200">
  &nbsp;
  <img src="https://github.com/KetanPaliwal2000/StoreApp/blob/main/Screenshot%208.png" alt="Screenshot 8" width="200">
</div>

## Setup Instructions
### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Firebase account (for authentication and Firestore).

### Steps to Run the Project
1. Clone Repository
  - git clone [https://github.com/KetanPaliwal2000/StoreApp.git](https://github.com/KetanPaliwal2000/StoreApp.git)
3. Set Up Firebase:
  - Create a new project on the [Firebase Console](https://console.firebase.google.com/).
  - Add a web app to your Firebase project and copy the firebaseConfig variable.
  - Replace the firebaseConfig variable inside firebase.js file.
3. Install Dependencies and Start Project:
  - Open the project in VSCode.
  - npm install
  - npx expo start
4. Run the App:
  - Load a local simulator or connect a physical device via Expo Go App.
  - To run the App press (a for android / i for ios / w for web / r to refresh).

## Technologies Used
### Frontend
- React Native
- Expo
- React Navigation
- Context API (State Management)
### Backend
- Firebase Authentication
- Firestore Database
### Additional Libraries
- React Native AsyncStorage
- React Native Vector Icons

# Online Notarization Management System (Mobile)

This repository contains the mobile application code for Online Notarization Management System (ONMS), a platform for online notarization services that leverages blockchain and NFT for document storage. This mobile app interacts with the provided backend to facilitate the user experience on mobile devices.

## Features

- **User Authentication**: Users can sign in or register to access platform services.
- **Notarization Profile Creation**: Users can create a notarization profile to store their document information.
- **Notarization Service & Field Selection**: Users can choose the appropriate notary service and field for their documents.
- **Document Upload**: Users can upload their documents for notarization.
- **Session Creation**: Users can create sessions to notarize multiple documents together.
- **Notarization Status Tracking**: Users can track the progress of their notarization requests.
- **User Guide**: Provides detailed instructions and visual guidance for using the platform.
- **Responsive Design**: Ensures a seamless user experience across different devices.

## Technologies

- **Frontend**: React Native, Expo
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation
- **UI Components**: React Native Paper, React Native Elements
- **Testing**: Jest, React Native Testing Library
- **Linting**: ESLint, Prettier
- **Version Control**: Git

## Installation

Clone the repository:
```sh
git clone https://github.com/ASE-UIT/03.-Online-Notarization-Management-System-Mobile.git
cd 03.-Online-Notarization-Management-System-Mobile
```

Install dependencies:
```sh
yarn
```

Set up environment variables:
```sh
cp .env.example .env
```

Start the development server:
```sh
expo start
```

## Environment Variables

- **Backend API base URL**: `REACT_APP_API_BASE_URL=your_backend_api_base_url`

Backend project repository: [Online Notarization Management System (Backend)](https://github.com/ASE-UIT/03.-Online-Notarization-Management-System-BE)

## Running the Application

1. Make sure the backend is running.
2. Run `expo start` to start the development server.
3. Use the Expo Go app to scan the QR code and run the application on your mobile device or emulator.

## Testing

To run the unit tests:
```sh
yarn test
```

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

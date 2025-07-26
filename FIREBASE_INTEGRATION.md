# Kissan Dost - Firebase Integration

This React Native app has been integrated with Firebase for authentication and data storage.

## Firebase Services Integrated

### 1. Authentication

- User registration with email/password
- User login with email/password
- Password reset functionality
- User logout
- Authentication state persistence

### 2. Firestore Database

- Real-time crop data storage
- Weather data storage
- User-specific data separation
- CRUD operations for crops

### 3. Storage (Ready for future use)

- File upload capabilities
- Image storage for crops

## File Structure

```
config/
  firebase.ts              # Firebase configuration and initialization

contexts/
  AuthContext.tsx          # Authentication context provider

services/
  firestoreService.ts      # Firestore database operations

hooks/
  useFirestore.ts          # Custom hooks for Firestore operations

components/
  AuthWrapper.tsx          # Authentication routing wrapper
```

## Setup Instructions

1. **Install Dependencies**

   ```bash
   npm install firebase
   ```

2. **Firebase Configuration**

   - The app is already configured with your Firebase project
   - Configuration is in `config/firebase.ts`

3. **Authentication Flow**

   - Users must sign up or log in to access the main app
   - Authentication state is managed globally via AuthContext
   - Protected routes automatically redirect unauthenticated users to login

4. **Database Structure**

   ```
   crops/
     - id: auto-generated
     - name: string
     - status: "Planted" | "Growing" | "Flowering" | "Harvested"
     - plantedDate: timestamp
     - expectedHarvest: timestamp
     - health: "Poor" | "Good" | "Excellent"
     - area: string
     - userId: string (links to authenticated user)
     - createdAt: timestamp
     - updatedAt: timestamp

   weather/
     - id: auto-generated
     - temperature: number
     - humidity: number
     - rainfall: number
     - date: timestamp
     - location: string
     - userId: string
   ```

## Usage Examples

### Adding a Crop

```typescript
const { addCrop } = useCrops();

await addCrop({
  name: "Wheat",
  status: "Growing",
  plantedDate: new Date(),
  expectedHarvest: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  health: "Good",
  area: "2.5 acres",
});
```

### Authenticating a User

```typescript
const { signIn } = useAuth();

try {
  await signIn(email, password);
  // User is now authenticated
} catch (error) {
  console.error("Login failed:", error);
}
```

## Security Rules

The app follows Firebase security best practices:

- Users can only access their own data
- All operations require authentication
- Data validation on both client and server side

## Features

1. **Real-time Data Sync**: Crops data updates in real-time across devices
2. **Offline Support**: Firebase SDK provides offline support automatically
3. **User Management**: Complete user authentication flow
4. **Data Persistence**: All data is stored securely in Firestore
5. **Responsive UI**: Authentication states are handled gracefully

## Testing the Integration

1. **Sign Up**: Create a new account from the signup screen
2. **Add Crops**: Use the "Add Sample Crop" button to add test data
3. **Real-time Updates**: Open the app on multiple devices to see real-time synchronization
4. **Logout/Login**: Test authentication persistence

## Next Steps

1. **Push Notifications**: Integrate Firebase Cloud Messaging
2. **Analytics**: Add Firebase Analytics for user insights
3. **Image Upload**: Implement crop image upload using Firebase Storage
4. **Advanced Queries**: Add filtering and search capabilities
5. **Offline Mode**: Enhance offline data handling

## Firestore Security Rules

Add these rules to your Firebase console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /crops/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }

    match /weather/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

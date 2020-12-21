import { AuthProviderId } from '../enums';
import { IonngxFirebaseAuthUiConfig } from './ionngx-firebase-auth-ui-config';

/**
 * Configuration settings used when not provided or overriden
 */
export const defaultConfig: IonngxFirebaseAuthUiConfig = {
  enableFirestoreSync: false,
  firestoreCollectionName: 'users',
  guardFallbackRoute: '/',
  signInSuccessRoute: '/',
  guardProtectedRoutesUntilEmailIsVerified: true,
  passwordMaxLength: 60,
  passwordMinLength: 8,
  providers: AuthProviderId.ALL,
  requireEmailVerification: true,
  showToastMessageOnSuccess: true,
  showToastMessageOnFailure: true,
  stringResources: {
    cancel: 'Cancel',
    email: 'Email',
    emailVerifiationPending: 'Email verification is not complete',
    displayName: 'Display Name',
    enterPhoneNumber: 'Enter Phone Number',
    enterPhoneNumberMesssage: 'Enter the phone number we should send an SMS message to',
    enterVerificationCodeMessage: 'Enter Verification Code',
    notSignedIn: 'Not signed in.',
    password: 'Password',
    phoneNumber: 'Phone Number',
    profile: 'Profile',
    photoUrl: 'Photo URL',
    signIn: 'Sign In',
    signInFailureMessage: 'An unexpected error occurred, unable to sign you in.',
    signInMessage:
      'Sign in with your email and password or use one of the buttons to sign in with another account provider.',
    signInSuccessMessage: 'You were successsfully signed in.',
    signOut: 'Sign Out',
    signOutFailureMessage: 'An unexpected error occurred, unable to sign you out.',
    signOutSuccessMessage: 'You were successfully signed out.',
    signUp: 'Sign Up',
    signUpFailureMessage: 'An unexpected error occurred, unable to create an account.',
    signUpMessage:
      'Complete and submit the form below to create an account.',
    signUpSuccessMessage: 'Your account was successfully created.',
    submit: 'Submit',
    updateProfileFailureMessage: 'An unexpected error occurred, unable to update your profile.',
    updateProfileSuccessMessage: 'Your profile was successfully updated',
    userProfile: 'User Profile',
    userProfileMessage: 'Change your basic User Profile settings using the buttons adjacent to the appropriate field.',
    verificationCode: 'Verification Code'
  },
  useInvisibleReCaptha: false
};

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
    phoneNumberSignIn: 'Enter Phone Number',
    enterPhoneNumberMesssage: 'Enter the phone number we should send an SMS message to',
    enterVerificationCodeMessage: 'Enter Verification Code',
    password: 'Password',
    phoneNumber: 'Phone Number',
    profile: 'Profile',
    signIn: 'Sign In',
    signInFailureMessage: 'An unexpected error occured, unable to sign you in.',
    signInMessage:
      'Sign in with your email and password or use one of the buttons to sign in with another account provider.',
    signInSuccessMessage: 'You were successsfully signed in.',
    signOut: 'Sign Out',
    signUp: 'Sign Up',
    signUpFailureMessage: 'An unexpected error occured, unable to create an account.',
    signUpMessage:
      'Complete and submit the form below to create an account.',
    signUpSuccessMessage: 'Your account was successfully created.',
    submit: 'Submit',
    verificationCode: 'Verification Code'
  },
  useInvisibleReCaptha: false
};

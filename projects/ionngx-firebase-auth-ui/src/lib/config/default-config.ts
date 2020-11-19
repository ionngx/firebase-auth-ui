import { IonngxFirebaseAuthUiConfig } from './ionngx-firebase-auth-ui-config';

/**
 * Configuration settings used when not provided or overriden
 */
export const defaultConfig: IonngxFirebaseAuthUiConfig = {
  enableFirestoreSync: false,
  guardFallbackRoute: '/',
  signInSuccessRoute: '/',
  guardProtectedRoutesUntilEmailIsVerified: true,
  passwordMaxLength: 60,
  passwordMinLength: 8,
  requireEmailVerification: true,
  showToastMessageOnAuthenticationSuccess: true,
  showToastMessageOnAuthenticationFailure: true,
  signInLabel: 'Sign In',
  signOutLabel: 'Sign Out',
  signUpLabel: 'Sign Up',
  viewProfileLabel: 'Profile'
};

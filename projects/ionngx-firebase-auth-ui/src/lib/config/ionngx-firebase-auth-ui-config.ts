/**
 * Configuration settings supported by Ionic-Angular Firebase Authentication UI
 */
export interface IonngxFirebaseAuthUiConfig {

  /**
   * Indicates whether to sync users with Firestore
   */
  enableFirestoreSync?: boolean;

  /**
   * The route to navigate to when an unauthenticated user attempts to access a protected route
   */
  guardFallbackRoute?: string;

  /**
   * The route to navigate to when the user logs in
   */
  signInSuccessRoute?: string;

  /**
   * Indicates whether to prevent access to routes protected by the built in guard
   * untill email verification is completed
   */
  guardProtectedRoutesUntilEmailIsVerified?: boolean;

  /**
   * Maximum length allowed for passwords when creating email/password accounts
   */
  passwordMaxLength?: number;

  /**
   * Minimum length allowed for passwords when creating email/password accounts
   */
  passwordMinLength?: number;

  /**
   * Indicates whether user email must be verified when creating email/password accounts
   */
  requireEmailVerification?: boolean;

  /**
   * Indicates whether to show a toast popup message when user
   * authentication fails
   */
  showToastMessageOnAuthenticationFailure?: boolean;

  /**
   * Indicates whether to show a toast popup message when  user
   * authencation is successful
   */
  showToastMessageOnAuthenticationSuccess?: boolean;

  /**
   * The string to use where Sign In would otherwise appear
   */
  signInLabel?: string;

  /**
   * The route to navigate to when the user initiates sign in
   */
  signInRoute?: string;

  /**
   * The string to use where Sign Out would otherwise appear
   */
   signOutLabel?: string;

  /**
   * The route to navigtae to when the user initiates sign out
   */
  signOutRoute?: string;

  /**
   * The string to use where Sign Up would otherwise appear
   */
  signUpLabel?: string;

  /**
   * The route to navigate to when the user initiates sign up
   */
  signUpRoute?: string;

  /**
   * The string to use wher Profile would otherwise appear
   */
  viewProfileLabel?: string;

  /**
   * The route to navigate to when the user initiates view profile
   */
  viewProfileRoute?: string;
}

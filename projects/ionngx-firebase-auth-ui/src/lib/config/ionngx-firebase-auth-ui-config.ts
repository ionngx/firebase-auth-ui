import firebase from 'firebase';

import { AuthProviderId } from '../enums';
import { StringResources } from '../models/string-resources';

/**
 * Configuration settings supported by Ionic-Angular Firebase Authentication UI
 */
export interface IonngxFirebaseAuthUiConfig {
  /**
   * Indicates whether to sync users with Firestore
   */
  enableFirestoreSync?: boolean;
  /**
   * The name to use for the Firestore collection when syncing
   */
  firestoreCollectionName?: string;
  /**
   * The route to navigate to when an unauthenticated user attempts to access a protected route
   */
  guardFallbackRoute?: string | string[];
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
   * Specifies the authentication providers to support
   */
  providers?: AuthProviderId | AuthProviderId[];
  /**
   * Indicates whether user email must be verified when creating email/password accounts
   */
  requireEmailVerification?: boolean;
  /**
   * Indicates whether to show a toast popup message when user
   * authentication fails
   */
  showToastMessageOnFailure?: boolean;
  /**
   * Indicates whether to show a toast popup message when  user
   * authentication is successful
   */
  showToastMessageOnSuccess?: boolean;
    /**
   * The route to navigate to when the user initiates sign in,
   * allows developers to create a custom user interface
   */
  signInRoute?: string | string[];
  /**
   * A function to call when the user signs in successfully
   */
  signInSuccessCallback?: (credential: firebase.auth.UserCredential) => void;
  /**
   * A route to navigate to when the user signs in successfully
   */
  signInSuccessRoute?: string | string[];
  /**
   * The route to navigate to when the user initiates sign in with phone number,
   * allows developers to create a custom user interface
   */
  signInWithPhoneNumberRoute?: string | string[];
  /**
   * A function to call when the user signs out
   */
  signOutSuccessCallback?: () => void;
  /**
   * A route to navigtae to when the user initiates sign out,
   * allows developers to create a custom user interface
   */
  signOutRoute?: string | string[];
  /**
   * A route to navigate to when the user successfully completes sign out
   */
  signOutSuccessRoute?: string | string[];
  /**
   * A route to navigate to when the user initiates sign up
   * allows developers to create a custom user interface
   */
  signUpRoute?: string | string[];
  /**
   * A function to call when the user successfully completes sign up
   */
  signUpSuccessCallback?: (credential: firebase.auth.UserCredential) => void;
  /**
   * A route to navigate to when the user successfully completes sign up
   */
  signUpSuccessRoute?: string | string[]
  /**
   * The set of string resources used by components, supports customisation or translation
   */
  stringResources?: StringResources;
  /**
   * Indicates whether
   */
  useInvisibleReCaptha?: boolean;

  /**
   * A function to call when an update to the user profile completes successfully
   */
  updateProfileCallback?: (user: firebase.User) => void;

  /**
   * The route to navigate to when the user initiates view profile
   */
  viewProfileRoute?: string | string[];
}

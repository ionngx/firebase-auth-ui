/**
 * The set of strings that are used for labels and messages etc.
 * Provide translations or alternatives at the point the main module for this library is intialised
 */
export interface StringResources {
  /**
   * Used for cancel button labels
   * @default 'Cancel'
   */
  cancel?: string;
  /**
   * Used for labels or placeholder for display name fields
   * @default 'Display Name'
   */
  displayName?: string;
  /**
   * Used for labels where the email address is entered
   * @default 'Email'
   */
  email?: string;
  /**
   * Used as title for user avatar when email verification is pending
   * @default 'Email verification is not complete'
   */
  emailVerifiationPending?: string;
  /**
   * Used for heading when user is prompted for phone number authentication
   * @default 'Phone Number Sign Im'
   */
  enterPhoneNumber?: string;
  /**
   * Used as the message on the sign in with phone number component
   * @default 'Enter the phone number we should send an SMS message to'
   */
  enterPhoneNumberMesssage?: string;
  /**
   * Used for heading when user is prompted for verification code
   * @default 'Enter Verification Code'
   */
  enterVerificationCodeMessage?: string;
  /**
   * Used for labels and status message when user not signed in
   * @default 'Not signed in'
   */
  notSignedIn?: string;
  /**
   * Used for labels or placeholders where a password is entered
   * @default 'Password'
   */
  password?: string;
  /**
   * Used for labels and placeholders for phone number fields
   * @default 'Phone Number'
   */
  phoneNumber?: string;
  /**
   * Used for labels and placehoder for photo url fields
   * @default 'Photo URL'
   */
  photoUrl?: string;
  /**
   * Used for labels on buttons the user can view their profile
   * @default 'Profile'
   */
  profile?: string;
  /**
   * Used for labels and headings for the sign in feature
   * @default 'Sign In'
   */
  signIn?: string;
  /**
   * Used for the toast message when authentication fails
   * @default 'An unexpected error occurred, unable to sign you in.'
   */
  signInFailureMessage?: string;
  /**
   * Used as the message on the sign in component
   * @default 'Sign in with your email and password or use one of the buttons to sign in with another account provider.'
   */
  signInMessage?: string;
  /**
   * Used for the toast meesage when user successfully signs in
   * @default 'You were successsfully signed in.'
   */
  signInSuccessMessage?: string;
  /**
   * Used for labels for sign out buttons
   * @default 'Sign Out'
   */
  signOut?: string;
  /**
   * Used for the toast message when sign out fails
   */
  signOutFailureMessage?: string;
  /**
   * Use for the toast message when suer successfully signs out
   * @default 'An unexpected error occurred, unable to create an account.'
   */
  signOutSuccessMessage?: string;
  /**
   * Used for labels and headings for the sign up feature
   * @default 'Sign Out'
   */
  signUp?: string;
  /**
   * Used for the toast message when authentication fails
   * @default 'An unexpected error occurred, unable to sign you in.'
   */
  signUpFailureMessage?: string;
  /**
   * Used as the message on the sign up component
   * @default 'Enter an email address and password to create an account.'
   */
  signUpMessage?: string;
  /**
   * Used for the toast meesage when user successfully signs up
   * @default 'Your account was successfully created.'
   */
  signUpSuccessMessage?: string;
  /**
   * Used for submit buttons   *
   * @default 'Submit'
   */
  submit?: string;
  /**
   * Used for the toast message when a user profile update fails
   * @default 'An unexpected error occurred, unable to update your profile.'
   */
  updateProfileFailureMessage?: string,
  /**
   * Used for the toast message when the user profile was successfully updated
   * @default 'Your profile was successfully updated'
   */
  updateProfileSuccessMessage?: string,
  /**
   * Used for the labels and headings for the user profile feature
   * @default 'User Profile'
   */
  userProfile?: string;
  /**
   * Uses as the message on the user profile component
   * @default 'Change your basic User Profile settings using the buttons adjacent to the appropriate field.'
   */
  userProfileMessage?: string;
  /**
   * Used as label for verification code field
   * @default 'Verification Code'
   */
  verificationCode?: string;
}

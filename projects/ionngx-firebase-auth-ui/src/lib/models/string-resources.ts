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
   * Used for labels where the email address is entered
   * @default 'Email'
   */
  email?: string;
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
   * Used for labels or placeholders where a password is entered
   * @default 'Password'
   */
  password?: string;
  /**
   * Used for labels and placeholders for phone number fields
   */
  phoneNumber?: string;
  /**
   * Used for heading when user is prompted for phone number authentication
   * @default 'Phone Number Sign Im'
   */
  phoneNumberSignIn?: string;
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
   * @default 'An unexpected error occured, unable to sign you in.'
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
   * Used for labels and headings for the sign up feature
   * @default 'Sign Out'
   */
  signUp?: string;
  /**
   * Used for the toast message when authentication fails
   * @default 'An unexpected error occured, unable to sign you in.'
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
   * Used for submit buttons
   */
  submit?: string;
  /**
   * Used as label for verification code field
   */
  verificationCode?: string;
}

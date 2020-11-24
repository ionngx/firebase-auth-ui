
import firebase from 'firebase/app';
import 'firebase/auth';

import { AuthProviderId } from '../enums';
import { AuthProvider } from '../models';

export const authProviders: AuthProvider[] = [
  {
    id: AuthProviderId.Apple,
    icon: 'logo-apple',
    title: 'Apple',
    provider: new firebase.auth.OAuthProvider('apple.com'),
  },
  {
    id: AuthProviderId.Facebook,
    icon: 'logo-facebook',
    title: 'Facebook',
    provider: new firebase.auth.FacebookAuthProvider(),
  },
  {
    id: AuthProviderId.Github,
    icon: 'logo-github',
    title: 'GitHub',
    provider: new firebase.auth.GithubAuthProvider(),
  },
  {
    id: AuthProviderId.Google,
    icon: 'logo-google',
    title: 'Google',
    provider: new firebase.auth.GoogleAuthProvider(),
  },
  {
    id: AuthProviderId.Microsoft,
    icon: 'logo-windows',
    title: 'Microsoft',
    provider: new firebase.auth.OAuthProvider('microsoft.com'),
  },
  {
    id: AuthProviderId.Twitter,
    icon: 'logo-twitter',
    title: 'Twitter',
    provider: new firebase.auth.TwitterAuthProvider(),
  },
  {
    id: AuthProviderId.Yahoo,
    icon: 'logo-yahoo',
    title: 'Yahoo',
    provider: new firebase.auth.OAuthProvider('yahoo.com'),
  },
  {
    id: AuthProviderId.EmailAndPassword,
    icon: 'mail',
    title: 'Email and Password',
  },
  {
    id: AuthProviderId.PhoneNumber,
    icon: 'phone-portrait',
    title: 'Phone',
  },
];

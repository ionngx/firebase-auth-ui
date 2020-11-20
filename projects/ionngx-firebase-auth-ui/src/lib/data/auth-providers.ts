
import { AuthProviderId } from '../enums';
import { AuthProvider } from '../models';

export const authProviders: AuthProvider[] = [
  {
    id: AuthProviderId.Apple,
    icon: 'logo-apple',
    title: 'Apple'
  }, {
    id: AuthProviderId.Facebook,
    icon: 'logo-facebook',
    title: 'Facebook'
  }, {
    id: AuthProviderId.Github,
    icon: 'logo-github',
    title: 'GitHub'
  }, {
    id: AuthProviderId.Google,
    icon: 'logo-google',
    title: 'Google'
  }, {
    id: AuthProviderId.Microsoft,
    icon: 'logo-windows',
    title: 'Microsoft'
  }, {
    id: AuthProviderId.Twitter,
    icon: 'logo-twitter',
    title: 'Twitter'
  }, {
    id: AuthProviderId.Yahoo,
    icon: 'logo-yahoo',
    title: 'Yahoo'
  }, {
    id: AuthProviderId.EmailAndPassword,
    icon: 'mail',
    title: 'Email and Password'
  }, {
    id: AuthProviderId.PhoneNumber,
    icon: 'phone-portrait',
    title: 'Phone'
  }
]

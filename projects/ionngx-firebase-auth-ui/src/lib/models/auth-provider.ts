import { AuthProviderId } from '../enums';

export interface AuthProvider {
  id: AuthProviderId;
  icon: string;
  title: string;
}

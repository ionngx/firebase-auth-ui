export interface AvatarMenuLinkItem {
  callback?: (data?: any) => void;
  data?: any;
  icon?: string;
  routerLink?: string | string[];
  text: string;
  externalUrl?: string;
}

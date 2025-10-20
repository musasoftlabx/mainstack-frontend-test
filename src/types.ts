export type ProfileProps = {
  name: string;
  emailAddress: string;
};

export type NavbarMenuItemsProps = {
  icon: React.ReactNode | string;
  item: string;
  path?: string;
};

export type ExtraLinksProps = {
  icon: React.ReactNode | string;
  title: string;
  subtitle: string;
  path?: string;
};

export type WalletProps = {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
};

export interface TabSwitcherTypes {
  buttons: {
    name: string;
    icon: React.FC;
  }[];
  valueActiveTab: string;
  onTabChange: (tab: string) => void;
}

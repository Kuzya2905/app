export interface DropdownOption {
  name: string;
  beforeIcon?: string;
  afterIcon?: string;
}

export interface DropdownTypes {
  buttonLogo: React.ReactNode;
  options: DropdownOption[];
  onOptionSelect: (option: DropdownOption) => void;
}

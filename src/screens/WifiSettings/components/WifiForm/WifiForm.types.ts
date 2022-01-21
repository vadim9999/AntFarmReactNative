export interface WifiFormProps {
  networks: string[];
  onConnect: (wifiFormValues: WifiFormValues) => void;
  onRefresh: () => void;
  initialValues: { network: string | null };
}

export interface WifiFormState {
  network: string | null;
  password: string | null;
}

export interface WifiFormValues {
  network: string;
  password: string;
}

export interface State {
  isLoading: boolean;
  networks: string[];
  connectedNetwork: string | null;
  ipAddress: string | null;
}

export enum WifiRequst {
  GetWIFIData = 'getWIFIData',
  SetWIFIData = 'setWIFIData',
  GetIP = 'getIP',
}

export type ReceivedData =
  | {
      request: WifiRequst.GetWIFIData;
      data: string[];
      router: string;
    }
  | {
      request: WifiRequst.SetWIFIData;
      ipAddress: string;
    }
  | {
      request: WifiRequst.GetIP;
      ip?: string;
    };

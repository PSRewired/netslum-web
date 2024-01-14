import { ServerApiClient } from '../clients/ServerApiClient.js';

function getUrlOverride() {
  if (!!process.env.NEXT_PUBLIC_API_URI) {
    return process.env.NEXT_PUBLIC_API_URI;
  }

  return null;
}

export const useServerApi = () => new ServerApiClient(getUrlOverride());

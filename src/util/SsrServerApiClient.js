'use server';

import { getServerHost } from './HostUtils.js';
import { ServerApiClient } from '../clients/ServerApiClient.js';

export const SsrServerApiClient = new ServerApiClient(getServerHost());

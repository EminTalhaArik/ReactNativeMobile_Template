import {request} from '@shared/api/client';

export const homeService = {
  healthCheck: () =>
    request<{status: 'ok'}>({
      path: '/health',
      method: 'get',
    }),
};

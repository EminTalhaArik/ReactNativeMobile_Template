import {request} from '@shared/api/client';
import {endpoints} from '@shared/api/endpoints';
import {ProfileDto} from '@shared/api/types';

export const profileService = {
  async getProfile(signal?: AbortSignal) {
    const endpoint = endpoints.profile.getProfile;
    return request<ProfileDto>({
      path: endpoint.buildPath(),
      method: endpoint.method,
      signal,
    });
  },
  async updateProfile(payload: Pick<ProfileDto, 'name'>) {
    const endpoint = endpoints.profile.updateProfile;
    return request<ProfileDto, Pick<ProfileDto, 'name'>>({
      path: endpoint.buildPath(),
      method: endpoint.method,
      body: payload,
    });
  },
};

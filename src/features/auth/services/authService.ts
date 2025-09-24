import {request} from '@shared/api/client';
import {endpoints} from '@shared/api/endpoints';
import {AuthCredentialsDto, RegisterDto} from '@shared/api/types';

type LoginResponse = {token: string};

type RegisterResponse = {id: string};

export const authService = {
  login(credentials: AuthCredentialsDto) {
    const endpoint = endpoints.auth.login;
    return request<LoginResponse, AuthCredentialsDto>({
      path: endpoint.buildPath(),
      method: endpoint.method,
      body: credentials,
    });
  },
  register(payload: RegisterDto) {
    const endpoint = endpoints.auth.register;
    return request<RegisterResponse, RegisterDto>({
      path: endpoint.buildPath(),
      method: endpoint.method,
      body: payload,
    });
  },
};

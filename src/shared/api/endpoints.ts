export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface EndpointDefinition<TParams = void, TRequest = unknown, TResponse = unknown> {
  method: HttpMethod;
  buildPath: (params: TParams) => string;
  validate?: (payload: TRequest) => TRequest;
}

export const endpoints = {
  auth: {
    login: {
      method: 'post',
      buildPath: () => '/auth/login',
    } satisfies EndpointDefinition<void, {email: string; password: string}, {token: string}>,
    register: {
      method: 'post',
      buildPath: () => '/auth/register',
    } satisfies EndpointDefinition<void, {email: string; password: string; name: string}, {id: string}>,
  },
  profile: {
    getProfile: {
      method: 'get',
      buildPath: () => '/me',
    } satisfies EndpointDefinition<void, void, {id: string; email: string; name: string}>,
    updateProfile: {
      method: 'put',
      buildPath: () => '/me',
    } satisfies EndpointDefinition<void, {name: string}, {id: string; name: string}>,
  },
} as const;

export type EndpointGroup = typeof endpoints;

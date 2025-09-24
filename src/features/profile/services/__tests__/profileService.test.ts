import {profileService} from '../profileService';
import {request} from '@shared/api/client';

jest.mock('@shared/api/client', () => ({
  request: jest.fn(),
}));

describe('profileService', () => {
  it('calls profile endpoint', async () => {
    (request as jest.Mock).mockResolvedValue({id: '1', email: 'test@example.com', name: 'Test'});

    await profileService.getProfile();

    expect(request).toHaveBeenCalledWith({
      path: '/me',
      method: 'get',
      signal: undefined,
    });
  });
});

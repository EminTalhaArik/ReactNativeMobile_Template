export interface ProfileDto {
  id: string;
  email: string;
  name: string;
}

export interface AuthCredentialsDto {
  email: string;
  password: string;
}

export interface RegisterDto extends AuthCredentialsDto {
  name: string;
}

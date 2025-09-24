export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
};

export type AppStackParamList = AuthStackParamList & MainStackParamList;

export type sidebarMenu = {
  iconActive: string;
  iconDisabled: string;
  menuTitle: string;
  destination: string;
};

export type LoginUserCredentials = {
  identity: string;
  password: string;
  rememberMe: boolean;
};

export type LoggedInUserPayload = {
  id: string;
  data: {
    id: string;
    email: string;
    password: string;
    role: string;
    photo: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
};

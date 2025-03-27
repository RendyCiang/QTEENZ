type subMenuType = {
  subMenuTitle: string;
  subMenuDestination: string;
};
export type sidebarMenu = {
  iconActive: string;
  iconDisabled: string;
  menuTitle: string;
  destination: string;
  subMenu: subMenuType[];
};

export type LoginUserCredentials = {
  identity: string;
  password: string;
  rememberMe: boolean;
};

export type RegisterBuyerPayload = {
  role: "Buyer" | "Seller" | "Admin";
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
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

export type RegisterBuyerCredentials = {
  namaDepan: string;
  namaBelakang: string;
  email: string;
  password: string;
  phone: string;
};

// Admin Page
export type AdminPageDashboardItems<T> = {
  key: number;
  isLoading: boolean;
  data: T;
  index: number;
};
export type GetAllVendorData = {
  id: string;
  name: string;
  location: string;
  open_hour: string;
  close_hour: string;
  status: string;
  rating: number;
  delivery_status: boolean;
};

export type GetAllVendorPayload = {
  message: string;
  data: GetAllVendorData[];
};

export type GetAllUsersData = {
  id: string;
  email: string;
  password: string;
  role: "Buyer" | "Seller" | "Admin";
  photo: string;
  phone: string;
  createdAt: string;
  updateAt: string;
};

export type GetAllUsersPayload = {
  message: string;
  data: GetAllUsersData[];
};

export type GetAllVendorRequestData = {
  id: string;
  name: string;
  vendor_name: string;
  location: string;
  open_hour: string;
  close_hour: string;
  status: "Pending" | "Approved" | "Rejected";
  email: string;
  phone: string;
  document: string;
  proposal: string;
  photo: string;
  delivery_status: boolean;
  message: string | null;
  bank_account: string;
  bank_type: string;
  createAt: string;
  updateAt: string;
};

export type GetAllVendorRequestPayload = {
  message: string;
  data: GetAllVendorRequestData[];
};

export type RegisterVendorPayload = {
  role: "Buyer" | "Seller" | "Admin";
  name: string;
  email: string;
  phone: string;
  location: string;
  open_hour: string;
  close_hour: string;
  status: string;
  rememberMe: boolean;
};

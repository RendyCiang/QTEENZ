import { boolean } from "zod";

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
  email: string | null;
  phone: string | null;
  password: string;
};
export type UpdateUserProfile = Omit<RegisterBuyerPayload, "password"> & {
  image: string;
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
  buyer: {
    id: string;
    first_name: string;
    last_name: string;
    userId: string;
    createdAt: string;
    updateAt: string;
  } | null;
  vendor: {
    id: string;
    name: string;
    location: string;
    rating: number;
    open_hour: string;
    close_hour: string;
    status: "Open" | "Close";
    bank_account: string;
    bank_type: string;
    delivery_status: boolean;
    createdAt: string;
    updateAt: string;
  } | null;
};

export type GetAllUsersPayload = {
  message: string;
  data: GetAllUsersData[];
};

export type GetUserPayload = {
  message: string;
  data: GetAllUsersData;
};

export type GetAllVendorRequestData = {
  id: string;
  name: string;
  vendor_name: string;
  location: "Kantin_Basement" | "Kantin_Lt5" | "Kantin_Payung";
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
export type GetVendorRequestPayload = {
  message: string;
  data: GetAllVendorRequestData;
};

export type RegisterVendorPayload = {
  role: "Buyer" | "Seller" | "Admin";
  name: string;
  email: string;
  phone: string;
  location: "Kantin_Basement" | "Kantin_Lt5" | "Kantin_Payung";
  open_hour: string;
  close_hour: string;
  rememberMe: boolean;
  password: string;
};

export type GetAllRequestsPayload = {
  message: string;
  data: RequestsPayload[];
};

export type RequestsPayload = {
  id: string;
  name: string;
  vendor_name: string;
  location: "Kantin_Basement" | "Kantin_Lt5" | "Kantin_Payung";
  open_hour: string;
  close_hour: string;
  email: string;
  phone: string;
  document: string;
  proposal: string;
  photo: string;
  bank_account: string;
  bank_type: string;
  createAt: string;
  updateAt: string;
  delivery_status: boolean;
  message: string | null;
  status: string;
};

export type MakeRequestPayload = {
  name: string;
  email: string;
  phone: string;
  vendor_name: string;
  location: "Kantin_Basement" | "Kantin_Lt5" | "Kantin_Payung";
  open_hour: string;
  close_hour: string;
  bank_account: string;
  bank_type: string;
  document: string;
  proposal: string;
  photo: string;
};

export type VendorMenuItem = {
  id: string;
  name: string;
  description: string;
  photo: string;
  status: string;
  vendorId: string;
  categoryId: string;
  // is_archived: boolean;
  menuVariants: {
    id: string;
    name: string;
    price: number;
    stock: number;
    menuId: string;
  }[];
  category: {
    name: string;
  };
};

export type VendorMenuItemPayload = {
  data: VendorMenuItem[];
  message: string;
};

export type UpdatePasswordSchema = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

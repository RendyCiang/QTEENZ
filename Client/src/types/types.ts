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
  //Admin Page
  id: string;
  name: string;
  location: string;
  open_hour: string;
  close_hour: string;
  status: string;
  rating: number;
  delivery_status: boolean;
  user: {
    id: string;
    photo: string;
  };
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
  status: "Pending" | "Accepted" | "Declined";
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

// User Profiles
export type GetBuyerData = {
  id: string;
  first_name: string;
  last_name: string;
  userId: string;
  createdAt: string;
  updateAt: string;
  user: {
    id: string;
    email: string;
    password: string;
    role: string;
    photo: string;
    phone: string;
    createdAt: string;
    updateAt: string;
  } | null;
};

export type GetBuyerDataPayload = {
  message: string;
  data: GetBuyerData;
};

export type GetVendorData = {
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
  vendor_name: string;
  userId: string;
  createdAt: string;
  updateAt: string;
  user: {
    id: string;
    email: string;
    password: string;
    role: string;
    photo: string;
    phone: string;
    createdAt: string;
    updateAt: string;
  } | null;
};

export type GetVendorDataPayload = {
  message: string;
  data: GetVendorData;
};

export type RegisterVendorPayload = {
  role: "Buyer" | "Seller" | "Admin";
  name: string;
  vendor_name: string;
  email: string;
  phone: string;
  location: "Kantin_Basement" | "Kantin_Lt5" | "Kantin_Payung";
  open_hour: string;
  close_hour: string;
  rememberMe: boolean;
  password: string;
  bank_account: string;
  bank_type: string;
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
  vendor_name: string;
  email: string;
  phone: string;
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
  vendor: GetAllVendorData;
  vendorId: string;
  categoryId: string;
  isArchived: boolean;
  menuVariants: {
    id: string;
    name: string;
    price: number;
    stock: number;
    menuId: string;
    rating: number;
  }[];
  category: {
    id: string;
    name: string;
  };
};

export type VendorMenuItemPayload = {
  data: VendorMenuItem[];
  message: string;
};

export type APIPayload<T> = {
  message: string;
  data: T;
};

export type GroupedMenus = {
  [vendorId: string]: {
    vendorName: string;
    vendorRating: number;
    menus: VendorMenuItem[];
  };
};

export type UpdatePasswordSchema = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type UpdateUserProfile = {
  role: string | null;
  first_name: string | null | undefined;
  last_name: string | null | undefined;
  email: string | null | undefined;
  phone: string | null | undefined;
  photo: string | null | undefined;
  password: string | null | undefined;

  namaGerai: string | null | undefined;
  vendor_name: string | null | undefined;
  location:
    | "Kantin_Basement"
    | "Kantin_Lt5"
    | "Kantin_Payung"
    | null
    | undefined;
  open_hour: string | null | undefined;
  close_hour: string | null | undefined;
  bank_type: string | null | undefined;
  bank_account: string | null | undefined;
};

export type Menu = {
  menu: string;
  variant: string;
};

export type UlasanPenggunaData = {
  vendor: string;
  rating: number;
  description: string;
  createdAt: string;
  buyer: {
    first_name: string;
  };
  items: Menu[];
};

export type UlasanPenggunaPayload = {
  message: string;
  data: UlasanPenggunaData[];
};

export type CartItem = {
  VendorMenuItem: VendorMenuItem;
  variantId: string;
  quantity: number;
};

export type CartItems = CartItem[];

export type OrderItem = {
  parentMenuId: string;
  vendorId: string;
  variantId: string;
  quantity: number;
};

export type OrderItems = OrderItem[];

export type CategoryItem = {
  id: string;
  name: string;
  photo: string;
};

export type CategoryPayload = {
  message: string;
  data: CategoryItem[];
};

export type KeuanganItem = {
  id: string;
  status_payment: string;
  createAt: string;
  order: {
    total_menu: number;
    total_price: number;
    status: string;
    delivery_status: string;
    status_pickup: string;
    buyerId: string;
    buyer: {
      first_name: string;
      last_name: string;
    };
    orderItem: {
      quantity: number;
      subtotalPerMenu: number;
      pricePerMenu: number;
      menuVariant: {
        name: string;
        price: number;
        stock: number;
        menu: {
          name: string;
        };
      };
    }[];
  };
  vendor: {
    name: string;
  };
  review?: {
    rating?: number;
    description?: string;
  };
};

export type KeuanganPayload = {
  message: string;
  totalEarnings: number;
  data: KeuanganItem[];
};

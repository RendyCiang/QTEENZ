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
  password?: string;
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
  // delivery_status: boolean;
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

  name: string | null | undefined;
  vendor_name: string | null | undefined;
  location: string | null | undefined;
  open_hour: string | null | undefined;
  close_hour: string | null | undefined;
  bank_type: string | null | undefined;
  bank_account: string | null | undefined;
  delivery_status: boolean | null | undefined;
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
    buyerName: string;
    photo: string;
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
  menuVariantId: string;
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
          photo: string;
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

// POV BUYER
export type OrderDetail = {
  id: string;
  total_menu: number;
  total_price: number;
  status: string; // adjust based on all possible values
  status_pickup: "Cooking" | "Ready" | "Picked_Up"; // adjust as needed
  delivery_location: string | null;
  delivery_status: boolean;
  createAt: string;
  updateAcceptedAt: string | null;
  updateReadyAt: string | null;
  updatePickedUpAt: string | null;
  orderItem: {
    quantity: number;
    subtotalPerMenu: number;
    pricePerMenu: number;
    menuVariant: {
      name: string;
      menu: {
        photo: string;
        name: string;
        vendor: {
          vendor_name: string;
        };
      };
    };
  }[];
  transaction: {
    id: string;
    total_price: number;
    status_payment: string;
    review: {
      id: string;
      rating: number;
    };
  };
  buyerId: string;
  buyerName: string;
};

//POV VENDOR
export type OrderDetailVendor = {
  orderId: string;
  status: string;
  statusPickup: string;
  deliveryStatus: string;
  deliveryLocation?: string;
  totalPrice: number;
  transactionStatus?: string;
  location: string;
  photo: string;
  vendorName: string;
  buyerName: string;
  userPhoto?: string;
  createAt: string;
  updateAcceptedAt: string;
  updateReadyAt: string;
  updatePickedUpAt: string;
  menuDetails: MenuDetailVendor[];
};

export type OrderDetailVendorPayload = {
  message: string;
  orders: OrderDetailVendor[];
};

export type OrderDetailPayload = {
  message: string;
  orders: OrderDetail[];
};

export type ToggleVisibilityProps = {
  value: number | string;
};

export type OrderVendorPayload = {
  message: string;
  orders: OrderDetailVendor[];
};

export type MenuDetailVendor = {
  menuName: string;
  variantName: string;
  quantity: number;
};

export type ReviewVendorSpecifiedPayload = {
  message: string;
  data: ReviewVendor[];
};

export type ReviewVendor = {
  rating: number;
  description: string;
  buyer: {
    buyerName: string;
    photo: string;
  };
};

export type GetVendorByIdPayload = {
  message: string;
  data: GetVendorByIdData;
};
export type GetVendorByIdData = {
  name: string;
  vendor_name: string;
  location: string;
  open_hour: string;
  close_hour: string;
  status: string;
  rating: number;
  delivery_status: boolean;
  user: {
    photo: string;
  };
};

export type GetHistoryBuyerPayload = {
  message: string;
  data: GetHistoryBuyerData[];
};

export type GetHistoryBuyerData = {
  id: string;
  status_payment: string;
  createAt: string;
  order: {
    id: string;
    total_menu: number;
    total_price: number;
    status: string;
    delivery_status: string;
    status_pickup: string;
    orderItem: {
      quantity: number;
      subtotalPerMenu: number;
      pricePerMenu: number;
      menuVariant: {
        id: string;
        name: string;
        price: number;
        stock: number;
        menu: {
          id: string;
          name: string;
          photo: string;
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

export type GetHistoryReviewData = {
  GetHistoryBuyerDataAll: GetHistoryBuyerData[];
};

export type GetHistoryReviewPayload = {
  message: string;
  data: GetHistoryReviewData[];
  totalEarnings: {
    vendor: string;
    totalEarnings: number;
  }[];
  averageRating: number;
  totalReviews: number;
  totalNotReviews: number;
  totalUserReviews: number;
};

export type GetListMenuVendorById = {
  message: string;
  data: VendorItemById[];
};

export type VendorItemById = {
  vendor: Vendor;
  menus: MenuItem[];
};

export type Vendor = {
  name: string;
  location: string;
  rating: number;
  open_hour: string;
  close_hour: string;
  status: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  photo: string;
  status: string;
  isArchived: boolean;
  vendorId: string;
  categoryId: string;
  menuVariants: MenuVariant[];
  category: Category;
};

export type MenuVariant = {
  id: string;
  name: string;
  price: number;
  stock: number;
  menuId: string;
};

export type Category = {
  name: string;
};

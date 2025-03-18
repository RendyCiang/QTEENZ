import { sidebarMenu } from "@/types/types";

const adminMenuList: sidebarMenu[] = [
  {
    iconActive: "/admin/dasborActive.svg",
    iconDisabled: "/admin/dasborDisabled.svg",
    menuTitle: "Dasbor",
    destination: "/admin/dasbor",
    subMenu: [],
  },
  {
    iconActive: "/admin/vendorActive.svg",
    iconDisabled: "/admin/vendorDisabled.svg",
    menuTitle: "Vendor",
    destination: "/admin/vendor",
    subMenu: [],
  },
  {
    iconActive: "/admin/penggunaActive.svg",
    iconDisabled: "/admin/penggunaDisabled.svg",
    menuTitle: "Pengguna",
    destination: "/admin/pengguna",
    subMenu: [],
  },
  {
    iconActive: "/admin/ulasanPenggunaActive.svg",
    iconDisabled: "/admin/ulasanPenggunaDisabled.svg",
    menuTitle: "Ulasan",
    destination: "/admin/ulasan",
    subMenu: [],
  },
  {
    iconActive: "/admin/permintaanActive.svg",
    iconDisabled: "/admin/permintaanDisabled.svg",
    menuTitle: "Permintaan",
    destination: "/admin/permintaan",
    subMenu: [],
  },
];

export default adminMenuList;

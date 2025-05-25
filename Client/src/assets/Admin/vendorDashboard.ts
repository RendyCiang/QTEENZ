import { sidebarMenu } from "@/types/types";

const vendorMenuList: sidebarMenu[] = [
  {
    iconActive: "/vendor/dasborActive.svg",
    iconDisabled: "/vendor/dasborDisabled.svg",
    menuTitle: "Dasbor",
    destination: "/vendor/dasbor",
    subMenu: [],
  },
  {
    iconActive: "/vendor/pesananActive.svg",
    iconDisabled: "/vendor/pesananDisabled.svg",
    menuTitle: "Pesanan",
    destination: "/vendor/pesanan",
    subMenu: [],
  },
  {
    iconActive: "/vendor/menuActive.svg",
    iconDisabled: "/vendor/menuDisabled.svg",
    menuTitle: "Menu",
    destination: "/vendor/menu/listmenu",
    subMenu: [
      {
        subMenuTitle: "Daftar Menu",
        subMenuDestination: "/vendor/menu/listmenu/:id",
      },
      {
        subMenuTitle: "Tambah Menu",
        subMenuDestination: "/vendor/menu/addmenu/:id",
      },
    ],
  },
  {
    iconActive: "/vendor/keuanganActive.svg",
    iconDisabled: "/vendor/keuanganDisabled.svg",
    menuTitle: "Keuangan",
    destination: "/vendor/keuangan",
    subMenu: [],
  },
  {
    iconActive: "/admin/ulasanPenggunaActive.svg",
    iconDisabled: "/admin/ulasanPenggunaDisabled.svg",
    menuTitle: "Ulasan",
    destination: "/vendor/ulasan/:id",
    subMenu: [],
  },
  {
    iconActive: "/vendor/pengaturanActive.svg",
    iconDisabled: "/vendor/pengaturanDisabled.svg",
    menuTitle: "Pengaturan",
    destination: "/vendor/pengaturan",
    subMenu: [],
  },
];

export default vendorMenuList;

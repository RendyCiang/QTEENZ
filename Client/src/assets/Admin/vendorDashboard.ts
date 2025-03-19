import { sidebarMenu } from "@/types/types";

const vendorMenuList: sidebarMenu[] = [
  {
    iconActive: "/vendor/dasborActive.svg",
    iconDisabled: "/vendor/dasborDisabled.svg",
    menuTitle: "Dasbor",
    destination: "/vendor/dasbor/:id",
    subMenu: [],
  },
  {
    iconActive: "/vendor/pesananActive.svg",
    iconDisabled: "/vendor/pesananDisabled.svg",
    menuTitle: "Pesanan",
    destination: "/vendor/menu/:id",
    subMenu: [],
  },
  {
    iconActive: "/venbdor/menuActive.svg",
    iconDisabled: "/vendor/menuDisabled.svg",
    menuTitle: "Menu",
    destination: "/vendor/menu/:id",
    subMenu: [
      {
        subMenuTitle: "Daftar Menu",
        subMenuDestination: "/vendor/menu/add/:id",
      },
      {
        subMenuTitle: "Tambah Menu",
        subMenuDestination: "/vendor/menu/add/:id",
      },
    ],
  },
  {
    iconActive: "/vendor/keuanganActive.svg",
    iconDisabled: "/vendor/keuanganDisabled.svg",
    menuTitle: "Keuangan",
    destination: "/vendor/keuangan/:id",
    subMenu: [],
  },
  {
    iconActive: "/vendor/pengaturanActive.svg",
    iconDisabled: "/vendor/pengaturanDisabled.svg",
    menuTitle: "Pengaturan",
    destination: "/vendor/pengaturan/:id",
    subMenu: [],
  },
];

export default vendorMenuList;

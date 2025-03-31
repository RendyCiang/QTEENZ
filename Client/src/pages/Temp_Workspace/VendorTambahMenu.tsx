import vendorMenuList from "@/assets/Admin/vendorDashboard"
import Sidebar from "@/components/admin/Sidebar"

const VendorTambahMenu = () => {
  return (
    <div>
      <Sidebar props={vendorMenuList}/>
      Ini Vendor Tambah Menu
    </div>
  )
}

export default VendorTambahMenu
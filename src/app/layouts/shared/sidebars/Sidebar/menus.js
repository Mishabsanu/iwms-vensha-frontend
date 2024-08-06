import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import ScaleIcon from "@mui/icons-material/Scale";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
const menus = [
  {
    uri: "/dashboard",
    label: "sidebar.menuItem.dashboard",
    type: "nav-item",
    icon: <DashboardIcon sx={{ fontSize: 20 }} />,
  },
  {
    uri: "/dashboard/user",
    isActiveUri: ["/dashboard/adduser", "/dashboard/edituser"],
    label: "sidebar.menuItem.userManagement",
    type: "nav-item",
    permission: "user_view",
    icon: <PeopleIcon sx={{ fontSize: 20 }} />,
  },
  {
    uri: "/dashboard/roles",
    isActiveUri: ["/dashboard/editrole", "/dashboard/addrole"],
    label: "sidebar.menuItem.roleAndPermission",
    type: "nav-item",
    permission: "role_view",
    icon: <LockPersonOutlinedIcon sx={{ fontSize: 20 }} />,
  },
  {
    label: "sidebar.menu.master",
    type: "collapsible",
    icon: <StarBorderPurple500Icon sx={{ fontSize: 20 }} />,
    children: [
      {
        uri: "/dashboard/master/production-line",
        label: "sidebar.menuItem.master.productionLine",
        isActiveUri: [
          "/master/production-line/add",
          "/master/production-line/edit",
        ],
        permission: "production_line_master_view",
        type: "nav-item",
        icon: <ScaleIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/dashboard/master/material",
        label: "sidebar.menuItem.master.material",
        isActiveUri: [
          "/master/material/add",
          "/dashboards/material/category/edit",
        ],
        permission: "material_master_view",
        type: "nav-item",
        icon: <CategoryIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/dashboard/master/inbound",
        label: "sidebar.menuItem.master.inbound",
        isActiveUri: [
          "/master/inbound/add",
          "/dashboards/material/category/edit",
        ],
        permission: "material_master_view",
        type: "nav-item",
        icon: <CategoryIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/dashboard/master/outbound",
        label: "sidebar.menuItem.master.outbound",
        isActiveUri: [
          "/master/outbound/add",
          "/dashboards/material/category/edit",
        ],
        permission: "material_master_view",
        type: "nav-item",
        icon: <CategoryIcon sx={{ fontSize: 20 }} />,
      },

      {
        uri: "/dashboard/master/vendor",
        label: "sidebar.menuItem.master.vendor",
        isActiveUri: ["/master/vendor/add", "/master/vendor/edit"],
        permission: "vendor_master_view",
        type: "nav-item",
        icon: <PersonIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/dashboard/master/customer",
        label: "sidebar.menuItem.master.customer",
        isActiveUri: ["/master/customer/add", "/master/customer/edit"],
        permission: "customer_master_view",
        type: "nav-item",
        icon: <SupportAgentIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/dashboard/master/vehicle",
        label: "sidebar.menuItem.master.vehicle",
        isActiveUri: ["/master/vehicle/add", "/master/vehicle/edit"],
        permission: "vehicle_master_view",
        type: "nav-item",
        icon: <DirectionsCarIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/dashboard/master/employee",
        label: "sidebar.menuItem.master.employee",
        isActiveUri: ["/master/employee/add", "/master/employee/edit"],
        permission: "employee_master_view",
        type: "nav-item",
        icon: <LocalOfferOutlinedIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/dashboard/master/storage-search",
        label: "sidebar.menuItem.master.storage_search",
        isActiveUri: [
          "/master/storage-search/add",
          "/master/storage-search/edit",
        ],
        permission: "storage_search_master_view",
        type: "nav-item",
        icon: <LocalOfferOutlinedIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/dashboard/master/storage-type",
        label: "sidebar.menuItem.master.storage_type",
        isActiveUri: ["/master/storage-type/add", "/master/storage-type/edit"],
        permission: "storage_type_master_view",
        type: "nav-item",
        icon: <LocalOfferOutlinedIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/dashboard/master/bin",
        label: "sidebar.menuItem.master.bin",
        isActiveUri: ["/master/bin/add", "/master/bin/edit"],
        permission: "bin_master_view",
        type: "nav-item",
        icon: <LocalOfferOutlinedIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/dashboard/master/loading",
        label: "sidebar.menuItem.master.loading",
        isActiveUri: ["/master/loading/add", "/master/loading/edit"],
        permission: "loading_master_view",
        type: "nav-item",
        icon: <DirectionsCarIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/dashboard/master/unloading",
        label: "sidebar.menuItem.master.unloading",
        isActiveUri: ["/master/unloading/add", "/master/unloading/edit"],
        permission: "unloading_master_view",
        type: "nav-item",
        icon: <DirectionsCarIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },
  {
    label: "sidebar.menu.WarehouseExecutive",
    type: "collapsible",
    icon: <StarBorderPurple500Icon sx={{ fontSize: 20 }} />,
    children: [
      {
        uri: "/dashboard/warehouseexecutive/production",
        label: "sidebar.menuItem.WarehouseExecutive.production",
        isActiveUri: ["/master/production/add", "/master/production/edit"],
        permission: "production_master_view",
        type: "nav-item",
        icon: <ScaleIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },
];

export default menus;

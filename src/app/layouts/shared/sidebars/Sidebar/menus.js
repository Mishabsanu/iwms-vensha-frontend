import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import PeopleIcon from "@mui/icons-material/People";
import ScaleIcon from "@mui/icons-material/Scale";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import WarehouseIcon from "@mui/icons-material/Warehouse";
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
  // {
  //   label: "sidebar.menu.users&roles",
  //   type: "section",
  //   children: [
  //   ],
  // },
  {
    label: "sidebar.menu.master",
    type: "collapsible",
    icon: <StarBorderPurple500Icon sx={{ fontSize: 20 }} />,
    children: [
      // {
      //   uri: "/dashboard/master/production-line",
      //   label: "sidebar.menuItem.master.productionLine",
      //   isActiveUri: [
      //     "/master/production-line/add",
      //     "/master/production-line/edit",
      //   ],
      //   permission: "production_line_master_view",
      //   type: "nav-item",
      //   icon: <ScaleIcon sx={{ fontSize: 20 }} />,
      // },
      // {
      //   uri: "/dashboard/master/material",
      //   label: "sidebar.menuItem.master.material",
      //   isActiveUri: [
      //     "/master/material/add",
      //     "/dashboards/material/category/edit",
      //   ],
      //   permission: "material_master_view",
      //   type: "nav-item",
      //   icon: <CategoryIcon sx={{ fontSize: 20 }} />,
      // },
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

      // {
      //   uri: "/dashboard/master/unit",
      //   label: "sidebar.menuItem.master.unit",
      //   isActiveUri: [
      //     "/master/unit/add",
      //     "/master/unit/edit",
      //   ],
      //   permission:"unit_master_view",
      //   type: "nav-item",
      //   icon: <MonetizationOnIcon sx={{ fontSize: 20 }} />,
      // },
      // {
      //   uri: "/dashboard/master/item-name",
      //   label: "sidebar.menuItem.master.itemName",
      //   isActiveUri: [
      //     "/master/item-name/add",
      //     "/master/item-name/edit",
      //   ],
      //   permission:"item_name_master_view",
      //   type: "nav-item",
      //   icon: <DescriptionOutlinedIcon sx={{ fontSize: 20 }} />,
      // },
      // {
      //   uri: "/dashboard/master/item-code",
      //   label: "sidebar.menuItem.master.itemType",
      //   isActiveUri: [
      //     "/master/item-code/add",
      //     "/master/item-code/edit",
      //   ],
      //   permission:"item_code_master_view",
      //   type: "nav-item",
      //   icon: <LocalOfferOutlinedIcon sx={{ fontSize: 20 }} />,
      // },
      // {
      //   uri: "/dashboard/master/grade",
      //   label: "sidebar.menuItem.master.grade",
      //   isActiveUri: [
      //     "/master/grade/add",
      //     "/master/grade/edit",
      //   ],
      //   permission:"grade_master_view",
      //   type: "nav-item",
      //   icon: <LocalOfferOutlinedIcon sx={{ fontSize: 20 }} />,
      // },
    ],
  },
  // {
  //   label: "sidebar.menu.master",
  //   type: "section",
  //   children: [
  //   ],
  // },
  // {
  //   label: "sidebar.menu.inventory",
  //   type: "collapsible",
  //   icon:<InventoryIcon sx={{ fontSize: 20 }} />,
  //   children: [
  //     {
  //       uri: "/dashboard/inventory/rawmaterial",
  //       label: "sidebar.menuItem.inventory.rawVeneer",
  //       isActiveUri: [],
  //       type: "nav-item",
  //       permission:"inventory_view",
  //       icon: <CategoryIcon sx={{ fontSize: 20 }} />,
  //     },
  //     {
  //       uri: "/dashboard/inventory/othergoods",
  //       label: "sidebar.menuItem.inventory.otherGoods",
  //       isActiveUri: [],
  //       type: "nav-item",
  //       permission:"other_goods_view",
  //       icon: <ScaleIcon sx={{ fontSize: 20 }} />,
  //     },
  //     {
  //       uri: "/dashboard/inventory/groupedveneer",
  //       label: "sidebar.menuItem.inventory.groupedVeneer",
  //       isActiveUri: [],
  //       type: "nav-item",
  //       permission:"grouped_veneer_view",
  //       icon: <MonetizationOnIcon sx={{ fontSize: 20 }} />,
  //     },
  //     {
  //       uri: "/dashboard/inventory/readysheetform",
  //       label: "sidebar.menuItem.inventory.readySheetForm",
  //       isActiveUri: [],
  //       type: "nav-item",
  //       permission:"ready_sheet_form_view",
  //       icon: <DescriptionOutlinedIcon sx={{ fontSize: 20 }} />,
  //     },
  //     {
  //       uri: "/dashboard/inventory/readyForDispatch",
  //       label: "sidebar.menuItem.inventory.readyForDispatch",
  //       isActiveUri: [],
  //       type: "nav-item",
  //       permission:"qc_view",
  //       icon: <LocalOfferOutlinedIcon sx={{ fontSize: 20 }} />,
  //     },
  //   ],
  // },
  // {
  //   label: "sidebar.menu.inventory",
  //   type: "section",
  //   children: [
  //   ],
  // },
  {
    label: "sidebar.menu.WarehouseExecutive",
    type: "collapsible",
    icon: <WarehouseIcon sx={{ fontSize: 20 }} />,
    children: [
      {
        uri: "/dashboard/grouping",
        label: "sidebar.menuItem.WarehouseExecutive.Inbound",
        isActiveUri: [],
        type: "nav-item",
        permission: "grouping_view",
        icon: <CategoryIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/dashboard/factory/smoking",
        label: "sidebar.menuItem.WarehouseExecutive.OutBound",
        isActiveUri: [],
        type: "nav-item",
        permission: "smoking_view",
        icon: <ScaleIcon sx={{ fontSize: 20 }} />,
      },
      // {
      //   uri: "/dashboard/factory/dying",
      //   label: "sidebar.menuItem.factory.dying",
      //   isActiveUri: [],
      //   type: "nav-item",
      //   permission:"dying_view",
      //   icon: <MonetizationOnIcon sx={{ fontSize: 20 }} />,
      // },
      // {
      //   uri: "/dashboard/factory/cutting",
      //   label: "sidebar.menuItem.factory.cutting",
      //   isActiveUri: [],
      //   type: "nav-item",
      //   permission:"cutting_view",
      //   icon: <DescriptionOutlinedIcon sx={{ fontSize: 20 }} />,
      // },
      // {
      //   uri: "/dashboard/factory/tapping",
      //   label: "sidebar.menuItem.factory.tapping",
      //   isActiveUri: [],
      //   type: "nav-item",
      //   permission:"tapping_view",
      //   icon: <LocalOfferOutlinedIcon sx={{ fontSize: 20 }} />,
      // },
      // {
      //   uri: "/dashboard/factory/pressing",
      //   label: "sidebar.menuItem.factory.pressing",
      //   isActiveUri: [],
      //   type: "nav-item",
      //   permission:"pressing_view",
      //   icon: <LocalOfferOutlinedIcon sx={{ fontSize: 20 }} />,
      // },
      // {
      //   uri: "/dashboard/factory/finishing",
      //   label: "sidebar.menuItem.factory.finishing",
      //   isActiveUri: [],
      //   type: "nav-item",
      //   permission:"finishing_view",
      //   icon: <LocalOfferOutlinedIcon sx={{ fontSize: 20 }} />,
      // },
    ],
  },
  // {
  //   uri: "/dashboard/production",
  //   isActiveUri: ["/dashboard/addproduction", "/dashboard/editproduction"],
  //   label: "sidebar.menuItem.ProductionBooking",
  //   type: "nav-item",
  //   permission: "production_line_master_view",
  //   icon: <InventoryIcon sx={{ fontSize: 20 }} />,
  // },
  // {
  //   uri: "/dashboard/bin",
  //   isActiveUri: ["/dashboard/editbin", "/dashboard/addbin"],
  //   label: "sidebar.menuItem.Pallet",
  //   type: "nav-item",
  //   permission: "production_line_master_view",
  //   icon: <LockPersonOutlinedIcon sx={{ fontSize: 20 }} />,
  // },
  // {
  //   label: "sidebar.menu.factory",
  //   type: "section",
  //   children: [
  //   ],
  // },
  // {
  //   uri: "/dashboard/orders",
  //   label: "sidebar.menuItem.orders",
  //   type: "nav-item",
  //   permission:"orders_view",
  //   icon: <AssignmentOutlinedIcon sx={{ fontSize: 20 }} />,
  // },
  // {
  //   uri: "/dashboard/dispatch",
  //   label: "sidebar.menuItem.dispatch",
  //   type: "nav-item",
  //   permission:"dispatch_view",
  //   icon: <LocalShippingOutlinedIcon sx={{ fontSize: 20 }} />,
  // },
  // {
  //   label: "sidebar.menu.orders&dispatch",
  //   type: "section",
  //   children: [
  //   ],
  // },
];

export default menus;

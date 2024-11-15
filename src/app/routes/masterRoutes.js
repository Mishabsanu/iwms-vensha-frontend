import Page from "@jumbo/shared/Page";

import AddInbound from "app/pages/GateEntry/Inbound/AddInbound";
import ListInbound from "app/pages/GateEntry/Inbound/ListInbound";
import AddCustomer from "app/pages/Master/CustomerMaster/AddCustomer";
import ListCustomer from "app/pages/Master/CustomerMaster/ListCustomer";
import AddMaterial from "app/pages/Master/MaterialMaster/AddMaterial";
import ListMaterial from "app/pages/Master/MaterialMaster/ListMaterial";

import AddStorageType from "app/pages/Master/StorageTypeMaster/AddStorageType";
import ListStorageType from "app/pages/Master/StorageTypeMaster/ListStorageType";
import AddVehicle from "app/pages/Master/VehicleMaster/AddVehicle";
import ListVehicle from "app/pages/Master/VehicleMaster/ListVehicle";
import AddVendor from "app/pages/Master/VendorMaster/AddVendor";
import ListVendor from "app/pages/Master/VendorMaster/ListVendor";
import InboundMiddleware from "./middleware/auth/InboundMiddleware";

import ProductionLineMiddleware from "./middleware/auth/ProductionLineMiddlewarE";
import StorageTypeMiddleware from "./middleware/auth/StorageTypeMiddleware";
import VendorMiddleware from "./middleware/auth/VendorMiddleware";
import MaterialRouteMiddleware from "./middleware/auth/materialMasterValidRoute";

import AddBin from "app/pages/Master/BinMaster/AddBin";
import ListBin from "app/pages/Master/BinMaster/ListBin";
import AddCrossDocke from "app/pages/Master/CrossDockMaster/AddCrossDock";
import ListCrossDocke from "app/pages/Master/CrossDockMaster/ListCrossDock";
import AddLoading from "app/pages/Master/Loading/AddLoading";
import ListLoading from "app/pages/Master/Loading/ListLoading";
import AddProductionLine from "app/pages/Master/ProductionLineMaster/AddProductionLine";
import ListProductionLine from "app/pages/Master/ProductionLineMaster/ListProductionLine";
import AddStorageSearch from "app/pages/Master/StorageSearchMaster/AddStorageSearch";
import ListStorageSearch from "app/pages/Master/StorageSearchMaster/ListStorageSearch";
import AddUnLoading from "app/pages/Master/Unloading/AddUnLoading";
import ListUnLoading from "app/pages/Master/Unloading/ListUnLoading";
import BinRouteMiddleware from "./middleware/auth/binMiddleware";
import BinTpyeMiddleware from "./middleware/auth/binTypeMiddleware";
import CrossDockRouteMiddleware from "./middleware/auth/crossDockerValidRoute";
import CustomerMiddleware from "./middleware/auth/customerMiddleware";
import LoadingRouteMiddleware from "./middleware/auth/loadingValidRoute";
import StorageSearchRouteMiddleware from "./middleware/auth/storageSearchValidRoute";
import UnLoadingRouteMiddleware from "./middleware/auth/unLoadingValidRoute";
import VehicleMiddleware from "./middleware/auth/vehicleMiddleware";
import ListBinType from "app/pages/Master/BinTypeMaster/ListBinType";
import AddBinType from "app/pages/Master/BinTypeMaster/AddBinType";
import ListUom from "app/pages/Master/UomMaster/ListUom";
import AddUom from "app/pages/Master/UomMaster/AddUom";
import UomMiddleware from "./middleware/auth/uomMiddleware";
import AuomMiddleware from "./middleware/auth/auomMiddleware";
import ListAuom from "app/pages/Master/AuomMaster/ListAuom";
import AddAuom from "app/pages/Master/AuomMaster/AddAuom";
import CustomerTypeRouteMiddleware from "./middleware/auth/customerTypeRouteMiddleware";
import ListCustomerType from "app/pages/Master/CustomerType/ListProductionLine";
import AddCustomerType from "app/pages/Master/CustomerType/AddCustomerType";

export const masterRoutes = [
  {
    middleware: [
      {
        element: MaterialRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/material",
        element: <Page component={ListMaterial} layout={"vertical-default"} />,
      },
      {
        path: "/master/material/add",
        element: <Page component={AddMaterial} layout={"vertical-default"} />,
      },
      {
        path: "/master/material/edit",
        element: <Page component={AddMaterial} layout={"vertical-default"} />,
      },
    ],
  },

  {
    middleware: [
      {
        element: BinTpyeMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/bin-type",
        element: <Page component={ListBinType} layout={"vertical-default"} />,
      },
      {
        path: "/master/bin-type/add",
        element: <Page component={AddBinType} layout={"vertical-default"} />,
      },
      {
        path: "/master/bin-type/edit",
        element: <Page component={AddBinType} layout={"vertical-default"} />,
      },
    ],
  },
  {
    middleware: [
      {
        element: UomMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/uom",
        element: <Page component={ListUom} layout={"vertical-default"} />,
      },
      {
        path: "/master/uom/add",
        element: <Page component={AddUom} layout={"vertical-default"} />,
      },
      {
        path: "/master/uom/edit",
        element: <Page component={AddUom} layout={"vertical-default"} />,
      },
    ],
  },
  {
    middleware: [
      {
        element: AuomMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/auom",
        element: <Page component={ListAuom} layout={"vertical-default"} />,
      },
      {
        path: "/master/auom/add",
        element: <Page component={AddAuom} layout={"vertical-default"} />,
      },
      {
        path: "/master/auom/edit",
        element: <Page component={AddAuom} layout={"vertical-default"} />,
      },
    ],
  },

  {
    middleware: [
      {
        element: ProductionLineMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/production-line",
        element: (
          <Page component={ListProductionLine} layout={"vertical-default"} />
        ),
      },
      {
        path: "/master/production-line/add",
        element: (
          <Page component={AddProductionLine} layout={"vertical-default"} />
        ),
      },
      {
        path: "/master/production-line/edit",
        element: (
          <Page component={AddProductionLine} layout={"vertical-default"} />
        ),
      },
    ],
  },

  {
    middleware: [
      {
        element: BinRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/bin",
        element: <Page component={ListBin} layout={"vertical-default"} />,
      },
    ],
  },

  {
    middleware: [
      {
        element: InboundMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/inbound",
        element: <Page component={ListInbound} layout={"vertical-default"} />,
      },
      {
        path: "/master/inbound/add",
        element: <Page component={AddInbound} layout={"vertical-default"} />,
      },
      {
        path: "/master/inbound/edit",
        element: <Page component={AddInbound} layout={"vertical-default"} />,
      },
    ],
  },
  {
    middleware: [
      {
        element: StorageTypeMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/storage-type",
        element: (
          <Page component={ListStorageType} layout={"vertical-default"} />
        ),
      },
      {
        path: "/master/storage-type/add",
        element: (
          <Page component={AddStorageType} layout={"vertical-default"} />
        ),
      },
      {
        path: "/master/storage-type/edit",
        element: (
          <Page component={AddStorageType} layout={"vertical-default"} />
        ),
      },
    ],
  },

  {
    middleware: [
      {
        element: VendorMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/vendor",
        element: <Page component={ListVendor} layout={"vertical-default"} />,
      },
      {
        path: "/master/vendor/add",
        element: <Page component={AddVendor} layout={"vertical-default"} />,
      },
      {
        path: "/master/vendor/edit",
        element: <Page component={AddVendor} layout={"vertical-default"} />,
      },
    ],
  },

  {
    middleware: [
      {
        element: CustomerMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/customer",
        element: <Page component={ListCustomer} layout={"vertical-default"} />,
      },
      {
        path: "/master/customer/add",
        element: <Page component={AddCustomer} layout={"vertical-default"} />,
      },
      {
        path: "/master/customer/edit",
        element: <Page component={AddCustomer} layout={"vertical-default"} />,
      },
    ],
  },
  {
    middleware: [
      {
        element: VehicleMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/vehicle",
        element: <Page component={ListVehicle} layout={"vertical-default"} />,
      },
      {
        path: "/master/vehicle/add",
        element: <Page component={AddVehicle} layout={"vertical-default"} />,
      },
      {
        path: "/master/vehicle/edit",
        element: <Page component={AddVehicle} layout={"vertical-default"} />,
      },
    ],
  },
  {
    middleware: [
      {
        element: BinRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/bin",
        element: <Page component={ListBin} layout={"vertical-default"} />,
      },
      {
        path: "/master/bin/add",
        element: <Page component={AddBin} layout={"vertical-default"} />,
      },
      {
        path: "/master/bin/edit",
        element: <Page component={AddBin} layout={"vertical-default"} />,
      },
    ],
  },
  {
    middleware: [
      {
        element: StorageSearchRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/storage-search",
        element: (
          <Page component={ListStorageSearch} layout={"vertical-default"} />
        ),
      },
      {
        path: "/master/storage-search/add",
        element: (
          <Page component={AddStorageSearch} layout={"vertical-default"} />
        ),
      },
      {
        path: "/master/storage-search/edit",
        element: (
          <Page component={AddStorageSearch} layout={"vertical-default"} />
        ),
      },
    ],
  },
  {
    middleware: [
      {
        element: CrossDockRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/cross-dock",
        element: (
          <Page component={ListCrossDocke} layout={"vertical-default"} />
        ),
      },
      {
        path: "/master/cross-dock/add",
        element: <Page component={AddCrossDocke} layout={"vertical-default"} />,
      },
      {
        path: "/master/cross-dock/edit",
        element: <Page component={AddCrossDocke} layout={"vertical-default"} />,
      },
    ],
  },
  {
    middleware: [
      {
        element: LoadingRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/loading",
        element: <Page component={ListLoading} layout={"vertical-default"} />,
      },
      {
        path: "/master/loading/add",
        element: <Page component={AddLoading} layout={"vertical-default"} />,
      },
      {
        path: "/master/loading/edit",
        element: <Page component={AddLoading} layout={"vertical-default"} />,
      },
    ],
  },
  {
    middleware: [
      {
        element: UnLoadingRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/unloading",
        element: <Page component={ListUnLoading} layout={"vertical-default"} />,
      },
      {
        path: "/master/unloading/add",
        element: <Page component={AddUnLoading} layout={"vertical-default"} />,
      },
      {
        path: "/master/unloading/edit",
        element: <Page component={AddUnLoading} layout={"vertical-default"} />,
      },
    ],
  },
  {
    middleware: [
      {
        element: CustomerTypeRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/customer-type",
        element: (
          <Page component={ListCustomerType} layout={"vertical-default"} />
        ),
      },
      {
        path: "/master/customer-type/add",
        element: (
          <Page component={AddCustomerType} layout={"vertical-default"} />
        ),
      },
      {
        path: "/master/customer-type/edit",
        element: (
          <Page component={AddCustomerType} layout={"vertical-default"} />
        ),
      },
    ],
  },
];

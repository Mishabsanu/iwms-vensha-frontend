const AllApis = {
  dropdownList: {
    grade: "/grade-master/dropdown-grade-master",
    crossDockerList: "/cross-dock/dropdown-cross-dock-master",
    pallete: "/pallete-master/dropdown-pallete-master",
    productionLine: "/production-line/dropdown-produntion-line-master",
    skuSearch: "/production/sku-details",
    production: "/production/get-production",
    uomList: "/uom/list-uom-without-permission",

    getCustomerByName: function (Name) {
      return `/customer/list-customer-byId?customer_name=${Name}`;
    },
    skuDetails: function (sku_code) {
      return `/production/sku-all-details?sku_code=${sku_code}`;
    },

    roles: "/role/dropdown-roles-master",
    vendor: "/inbound/list-vendor-without-permission",
    storage_type: "/bin/list-storage-type-without-permission",
    bin_type: "/bin-type/list-bin-type-without-permission",
    transporter: "/transporter/list-transporter-without-permission",
    vehicle: "/inbound/list-vehicle-without-permission",
    customer: "/inbound/list-customer-without-permission",
    customer_type: "/customer-type/dropdown-customer-type-master",
    assignedTo: "/role/dropdown-forklift-roles",
  },
  bulk: {
    raw: "/production/bulk-upload-production",
    material: "/material-master/bulk-upload-material",
    bin: "/production/bulk-upload-bin",
  },
  allocateBin: "/production/allocate-bin",
  crossDocker: "/production/cross-docker-allocate",
  binOverFlow: "/production/bin-overflow-allocate",
};
export default AllApis;

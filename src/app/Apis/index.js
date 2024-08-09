const AllApis = {
  dropdownList: {
    grade: "/grade-master/dropdown-grade-master",
    pallete: "/pallete-master/dropdown-pallete-master",
    productionLine: "/production-line/dropdown-produntion-line-master",
    skuSearch: "/production/sku-details",
    // skuDetails: "/production/sku-all-details",
    skuDetails: function (sku_code) {
      return `/production/sku-all-details?sku_code=${sku_code}`;
    },

    roles: "/role/dropdown-roles-master",
    vendor: "/inbound/list-vendor-without-permission",
    storage_type: "/bin/list-storage-type-without-permission",
    vehicle: "/inbound/list-vehicle-without-permission",
    customer: "/inbound/list-customer-without-permission",
    assignedTo: "/role/dropdown-forklift-roles",
  },
  bulk: {
    raw: "/production/bulk-upload-production",
    material:"/material-master/bulk-upload-material",
    bin: "/production/bulk-upload-bin",
  },
  allocateBin: "/production/allocate-bin",
  crossDocker: "/production/cross-docker-allocate",
};
export default AllApis;

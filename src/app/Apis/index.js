const AllApis = {
  dropdownList: {
    grade: "/grade-master/dropdown-grade-master",
    pallete: "/pallete-master/dropdown-pallete-master",
    productionLine: "/production-line/dropdown-produntion-line-master",

    roles: "/role/dropdown-roles-master",
    vendor: "/inbound/list-vendor-without-permission",
    storage_type: "/bin/list-storage-type-without-permission",
    vehicle: "/inbound/list-vehicle-without-permission",
    customer: "/inbound/list-customer-without-permission",
    assignedTo: "/role/dropdown-forklift-roles",
  },
  bulk: {
    raw: "/production/bulk-upload-production",
    bin: "/production/bulk-upload-bin",
  },
  allocateBin: "/production/allocate-bin",
};
export default AllApis;

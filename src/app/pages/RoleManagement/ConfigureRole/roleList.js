import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import { Button, Checkbox, Switch, TextField, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { addRole } from "app/services/apis/addRole";
import { updateRole } from "app/services/apis/updateRole";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function PermissionList() {
  const GreenCheckbox = withStyles({
    root: {
      "&$checked": {
        color: "green",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);
  const { state } = useLocation();

  const headingStyle = {
    minWidth: "20%",
    fontSize: "1rem",
    fontWeight: "bold",
  };
  const checkboxStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 4,
  };

  const [isSubmitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [role_name, setRoleName] = useState(
    state?.role_name ? state?.role_name : ""
  );
  const [roleRemarks, setRoleRemarks] = useState(
    state?.roles_remarks ? state?.roles_remarks : ""
  );

  const [status, setStatus] = useState(state?.status === false ? false : true);

  const [check, setCheck] = useState(
    state?.permissions
      ? state?.permissions
      : {
          user_view: false,
          user_edit: false,
          user_create: false,

          role_view: false,
          role_edit: false,
          role_create: false,

          material_master_view: false,
          material_master_edit: false,
          material_master_create: false,

          production_line_master_view: false,
          production_line_master_edit: false,
          production_line_master_create: false,

          party_master_view: false,
          party_master_edit: false,
          party_master_create: false,

          vendor_master_view: false,
          vendor_master_edit: false,
          vendor_master_create: false,

          vehicle_master_view: false,
          vehicle_master_edit: false,
          vehicle_master_create: false,

          customer_master_view: false,
          customer_master_edit: false,
          customer_master_create: false,

          storage_search_master_view: false,
          storage_search_master_edit: false,
          storage_search_master_create: false,

          storage_type_master_view: false,
          storage_type_master_edit: false,
          storage_type_master_create: false,

          employee_master_view: false,
          employee_master_edit: false,
          employee_master_create: false,

          bin_master_view: false,
          bin_master_edit: false,
          bin_master_create: false,

          loading_master_view: false,
          loading_master_edit: false,
          loading_master_create: false,

          unloading_master_view: false,
          unloading_master_edit: false,
          unloading_master_create: false,

          production_master_view: false,
          production_master_edit: false,
          production_master_create: false,
        }
  );

  const [selectAll, setSelectAll] = useState({
    edit: false,
    view: false,
    create: false,
  });

  const handleChange = (event) => {
    setCheck({ ...check, [event.target.name]: event.target.checked });
  };

  const handleAllView = (e) => {
    const updatedObj = { ...check }; // Create a copy of the original object
    setSelectAll({ ...selectAll, view: e.target.checked });
    // Iterate through the keys of the object
    for (const key in updatedObj) {
      if (key.endsWith("_view")) {
        updatedObj[key] = e.target.checked;
      }
    }
    setCheck(updatedObj);
  };
  const handleAllEdit = (e) => {
    const updatedObj = { ...check }; // Create a copy of the original object
    setSelectAll({ ...selectAll, edit: e.target.checked });

    // Iterate through the keys of the object
    for (const key in updatedObj) {
      if (key.endsWith("_edit")) {
        updatedObj[key] = e.target.checked;
      }
    }
    setCheck(updatedObj);
  };
  const handleAllCreate = (e) => {
    const updatedObj = { ...check }; // Create a copy of the original object
    setSelectAll({ ...selectAll, create: e.target.checked });
    // Iterate through the keys of the object
    for (const key in updatedObj) {
      if (key.endsWith("_create")) {
        updatedObj[key] = e.target.checked;
      }
    }
    setCheck(updatedObj);
  };
  const handleSubmit = async (e) => {
    if (role_name == "") {
      return Swal.fire({ icon: "warning", title: "Fill Role Name", text: "" });
    }
    setSubmitting(true);

    if (pathname == "/dashboard/addrole") {
      const details = {
        name: role_name,
        roles_remarks: roleRemarks,
        permissions: check,
        status: status,
      };
      const data = await addRole(details);

      if (data.status == 201) {
        Swal.fire({
          icon: "success",
          title: data.data.message,
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/roles");
      } else {
        setSubmitting(false);

        Swal.fire({
          icon: "error",
          title: data.message,
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    } else {
      const details = {
        id: state._id,
        name: role_name,
        roles_remarks: roleRemarks,
        permissions: check,
        status: status,
      };
      const data = await updateRole(details);
      if (data.status == 200) {
        Swal.fire({
          icon: "success",
          title: data.data.message,
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/roles");
      } else {
        setSubmitting(false);

        Swal.fire({
          icon: "error",
          title: data.message,
          text: "",
        });
      }
    }
    setSubmitting(false);
  };

  useEffect(() => {
    //for SelectAll Checkbox
    ["create", "edit", "view"].map((permission) => {
      const roles = Object.entries(check)
        .filter(
          (ele) => ele[0].split("_")[ele[0].split("_").length - 1] == permission
        )
        .every((ele) => ele[1] == true);
      if (roles) {
        setSelectAll((prev) => ({ ...prev, [permission]: true }));
      }
    });
  }, [check]);

  return (
    <Div sx={{ width: "100%" }}>
      <Div sx={{ display: "flex", columnGap: 3 }}>
        <Div sx={{ width: "20%" }}>
          <Typography variant="h5">Role Name*</Typography>
          <TextField
            size="small"
            value={role_name}
            sx={{
              width: "100%",
              height: "39px",
            }}
            onChange={(event) => {
              setRoleName(event.target.value);
            }}
          />
        </Div>
        <Div sx={{ width: "20%" }}>
          <Typography variant="h5">Remark</Typography>
          <TextField
            multiline
            size="small"
            value={roleRemarks}
            sx={{
              width: "100%",
              height: "39px",
            }}
            onChange={(event) => {
              setRoleRemarks(event.target.value);
            }}
          />
        </Div>
      </Div>
      <Div
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          mt: 3,
        }}
      >
        <Typography sx={headingStyle}>Select</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox checked={selectAll.view} onChange={handleAllView} />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox checked={selectAll.edit} onChange={handleAllEdit} />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={selectAll.create}
            onChange={handleAllCreate}
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          mt: 3,
        }}
      >
        <Typography sx={headingStyle}>User Management</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.user_view}
            onChange={handleChange}
            name="user_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.user_edit}
            onChange={handleChange}
            name="user_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.user_create}
            onChange={handleChange}
            name="user_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>

      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Roles & Permissions</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.role_view}
            onChange={handleChange}
            name="role_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.role_edit}
            onChange={handleChange}
            name="role_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.role_create}
            onChange={handleChange}
            name="role_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Material Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.material_master_view}
            onChange={handleChange}
            name="material_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.material_master_edit}
            onChange={handleChange}
            name="material_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.material_master_create}
            onChange={handleChange}
            name="material_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Customer Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.customer_master_view}
            onChange={handleChange}
            name="customer_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.customer_master_edit}
            onChange={handleChange}
            name="customer_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.customer_master_create}
            onChange={handleChange}
            name="customer_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Vehicle Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.vehicle_master_view}
            onChange={handleChange}
            name="vehicle_master_view"
          />

          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.vehicle_master_edit}
            onChange={handleChange}
            name="vehicle_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.vehicle_master_create}
            onChange={handleChange}
            name="vehicle_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Vendor Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.vendor_master_view}
            onChange={handleChange}
            name="vendor_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.vendor_master_edit}
            onChange={handleChange}
            name="vendor_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.vendor_master_create}
            onChange={handleChange}
            name="vendor_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>

      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Production Line Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.production_line_master_view}
            onChange={handleChange}
            name="production_line_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.production_line_master_edit}
            onChange={handleChange}
            name="production_line_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.production_line_master_create}
            onChange={handleChange}
            name="production_line_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Bin Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.bin_master_view}
            onChange={handleChange}
            name="bin_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.bin_master_edit}
            onChange={handleChange}
            name="bin_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.bin_master_create}
            onChange={handleChange}
            name="bin_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Employee Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.employee_master_view}
            onChange={handleChange}
            name="employee_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.employee_master_edit}
            onChange={handleChange}
            name="employee_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.employee_master_create}
            onChange={handleChange}
            name="employee_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Storage Search Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.storage_search_master_view}
            onChange={handleChange}
            name="storage_search_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.storage_search_master_edit}
            onChange={handleChange}
            name="storage_search_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.storage_search_master_create}
            onChange={handleChange}
            name="storage_search_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Storage Type Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.storage_type_master_view}
            onChange={handleChange}
            name="storage_type_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.storage_type_master_edit}
            onChange={handleChange}
            name="storage_type_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.storage_type_master_create}
            onChange={handleChange}
            name="storage_type_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>

      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Loading Master</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.loading_master_view}
            onChange={handleChange}
            name="loading_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.loading_master_edit}
            onChange={handleChange}
            name="loading_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.loading_master_create}
            onChange={handleChange}
            name="loading_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>

      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Unloading Maste</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.unloading_master_view}
            onChange={handleChange}
            name="unloading_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.unloading_master_edit}
            onChange={handleChange}
            name="unloading_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.unloading_master_create}
            onChange={handleChange}
            name="unloading_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>

      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={headingStyle}>Production</Typography>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.production_master_view}
            onChange={handleChange}
            name="production_master_view"
          />
          <Typography>View</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.production_master_edit}
            onChange={handleChange}
            name="production_master_edit"
          />
          <Typography>Edit</Typography>
        </Div>
        <Div sx={checkboxStyle}>
          <GreenCheckbox
            checked={check.production_master_create}
            onChange={handleChange}
            name="production_master_create"
          />
          <Typography>Create</Typography>
        </Div>
      </Div>

      <Div sx={{ mt: 5 }}>
        <Typography variant="h5">Status</Typography>
        <Switch
          onChange={(e) => {
            setStatus(status === true ? false : true);
          }}
          defaultChecked={status === true ? true : false}
          sx={{
            p: 0,
            width: "70px",
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: status === true ? "green" : "red",
              width: "90%",
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: status === true ? "green" : "red",
            },
          }}
        />
      </Div>
      <Div
        sx={{
          width: "93.5%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          mt: 3,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            Swal.fire({
              title: "Are you sure you want to cancel?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes",
              cancelButtonText: "No",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/dashboard/roles");
              }
            });
          }}
        >
          Cancel
        </Button>

        <LoadingButton
          variant="contained"
          type="submit"
          sx={{ width: "100px" }}
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          Save
        </LoadingButton>
      </Div>
    </Div>
  );
}

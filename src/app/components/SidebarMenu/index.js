import Div from "@jumbo/shared/Div/Div";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function SidebarMenu() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );
  // const active = {
  //   backgroundColor: "transparent", // Set transparent background to allow backgroundImage to show
  //   backgroundImage:
  //     "radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)",
  //   borderTopRightRadius: 16,
  //   borderBottomRightRadius: 16,
  //   fontSize: "1rem",
  //   cursor: "pointer",
  //   padding: "8px 16px", // Adjust padding instead of 'p' and 'pl'
  //   fontFamily: "sans-serif",
  // };

  // const inactive = {
  //   "&:hover": {
  //     bgcolor: "gray",
  //     borderTopRightRadius: 16,
  //     borderBottomRightRadius: 16,
  //   },
  //   fontSize: "1rem",
  //   cursor: "pointer",
  //   p: 1,
  //   pl: 2,
  //   fontFamily: "sans-serif",
  // };
  // const activeAccordion = {
  //   backgroundColor: "transparent", // Set transparent background to allow backgroundImage to show
  //   backgroundImage:
  //     "radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)",
  //   borderTopRightRadius: 16,
  //   borderBottomRightRadius: 16,
  //   fontSize: "0.8rem",
  //   cursor: "pointer",
  //   p: 1,
  //   pl: 5,
  // };
  // const inactiveAccordion = {
  //   "&:hover": {
  //     bgcolor: "gray",
  //     borderTopRightRadius: 16,
  //     borderBottomRightRadius: 16,
  //   },
  //   fontSize: "0.8rem",
  //   cursor: "pointer",
  //   p: 1,
  //   pl: 5,
  // };
  const woodenGradient = "linear-gradient(to bottom, #a2763e 0%, #7e562b 100%)";

  const active = {
    backgroundColor: "#5E3BB7", // Set transparent background to allow backgroundImage to show
    // backgroundImage: `${woodenGradient}, radial-gradient(ellipse farthest-corner at right bottom, #8B5A2B 0%, #614126 100%)`,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    fontSize: "1rem",
    cursor: "pointer",
    padding: "8px 16px", // Adjust padding instead of 'p' and 'pl'
    fontFamily: "sans-serif",
  };

  const inactive = {
    "&:hover": {
      bgcolor: "gray",
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
    },
    fontSize: "1rem",
    cursor: "pointer",
    p: 1,
    pl: 2,
    fontFamily: "sans-serif",
  };

  const activeAccordion = {
    backgroundColor: "#5E3BB7", // Set transparent background to allow backgroundImage to show
    // backgroundImage: `${woodenGradient}, radial-gradient(ellipse farthest-corner at right bottom, #8B5A2B 0%, #614126 100%)`,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    fontSize: "0.8rem",
    cursor: "pointer",
    p: 1,
    pl: 5,
  };

  const inactiveAccordion = {
    "&:hover": {
      bgcolor: "gray",
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
    },
    fontSize: "0.8rem",
    cursor: "pointer",
    p: 1,
    pl: 5,
  };
  return (
    <Div>
      {permissions?.user_view === true && (
        //   permissions?.user_edit === true ||
        // permissions?.user_create === true
        <Div>
          <Typography
            sx={
              currentPath == "/dashboard/user" ||
              currentPath == "/dashboard/adduser" ||
              currentPath == "/dashboard/edituser"
                ? active
                : inactive
            }
            onClick={() => navigate("/dashboard/user")}
          >
            User Management
          </Typography>
        </Div>
      )}
      {permissions?.role_view === true && (
        // ||
        // permissions?.role_edit === true ||
        // permissions?.role_create === true
        <Div>
          <Typography
            sx={
              currentPath == "/dashboard/roles" ||
              currentPath == "/dashboard/addrole" ||
              currentPath == "/dashboard/editrole"
                ? active
                : inactive
            }
            onClick={() => navigate("/dashboard/roles")}
          >
            Roles & Permissions
          </Typography>
        </Div>
      )}

      {[
        "production_line_master_view",
        "material_master_view",
        "unit_master_view",
        "item_name_master_view",
        "item_code_master_view",
        "grade_master_view",
      ].some((permission) => permissions?.[permission] === true) && (
        <Div>
          <Accordion
            defaultExpanded={
              currentPath.slice(0, 17) == "/dashboard/master" ? true : false
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel-content"
              id="panel-header"
              sx={{
                "&:hover": {
                  bgcolor: "gray",
                  borderTopRightRadius: 16,
                  borderBottomRightRadius: 16,
                },
                "&.Mui-expanded": {
                  maxHeight: "40px !important",
                  minHeight: "40px !important",
                },
                fontSize: "1rem",
                cursor: "pointer",
                p: 1,
                pl: 2,
                maxHeight: "40px !important",
                minHeight: "40px !important",
              }}
            >
              <Typography sx={{ fontSize: "1rem" }}>Master</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ m: 0, p: 0 }}>
              {/* {
                // permissions?.supplier_master_create === true ||
                // permissions?.supplier_master_edit === true ||
                permissions?.production_line_master_view === true && (
                  <Div>
                    <Typography
                      sx={
                        currentPath == "/dashboard/master/production-line" ||
                        currentPath == "/master/production-line/add" ||
                        currentPath == "/master/production-line/edit"
                          ? activeAccordion
                          : inactiveAccordion
                      }
                      onClick={() =>
                        navigate("/dashboard/master/production-line")
                      }
                    >
                      Production Line Master
                    </Typography>
                  </Div>
                )
              } */}

              {/* {permissions?.material_master_view === true && (
                <Div>
                  <Typography
                    sx={
                      currentPath == "/dashboard/master/material" ||
                      currentPath == "/master/material/add" ||
                      currentPath == "/master/material/edit"
                        ? activeAccordion
                        : inactiveAccordion
                    }
                    onClick={() => navigate("/dashboard/master/material")}
                  >
                    Material Master
                  </Typography>
                </Div>
              )} */}

              {/* {(permissions?.party_master_view === true ||
              permissions?.party_master_edit === true ||
              permissions?.party_master_create === true) && (
              <Div>
                <Typography
                  sx={
                    currentPath == "/dashboard/master/party" ||
                    currentPath == "/master/party/add" ||
                    currentPath == "/master/party/edit"
                      ? activeAccordion
                      : inactiveAccordion
                  }
                  onClick={() => navigate("/dashboard/master/party")}
                >
                  Party Name Master
                </Typography>
              </Div>
            )} */}
              {permissions?.unit_master_view === true && (
                <Div>
                  <Typography
                    sx={
                      currentPath == "/dashboard/master/unit" ||
                      currentPath == "/master/unit/add" ||
                      currentPath == "/master/unit/edit"
                        ? activeAccordion
                        : inactiveAccordion
                    }
                    onClick={() => navigate("/dashboard/master/unit")}
                  >
                    Unit Master
                  </Typography>
                </Div>
              )}

              {permissions?.item_name_master_view === true && (
                <Div>
                  <Typography
                    sx={
                      currentPath == "/dashboard/master/item-name" ||
                      currentPath == "/master/item-name/add" ||
                      currentPath == "/master/item-name/edit"
                        ? activeAccordion
                        : inactiveAccordion
                    }
                    onClick={() => navigate("/dashboard/master/item-name")}
                  >
                    Item Name Master
                  </Typography>
                </Div>
              )}

              {permissions?.item_code_master_view === true && (
                <Div>
                  <Typography
                    sx={
                      currentPath == "/dashboard/master/item-code" ||
                      currentPath == "/master/item-code/add" ||
                      currentPath == "/master/item-code/edit"
                        ? activeAccordion
                        : inactiveAccordion
                    }
                    onClick={() => navigate("/dashboard/master/item-code")}
                  >
                    Item Type Master
                  </Typography>
                </Div>
              )}

              {permissions?.grade_master_view === true && (
                <Div>
                  <Typography
                    sx={
                      currentPath == "/dashboard/master/grade" ||
                      currentPath == "/master/grade/add" ||
                      currentPath == "/master/grade/edit"
                        ? activeAccordion
                        : inactiveAccordion
                    }
                    onClick={() => navigate("/dashboard/master/grade")}
                  >
                    Grade Master
                  </Typography>
                </Div>
              )}
            </AccordionDetails>
          </Accordion>
        </Div>
      )}

      {[
        "inventory_view",
        "other_goods_view",
        "grouped_veneer_view",
        "ready_sheet_form_view",
        "qc_view",
      ].some((permission) => permissions?.[permission] === true) && (
        <Div>
          <Accordion
            defaultExpanded={
              currentPath.slice(0, 20) == "/dashboard/inventory" ? true : false
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel-content"
              id="panel-header"
              sx={{
                "&:hover": {
                  bgcolor: "gray",
                  borderTopRightRadius: 16,
                  borderBottomRightRadius: 16,
                },
                "&.Mui-expanded": {
                  maxHeight: "40px !important",
                  minHeight: "40px !important",
                },
                fontSize: "1rem",
                cursor: "pointer",
                p: 1,
                pl: 2,
                maxHeight: "40px !important",
                minHeight: "40px !important",
              }}
            >
              <Typography sx={{ fontSize: "1rem" }}>Inventory</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ m: 0, p: 0 }}>
              {permissions?.inventory_view === true && (
                <Div>
                  <Typography
                    sx={
                      currentPath == "/dashboard/inventory/rawmaterial" ||
                      currentPath == "/dashboard/inventory/add"
                        ? activeAccordion
                        : inactiveAccordion
                    }
                    onClick={() => navigate("/dashboard/inventory/rawmaterial")}
                  >
                    Raw Veneer
                  </Typography>
                </Div>
              )}
              {permissions?.other_goods_view === true && (
                <Div>
                  <Typography
                    sx={
                      currentPath == "/dashboard/inventory/othergoods" ||
                      currentPath == "/dashboard/inventory/othergoods/add" ||
                      currentPath == "/dashboard/inventory/othergoods/edit"
                        ? activeAccordion
                        : inactiveAccordion
                    }
                    onClick={() => navigate("/dashboard/inventory/othergoods")}
                  >
                    Other Goods
                  </Typography>
                </Div>
              )}
              {permissions?.grouped_veneer_view === true && (
                <Div>
                  <Typography
                    sx={
                      currentPath == "/dashboard/inventory/groupedveneer"
                        ? activeAccordion
                        : inactiveAccordion
                    }
                    onClick={() =>
                      navigate("/dashboard/inventory/groupedveneer")
                    }
                  >
                    Grouped Veneer
                  </Typography>
                </Div>
              )}
              {permissions?.ready_sheet_form_view === true && (
                <Div>
                  <Typography
                    sx={
                      currentPath == "/dashboard/inventory/readysheetform"
                        ? activeAccordion
                        : inactiveAccordion
                    }
                    onClick={() =>
                      navigate("/dashboard/inventory/readysheetform")
                    }
                  >
                    Ready Sheet Form
                  </Typography>
                </Div>
              )}
              {permissions?.qc_view === true && (
                <Div>
                  <Typography
                    sx={
                      currentPath == "/dashboard/inventory/readyForDispatch"
                        ? activeAccordion
                        : inactiveAccordion
                    }
                    onClick={() =>
                      navigate("/dashboard/inventory/readyForDispatch")
                    }
                  >
                    Ready For Dispatch
                  </Typography>
                </Div>
              )}
            </AccordionDetails>
          </Accordion>
        </Div>
      )}
      {permissions?.role_view === true && (
        // ||
        // permissions?.role_edit === true ||
        // permissions?.role_create === true
        <Div>
          <Typography
            sx={
              currentPath == "/dashboard/roles" ||
              currentPath == "/dashboard/addrole" ||
              currentPath == "/dashboard/editrole"
                ? active
                : inactive
            }
            onClick={() => navigate("/dashboard/roles")}
          >
            Production Booking
          </Typography>
        </Div>
      )}
      {permissions?.role_view === true && (
        // ||
        // permissions?.role_edit === true ||
        // permissions?.role_create === true
        <Div>
          <Typography
            sx={
              currentPath == "/dashboard/roles" ||
              currentPath == "/dashboard/addrole" ||
              currentPath == "/dashboard/editrole"
                ? active
                : inactive
            }
            onClick={() => navigate("/dashboard/roles")}
          >
            Pallet
          </Typography>
        </Div>
      )}
    </Div>
  );
}

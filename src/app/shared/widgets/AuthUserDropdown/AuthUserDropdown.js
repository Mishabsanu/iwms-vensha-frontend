import Avatar from "@mui/material/Avatar";
import { useState } from "react";
// import { authUser } from "./fake-db";
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import Div from "@jumbo/shared/Div";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PasswordIcon from "@mui/icons-material/Password";
import {
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { logOut } from "app/redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import { BACKEND_URL } from "app/utils/constants/paths";
import ChangePasswordModal from "./changePassword";

const AuthUserDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useJumboTheme();
  const { setAuthToken } = useJumboAuth();
  const { user } = useSelector((state) => state.userReducer);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const { pathname } = useLocation();
  const onLogout = () => {
    sessionStorage.setItem("isAuthenticated", false);
    navigate("/user/login");
    dispatch(logOut());
  };

  // useEffect(() => {
  //   dispatch(loadUser());
  // }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <JumboDdPopover
        triggerButton={
          <Avatar
            src={`./KDClogo.png`}
            sizes={"small"}
            sx={{
              boxShadow: 25,
              cursor: "pointer",
              "& img": {
                objectFit: "contain !important",
                bgcolor: "black",
              },
            }}
          />
        }
      >
        <Div
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            p: (theme) => theme.spacing(2.5),
            width: "300px",
          }}
        >
          <Avatar
            src={`./KDClogo.png`}
            alt={user?.[0]?.name}
            sx={{
              width: 60,
              height: 60,
              mb: 2,
              "& img": {
                objectFit: "contain",
                bgcolor: "black",
              },
            }}
          />
          <Typography
            variant={"h5"}
            sx={{ textTransform: "capitalize" }}
          >{`${user?.[0]?.first_name} ${user?.[0]?.last_name}`}</Typography>
        </Div>
        <Divider />
        <nav>
          <List disablePadding sx={{ pb: 1 }}>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <EditOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Edit Profile"
                sx={{ my: 0 }}
                onClick={() => navigate("/profile")}
              />
            </ListItemButton>
            <ListItemButton onClick={() => setInfoModalOpen(true)}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <PasswordIcon />
              </ListItemIcon>
              <ListItemText primary="Change Password" sx={{ my: 0 }} />
            </ListItemButton>
            <ListItemButton onClick={onLogout}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ my: 0 }} />
            </ListItemButton>
          </List>
        </nav>
        <ChangePasswordModal
          open={isInfoModalOpen}
          onClose={() => setInfoModalOpen(false)}
        />
      </JumboDdPopover>
    </ThemeProvider>
  );
};

export default AuthUserDropdown;

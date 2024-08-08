import JumboIconButton from "@jumbo/components/JumboIconButton";
import useJumboHeaderTheme from "@jumbo/hooks/useJumboHeaderTheme";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import Div from "@jumbo/shared/Div";
import { SIDEBAR_STYLES, SIDEBAR_VARIANTS } from "@jumbo/utils/constants";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Slide } from "@mui/material";
import Stack from "@mui/material/Stack";
import { loadUser } from "app/redux/actions/userAction";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Logo from "../../../../shared/Logo";
import SearchGlobal from "../../../../shared/SearchGlobal";
import AuthUserDropdown from "../../../../shared/widgets/AuthUserDropdown";

const Header = () => {
  const { sidebarOptions, setSidebarOptions } = useJumboLayoutSidebar();
  const [dropdownSearchVisibility, setDropdownSearchVisibility] =
    React.useState(false);
  const { headerTheme } = useJumboHeaderTheme();

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      dispatch(loadUser());
    }
  }, [pathname]);

  return (
    <React.Fragment>
      {(sidebarOptions.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER ||
        sidebarOptions.variant === SIDEBAR_VARIANTS.TEMPORARY ||
        (sidebarOptions.variant === SIDEBAR_VARIANTS.PERSISTENT &&
          !sidebarOptions.open)) && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{
            ml:
              sidebarOptions.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER
                ? -2
                : 0,
            mr: 3,
          }}
          onClick={() => setSidebarOptions({ open: !sidebarOptions.open })}
        >
          {sidebarOptions?.open ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      )}
      {sidebarOptions?.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER && (
        <Logo sx={{ mr: 3 }} mode={headerTheme.type ?? "light"} />
      )}
      <Slide in={dropdownSearchVisibility}>
        <Div
          sx={{
            zIndex: 5,
            left: 0,
            right: 0,
            position: "absolute",
            height: "100%",
          }}
        >
          <SearchGlobal
            sx={{
              maxWidth: "none",
              height: "100%",
              display: "flex",

              "& .MuiInputBase-root": {
                flex: 1,
                borderRadius: 0,
                background: (theme) => theme.palette.background.default,
              },
              "& .MuiInputBase-input": {
                pr: 6,
              },
            }}
          />
          <IconButton
            sx={{
              position: "absolute",
              right: 15,
              top: "50%",
              color: "inherit",
              transform: "translateY(-50%)",
            }}
            onClick={() => setDropdownSearchVisibility(false)}
          >
            <CloseIcon />
          </IconButton>
        </Div>
      </Slide>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1.25}
        sx={{ ml: "auto" }}
      >
        {/* <JumboIconButton
          elevation={25}
          onClick={() => setDropdownSearchVisibility(true)}
        >
          <SearchIcon fontSize={"small"} />
        </JumboIconButton> */}

        <AuthUserDropdown />
      </Stack>
    </React.Fragment>
  );
};

export default Header;

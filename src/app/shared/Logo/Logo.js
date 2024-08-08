import Div from "@jumbo/shared/Div";
import Link from "@mui/material/Link";
import { ASSET_IMAGES } from "../../utils/constants/paths";

const Logo = ({ mini, mode, sx }) => {
  return (
    <Div sx={{ display: "inline-flex", ...sx }}>
      <Link href={"/dashboard"}>
        {!mini ? (
          <img
            style={{
              height: "152px",
              width: "170px",
              mixBlendMode: "color-burn",
            }}
            src={
              mode === "light"
                ? `${ASSET_IMAGES}/venshaLogo.jpg`
                : `${ASSET_IMAGES}/venshaLogo.jpg`
            }
            alt="Jumbo React"
          />
        ) : (
          <img
            src={
              mode === "light"
                ? `${ASSET_IMAGES}/venshaLogo.jpg`
                : `${ASSET_IMAGES}/venshaLogo.jpg`
            }
            alt="Jumbo React"
          />
        )}
      </Link>
    </Div>
  );
};

Logo.defaultProps = {
  mode: "light",
};

export default Logo;

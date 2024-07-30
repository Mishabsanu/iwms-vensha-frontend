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
              height: "80px",
              width: "150px",
              mixBlendMode: "color-burn",
            }}
            src={
              mode === "light"
                ? `${ASSET_IMAGES}/logo192.png`
                : `${ASSET_IMAGES}/logo192.png`
            }
            alt="Jumbo React"
          />
        ) : (
          <img
            src={
              mode === "light"
                ? `${ASSET_IMAGES}/VENEERPRO_KDC_LOGO.svg`
                : `${ASSET_IMAGES}/VENEERPRO_KDC_LOGO.svg`
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

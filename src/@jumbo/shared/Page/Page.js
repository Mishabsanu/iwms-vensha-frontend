import React from "react";
import { useSpring, animated } from "react-spring";
import useJumboApp from "@jumbo/hooks/useJumboApp";
import { config } from "../../../app/config/main";

const Page = ({ component, layout, ...restProps }) => {
  const { activeLayout, setActiveLayout } = useJumboApp();

  React.useEffect(() => {
    if (layout !== activeLayout) {
      setActiveLayout(layout);
    }
  }, [layout]);

  const PageComponent = component;

  // Define the spring animation
  const animationProps = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { tension: 120, friction: 14 },
  });

  return (
    // <animated.div style={animationProps}>
    <PageComponent {...restProps} />
    // </animated.div>
  );
};

Page.defaultProps = {
  layout: config.defaultLayout,
};

export default Page;

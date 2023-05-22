import React, { Component } from "react";
import ModelViewer from "@metamask/logo";
import "./login.css";

class MetamaskLogo extends Component {
  componentDidMount() {
    this.viewer = ModelViewer({
      pxNotRatio: true,
      width: 150,
      height: 150,
      followMouse: true,
    });
    this.el.appendChild(this.viewer.container);
  }

  componentWillUnmount() {
    this.viewer.stopAnimation();
  }

  render() {
    return (
      // <>
      // </>
      <div className="metamaskLogo" ref={(el) => (this.el = el)} />
    );
  }
}

export default MetamaskLogo;

// import { useRef, useEffect, useMemo } from "react";
// import { bool, number, oneOfType, string } from "prop-types";
// import makeFox from "@metamask/logo";

// const Fox = ({ pxNotRatio, width, height, followMouse, slowDrift }) => {
//   const containerRef = useRef();
//   const { current: container } = containerRef;

//   const viewer = useMemo(
//     () => makeFox({ pxNotRatio, width, height, followMouse, slowDrift }),
//     [pxNotRatio, width, height, followMouse, slowDrift]
//   );

//   useEffect(() => {
//     if (!container) return;

//     viewer.lookAt({ x: 100, y: 100 });
//     container.appendChild(viewer.container);

//     return () => {
//       viewer.stopAnimation();
//       container.removeChild(viewer.container);
//     };
//   }, [container, viewer]);

//   return <div ref={containerRef} />;
// };

// Fox.propTypes = {
//   pxNotRatio: bool,
//   width: oneOfType([number, string]),
//   height: oneOfType([number, string]),
//   followMouse: bool,
//   slowDrift: bool,
// };

// Fox.defaultProps = {
//   pxNotRatio: true,
//   width: 500,
//   height: 400,
//   followMouse: false,
//   slowDrift: false,
// };

// export default Fox;

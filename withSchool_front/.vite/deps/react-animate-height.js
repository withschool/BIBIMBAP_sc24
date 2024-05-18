import {
  require_react
} from "./chunk-HCG2JFOZ.js";
import {
  __toESM
} from "./chunk-AUZ3RYOM.js";

// node_modules/react-animate-height/dist/esm/index.js
var import_react = __toESM(require_react());
function isNumber(n) {
  const number = parseFloat(n);
  return !isNaN(number) && isFinite(number);
}
function isPercentage(height) {
  return typeof height === "string" && height[height.length - 1] === "%" && isNumber(height.substring(0, height.length - 1));
}
function hideContent(element, height, disableDisplayNone) {
  if (height === 0 && !disableDisplayNone && (element === null || element === void 0 ? void 0 : element.style) && (element === null || element === void 0 ? void 0 : element.children.length) > 0) {
    element.style.display = "none";
  }
}
function showContent(element, height) {
  if (height === 0 && (element === null || element === void 0 ? void 0 : element.style)) {
    element.style.display = "";
  }
}
var ANIMATION_STATE_CLASSES = {
  animating: "rah-animating",
  animatingUp: "rah-animating--up",
  animatingDown: "rah-animating--down",
  animatingToHeightZero: "rah-animating--to-height-zero",
  animatingToHeightAuto: "rah-animating--to-height-auto",
  animatingToHeightSpecific: "rah-animating--to-height-specific",
  static: "rah-static",
  staticHeightZero: "rah-static--height-zero",
  staticHeightAuto: "rah-static--height-auto",
  staticHeightSpecific: "rah-static--height-specific"
};
function getStaticStateClasses(animationStateClasses, height) {
  return [
    animationStateClasses.static,
    height === 0 && animationStateClasses.staticHeightZero,
    typeof height === "number" && height > 0 ? animationStateClasses.staticHeightSpecific : null,
    height === "auto" && animationStateClasses.staticHeightAuto
  ].filter((v) => v).join(" ");
}
var propsToOmitFromDiv = [
  "animateOpacity",
  "animationStateClasses",
  "applyInlineTransitions",
  "children",
  "className",
  "contentClassName",
  "contentRef",
  "delay",
  "duration",
  "easing",
  "height",
  "onHeightAnimationEnd",
  "onHeightAnimationStart",
  "style",
  "disableDisplayNone"
];
var AnimateHeight = import_react.default.forwardRef((componentProps, ref) => {
  const { animateOpacity = false, animationStateClasses = {}, applyInlineTransitions = true, children, className = "", contentClassName, delay: userDelay = 0, disableDisplayNone = false, duration: userDuration = 500, easing = "ease", height, onHeightAnimationEnd, onHeightAnimationStart, style, contentRef } = componentProps;
  const divProps = Object.assign({}, componentProps);
  propsToOmitFromDiv.forEach((propKey) => {
    delete divProps[propKey];
  });
  const prevHeight = (0, import_react.useRef)(height);
  const contentElement = (0, import_react.useRef)(null);
  const animationClassesTimeoutID = (0, import_react.useRef)();
  const timeoutID = (0, import_react.useRef)();
  const stateClasses = (0, import_react.useRef)(Object.assign(Object.assign({}, ANIMATION_STATE_CLASSES), animationStateClasses));
  const isBrowser = typeof window !== "undefined";
  const prefersReducedMotion = (0, import_react.useRef)(isBrowser && window.matchMedia ? window.matchMedia("(prefers-reduced-motion)").matches : false);
  const delay = prefersReducedMotion.current ? 0 : userDelay;
  const duration = prefersReducedMotion.current ? 0 : userDuration;
  let initHeight = height;
  let initOverflow = "visible";
  if (typeof height === "number") {
    initHeight = height < 0 ? 0 : height;
    initOverflow = "hidden";
  } else if (isPercentage(initHeight)) {
    initHeight = height === "0%" ? 0 : height;
    initOverflow = "hidden";
  }
  const [currentHeight, setCurrentHeight] = (0, import_react.useState)(initHeight);
  const [overflow, setOverflow] = (0, import_react.useState)(initOverflow);
  const [useTransitions, setUseTransitions] = (0, import_react.useState)(false);
  const [animationStateClassNames, setAnimationStateClassNames] = (0, import_react.useState)(getStaticStateClasses(stateClasses.current, height));
  (0, import_react.useEffect)(() => {
    hideContent(contentElement.current, currentHeight, disableDisplayNone);
  }, []);
  (0, import_react.useEffect)(() => {
    if (height !== prevHeight.current && contentElement.current) {
      showContent(contentElement.current, prevHeight.current);
      contentElement.current.style.overflow = "hidden";
      const contentHeight = contentElement.current.offsetHeight;
      contentElement.current.style.overflow = "";
      const totalDuration = duration + delay;
      let newHeight;
      let timeoutHeight;
      let timeoutOverflow = "hidden";
      let timeoutUseTransitions;
      const isCurrentHeightAuto = prevHeight.current === "auto";
      if (typeof height === "number") {
        newHeight = height < 0 ? 0 : height;
        timeoutHeight = newHeight;
      } else if (isPercentage(height)) {
        newHeight = height === "0%" ? 0 : height;
        timeoutHeight = newHeight;
      } else {
        newHeight = contentHeight;
        timeoutHeight = "auto";
        timeoutOverflow = void 0;
      }
      if (isCurrentHeightAuto) {
        timeoutHeight = newHeight;
        newHeight = contentHeight;
      }
      const newAnimationStateClassNames = [
        stateClasses.current.animating,
        (prevHeight.current === "auto" || height < prevHeight.current) && stateClasses.current.animatingUp,
        (height === "auto" || height > prevHeight.current) && stateClasses.current.animatingDown,
        timeoutHeight === 0 && stateClasses.current.animatingToHeightZero,
        timeoutHeight === "auto" && stateClasses.current.animatingToHeightAuto,
        typeof timeoutHeight === "number" && timeoutHeight > 0 ? stateClasses.current.animatingToHeightSpecific : null
      ].filter((v) => v).join(" ");
      const timeoutAnimationStateClasses = getStaticStateClasses(stateClasses.current, timeoutHeight);
      setCurrentHeight(newHeight);
      setOverflow("hidden");
      setUseTransitions(!isCurrentHeightAuto);
      setAnimationStateClassNames(newAnimationStateClassNames);
      clearTimeout(timeoutID.current);
      clearTimeout(animationClassesTimeoutID.current);
      if (isCurrentHeightAuto) {
        timeoutUseTransitions = true;
        timeoutID.current = setTimeout(() => {
          setCurrentHeight(timeoutHeight);
          setOverflow(timeoutOverflow);
          setUseTransitions(timeoutUseTransitions);
          onHeightAnimationStart === null || onHeightAnimationStart === void 0 ? void 0 : onHeightAnimationStart(timeoutHeight);
        }, 50);
        animationClassesTimeoutID.current = setTimeout(() => {
          setUseTransitions(false);
          setAnimationStateClassNames(timeoutAnimationStateClasses);
          hideContent(contentElement.current, timeoutHeight, disableDisplayNone);
          onHeightAnimationEnd === null || onHeightAnimationEnd === void 0 ? void 0 : onHeightAnimationEnd(timeoutHeight);
        }, totalDuration);
      } else {
        onHeightAnimationStart === null || onHeightAnimationStart === void 0 ? void 0 : onHeightAnimationStart(newHeight);
        timeoutID.current = setTimeout(() => {
          setCurrentHeight(timeoutHeight);
          setOverflow(timeoutOverflow);
          setUseTransitions(false);
          setAnimationStateClassNames(timeoutAnimationStateClasses);
          if (height !== "auto") {
            hideContent(contentElement.current, newHeight, disableDisplayNone);
          }
          onHeightAnimationEnd === null || onHeightAnimationEnd === void 0 ? void 0 : onHeightAnimationEnd(newHeight);
        }, totalDuration);
      }
    }
    prevHeight.current = height;
    return () => {
      clearTimeout(timeoutID.current);
      clearTimeout(animationClassesTimeoutID.current);
    };
  }, [height]);
  const componentStyle = Object.assign(Object.assign({}, style), { height: currentHeight, overflow: overflow || (style === null || style === void 0 ? void 0 : style.overflow) });
  if (useTransitions && applyInlineTransitions) {
    componentStyle.transition = `height ${duration}ms ${easing} ${delay}ms`;
    if (style === null || style === void 0 ? void 0 : style.transition) {
      componentStyle.transition = `${style.transition}, ${componentStyle.transition}`;
    }
    componentStyle.WebkitTransition = componentStyle.transition;
  }
  const contentStyle = {};
  if (animateOpacity) {
    contentStyle.transition = `opacity ${duration}ms ${easing} ${delay}ms`;
    contentStyle.WebkitTransition = contentStyle.transition;
    if (currentHeight === 0) {
      contentStyle.opacity = 0;
    }
  }
  const hasAriaHiddenProp = typeof divProps["aria-hidden"] !== "undefined";
  const ariaHidden = hasAriaHiddenProp ? divProps["aria-hidden"] : height === 0;
  return import_react.default.createElement(
    "div",
    Object.assign({}, divProps, { "aria-hidden": ariaHidden, className: `${animationStateClassNames} ${className}`, style: componentStyle, ref }),
    import_react.default.createElement("div", { className: contentClassName, style: contentStyle, ref: (el) => {
      contentElement.current = el;
      if (contentRef) {
        contentRef.current = el;
      }
    } }, children)
  );
});
var esm_default = AnimateHeight;
export {
  esm_default as default
};
//# sourceMappingURL=react-animate-height.js.map

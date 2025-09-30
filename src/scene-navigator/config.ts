import type { NavigatorConfig } from "./types";

export const defaultConfig: NavigatorConfig = {
    position: "bottom-center",
    theme: "dark",
    zIndex: 100,
    backgroundColor: "rgba(0,0,0,0.3)",
    enableKeyboardNavigation: true,
    enableToggleButton: true,
    defaultVisible: true,
    padding: "10px",
    borderRadius: "5px",
    gap: "10px",
};

export function getPositionStyles(position: NavigatorConfig["position"]) {
    const styles: Partial<CSSStyleDeclaration> = {
        position: "absolute",
        display: "flex",
        flexWrap: "wrap",
        zIndex: "100",
    };

    switch (position) {
        case "top-left":
            styles.top = "20px";
            styles.left = "20px";
            break;
        case "top-center":
            styles.top = "20px";
            styles.left = "50%";
            styles.transform = "translateX(-50%)";
            break;
        case "top-right":
            styles.top = "20px";
            styles.right = "20px";
            break;
        case "bottom-left":
            styles.bottom = "20px";
            styles.left = "20px";
            break;
        case "bottom-center":
            styles.bottom = "20px";
            styles.left = "50%";
            styles.transform = "translateX(-50%)";
            break;
        case "bottom-right":
            styles.bottom = "20px";
            styles.right = "20px";
            break;
    }

    return styles;
}

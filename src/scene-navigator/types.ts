export type SceneTree = Record<string, any>;

export interface NavigatorState {
    currentLevel: SceneTree | string[];
    path: string[];
    currentButtons: HTMLButtonElement[];
    navigationEnabled: boolean;
    menuVisible: boolean;
    navContainer?: HTMLDivElement;
}

export interface NavigatorConfig {
    position:
        | "top-left"
        | "top-center"
        | "top-right"
        | "bottom-left"
        | "bottom-center"
        | "bottom-right";
    theme: "dark" | "light" | "custom";
    zIndex: number;
    backgroundColor: string;
    enableKeyboardNavigation: boolean;
    enableToggleButton: boolean;
    defaultVisible: boolean;
    padding: string;
    borderRadius: string;
    gap: string;
}

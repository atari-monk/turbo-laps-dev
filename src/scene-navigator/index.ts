import type { NavigatorConfig } from "./types";
import { defaultConfig } from "./config";
import { createInitialState } from "./state-manager";
import {
    createNavigationContainer,
    createToggleButton,
    navigateMenu,
} from "./ui-builder";
import { setupKeyboardNavigation } from "./navigation";

const sceneStructure = {
    "Single Scene": {
        Prototype: ["Elipse-Track"],
        Joystick: ["Virtual-Joystick", "Steerable-Rect", "Test-Car"],
        Mouse: ["Draw-a-Point"],
        Sound: ["Sound-Demo"],
        PCGame: [
            "Rectangle-Track",
            "Car",
            "Track-Boundary",
            "Starting-Grid",
            "Road-Markings",
            "Track-Grass",
            "Lap-Tracker",
            "Game-Score",
            "Menu",
            "Countdown",
            "Continue",
        ],
    },
    "Multi Scene": {
        Joystick: ["Joystick-Test", "XY-Joystick-Test", "Joystick-For-Car"],
        Tool: ["Track-Cursor"],
        PCGame: [
            "Start-Race",
            "Car-Out-Of-Track",
            "Lap-Measurement",
            "Race-Restart",
        ],
    },
    Game: ["TurboLaps-Pc", "TurboLaps-Mobile"],
};

export function createSceneNavigator(config?: Partial<NavigatorConfig>) {
    const finalConfig: NavigatorConfig = { ...defaultConfig, ...config };
    const state = createInitialState(
        sceneStructure,
        finalConfig.defaultVisible
    );

    // UI Creation
    const navContainer = createNavigationContainer(finalConfig);
    document.body.appendChild(navContainer);
    state.navContainer = navContainer;

    // Toggle Button
    if (finalConfig.enableToggleButton) {
        const toggleBtn = createToggleButton(() => {
            state.menuVisible = !state.menuVisible;
            state.navigationEnabled = state.menuVisible;
            navContainer.style.display = state.menuVisible ? "flex" : "none";
        });
        document.body.appendChild(toggleBtn);
    }

    // Menu Setup
    navigateMenu(navContainer, state, sceneStructure);

    // Keyboard Navigation
    if (finalConfig.enableKeyboardNavigation) {
        setupKeyboardNavigation(state);
    }

    return {
        getState: () => ({ ...state }),
        showMenu: () => {
            state.menuVisible = true;
            state.navigationEnabled = true;
            navContainer.style.display = "flex";
        },
        hideMenu: () => {
            state.menuVisible = false;
            state.navigationEnabled = false;
            navContainer.style.display = "none";
        },
    };
}

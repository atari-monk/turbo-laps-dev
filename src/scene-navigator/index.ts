import type { NavigatorConfig, SceneTree } from "./types";
import { defaultConfig } from "./config";
import { createInitialState } from "./state-manager";
import {
    createNavigationContainer,
    createToggleButton,
    navigateMenu,
} from "./ui-builder";
import { setupKeyboardNavigation } from "./navigation";

export function createSceneNavigator(
    sceneMenu: SceneTree,
    config?: Partial<NavigatorConfig>
) {
    const finalConfig: NavigatorConfig = { ...defaultConfig, ...config };
    const state = createInitialState(sceneMenu, finalConfig.defaultVisible);

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
    navigateMenu(navContainer, state, sceneMenu);

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

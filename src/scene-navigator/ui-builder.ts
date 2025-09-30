import type { NavigatorState, SceneTree } from "./types";
import { goToScene } from "./navigation";
import { getCurrentScene } from "./state-manager";
import { getPositionStyles } from "./config";

export function createNavigationContainer(config: any): HTMLDivElement {
    const navContainer = document.createElement("div");
    const positionStyles = getPositionStyles(config.position);

    Object.assign(navContainer.style, positionStyles, {
        gap: config.gap,
        backgroundColor: config.backgroundColor,
        padding: config.padding,
        borderRadius: config.borderRadius,
    });

    return navContainer;
}

export function createToggleButton(onToggle: () => void): HTMLButtonElement {
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle Menu / Arrows";
    toggleBtn.style.position = "absolute";
    toggleBtn.style.top = "10px";
    toggleBtn.style.right = "10px";
    toggleBtn.style.opacity = "0.5";
    toggleBtn.style.zIndex = "200";
    toggleBtn.onclick = onToggle;
    return toggleBtn;
}

export function addHomeButton(
    container: HTMLDivElement,
    state: NavigatorState,
    navigateMenu: (
        container: HTMLDivElement,
        state: NavigatorState,
        sceneStructure: SceneTree
    ) => void,
    sceneStructure: SceneTree
) {
    // Only show home button if we're not at root level
    if (state.path.length === 0) return;

    const homeBtn = document.createElement("button");
    homeBtn.textContent = "Home";
    homeBtn.style.fontWeight = "bold";
    homeBtn.onclick = () => {
        // Reset to root level
        state.path = [];
        state.currentLevel = sceneStructure;
        navigateMenu(container, state, sceneStructure);
    };
    container.appendChild(homeBtn);
}

export function addBackButton(
    container: HTMLDivElement,
    path: string[],
    currentLevel: SceneTree | string[],
    state: NavigatorState,
    navigateMenu: (
        container: HTMLDivElement,
        state: NavigatorState,
        sceneStructure: SceneTree
    ) => void,
    sceneStructure: SceneTree
) {
    if (path.length === 0) return;
    const backBtn = document.createElement("button");
    backBtn.textContent = "Back";
    backBtn.style.fontWeight = "bold";
    backBtn.onclick = () => {
        path.pop();
        currentLevel = sceneStructure;
        for (const p of path) currentLevel = (currentLevel as SceneTree)[p];
        state.currentLevel = currentLevel;
        state.path = path;
        navigateMenu(container, state, sceneStructure);
    };
    container.appendChild(backBtn);
}

export function navigateMenu(
    container: HTMLDivElement,
    state: NavigatorState,
    sceneStructure: SceneTree
) {
    container.innerHTML = "";
    state.currentButtons = [];

    // Add Home button first (only if not at home level)
    addHomeButton(container, state, navigateMenu, sceneStructure);

    if (Array.isArray(state.currentLevel)) {
        // Scene list
        state.currentLevel.forEach((scene) => {
            const btn = document.createElement("button");
            btn.textContent = scene;
            btn.onclick = () => goToScene(scene, state.path);
            container.appendChild(btn);
            state.currentButtons.push(btn);
        });
        highlightCurrentScene(state.currentButtons);
        addBackButton(
            container,
            state.path,
            state.currentLevel,
            state,
            navigateMenu,
            sceneStructure
        );
    } else {
        // Menu keys
        Object.keys(state.currentLevel).forEach((key) => {
            const btn = document.createElement("button");
            btn.textContent = key;
            btn.onclick = () => {
                state.path.push(key);
                state.currentLevel = (state.currentLevel as SceneTree)[key];
                navigateMenu(container, state, sceneStructure);
            };
            container.appendChild(btn);
        });
        addBackButton(
            container,
            state.path,
            state.currentLevel,
            state,
            navigateMenu,
            sceneStructure
        );
    }
}

export function highlightCurrentScene(currentButtons: HTMLButtonElement[]) {
    const currentScene = getCurrentScene();
    currentButtons.forEach((btn) => {
        btn.style.backgroundColor =
            btn.textContent === currentScene ? "yellow" : "";
    });
}

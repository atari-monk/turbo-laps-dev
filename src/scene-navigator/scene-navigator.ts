import type { NavigatorState, NavigatorConfig, SceneTree } from "./types";
import { defaultConfig, getPositionStyles } from "./config";

const sceneStructure: SceneTree = {
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

function getCurrentScene(): string | null {
    return new URLSearchParams(window.location.search).get("scene");
}

function getCurrentCategory(path: string[]): string | null {
    return path[0] || null;
}

function getMode(path: string[]): string {
    const category = getCurrentCategory(path);
    return category === "Single Scene" ? "current" : "all";
}

function goToScene(scene: string, path: string[]) {
    const url = new URL(window.location.href);
    url.searchParams.set("mode", getMode(path));
    url.searchParams.set("scene", scene);
    window.location.href = url.toString();
}

function highlightCurrentScene(currentButtons: HTMLButtonElement[]) {
    const currentScene = getCurrentScene();
    currentButtons.forEach((btn) => {
        btn.style.backgroundColor =
            btn.textContent === currentScene ? "yellow" : "";
    });
}

function addBackButton(
    container: HTMLDivElement,
    path: string[],
    currentLevel: SceneTree | string[],
    state: NavigatorState,
    navigateMenu: (container: HTMLDivElement, state: NavigatorState) => void
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
        navigateMenu(container, state);
    };
    container.appendChild(backBtn);
}

function navigateMenu(container: HTMLDivElement, state: NavigatorState) {
    container.innerHTML = "";
    state.currentButtons = [];

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
            navigateMenu
        );
    } else {
        // Menu keys
        Object.keys(state.currentLevel).forEach((key) => {
            const btn = document.createElement("button");
            btn.textContent = key;
            btn.onclick = () => {
                state.path.push(key);
                state.currentLevel = (state.currentLevel as SceneTree)[key];
                navigateMenu(container, state);
            };
            container.appendChild(btn);
        });
        addBackButton(
            container,
            state.path,
            state.currentLevel,
            state,
            navigateMenu
        );
    }
}

// function getPositionStyles(position: NavigatorConfig["position"]) {
//     const styles: Partial<CSSStyleDeclaration> = {
//         position: "absolute",
//         display: "flex",
//         flexWrap: "wrap",
//         zIndex: "100",
//     };

//     switch (position) {
//         case "top-left":
//             styles.top = "20px";
//             styles.left = "20px";
//             break;
//         case "top-center":
//             styles.top = "20px";
//             styles.left = "50%";
//             styles.transform = "translateX(-50%)";
//             break;
//         case "top-right":
//             styles.top = "20px";
//             styles.right = "20px";
//             break;
//         case "bottom-left":
//             styles.bottom = "20px";
//             styles.left = "20px";
//             break;
//         case "bottom-center":
//             styles.bottom = "20px";
//             styles.left = "50%";
//             styles.transform = "translateX(-50%)";
//             break;
//         case "bottom-right":
//             styles.bottom = "20px";
//             styles.right = "20px";
//             break;
//     }

//     return styles;
// }

export function createSceneNavigator(config?: Partial<NavigatorConfig>) {
    const finalConfig: NavigatorConfig = { ...defaultConfig, ...config };

    const state: NavigatorState = {
        currentLevel: sceneStructure,
        path: [],
        currentButtons: [],
        navigationEnabled: true,
        menuVisible: finalConfig.defaultVisible,
    };

    // Create navigation container
    const navContainer = document.createElement("div");
    const positionStyles = getPositionStyles(finalConfig.position);

    // Apply styles
    Object.assign(navContainer.style, positionStyles, {
        gap: finalConfig.gap,
        backgroundColor: finalConfig.backgroundColor,
        padding: finalConfig.padding,
        borderRadius: finalConfig.borderRadius,
    });

    document.body.appendChild(navContainer);
    state.navContainer = navContainer;

    // Toggle button
    if (finalConfig.enableToggleButton) {
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle Menu / Arrows";
        toggleBtn.style.position = "absolute";
        toggleBtn.style.top = "10px";
        toggleBtn.style.right = "10px";
        toggleBtn.style.opacity = "0.5";
        toggleBtn.style.zIndex = "200";
        toggleBtn.onclick = () => {
            state.menuVisible = !state.menuVisible;
            state.navigationEnabled = state.menuVisible;
            navContainer.style.display = state.menuVisible ? "flex" : "none";
        };
        document.body.appendChild(toggleBtn);
    }

    // Restore current scene from URL
    const sceneInUrl = getCurrentScene();
    if (sceneInUrl) {
        outer: for (const topKey of Object.keys(sceneStructure)) {
            const topVal = sceneStructure[topKey];
            if (Array.isArray(topVal) && topVal.includes(sceneInUrl)) {
                state.path = [topKey];
                state.currentLevel = topVal;
                break outer;
            } else if (typeof topVal === "object") {
                for (const subKey of Object.keys(topVal)) {
                    if (topVal[subKey].includes(sceneInUrl)) {
                        state.path = [topKey, subKey];
                        state.currentLevel = topVal[subKey];
                        break outer;
                    }
                }
            }
        }
    }

    navigateMenu(navContainer, state);

    // Arrow key navigation
    if (finalConfig.enableKeyboardNavigation) {
        window.addEventListener("keydown", (e) => {
            if (!state.navigationEnabled) return;
            if (!Array.isArray(state.currentLevel)) return;
            const currentIndex = state.currentLevel.findIndex(
                (s: string) => s === getCurrentScene()
            );
            let newIndex = currentIndex;
            if (
                e.key === "ArrowRight" &&
                currentIndex < state.currentLevel.length - 1
            )
                newIndex++;
            else if (e.key === "ArrowLeft" && currentIndex > 0) newIndex--;
            else return;

            goToScene(state.currentLevel[newIndex], state.path);
            highlightCurrentScene(state.currentButtons);
        });
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

import type { NavigatorState, SceneTree } from "./types";

export function getCurrentScene(): string | null {
    return new URLSearchParams(window.location.search).get("scene");
}

export function getCurrentCategory(path: string[]): string | null {
    return path[0] || null;
}

export function getMode(path: string[]): string {
    const category = getCurrentCategory(path);
    return category === "Scene" ? "current" : "all";
}

export function restoreStateFromURL(sceneStructure: SceneTree): {
    path: string[];
    currentLevel: SceneTree | string[];
} {
    const sceneInUrl = getCurrentScene();
    const state = {
        path: [] as string[],
        currentLevel: sceneStructure as SceneTree | string[],
    };

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

    return state;
}

export function createInitialState(
    sceneStructure: SceneTree,
    defaultVisible: boolean
): NavigatorState {
    const { path, currentLevel } = restoreStateFromURL(sceneStructure);

    return {
        currentLevel,
        path,
        currentButtons: [],
        navigationEnabled: true,
        menuVisible: defaultVisible,
    };
}

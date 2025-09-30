import { getCurrentScene, getMode } from "./state-manager";
import { highlightCurrentScene } from "./ui-builder";
import type { NavigatorState } from "./types";

export function goToScene(scene: string, path: string[]) {
    const url = new URL(window.location.href);
    url.searchParams.set("mode", getMode(path));
    url.searchParams.set("scene", scene);
    window.location.href = url.toString();
}

export function setupKeyboardNavigation(
    state: NavigatorState,
    onSceneChange?: (scene: string) => void
) {
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
        ) {
            newIndex++;
        } else if (e.key === "ArrowLeft" && currentIndex > 0) {
            newIndex--;
        } else {
            return;
        }

        const newScene = state.currentLevel[newIndex];
        goToScene(newScene, state.path);

        if (onSceneChange) {
            onSceneChange(newScene);
        } else {
            highlightCurrentScene(state.currentButtons);
        }
    });
}

export function getAdjacentScenes(state: NavigatorState): {
    previous?: string;
    next?: string;
} {
    if (!Array.isArray(state.currentLevel)) return {};

    const currentScene = getCurrentScene();
    const currentIndex = state.currentLevel.findIndex(
        (s: string) => s === currentScene
    );

    return {
        previous:
            currentIndex > 0 ? state.currentLevel[currentIndex - 1] : undefined,
        next:
            currentIndex < state.currentLevel.length - 1
                ? state.currentLevel[currentIndex + 1]
                : undefined,
    };
}

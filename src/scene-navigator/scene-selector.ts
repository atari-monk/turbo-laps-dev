import type { SceneInfo } from "./types";

export class SceneSelector {
    constructor(
        availableScenes: SceneInfo[],
        logOptions = true,
        logSelection = true
    ) {
        this.urlParams = new URLSearchParams(window.location.search);
        this.availableScenes = availableScenes;

        if (logOptions) this.logOptions();

        this.sceneMode =
            (this.urlParams.get("mode") as "current" | "all") || "current";
        this.requestedSceneId = this.urlParams.get("scene") || "";
        this.selectedScene = this.determineSelectedScene();

        if (logSelection) this.logSelection();
    }

    get selected(): SceneInfo | null {
        return this.selectedScene;
    }

    private readonly urlParams: URLSearchParams;
    private readonly availableScenes: SceneInfo[];

    private readonly sceneMode: "current" | "all";
    private readonly requestedSceneId: string;
    private readonly selectedScene: SceneInfo | null;

    private determineSelectedScene(): SceneInfo | null {
        if (this.sceneMode === "current" && this.requestedSceneId) {
            return (
                this.availableScenes.find(
                    (scene) => scene.id === this.requestedSceneId
                ) || null
            );
        }
        return null;
    }

    private logOptions() {
        console.log("=== Available Scene URLs ===");
        const baseUrl = window.location.origin + window.location.pathname;

        this.availableScenes.forEach((scene) => {
            const url = `${baseUrl}?mode=current&scene=${encodeURIComponent(
                scene.id
            )}`;
            console.log(`• ${scene.name}: ${url}`);
        });
    }

    private logSelection(): void {
        console.log("=== Scene URL Selected ===");
        console.log(`Mode: ${this.sceneMode}`);

        if (this.selectedScene) {
            console.log(
                `Selected: ${this.selectedScene.name} (${this.selectedScene.id})`
            );
            console.log(`Description: ${this.selectedScene.description}`);
        } else if (this.requestedSceneId) {
            console.log(`Invalid scene: ${this.requestedSceneId}`);
            console.log(
                `Available: ${this.availableScenes.map((s) => s.id).join(", ")}`
            );
        } else {
            console.log("Select a scene to proceed");
        }
    }
}

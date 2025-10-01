import "./style.css";
import "fullscreen-canvas-vanilla";
import { SceneSelector } from "./scene-navigator/scene-selector";
import { ElipseTrack } from "./scenes/track/elipse-track";
import { setupDevEnv } from "./utils/zippy-components";
import { RectangleTrack } from "./scenes/track/rectangle-track";
import { loadJsonData } from "./utils/web-basics";
import type { TrackConfig } from "./scenes/track/types";
import type { CrossLinesConfig, RotatingRectConfig } from "./scenes/test/types";
import { CrossLines } from "./scenes/test/cross-lines";
import { RotatingRect } from "./scenes/test/rotating-rect";
import type { SceneInfo } from "./scene-navigator/types";

window.addEventListener("load", async () => {
    const { canvas, engine } = await setupDevEnv();

    const scene = new SceneSelector(
        await loadJsonData<SceneInfo[]>("data/scenes.json")
    ).selected;

    if (scene) {
        if (scene.id === "Cross-Lines") {
            engine.registerScene(
                scene.id,
                new CrossLines(
                    await loadJsonData<CrossLinesConfig>(
                        "data/scene-config/cross-lines.json"
                    )
                )
            );
        }
        if (scene.id === "Rotating-Rectangle") {
            engine.registerScene(
                scene.id,
                new RotatingRect(
                    await loadJsonData<RotatingRectConfig>(
                        "data/scene-config/rotating-rect.json"
                    )
                )
            );
        }
        if (scene.id === "Elipse-Track") {
            engine.registerScene(
                scene.id,
                new ElipseTrack(
                    canvas,
                    await loadJsonData<TrackConfig>(
                        "data/scene-config/track.json"
                    )
                )
            );
        }
        if (scene.id === "Rectangle-Track") {
            engine.registerScene(
                scene.id,
                new RectangleTrack(
                    canvas,
                    await loadJsonData<TrackConfig>(
                        "data/scene-config/track.json"
                    )
                )
            );
        }
        engine.transitionToScene(scene.id);
    } else {
        engine.registerScene(
            "Rotating-Rectangle",
            new RotatingRect(
                await loadJsonData<RotatingRectConfig>(
                    "data/scene-config/rotating-rect.json"
                )
            )
        );
        engine.transitionToScene("Rotating-Rectangle");
    }
});

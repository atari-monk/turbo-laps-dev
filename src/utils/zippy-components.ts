import type { EngineHook } from "zippy-shared-lib";
import {
    createGameCanvas,
    type FullscreenCanvasOptions,
} from "fullscreen-canvas-vanilla";
import { GameEngine, GameEngineFactory } from "zippy-game-engine";
import { createSceneNavigator } from "../scene-navigator";
import { getElement, loadJsonData } from "./web-basics";
import type { SceneTree } from "../scene-navigator/types";

export async function setupDevEnv(): Promise<{
    canvas: HTMLCanvasElement;
    engine: GameEngine;
}> {
    const engine = setupEngine();
    setupCanvas(engine);
    const canvas = getElement<HTMLCanvasElement>("game-canvas");
    createSceneNavigator(await loadJsonData<SceneTree>("data/scene-menu.json"));
    return { canvas, engine };
}

function setupEngine() {
    const gameEngineFactory = new GameEngineFactory();
    const gameEngine = gameEngineFactory.getGameEngine();
    return gameEngine;
}

function setupCanvas(engine: EngineHook) {
    const options: FullscreenCanvasOptions = { isAnimLoop: true };
    createGameCanvas("canvas-container", "game-canvas", engine, options);
}

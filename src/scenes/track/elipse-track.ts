import type { FrameContext } from "zippy-shared-lib";
import type { Scene } from "zippy-game-engine";
import type { TrackConfig } from "./types";

export class ElipseTrack implements Scene {
    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly config: TrackConfig
    ) {}

    render(context: FrameContext): void {
        const { ctx } = context;
        const { centerX, centerY, radiusX, radiusY, roadWidth, roadColor } =
            this.config;

        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.lineWidth = roadWidth;
        ctx.strokeStyle = roadColor;
        ctx.stroke();
    }

    init(): void {
        this.config.centerX = this.canvas.width / 2;
        this.config.centerY = this.canvas.height / 2;
    }

    name: string = "Elipse-Track";
    displayName: string = "Elipse Track";
}

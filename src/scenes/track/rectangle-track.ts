import type { FrameContext } from "zippy-shared-lib";
import type { Scene } from "zippy-game-engine";
import type { TrackConfig } from "./types";

export class RectangleTrack implements Scene {
    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly config: TrackConfig
    ) {}

    render(context: FrameContext): void {
        const ctx = context.ctx;
        const {
            roadWidth,
            roadColor,
            centerX: cx,
            centerY: cy,
            radiusX,
            radiusY,
        } = this.config;

        ctx.lineWidth = roadWidth;
        ctx.strokeStyle = roadColor;

        ctx.beginPath();
        ctx.moveTo(cx - radiusX + radiusY, cy - radiusY);

        ctx.lineTo(cx + radiusX - radiusY, cy - radiusY);
        ctx.arcTo(
            cx + radiusX,
            cy - radiusY,
            cx + radiusX,
            cy - radiusY + radiusY,
            radiusY
        );

        ctx.lineTo(cx + radiusX, cy + radiusY - radiusY);
        ctx.arcTo(
            cx + radiusX,
            cy + radiusY,
            cx + radiusX - radiusY,
            cy + radiusY,
            radiusY
        );

        ctx.lineTo(cx - radiusX + radiusY, cy + radiusY);
        ctx.arcTo(
            cx - radiusX,
            cy + radiusY,
            cx - radiusX,
            cy + radiusY - radiusY,
            radiusY
        );

        ctx.lineTo(cx - radiusX, cy - radiusY + radiusY);
        ctx.arcTo(
            cx - radiusX,
            cy - radiusY,
            cx - radiusX + radiusY,
            cy - radiusY,
            radiusY
        );

        ctx.stroke();
    }

    init(): void {
        this.config.centerX = this.canvas.width / 2;
        this.config.centerY = this.canvas.height / 2;
    }

    name: string = "Rectangle-Track";
    displayName: string = "Rectangle Track";
}

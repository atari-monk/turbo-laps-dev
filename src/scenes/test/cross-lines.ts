import type { FrameContext } from "zippy-shared-lib";
import type { Scene } from "zippy-game-engine";
import type { CrossLinesConfig } from "./types";

export class CrossLines implements Scene {
    constructor(private readonly config: CrossLinesConfig) {}

    render(context: FrameContext): void {
        const ctx = context.ctx;
        const { lineColor, lineWidth } = this.config

        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();

        ctx.moveTo(0, ctx.canvas.height / 2);
        ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);

        ctx.moveTo(ctx.canvas.width / 2, 0);
        ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);

        ctx.stroke();
    }

    name: string = "Cross-Lines";
    displayName: string = "Cross Lines";
}

import type { FrameContext } from "zippy-shared-lib";
import type { Scene } from "zippy-game-engine";
import type { RotatingRectConfig } from "./types";

export class RotatingRect implements Scene {
    constructor(private readonly config: RotatingRectConfig) {}

    render(context: FrameContext): void {
        const { ctx, width, height, totalTime } = context;
        const { rectSize, rotationSpeed, colorSpeed } = this.config;
        const rspeed = totalTime * rotationSpeed;
        const cspeed = totalTime * colorSpeed;

        ctx.fillStyle = `hsl(${cspeed % 360}, 100%, 50%)`;
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(rspeed);
        ctx.fillRect(-rectSize / 2, -rectSize / 2, rectSize, rectSize);
        ctx.restore();
    }

    name: string = "Rotating-Rectangle";
    displayName: string = "Rotating Rectangle";
}

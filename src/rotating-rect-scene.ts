import type { FrameContext } from "zippy-shared-lib";
import type { Scene } from "zippy-game-engine";

interface RotatingRectSceneConfig {
    rectSize: number;
}

export class RotatingRectScene implements Scene {
    name: string = "Rotating Rectangle";
    displayName?: string;

    private config: RotatingRectSceneConfig = {
        rectSize: 200,
    };

    init(): void {
        console.log("Initializing Rotating Rectangle Scene");
    }

    render(context: FrameContext): void {
        this.renderBackground(context.ctx);
        this.renderRotatingRect(context);
    }

    private renderBackground(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "#222";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    private renderRotatingRect(context: FrameContext): void {
        const { ctx, width, height, totalTime } = context;

        ctx.fillStyle = `hsl(${(totalTime * 50) % 360}, 100%, 50%)`;
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(totalTime);
        ctx.fillRect(
            -this.config.rectSize / 2,
            -this.config.rectSize / 2,
            this.config.rectSize,
            this.config.rectSize
        );
        ctx.restore();
    }
}

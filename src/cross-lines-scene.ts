import type { FrameContext } from "zippy-shared-lib";
import type { Scene } from "zippy-game-engine";

interface CrossLinesSceneConfig {
    lineColor: string;
    lineWidth: number;
}

export class CrossLinesScene implements Scene {
    name: string = "Cross Lines";
    displayName?: string;

    private config: CrossLinesSceneConfig = {
        lineColor: "green",
        lineWidth: 3,
    };

    init(): void {
        console.log("Initializing Cross Lines Scene");
    }

    render(context: FrameContext): void {
        this.renderBackground(context.ctx);
        this.renderLines(context.ctx);
    }

    private renderBackground(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "#222";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    private renderLines(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = this.config.lineColor;
        ctx.lineWidth = this.config.lineWidth;
        ctx.beginPath();

        this.drawHorizontalLine(ctx);
        this.drawVerticalLine(ctx);

        ctx.stroke();
    }

    private drawHorizontalLine(ctx: CanvasRenderingContext2D): void {
        ctx.moveTo(0, ctx.canvas.height / 2);
        ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
    }

    private drawVerticalLine(ctx: CanvasRenderingContext2D): void {
        ctx.moveTo(ctx.canvas.width / 2, 0);
        ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);
    }
}

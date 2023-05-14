import { PlayAgainButtonConfig } from "../constants/index.js";
import GameObject from "./GameObject.js";

export default class PlayAgainButton extends GameObject {
    buttonClicked;
    isEnabled;

    constructor(context, x, y, width, height) {
        super(context, x, y, width, height);
        this.isEnabled = false;
    }

    render() {
        this.context.save();
        this.renderBackground();
        this.context.restore();

        this.context.save();
        this.renderText();
        this.context.restore();

        this.isEnabled = true;
    }

    setClickHandler(handler) {
        this.buttonClicked = handler;
    }

    renderBackground() {
        const backgroundGradient = this.context.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
        backgroundGradient.addColorStop(0, "#225FFD");
        backgroundGradient.addColorStop(1, "#1D48B8");

        this.context.fillStyle = backgroundGradient;
        this.context.strokeStyle = "1px black";
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.strokeRect(this.x, this.y, this.width, this.height);
    }

    renderText() {
        this.context.fillStyle = "white";
        this.context.font = "16px Arial";
        this.context.textAlign = "center";
        this.context.textBaseline = "top";

        const textMetrics = this.context.measureText(PlayAgainButtonConfig.TEXT);
        const textHeight = textMetrics.actualBoundingBoxDescent;

        const finalTextY = this.y + (this.height / 2) - textHeight / 2;

        this.context.fillText(PlayAgainButtonConfig.TEXT, this.x + PlayAgainButtonConfig.WIDTH / 2, finalTextY);
    }

    handleClick(clickEvent) {
        if (!this.isEnabled) {
            return;
        }

        const wasButtonClicked = clickEvent.offsetX >= this.x
            && clickEvent.offsetX <= this.x + this.width
            && clickEvent.offsetY >= this.y
            && clickEvent.offsetY <= this.y + this.height;

        if (!wasButtonClicked) {
            return;
        }

        this.buttonClicked();
    }

    disable() {
        this.isEnabled = false;
    }
}

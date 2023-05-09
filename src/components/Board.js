import { BoardConfig } from "../constants/index.js";
import GameObject from "./GameObject.js";

export default class Board extends GameObject {
    render(nextBoard) {
        this.clear();
        this.renderBoardRectangle();

        this.context.restore();
    }

    renderBoardRectangle() {
        this.context.fillStyle = BoardConfig.BACKGROUND_COLOR;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}
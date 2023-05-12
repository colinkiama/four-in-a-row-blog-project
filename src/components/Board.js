import { BoardConfig, TokenColor } from "../constants/index.js";
import { Constants } from "../gameLogic/index.js";
import GameObject from "./GameObject.js";

export default class Board extends GameObject {
    columnSelected;

    render(nextBoard) {
        this.context.save();
        this.clear();
        this.renderBoardRectangle();
        this.renderSlots(nextBoard);
        this.context.restore();
    }

    renderBoardRectangle() {
        this.context.fillStyle = BoardConfig.BACKGROUND_COLOR;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    renderSlots(nextBoard) {
        this.context.translate(this.x + BoardConfig.HORIZONTAL_PADDING, this.y + BoardConfig.VERTICAL_PADDING);
        this.context.strokeStyle = BoardConfig.SLOT_OUTLINE_COLOR;
        this.context.lineWidth = 2;
        const slotRadius = BoardConfig.SLOT_WIDTH / 2;

        for (let rowIndex = 0; rowIndex < Constants.BoardDimensions.ROWS; rowIndex++) {
            for (let columnIndex = 0; columnIndex < Constants.BoardDimensions.COLUMNS; columnIndex++) {
                // Note slot is a circle. (x, y) coordinates are the circle's centre.
                let slotX = (BoardConfig.SLOT_MARGIN * columnIndex) + (BoardConfig.SLOT_WIDTH * columnIndex) + slotRadius;
                let slotY = (BoardConfig.SLOT_MARGIN * rowIndex) + (BoardConfig.SLOT_WIDTH * rowIndex) + slotRadius;
                let tokenColorValue = nextBoard[rowIndex][columnIndex];

                let tokenColor;

                switch (tokenColorValue) {
                    case Constants.BoardToken.YELLOW:
                        tokenColor = TokenColor.YELLOW;
                        break;
                    case Constants.BoardToken.RED:
                        tokenColor = TokenColor.RED;
                        break;
                    default:
                        tokenColor = TokenColor.NONE
                        break;
                }

                this.renderSlot(slotX, slotY, slotRadius, tokenColor);
            }
        }
    }

    renderSlot(x, y, radius, color) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2);
        this.context.closePath();
        this.context.stroke();

        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, radius - 1, 0, Math.PI * 2);
        this.context.closePath();
        this.context.fill();
    }

    setColumnSelectionHandler(callback) {
        this.columnSelected = callback;
    }

    handleClick(clickEvent) {
        this.trySelectColumn(clickEvent);
    }

    trySelectColumn(clickEvent) {
        for (let columnIndex = 0; columnIndex < Constants.BoardDimensions.COLUMNS; columnIndex++) {
            let columnX = this.x + BoardConfig.HORIZONTAL_PADDING + (columnIndex * BoardConfig.SLOT_MARGIN) + (columnIndex * BoardConfig.SLOT_WIDTH);

            const wasColumnClicked = clickEvent.offsetX >= columnX
                && clickEvent.offsetX <= (columnX + BoardConfig.SLOT_WIDTH)
                && clickEvent.offsetY >= this.y + BoardConfig.VERTICAL_PADDING
                && clickEvent.offsetY <= this.y + BoardConfig.HEIGHT - BoardConfig.VERTICAL_PADDING;

            if (wasColumnClicked) {
                this.columnSelected(columnIndex);
                break;
            }
        }
    }
}
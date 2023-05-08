import { Constants } from "../FourInARow/index.js";
import { StatusAreaConfig, TokenColor } from "../constants/index.js";
import GameObject from "./GameObject.js";

export class StatusArea extends GameObject {
    render(indicatorColor, message) {
        this.context.fillRect(0, 0, this.width, this.height);

        if (indicatorColor !== Constants.PlayerColor.NONE) {
            this.renderPlayerTurnIndicator(indicatorColor);
        }

        this.renderMessage(message);
        this.context.restore();
    }

    renderPlayerTurnIndicator(indicatorColor) {
        let indicatorColorValue;

        switch (indicatorColor) {
            case Constants.PlayerColor.YELLOW:
                indicatorColorValue = TokenColor.YELLOW;
                break;
            case Constants.PlayerColor.RED:
                indicatorColorValue = TokenColor.RED;
                break;
            default:
                // Unknown color. Do not attempt to render player turn indicator.
                return;
        }

        this.context.fillStyle = indicatorColorValue;
        const indicatorY = this.y + StatusAreaConfig.INDICATOR_WIDTH / 2 + StatusAreaConfig.PADDING_TOP;
        this.context.arc(this.width / 2, indicatorY, StatusAreaConfig.INDICATOR_WIDTH / 2, 0, Math.PI * 2);
        this.context.fill();
    }

    renderMessage(message) {
        this.context.fillStyle = "white";
        this.context.font = "bold 1rem Arial";
        this.context.textBaseline = "top";
        this.context.textAlign = "center";
        const messageY = this.y + StatusAreaConfig.PADDING_TOP + StatusAreaConfig.INNER_MARGIN;
        this.context.fillText(message, this.width / 2, messageY, 300);
    }
}
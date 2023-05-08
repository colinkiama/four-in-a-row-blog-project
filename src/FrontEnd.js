import { Constants } from "./gameLogic/index.js";
import { StatusArea } from "./components/StatusArea.js";
import { GAME_BACKGROUND_COLOR, StatusAreaConfig, StatusMessages } from "./constants/index.js";

export default class FrontEnd {
    canvas;
    context;
    game;
    width;
    height;
    statusArea;

    constructor(game) {
        this.canvas = document.getElementById("canvas");
        this.canvas.style.background = GAME_BACKGROUND_COLOR;
        this.context = this.canvas.getContext("2d");
        this.game = game;
        this.width = canvas.width;
        this.height = canvas.height;

        enableHiDPISupport(this.canvas, this.context);
    }

    start() {
        this.statusArea = this.createStatusArea();
    }

    createStatusArea() {
        let statusArea = new StatusArea(this.context, 0, 0, this.canvas.width, StatusAreaConfig.HEIGHT);
        const statusMessage = this.game.currentTurn === Constants.PlayerColor.YELLOW ? StatusMessages.YELLOW_TURN : StatusMessages.RED_TURN;
        statusArea.render(this.game.currentTurn, statusMessage);
        return statusArea;
    }
}

// Source: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#scaling_for_high_resolution_displays
function enableHiDPISupport(canvas, context) {
    // Get the DPR and size of the canvas
    const dpr = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();

    // Set the "actual" size of the canvas
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale the context to ensure correct drawing operations
    context.scale(dpr, dpr);

    // Set the "drawn" size of the canvas
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
}
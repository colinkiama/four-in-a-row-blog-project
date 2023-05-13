import { Constants } from "./gameLogic/index.js";
import { Board, StatusArea } from "./components/index.js";
import { BoardConfig, GAME_BACKGROUND_COLOR, StatusAreaConfig, StatusMessages } from "./constants/index.js";

export default class FrontEnd {
    canvas;
    context;
    game;
    width;
    height;
    statusArea;
    board;
    gameOver;

    constructor(game) {
        this.canvas = document.getElementById("canvas");
        this.canvas.style.background = GAME_BACKGROUND_COLOR;
        this.context = this.canvas.getContext("2d");
        this.game = game;
        this.width = canvas.width;
        this.height = canvas.height;
        this.gameOver = false;

        enableHiDPISupport(this.canvas, this.context);
    }

    start() {
        this.statusArea = this.createStatusArea();
        this.board = this.createBoard();

        document.body.addEventListener('click', (clickEvent) => {
            this.board.handleClick(clickEvent);
        });
    }

    createBoard() {
        let board = new Board(this.context, BoardConfig.MARGIN_LEFT, this.statusArea.height + BoardConfig.MARGIN_TOP, BoardConfig.WIDTH, BoardConfig.HEIGHT);
        board.setColumnSelectionHandler((columnIndex) => this.playMove(columnIndex));
        board.render(this.game.currentBoard);
        return board;
    }

    createStatusArea() {
        let statusArea = new StatusArea(this.context, 0, 0, this.canvas.width, StatusAreaConfig.HEIGHT);
        statusArea.render(this.game.currentTurn, this.pickStatusMessage(this.game.status));
        return statusArea;
    }

    playMove(columnIndex) {
        let moveResult = this.game.playMove(columnIndex);
        this.processMoveResult(moveResult);
    }

    processMoveResult(moveResult) {
        console.log("Move result:", moveResult);

        if (this.gameOver || moveResult.status.value === Constants.MoveStatus.INVALID) {
            return;
        }

        const indicatorColor = moveResult.status.value === Constants.MoveStatus.DRAW ? Constants.PlayerColor.NONE : this.game.currentTurn;

        this.statusArea.render(indicatorColor, this.pickStatusMessage(moveResult.status.value))
        this.board.render(this.game.currentBoard);

        if (moveResult.status.value === Constants.MoveStatus.WIN || moveResult.status.value === Constants.MoveStatus.DRAW) {
            this.gameOver = true;
        }
    }

    pickStatusMessage(status) {
        switch (status) {
            case Constants.GameStatus.WIN:
                return this.game.currentTurn === Constants.PlayerColor.YELLOW ? StatusMessages.YELLOW_WIN : StatusMessages.RED_WIN;
            case Constants.GameStatus.DRAW:
                return StatusMessages.DRAW;
        }

        // At this point, we can assume that the game is either has just started 
        // or is still in progress.
        return this.game.currentTurn === Constants.PlayerColor.YELLOW ? StatusMessages.YELLOW_TURN : StatusMessages.RED_TURN;
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
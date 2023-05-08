import { FourInARowGame } from "./FourInARow/index.js";
import FrontEnd from "./FrontEnd.js";

let frontEnd = new FrontEnd(new FourInARowGame());
frontEnd.start();
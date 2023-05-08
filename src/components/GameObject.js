export default class GameObject {
    x;
    y;
    width;
    height;
    context;

    constructor(context, x, y, width, height) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
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

    clear() {
        // Replace existing pixels with what is drawn
        this.context.clearRect(this.x, this.y, this.width, this.height);
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}
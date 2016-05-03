export class Event<T> {
    private handlers: { (data?: T): void; }[];

    public on(handler: { (data?: T): void }) {
        if (!this.handlers) {
            this.handlers = [];
        }

        this.handlers.push(handler);
    }

    public off(handler: { (data?: T): void }) {
        if (this.handlers) {
            this.handlers = this.handlers.filter(h => h !== handler);
            if (this.handlers.length == 0) {
                this.handlers = null;
            }
        }
    }

    public trigger(data?: T) {
        if (this.handlers) {
            this.handlers.forEach(h => h(data));
        }
    }
}
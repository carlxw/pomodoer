export default class Task {
    constructor(taskName, isST, isDone) {
        this.taskName = taskName;
        this.isST = isST;
        this.isDone = isDone;
    }

    toObject() {
        return {"name": this.taskName, "isST": this.isST, "isDone": this.isDone}
    }
}
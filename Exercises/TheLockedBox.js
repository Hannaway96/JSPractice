const box = {
    locked: true,
    content: [],
    unlock() { this.locked = false },
    lock() { this.locked = true },
    getContent() {
        if (this.locked) throw new Error("Locked");
        return this.content;
    }
};

function withBoxUnlocked(body) {
    let locked = box.locked;
    if (!locked) {
        return body();
    }

    box.unlock();
    try {
        return body();
    }
    finally {
        box.lock();
    }
}

withBoxUnlocked(function () {
    box.content.push("gold piece");
});

box.unlock();
console.log(box.getContent());

withBoxUnlocked(() => box.content.push("Silver ring"));

box.unlock();
console.log(box.getContent());
function wait(waitTime) {
    return new Promise(resolve => setTimeout(() => {
        console.log(`waited ${waitTime} ms`)
        resolve()
    }, waitTime));
}

async function serial() {
    console.time('serial promise');
    await wait(1000);
    await wait(2000);
    await wait(3000);
    console.timeEnd('serial promise');
}

async function parallel() {
    console.time('parallel promise');
    await Promise.all([
        wait(1000),
        wait(2000),
        wait(3000)
    ])
    console.timeEnd('parallel promise');
}

async function test() {
    await serial();
    await parallel();
}

test();
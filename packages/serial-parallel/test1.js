// https://dev.to/micahriggan/serial-promises-vs-parallel-promises-1ejc

function wait(waitTime) {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`waited ${waitTime} ms`);
      resolve();
    }, waitTime)
  );
}

async function serial() {
  console.time("serial");
  await wait(1000);
  await wait(1000);
  await wait(1000);
  console.timeEnd("serial");
}

async function parallel() {
  console.time("parallel");
  await Promise.all([wait(1000), wait(1000), wait(1000)]);
  console.timeEnd("parallel");
}

async function test() {
  await serial();
  await parallel();
}

test();

// confuse hàm serial() chạy đồng bộ với sự bất đồng bộ của js
// nghĩ: await chỉ là cách viết gọn cho sự bất đồng bộ, thì tại sao ở đây lại có vẻ như chính nó là đồng bộ
// thực ra vì: coi 3 cái await đó như là 3 cái callback lồng nhau

// về hàm promise.all, thực thi parallel, giống async.parallel lib
// ở đây dùng promise all đc vì 3 function wait() ko liên quan gì nhau

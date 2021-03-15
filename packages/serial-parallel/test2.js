const syncFunc = () => {
  console.log("syncFunc");
};

// simulator a async function
const asyncFunc = () => {
  setTimeout(() => {
    console.log("asyncFunc");
  }, 1); // 1ms is extremely small
};

// a async function that return promise
const asyncPromiseFunction3s = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("asyncPromiseFunction3s");
      resolve();
    }, 3000);
  });
};

// a async function that return promise
const asyncPromiseFunction7s = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("asyncPromiseFunction7s");
      resolve();
    }, 7000);
  });
};

const syncFunc1 = () => {
  console.log("syncFunc1");
};

const main = async () => {
  console.time("lol");
  asyncPromiseFunction3s();
  asyncPromiseFunction7s();
  syncFunc1();
  console.timeEnd("lol");
  // bấm giờ, mất 7s
};

main();

// để biến 1 sync function thành async thì sử dụng setTimeout, đúng/sai?, hay vẫn chỉ là giả lập async func thôi
// FIXME: js how to make a asynchronous function
// cannot: https://stackoverflow.com/questions/9516900/how-can-i-create-an-asynchronous-function-in-javascript
// có thể await async function đó bằng callback hoặc trả về 1 promise (thực sự vẫn là callback)
// với TH trả về 1 promise: muốn nó non-block thì ko dùng await, muốn nó block (wait) thì dùng await
// process trong setTimeout có thể chạy parallel, nghĩa là nó chính là async chứ ko phải là delay sync

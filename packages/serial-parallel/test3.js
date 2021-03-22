const asyncPromiseFunction = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("asyncPromiseFunction", time);
      resolve(time);
    }, time);
  });
};

const transactions = [
  { id: 1, time: 3000 },
  { id: 2, time: 7000 },
];

const lol = async () => {
  console.time("lol");
  await Promise.all(
    transactions.map(async (e) => {
      const a = await asyncPromiseFunction(e.time);
      console.log("----");
      return asyncPromiseFunction(e.time);
    })
  );
  console.timeEnd("lol");
};

const lul = async () => {
  console.time("lul");
  const a = await Promise.all(
    transactions.map(async (e) => {
      return asyncPromiseFunction(e.time);
    })
  );
  const b = await Promise.all(
    a.map((e) => {
      return asyncPromiseFunction(e);
    })
  );
  console.timeEnd("lul");
};

main = async () => {
  await lul();
};

main();

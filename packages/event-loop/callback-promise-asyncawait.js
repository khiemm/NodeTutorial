const promise1 = new Promise(function (resolve, reject) {
    resolve('Success!');
});

function getData(url, callback) {
    return promise1
        .then(res => {
            debugger
            return callback(url + res)
        })
        .then(data => {
            debugger
            console.log(data)
        })
};

var main = async function () {
    const data = await getData('Hello ', data => {
        debugger
        console.log(data)
        return data + ' Again'
    })
        .then(() => console.log("The end!"))
    console.log("The end! After await")
};

main()
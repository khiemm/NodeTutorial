var array = [1, 2, 3, 4]

function forLoop() {
    for (var i = 0; i < 4; i++) {
        console.log(array[i])
        if (array[i] % 2 == 0) {
            i = i + 1
        }
    }
}

function forEachLoop() {
    array.forEach(element => {
        if (element % 2 == 0) {
            console.log(element)
        }
    })
}

forLoop()
forEachLoop()

// NOTE: study again when very free
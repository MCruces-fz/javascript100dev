onmessage = async event => {
    const { testCode, globalCode, duration } = event.data
    let result
    try {
        result = await eval(`(async () => {
                let PERF__ops = 0;
                let PERF__start = Date.now();
                let PERF__end = Date.now() + ${duration};
                ${globalCode};

                while (Date.now() < PERF__end) {
                    ${testCode};
                    PERF__ops++;
                }
                return PERF__ops;
                })()`) // IIFE -> Inmediately Invoked Function Expression
    } catch (error) {
        console.log(error)
        result = 0
    }

    postMessage((result * 1000) / duration)
}
console.log(process.argv);
const consoleToJSON = () => {
    const arr = [];

    for (let index = 2; index < process.argv.length; index++) {
        const element = process.argv[index].split('=');
        arr[element[0]] = element[1] ? element[1] : true;
    }
    return arr;
}

console.log(consoleToJSON());
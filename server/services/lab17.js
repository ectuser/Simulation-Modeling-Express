const main = () => {
    const t1 = [0];
    const t2 = [0];

    const lambda1 = 0.3;
    const lambda2 = 0.5;

    for (let i = 0; i < 10; i++){
        t1.push(emulateFlow(lambda1, t1[t1.length - 1]));
        t2.push(emulateFlow(lambda2, t2[t2.length - 1]));
    }
    console.log(t1, t2);
    const combined = mergeAndSortArrays([...t1], [...t2]);
    console.log(combined);
}

const emulateFlow = (lambda, prevT) => {
    const alpha = 0.5;
    return prevT + ( -Math.log(alpha) / lambda );
}

const mergeAndSortArrays = (first, second) => ([...first, ...second].sort((a, b) => a - b));

main();
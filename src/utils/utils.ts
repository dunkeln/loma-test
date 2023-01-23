export const generateArr = 
(size: number, numbers: boolean = true)  =>
    Array.from({
                length: size * size
            }, (_, i) => 
            numbers && i < 26 
                ? String.fromCharCode(i + 65)
                : i + 1);

export const shuffle = (arr: (String | Number)[]) => arr.sort(() => Math.random() - .5);

export const formatTimer = (number: number) => 
    number > 9 ? String(number) : '0' + number;

const makeBoard = (arr: (String|Number)[] , size: number) =>
    Array.from({ length: size }, (_, i) => 
        arr.slice(i * size, size + (i * size))
    );

export default makeBoard;

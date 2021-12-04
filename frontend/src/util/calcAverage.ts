

export const calcAverage = (arr: any[]): number => {
    return arr.reduce(function (sum, value) {
        return sum + value.rating;
    }, 0) / arr.length;
}
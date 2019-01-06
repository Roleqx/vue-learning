// Generates a random number within a given range
export const rand = (min, max) => {
    if (max === undefined) {
        return Math.floor(Math.random() * min + 1)
    } else {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

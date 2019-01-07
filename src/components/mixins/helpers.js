// Filters an object by returning an new one excluding all propeties that are samller or equal to 0, undefined, or null
export const objFilter = (obj) => {
    const filteredObj = {}
    for (let key in obj) {
        if (obj[key] > 0 && obj[key] !== undefined && obj[key] !== null) {
            filteredObj[key] = obj[key]
        }
    }
    return filteredObj
}

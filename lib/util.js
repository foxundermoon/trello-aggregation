export function getUrl(prefix, query) {

    let strQuery = ""
    if (query) {
        strQuery = "?"
        for (let k in query) {
            strQuery += `${k}=${query[k]}&`
        }
        strQuery = strQuery.substring(0, strQuery.length - 1)
    }
    return `${window.location.protocol}//${window.location.host}${prefix}${strQuery}`
}
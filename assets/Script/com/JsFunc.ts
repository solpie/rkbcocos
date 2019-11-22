export function formatSecond(sec, isSecOnly = false, minStr = ":", secStr = "") {
    let min = Math.floor(sec / 60);
    let s = sec % 60;
    let strMin = min + "";
    let strSec = s + "";
    if (min < 10)
        strMin = "0" + strMin;
    if (s < 10)
        strSec = "0" + strSec;
    if (isSecOnly)
        return strSec
    return strMin + minStr + strSec + secStr;
}

export function arrToMap(arr, key) {
    let m = {}
    for (let item of arr) {
        m[item[key]] = item
    }
    return m
}
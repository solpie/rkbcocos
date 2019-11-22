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

<<<<<<< HEAD
export function arrToMap(arr, key) {
    let m = {}
    for (let item of arr) {
        m[item[key]] = item
    }
    return m
=======
export function get_now_sec_1970() {
    return Math.floor((new Date()).getTime() / 1000)
>>>>>>> 9616921a406b2757516cd8a5d3ed5a766adebf76
}
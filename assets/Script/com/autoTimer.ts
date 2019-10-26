// get_timer(res => {
//     let min = res.getElementsByTagName('min')[0]
//     let sec = res.getElementsByTagName('sec')[0]
//     min = Number(min.textContent)
//     sec = Number(sec.textContent)
//     // console.log(min, sec)
//     if (this.worldWar.timer)
//       this.worldWar.timer.setTimeBySec(min * 60 + sec)
//   })
declare let axios;

export function get_auto_timer(url, callback) {
    axios.get(url)
        .then(function (res) {
            callback((new DOMParser()).parseFromString(res.data,'text/xml'))
            setTimeout(_ => {
                get_auto_timer(url, callback)
            }, 200)
        })
}
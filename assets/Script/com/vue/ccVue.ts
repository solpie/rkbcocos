export function getAppDiv() {
    let app = document.getElementById("app")
    if (!app) {
        var o = document.body;
        var div = document.createElement("div");
        div.id = 'app'
        div.setAttribute('style', "width:1920px;height:1080px;position:absolute;")
        o.appendChild(div)

        
        return div
    }
    return app
}
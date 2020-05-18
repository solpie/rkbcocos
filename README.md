## html transparent
1、修改
C:\CocosCreator\resources\static\preview-templates\boot.js
C:\CocosCreator\resources\static\build-templates\shares\main.js

```js
cc.macro.ENABLE_TRANSPARENT_CANVAS = true;
cc.game.run(option, function () {
cc.director.setClearColor(new cc.Color(0,0,0, 0));
```

2、修改CSS
C:\CocosCreator\resources\static\preview-templates\style.css
C:\CocosCreator\resources\static\build-templates\shares\style-mobile.css

body和.wrapper中的background-color改为如下：

background-color: transparent; /*设置透明*/



# RKB cocos
RKB panel cocos

creator build to
rkb/static/cc
rkbcocos push
win7 pull

RKB3 后台更新
运行c:/projects/RKB3 to rkbcocos.bat


playergen upload playerMap to 8090
info check
avatar check
foul hint check
time 
max blood
team name


"pack": "pyinstaller RKB.spec -F --upx-dir c:/bin/upx391w --noupx",

hiddenimports = [
    'dns.dnssec',
    'dns.e164',
    'dns.edns',
    'dns.entropy',
    'dns.exception',
    'dns.flags',
    'dns.grange',
    'dns.hash',
    'dns.inet',
    'dns.ipv4',
    'dns.ipv6',
    'dns.message',
    'dns.name',
    'dns.namedict',
    'dns.node',
    'dns.opcode',
    'dns.query',
    'dns.rcode',
    'dns.rdata',
    'dns.rdataclass',
    'dns.rdataset',
    'dns.rdatatype',
    'dns.renderer',
    'dns.resolver',
    'dns.reversename',
    'dns.rrset',
    'dns.set',
    'dns.tokenizer',
    'dns.tsig',
    'dns.tsigkeyring',
    'dns.ttl',
    'dns.update',
    'dns.version',
    'dns.wiredata',
    'dns.zone'
],
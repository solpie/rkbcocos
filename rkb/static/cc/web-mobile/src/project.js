window.__require=function t(e,o,c){function n(_,r){if(!o[_]){if(!e[_]){var s=_.split("/");if(s=s[s.length-1],!e[s]){var a="function"==typeof __require&&__require;if(!r&&a)return a(s,!0);if(i)return i(s,!0);throw new Error("Cannot find module '"+_+"'")}}var l=o[_]={exports:{}};e[_][0].call(l.exports,function(t){return n(e[_][1][t]||t)},l,l.exports,t,e,o,c)}return o[_].exports}for(var i="function"==typeof __require&&__require,_=0;_<c.length;_++)n(c[_]);return n}({JsFunc:[function(t,e,o){"use strict";cc._RF.push(e,"53647ot8ylLHbVShzWNcLoS","JsFunc"),Object.defineProperty(o,"__esModule",{value:!0}),o.formatSecond=function(t,e,o,c){void 0===e&&(e=!1),void 0===o&&(o=":"),void 0===c&&(c="");var n=Math.floor(t/60),i=t%60,_=n+"",r=i+"";return n<10&&(_="0"+_),i<10&&(r="0"+r),e?r:_+o+r+c},cc._RF.pop()},{}],__clip:[function(t,e,o){"use strict";cc._RF.push(e,"45636nxzW9CbZJzzJEKtkem","__clip"),Object.defineProperty(o,"__esModule",{value:!0});var c=cc._decorator.ccclass,n=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.start=function(){this.getComponent(cc.Animation).play("player_dot"),cc.log("on start")},e=__decorate([c],e)}(cc.Component);o.default=n,cc._RF.pop()},{}],__c:[function(t,e,o){"use strict";cc._RF.push(e,"f631evoBMdDiK7w/lLKMsw9","__c"),Object.defineProperty(o,"__esModule",{value:!0});var c=cc._decorator,n=c.ccclass,i=c.property;o.setText=function(t,e){_c_.emit(o.ccType.Label,{name:t,string:e})},o.ccType={Sprite:"Sprite",Label:"Label",Animation:"Animation",ProgressBar:"ProgressBar",Node:"Node"};var _={Sprite:cc.Sprite,Label:cc.Label,Animation:cc.Animation,ProgressBar:cc.ProgressBar,Node:cc.Node},r=["x","y","opacity","callback","active"],s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.cc_type="",e}return __extends(e,t),e.prototype.onLoad=function(){var t=this;if(this.cc_type)this.cls=this.cc_type;else for(var e in _){var c=_[e],n=this.node._components[0];if(n instanceof c){this.comp=n,this.cls=e;break}}this.cls==o.ccType.Node?this._name=this.node.name:this._name=this.node.getComponent(_[this.cls]).node.name;var i=function(e,o){t.cls==e&&_c_.on(e,function(e){e.name==t._name&&o(e)})};i(o.ccType.Node,function(e){for(var o=0,c=["x","y","opacity","callback","active"];o<c.length;o++){var n=c[o];null!=e[n]&&("callback"==n?e[n](t.node):t.node[n]=e[n])}}),i(o.ccType.Sprite,function(e){var o=t.comp;e.img64&&function(t,e){var o=new Image;o.src=e;var c=new cc.Texture2D;c.initWithElement(o),c.handleLoadedTexture();var n=new cc.SpriteFrame(c);t.spriteFrame=n}(o,e.img64);cc.log("handle sprite",t._name,e.x);for(var c=0,n=["x","y","opacity","callback","active"];c<n.length;c++){var i=n[c];null!=e[i]&&("callback"==i?e[i](t.node):t.node[i]=e[i])}}),i(o.ccType.Label,function(e){var o=t.comp;for(var c in e)"name"!=c&&null!=o[c]&&(o[c]=e[c]);t.oneCompNode(e)}),i(o.ccType.Animation,function(e){var o=t.comp;e.play&&o.play(e.play)}),i(o.ccType.ProgressBar,function(e){var o=t.comp;if(null!=e.progress){o.progress=e.progress;for(var c=0;c<e.callbackMap.length;c++){var n=e.callbackMap[c],i=n[0];if(o.progress>=i){n[1](t.node);break}}}})},e.prototype.oneCompNode=function(t){for(var e=0,o=r;e<o.length;e++){var c=o[e];null!=t[c]&&("callback"==c?t[c](this.node):this.node[c]=t[c])}},__decorate([i],e.prototype,"cc_type",void 0),e=__decorate([n],e)}(cc.Component);o.default=s,cc._RF.pop()},{}],api:[function(t,e,o){"use strict";for(var c in cc._RF.push(e,"97b19fYMMNLcJlnoH9VSXld","api"),Object.defineProperty(o,"__esModule",{value:!0}),o.WSEvent={sc_ww3_team_score:"",sc_teamScore:"",sc_timerEvent:"",cs_timerEvent:"",sc_setFoul:"",cs_setFoul:"",sc_setBlood:"",cs_setBlood:"",sc_setPlayer:"",sc_setPlayerDot:"",sc_showWW3PlayerInfo:"",sc_start_ww3_game:"",cs_start_ww3_game:"",sc_sync_game:"",cs_sync_game:""},o.WSEvent)o.WSEvent[c]=c;cc._RF.pop()},{}],bloodBar:[function(t,e,o){"use strict";cc._RF.push(e,"e76bfaGNZZHOKmqElYwya+a","bloodBar"),Object.defineProperty(o,"__esModule",{value:!0});var c=t("./worldwar3"),n=t("../../__c"),i=t("../../com/gameConf"),_=function(){function t(t){this.maxBlood=i.confWW3.maxBlood,this._tmpBlood=-1,this._curBlood=-1,this._fx_offs=null,this._fx_cd=1500,this._fx_cd_timer=null,this.cur_fx_offs=-1,this._isR=t,this._bloodTxt=t?c._nm_.txt_blood_R:c._nm_.txt_blood_L,this._bloodCursor=t?"blood_bar_cursor_R":"blood_bar_cursor_L",this._bloodFx=t?"blood_bar_black_R":"blood_bar_black_L"}return t.prototype.setBlood=function(t){this.initBlood=t;var e=this._setBlood(t);this.bloodNoTween(e)},t.prototype.reset=function(){this.setBlood(i.confWW3.maxBlood)},t.prototype._calcOffs=function(t){var e=this._isR?-1:1,o=(this._bloodCursor,1-t/this.maxBlood);return n.setText(this._bloodTxt,t),(-495- -395*o)*e},t.prototype._setBlood=function(t){var e=this._isR?-1:1,o=this._bloodCursor,c=1-t/this.maxBlood;n.setText(this._bloodTxt,t);var i=(-495- -395*c)*e;return _c_.emit(n.ccType.Sprite,{name:o,callback:function(t){cc.tween(t).to(.1,{x:i}).start()}}),i},t.prototype.bloodTween=function(t){cc.log("play blood fx...",this._fx_offs),this.cur_fx_offs=this._fx_offs,cc.tween(t).to(.3,{x:this._fx_offs}).start()},t.prototype.bloodNoTween=function(t){_c_.emit(n.ccType.Sprite,{name:this._bloodFx,x:t})},t.prototype.setBloodByCurBlood=function(t){var e=this,o=this._curBlood-t;this._curBlood=t;var c,i=this._setBlood(t);if(null!=this._fx_offs&&(c=this._isR?i>this._fx_offs:i<this._fx_offs)&&cc.log("\u52a0\u8840"),this._fx_offs=i,c)this.bloodNoTween(i);else if(o>=0){this._tmpBlood<0&&(this._tmpBlood=t);if(this._fx_cd_timer)this._fx_cd=800;else{this._fx_cd=800;new cc.Scheduler;this._fx_cd_timer=setInterval(function(){e._fx_cd-=10,e._fx_cd<=0&&(_c_.emit(n.ccType.Sprite,{name:e._bloodFx,callback:function(t){e.bloodTween(t)}}),clearInterval(e._fx_cd_timer),e._fx_cd_timer=null)},10)}}return t},t.prototype.setBloodByDtScore=function(t){var e=this,o=this.initBlood-t;this._curBlood=o;var c,i=this._setBlood(o);if(null!=this._fx_offs&&(c=this._isR?i>this._fx_offs:i<this._fx_offs)&&cc.log("\u52a0\u8840"),this._fx_offs=i,c)this.bloodNoTween(i);else if(t>=0){this._tmpBlood<0&&(this._tmpBlood=o);if(this._fx_cd_timer)this._fx_cd=800;else{this._fx_cd=800;new cc.Scheduler;this._fx_cd_timer=setInterval(function(){e._fx_cd-=10,e._fx_cd<=0&&(_c_.emit(n.ccType.Sprite,{name:e._bloodFx,callback:function(t){e.bloodTween(t)}}),clearInterval(e._fx_cd_timer),e._fx_cd_timer=null)},10)}}return o},t}();o.BloodBar=_,cc._RF.pop()},{"../../__c":"__c","../../com/gameConf":"gameConf","./worldwar3":"worldwar3"}],gameConf:[function(t,e,o){"use strict";cc._RF.push(e,"3eeb9PEih9PIIq9IUu+ccOZ","gameConf"),Object.defineProperty(o,"__esModule",{value:!0}),o.confWW3={maxBlood:9,foulToHint:3,time:1200},cc._RF.pop()},{}],labelShadow:[function(t,e,o){"use strict";cc._RF.push(e,"645a98RIXlFqLN3zHaeY4WF","labelShadow"),Object.defineProperty(o,"__esModule",{value:!0});var c=cc._decorator,n=c.ccclass,i=c.property,_=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.label=null,e.text="hello",e}return __extends(e,t),e.prototype.start=function(){this.node.getComponent(cc.Label)},e.prototype.update=function(){this.label.string=this.text},__decorate([i(cc.Label)],e.prototype,"label",void 0),__decorate([i],e.prototype,"text",void 0),e=__decorate([n],e)}(cc.Component);o.default=_,cc._RF.pop()},{}],main:[function(t,e,o){"use strict";cc._RF.push(e,"120adAfDgdOtZPy4v1kF4CF","main"),Object.defineProperty(o,"__esModule",{value:!0});var c=cc._decorator,n=c.ccclass,i=(c.property,{ww3:"worldwar3",bblood:"bblood"});window._c_=new cc.Node("_c_");var _=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.onLoad=function(){var t=new URLSearchParams(window.location.search).get("panel");if(t){for(var e in i)if(t==e){var o=i[e];cc.director.loadScene(o)}}else 0},e.prototype.start=function(){},e=__decorate([n],e)}(cc.Component);o.default=_,cc._RF.pop()},{}],stats:[function(t,e,o){"use strict";cc._RF.push(e,"5c2997PfENMl4jjFmsCipdh","stats"),Object.defineProperty(o,"__esModule",{value:!0});var c=cc._decorator,n=c.ccclass,i=c.property,_=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.label=null,e.text="hello",e}return __extends(e,t),e.prototype.start=function(){},__decorate([i(cc.Label)],e.prototype,"label",void 0),__decorate([i],e.prototype,"text",void 0),e=__decorate([n],e)}(cc.Component);o.default=_,cc._RF.pop()},{}],timer:[function(t,e,o){"use strict";cc._RF.push(e,"b9fb7MYUuxMiaVk49oMgwiX","timer"),Object.defineProperty(o,"__esModule",{value:!0});var c,n=t("../__c"),i=t("./JsFunc");o.TimerEvent={START:"start",PAUSE:"pause",TOGGLE:"toggle",SHIFT:"shift",RESET:"reset",SETTING:"setting"},o.TimerState={START_STR:"start",PAUSE_STR:"pause",PAUSE:0,RUNNING:1};var _=function(){function t(){this.timeInSec=1200,this.resetTime=0,this.isSecOnly=!1,this.isMin=!1}return t.prototype.initTimer=function(t,e){this._component=t,this._textName=e,this.resetTimer()},t.prototype.onTick=function(){this.isMin?this.timeInSec--:this.timeInSec++,n.setText(this._textName,i.formatSecond(this.timeInSec))},t.prototype.startTimer=function(){var t=this;c||(c=function(){t.onTick()},this._component.schedule(c,1,1/0))},t.prototype.pauseTimer=function(){c&&(this._component.unschedule(c),c=null)},t.prototype.setTimeBySec=function(t){this.timeInSec=t,n.setText(this._textName,i.formatSecond(this.timeInSec,this.isSecOnly))},t.prototype.resetTimer=function(){this.timerState=o.TimerState.PAUSE,this.setTimeBySec(this.resetTime)},t.prototype.setTimerEvent=function(t){t.event==o.TimerEvent.PAUSE?this.pauseTimer():t.event==o.TimerEvent.START?this.startTimer():t.event==o.TimerEvent.RESET?(this.resetTimer(),this.pauseTimer()):t.event==o.TimerEvent.SETTING?this.setTimeBySec(t.param):t.event==o.TimerEvent.SHIFT?this.setTimeBySec(this.timeInSec+t.param):t.event==o.TimerEvent.TOGGLE&&this.toggleTimer()},t.prototype.toggleTimer=function(t){c?this.pauseTimer():this.startTimer()},t}();o.Timer=_,cc._RF.pop()},{"../__c":"__c","./JsFunc":"JsFunc"}],web:[function(t,e,o){"use strict";cc._RF.push(e,"fe7e54cytVMp4QLjboCqLbl","web"),Object.defineProperty(o,"__esModule",{value:!0});var c=t("./__c");o.getWsUrl=function(){return"/rkb"},o.loadImg64=function(t,e){var o=function(t){return"/proxy?url="+t}(e);axios.get(o).then(function(e){_c_.emit(c.ccType.Sprite,{name:t,img64:e.data})})};var n="http://rtmp.icassi.us:8090/";o.getPanelConf=function(t,e){var o=n+"panel/?pid="+t;axios.get(o).then(e)},o.opReq=function(t,e){var o="/panel/online/"+t;e._="_",axios({url:o,method:"post",data:JSON.stringify(e),headers:{"Content-Type":"application/json"}})},cc._RF.pop()},{"./__c":"__c"}],worldwar3_test:[function(t,e,o){"use strict";cc._RF.push(e,"e080bKA8xJMao2Hn7ZsbbKj","worldwar3_test"),Object.defineProperty(o,"__esModule",{value:!0});var c=t("./ww3_fx"),n=t("../../__c"),i=cc._decorator.ccclass,_=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.on_test_info_L=function(t){cc.log(t),c.showPlayerInfo(!0),n.setText("txt_info_L",t)},e.prototype.on_test_info_R=function(t){cc.log(t),c.showPlayerInfo(!0),n.setText("txt_info_R",t)},e=__decorate([i],e)}(cc.Component);o.default=_,cc._RF.pop()},{"../../__c":"__c","./ww3_fx":"ww3_fx"}],worldwar3:[function(t,e,o){"use strict";cc._RF.push(e,"e1b90/rohdEk4SdmmEZANaD","worldwar3"),Object.defineProperty(o,"__esModule",{value:!0});var c=t("../../api"),n=t("../../com/timer"),i=t("../../web"),_=t("../../__c"),r=t("./bloodBar"),s=t("./ww3_fx"),a=cc._decorator.ccclass;o._nm_={txt_team_score:"txt_team_score",txt_team_left:"txt_team_left",txt_team_right:"txt_team_right",txt_player_left:"txt_player_left",txt_player_right:"txt_player_right",txt_blood_L:"txt_blood_L",txt_blood_R:"txt_blood_R",txt_foul_L:"txt_foul_L",txt_foul_R:"txt_foul_R",sp_avt_L:"avt_L",sp_avt_R:"avt_R"};var l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.gameTimer=new n.Timer,e.playerDocTotal=5,e.foulToFT=3,e}return __extends(e,t),e.prototype.onLoad=function(){this.id=(new Date).getTime().toString(),cc.log("onLoad Worldwar3,id:",this.id),this.gameTimer.initTimer(this,"txt_timer")},e.prototype.start=function(){window.ww3=this,console.log("start worldwar3"),this.gameTimer.isMin=!1,this.gameTimer.resetTimer(),this.bloodBar_L=new r.BloodBar(0),this.bloodBar_R=new r.BloodBar(1),this.bloodBar_L.reset(),this.bloodBar_R.reset(),this.setFoul_L(0),this.setFoul_R(0),_.setText("txt_info_L",""),_.setText("txt_info_R",""),_.setText(o._nm_.txt_player_left,""),_.setText(o._nm_.txt_player_right,""),_c_.emit(_.ccType.Node,{name:"info_bg",active:!1}),_.setText(o._nm_.txt_team_score,"0 - 0"),this.initState(),this.initWS(),_c_.emit(_.ccType.Node,{name:"test_layer",active:!1})},e.prototype.test=function(){var t=this;setTimeout(function(){i.loadImg64(o._nm_.sp_avt_L,"http://rtmp.icassi.us:8092/img/player/0323/p1.png"),_.setText(o._nm_.txt_team_score,"0 - 0"),_.setText(o._nm_.txt_blood_L,"2"),_.setText(o._nm_.txt_player_left,"\u674e\u80dc\u4fca"),_.setText(o._nm_.txt_player_right,"\u9a6c\u514b"),t.setPlayerDot(1,3,!1),t.setPlayerDot(0,3,!0)},2e3)},e.prototype.setPlayerDot=function(t,e,o){var c="player_dot_off_"+(t?"R":"L"),n=this.playerDocTotal,i=o?"player_dot_on":"player_dot_off";function r(t,e){var o=c+e;setTimeout(function(){_c_.emit(_.ccType.Animation,{name:o,play:i})},t)}for(var s=0;s<n-e;s++){r(250*s,o?n-s:s+1)}},e.prototype.testPlayerDot=function(){var t=this;function e(t,e){setTimeout(function(){_.setText(o._nm_.txt_blood_L,e),_.setText(o._nm_.txt_blood_R,e)},t)}cc.log("testPlayerDot.."),this.setPlayerDot(1,2,!1);for(var c=0;c<11;c++)e(80*c,c);this.bloodBar_L.setBlood(9),this.bloodBar_R.setBlood(8);var n=function(e,o){setTimeout(function(){t.setFoul_L(o),t.setFoul_R(o),t.bloodBar_L.setBloodByDtScore(5),t.bloodBar_R.setBloodByDtScore(1)},e)};for(c=0;c<6;c++)n(280*c,c)},e.prototype.setFoul_L=function(t,e){e&&(this.foulToFT=e),_.setText(o._nm_.txt_foul_L,t);var c=t/this.foulToFT;this.setFoulBar(!1,c)},e.prototype.setFoul_R=function(t,e){e&&(this.foulToFT=e),_.setText(o._nm_.txt_foul_R,t);var c=t/this.foulToFT;this.setFoulBar(!0,c)},e.prototype.setFoulBar=function(t,e){var o=t?"foulBar_R":"foulBar_L";cc.log("setFoulBar",o,e),_c_.emit(_.ccType.ProgressBar,{name:o,progress:e,callbackMap:[[1,function(t){cc.log("on progress",t),t.getComponent(cc.Animation).play("foul_bar_max")}],[0,function(t){cc.log("on progress",t);var e=t.getComponent(cc.Animation);e.stop("foul_bar_max"),e.play("foul_bar_normal")}]]})},e.prototype.setBaseGame=function(t){this.setFoul_L(t.lFoul),this.setFoul_R(t.rFoul),this.bloodBar_L.setBloodByCurBlood(t.lBlood),this.bloodBar_R.setBloodByCurBlood(t.rBlood),this.gameTimer.setTimeBySec(t.curTimeInSec)},e.prototype.setPlayer=function(t,e){cc.log("setPlayer",e);var c=t?o._nm_.txt_player_right:o._nm_.txt_player_left;if(_.setText(c,e.name),e.avatar){var n=t?o._nm_.sp_avt_R:o._nm_.sp_avt_L;i.loadImg64(n,e.avatar)}null!=e.blood&&(t?this.bloodBar_R:this.bloodBar_L).setBlood(e.blood);var r=t?"txt_hw_R":"txt_hw_L",s=e.hwa[0]+"cm/"+e.hwa[1]+"kg";_.setText(r,s);var a=t?"txt_info_R":"txt_info_L",l=e.info;_.setText(a,l)},e.prototype.initState=function(){var t=this;i.getPanelConf("ww3",function(e){cc.log("get panel conf",e);var c=e.data[0];_.setText(o._nm_.txt_team_left,c.team_L),_.setText(o._nm_.txt_team_right,c.team_R);var n=Number(c.foul_hint);n>0&&(t.foulToFT=n)})},e.prototype.initWS=function(){var t=this,e=i.getWsUrl();io(e).on("connect",function(t){cc.log("socketio.....localWS")}).on(c.WSEvent.sc_teamScore,function(t){cc.log("sc_teamScore",t),_.setText(o._nm_.txt_team_score,t.lScore+" - "+t.rScore)}).on(c.WSEvent.sc_timerEvent,function(e){cc.log("sc_timerEvent",e),t.gameTimer.setTimerEvent(e)}).on(c.WSEvent.sc_setFoul,function(e){cc.log("sc_setFoul",e),t.setFoul_L(e.lFoul),t.setFoul_R(e.rFoul)}).on(c.WSEvent.sc_setBlood,function(e){if(cc.log("sc_setBlood",e),e.isSetBlood){var o=e.isR?t.bloodBar_R:t.bloodBar_L,c=e.isR?e.rBlood:e.lBlood;o.setBloodByCurBlood(c)}else{(o=!e.isLeft?t.bloodBar_L:t.bloodBar_R).setBloodByDtScore(e.score)}}).on(c.WSEvent.sc_setPlayer,function(e){cc.log("sc_setPlayer",e),t.setPlayer(0,e.leftPlayer),t.setPlayer(1,e.rightPlayer),e.isRestFoul&&(t.setFoul_L(0),t.setFoul_R(0))}).on(c.WSEvent.sc_setPlayerDot,function(e){cc.log("sc_setPlayerDot",e);var o=e.playerDot_L,c=e.playerDot_R;e.isOn&&(o=t.playerDocTotal-o,c=t.playerDocTotal-c),t.setPlayerDot(0,o,e.isOn),t.setPlayerDot(1,c,e.isOn)}).on(c.WSEvent.sc_showWW3PlayerInfo,function(t){s.showPlayerInfo(t.visible,t.playerArr)}).on(c.WSEvent.sc_start_ww3_game,function(e){t.setFoul_L(0),t.setFoul_R(0),t.gameTimer.setTimerEvent({event:n.TimerEvent.RESET})}).on(c.WSEvent.sc_sync_game,function(e){cc.log("sc_sync_game",e),e.id!=t.id&&t.setBaseGame(e)})},e=__decorate([a],e)}(cc.Component);o.default=l,cc._RF.pop()},{"../../__c":"__c","../../api":"api","../../com/timer":"timer","../../web":"web","./bloodBar":"bloodBar","./ww3_fx":"ww3_fx"}],ww3_fx:[function(t,e,o){"use strict";cc._RF.push(e,"5a33ay9v/hOBKcYbmYzsKjU","ww3_fx"),Object.defineProperty(o,"__esModule",{value:!0});var c=t("../../__c");function n(t,e,o){_c_.emit(e,{name:t,callback:function(t){o(cc.tween(t))}})}o.resetPlayerInfo=function(){},o.showPlayerInfo=function(t,e){t?(_c_.emit(c.ccType.Node,{name:"info_bg",active:!0}),_c_.emit(c.ccType.Node,{name:"front_panel",opacity:0}),_c_.emit(c.ccType.Node,{name:"team_bg",opacity:0}),_c_.emit(c.ccType.Label,{name:"txt_info_R",opacity:0}),_c_.emit(c.ccType.Label,{name:"txt_info_R",callback:function(t){cc.tween(t).to(.3,{opacity:255}).start()}}),n("txt_info_L",c.ccType.Label,function(t){t.to(0,{opacity:0}).to(.3,{opacity:255}).start()}),_c_.emit(c.ccType.Label,{name:"txt_hw_L",callback:function(t){cc.tween(t).to(0,{x:60}).to(.2,{x:198}).start()}}),_c_.emit(c.ccType.Label,{name:"txt_hw_R",callback:function(t){cc.tween(t).to(0,{x:-60}).to(.2,{x:-198}).start()}}),n("info_player_L",c.ccType.Node,function(t){t.to(0,{y:0}).to(.1,{y:55}).start()}),n("info_player_R",c.ccType.Node,function(t){t.to(0,{y:0}).to(.1,{y:55}).start()})):(_c_.emit(c.ccType.Node,{name:"info_bg",active:!1}),_c_.emit(c.ccType.Node,{name:"team_bg",opacity:255}),n("front_panel",c.ccType.Node,function(t){t.to(.2,{opacity:255}).start()}))},cc._RF.pop()},{"../../__c":"__c"}],ww3_op:[function(t,e,o){"use strict";cc._RF.push(e,"a71f9wt1QRH+7kT2xvMd5pd","ww3_op"),Object.defineProperty(o,"__esModule",{value:!0});var c=t("../../api"),n=t("../../com/timer"),i=t("../../web"),_=cc._decorator,r=_.ccclass,s=(_.property,function(){function t(){this.lBlood=0,this.rBlood=0,this.lFoul=0,this.rFoul=0,this.lName="",this.rName="",this.lPlayerId="",this.rPlayerId="",this.curTimeInSec=-1}return t.prototype.set_dt_lBlood=function(t){this.lBlood+=t,this.lBlood<0&&(this.lBlood=0)},t.prototype.set_dt_rBlood=function(t){this.rBlood+=t,this.rBlood<0&&(this.rBlood=0)},t.prototype.set_dt_rFoul=function(t){this.rFoul+=t,this.rFoul<0&&(this.rFoul=0)},t.prototype.set_dt_lFoul=function(t){this.lFoul+=t,this.lFoul<0&&(this.lFoul=0)},t}());o.BaseGame=s;var a=new s,l=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.op_start_game=function(){this._emit_start_ww3_game()},e.prototype.op_sync_game=function(){this._emit_sync_game()},e.prototype.op_foul_min_R=function(){this._emit_foul(!0,-1)},e.prototype.op_foul_min_L=function(){this._emit_foul(!1,-1)},e.prototype.op_foul_add_R=function(){this._emit_foul(!0,1)},e.prototype.op_foul_add_L=function(){this._emit_foul(!1,1)},e.prototype.op_blood_min_R=function(){this._emit_blood(!0,-1)},e.prototype.op_blood_min_L=function(){this._emit_blood(!1,-1)},e.prototype.op_blood_add_R=function(){this._emit_blood(!0,1)},e.prototype.op_blood_add_L=function(){this._emit_blood(!1,1)},e.prototype.op_set_timer=function(){if(/^([0-9]+[\-]?)|([0-9]+[\-]+[0-9])$/.test(this._set_time_val)){var t,e=this._set_time_val.split("-");2==e.length?t=60*Number(e[0])+Number(e[1]):Number(this._set_time_val)>-1&&(t=Number(this._set_time_val)),i.opReq(c.WSEvent.cs_timerEvent,{event:n.TimerEvent.SETTING,param:t})}},e.prototype.op_on_set_timer_changed=function(t){cc.log("op_on_set_timer_changed",t),this._set_time_val=t},e.prototype.op_start_timer=function(){i.opReq(c.WSEvent.cs_timerEvent,{event:n.TimerEvent.START})},e.prototype.op_pause_timer=function(){i.opReq(c.WSEvent.cs_timerEvent,{event:n.TimerEvent.PAUSE})},e.prototype._emit_foul=function(t,e){t?a.set_dt_rFoul(e):a.set_dt_lFoul(e),i.opReq(c.WSEvent.cs_setFoul,{lFoul:a.lFoul,rFoul:a.rFoul})},e.prototype._emit_sync_game=function(){var t=window.ww3;a.curTimeInSec=t.gameTimer.timeInSec,a.id=t.id,i.opReq(c.WSEvent.cs_sync_game,a)},e.prototype._emit_start_ww3_game=function(){i.opReq(c.WSEvent.cs_start_ww3_game,a)},e.prototype._emit_blood=function(t,e){t?a.set_dt_rBlood(e):a.set_dt_lBlood(e),i.opReq(c.WSEvent.cs_setBlood,{isSetBlood:!0,isR:t,lBlood:a.lBlood,rBlood:a.rBlood})},e=__decorate([r],e)}(cc.Component);o.default=l,cc._RF.pop()},{"../../api":"api","../../com/timer":"timer","../../web":"web"}]},{},["__c","__clip","api","JsFunc","gameConf","timer","labelShadow","main","bloodBar","stats","worldwar3","worldwar3_test","ww3_fx","ww3_op","web"]);
"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _defineProperty(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}function _createForOfIteratorHelper(t){if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=_unsupportedIterableToArray(t))){var e=0,o=function(){};return{s:o,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,n=!0,i=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return n=t.done,t},e:function(t){i=!0,a=t},f:function(){try{n||null==r.return||r.return()}finally{if(i)throw a}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var o=Object.prototype.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(o):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var o=0,r=new Array(e);o<e;o++)r[o]=t[o];return r}var img=require("../../utils/imgbase64"),util=require("../../utils/util"),app=getApp(),types=["debug","log","info","warn","error"];if(!Object.prototype.hasOwnProperty.call(app,"originlog")){var _step,_iterator=_createForOfIteratorHelper(types);try{for(_iterator.s();!(_step=_iterator.n()).done;){var type=_step.value;app["origin".concat(type)]=console[type]}}catch(t){_iterator.e(t)}finally{_iterator.f()}}Component({data:{logs:{debug:[],log:[],info:[],warn:[],error:[],search:[]},lookLog:!1,isShowMask:!1,isShowManage:!1,logKinds:[],currentKind:"log",img:img},lifetimes:{attached:function(){var t=getApp().globalData.__DOKIT_LOOKLOG;void 0!==t&&(this.data.logs=t.logs,this.data.lookLog=t.lookLog,this.data.currentKind=t.currentKind),this.data.logKinds=this.getKinds(),this.setData(this.data)},detached:function(){var t=this.data,e=t.logs,o=t.lookLog,r=t.currentKind;getApp().globalData.__DOKIT_LOOKLOG={logs:e,lookLog:o,currentKind:r}}},methods:{hookConsole:function(){var t,e=_createForOfIteratorHelper(types);try{for(e.s();!(t=e.n()).done;){var o=t.value;this.hookKindLog(o)}}catch(t){e.e(t)}finally{e.f()}},resetConsole:function(){var t,e=_createForOfIteratorHelper(types);try{for(e.s();!(t=e.n()).done;){var o=t.value;console[types]=app["origin".concat(o)]}}catch(t){e.e(t)}finally{e.f()}},chooseList:function(t){var e=t.currentTarget.dataset.type;this.setData({currentKind:e})},searchLog:function(t){var e=t.detail.value;if(""!==e){var o,r=[],a=_createForOfIteratorHelper(types);try{for(a.s();!(o=a.n()).done;){var n=o.value;r=r.concat(this.traversal(n,e))}}catch(t){a.e(t)}finally{a.f()}this.setData({"logs.search":r,currentKind:"search"})}},traversal:function(t,e){for(var o=[],r=this.data.logs[t],a=0;a<r.length;a++)-1!==r[a].para.search(e)&&o.push(r[a]);return o},closeAll:function(){this.setData({isShowMask:!1,isShowManage:!1})},openManageMenu:function(){this.data.lookLog||this.setData({isShowMask:!0,isShowManage:!0})},clearAll:function(){var e=this;this.setData({isShowManage:!1}),wx.showModal({title:"提示",content:"确定要清除所有吗？",success:function(t){t.confirm&&(getApp().globalData.__DOKIT_LOOKLOG.logs={debug:[],log:[],info:[],warn:[],error:[],search:[]},getApp().globalData.__DOKIT_LOOKLOG.lookLog=!1,e.setData(getApp().globalData.__DOKIT_LOOKLOG)),e.closeAll()}})},toggleLookLog:function(){var t=this;this.setData({lookLog:!this.data.lookLog},function(){t.data.lookLog?t.hookConsole():t.resetConsole()})},onExpand:function(t){var e=t.currentTarget.dataset.index,o=this.data.logs[this.data.currentKind][e].hidden,r="logs.".concat(this.data.currentKind);this.setData(_defineProperty({},"".concat(r,"[").concat(e,"]hidden"),!o))},hookKindLog:function(i){var l=this;Object.defineProperty(console,i,{writable:!0}),console[i]=function(){for(var t=arguments.length,e=new Array(t),o=0;o<t;o++)e[o]=arguments[o];app["origin".concat(i)].apply(app,e);for(var r="",a=0;a<e.length;a++)"object"===_typeof(e[a])?r+=util.obj2str(e[a]):"symbol"===_typeof(e[a])?r+=String(e[a]):r+=e[a];var n=util.formatTime(new Date);l.data.logs[i].push({time:n,para:r,hidden:!0}),l.setData({logs:l.data.logs})}},onGoBack:function(){this.triggerEvent("toggle",{componentType:"dokit"})},getKinds:function(){return[{kind:"Debug",type:"debug"},{kind:"Log",type:"log"},{kind:"Info",type:"info"},{kind:"Warn",type:"warn"},{kind:"Error",type:"error"}]}}});
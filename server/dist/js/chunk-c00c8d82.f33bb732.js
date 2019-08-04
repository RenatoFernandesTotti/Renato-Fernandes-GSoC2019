(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c00c8d82"],{"554e":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{"grid-list-xs":""}},[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs6:""}},[n("h1",{staticClass:"font-weight-light"},[t._v("\n        Sensor Name: "+t._s(t.sensor.name)+"\n        "),n("br")]),n("h3",[t._v("Registered on: "+t._s(t.sensor.register))]),n("h3",[t._v("Description: "+t._s(t.sensor.description))]),n("v-divider"),n("br"),n("br"),n("br"),t.hasRead?n("v-flex",{attrs:{xs12:""}},[n("h3",[t._v("Min reading:"+t._s(t.min))]),n("h3",[t._v("Max reading:"+t._s(t.max))]),n("h3",[t._v("Average: "+t._s(t.avg))])]):n("v-flex",{attrs:{xs12:""}},[n("h3",[t._v("The sensor has no reading for the time")])]),n("v-btn",{attrs:{flat:""},on:{click:function(e){return t.closeSite()}}},[n("span",[t._v("Close site")])])],1),n("v-flex",{attrs:{xs6:""}},[n("lineChart",{attrs:{id:"chart","chart-data":t.datacol}}),n("v-layout",{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[n("v-btn-toggle",{attrs:{"justify-center":""},model:{value:t.toggle_exclusive,callback:function(e){t.toggle_exclusive=e},expression:"toggle_exclusive"}},[n("v-btn",{attrs:{flat:""},on:{click:function(e){return t.getReading("setup")}}},[n("span",[t._v("all")])]),n("v-btn",{attrs:{flat:""},on:{click:function(e){return t.getReading("1y")}}},[n("span",[t._v("1y")])]),n("v-btn",{attrs:{flat:""},on:{click:function(e){return t.getReading("6m")}}},[n("span",[t._v("6m")])]),n("v-btn",{attrs:{flat:""},on:{click:function(e){return t.getReading("1m")}}},[n("span",[t._v("1m")])]),n("v-btn",{attrs:{flat:""},on:{click:function(e){return t.getReading("1w")}}},[n("span",[t._v("1w")])]),n("v-btn",{attrs:{flat:""},on:{click:function(e){return t.getReading("1d")}}},[n("span",[t._v("1d")])])],1)],1)],1)],1),n("br"),n("br"),n("br"),n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs12:""}},[n("gmap",{attrs:{lat:parseFloat(t.sensor.y),lng:parseFloat(t.sensor.x),editable:!1}})],1)],1)],1)},i=[],s=(n("ac6a"),n("7f7f"),n("4a88")),r=n("6b40"),l={data:function(){return{sensor:null,datacol:{},data:null,labels:null,max:null,min:null,avg:null,hasRead:!1}},props:{name:String},methods:{getReading:function(t){var e=this,n="/readSensor?name="+this.$options.propsData.name;"setup"!=t&&(n+="&datespan="+t),n=encodeURI(n),this.axios.get(n).then(function(n){var a=[],i=[],s=n.data.result,r=0;if(0==s.length?e.hasRead=!1:e.hasRead=!0,"setup"==t){s.reverse();for(var l=s.length;r<10&&0!=l;l--,r++){var o=s[l-1];a.push(parseFloat(o.value));var u=new Date(o.date);i.push(u.getDate()+"/"+(u.getMonth()+1)+"/"+u.getFullYear())}}else s.forEach(function(t){a.push(parseFloat(t.value));var e=new Date(t.date);i.push(e.getDate()+"/"+(e.getMonth()+1)+"/"+e.getFullYear())});e.data=a,e.labels=i,e.min=Math.min.apply(Math,a)+" on "+i[a.indexOf(Math.min.apply(Math,a))],e.max=Math.max.apply(Math,a)+" on "+i[a.indexOf(Math.max.apply(Math,a))];var c=a.reduce(function(t,e){return t+e}),h=c/a.length;e.avg=h}).finally(function(){e.axios.get("/getSensorInfo?name="+e.$options.propsData.name).then(function(t){var n=t.data.result,a=new Date(n.register),i=a.getDate()+"/"+(a.getMonth()+1)+"/"+a.getFullYear();n.register=i,e.sensor=n;var s=Math.round,r=Math.random,l=255,o="rgba("+s(r()*l)+","+s(r()*l)+","+s(r()*l)+","+r().toFixed(1)+")";e.datacol={labels:e.labels,datasets:[{label:e.sensor.unit,backgroundColor:o,data:e.data}]},e.axios.post("/movelg",{lat:n.y,lng:n.x,host:"192.168.0.155",username:"lg",password:"lq"}).then(function(){console.log("ue"),console.log(window.location.pathname),console.log(encodeURI("http://192.168.0.187:8888/front/"+e.sensor.name+"lgDetail"));var t=Object({VUE_APP_backEnd:"",VUE_APP_ericbe:"http://localhost:8080",VUE_APP_masterIp:"192.168.0.155",VUE_APP_slaveIp:"192.168.0.141",VUE_APP_key:"lq",VUE_APP_user:"lg",VUE_APP_localip:"http://192.168.0.187:8888",NODE_ENV:"production",BASE_URL:"/"});e.axios.post(t.VUE_APP_backEnd+"/opensite",{serverurl:encodeURI(t.VUE_APP_localip+"/front/"+e.sensor.name+"/lgDetail"),lgurl:t.VUE_APP_slaveIp,lguser:t.VUE_APP_user,lgkey:t.VUE_APP_key}).then(function(){console.log("finally")})}).catch(function(t){console.log("here"),console.log(t)})})})},closeSite:function(){window.alert("que"),this.axios.post("/closesite",{lgurl:"192.168.0.141",lguser:"lg",lgkey:"lq"}).then(function(){console.log("finally")})}},mounted:function(){this.getReading("setup")},components:{lineChart:s["a"],gmap:r["a"]}},o=l,u=n("2877"),c=n("6544"),h=n.n(c),d=n("8336"),p=(n("934c"),n("58dbb"),n("2b0e"));function g(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function f(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"value",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"change";return p["default"].extend({name:"proxyable",model:{prop:t,event:e},props:g({},t,{required:!1}),data:function(){return{internalLazyValue:this[t]}},computed:{internalValue:{get:function(){return this.internalLazyValue},set:function(t){t!==this.internalLazyValue&&(this.internalLazyValue=t,this.$emit(e,t))}}},watch:g({},t,function(t){this.internalLazyValue=t})})}var v=f(),m=v,y=n("6a18"),b=n("58df"),V=n("d9bd"),_=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},x=Object(b["a"])(m,y["a"]).extend({name:"base-item-group",props:{activeClass:{type:String,default:"v-item--active"},mandatory:Boolean,max:{type:[Number,String],default:null},multiple:Boolean},data:function(){return{internalLazyValue:void 0!==this.value?this.value:this.multiple?[]:void 0,items:[]}},computed:{classes:function(){return _({},this.themeClasses)},selectedItems:function(){var t=this;return this.items.filter(function(e,n){return t.toggleMethod(t.getValue(e,n))})},selectedValues:function(){return Array.isArray(this.internalValue)?this.internalValue:[this.internalValue]},toggleMethod:function(){var t=this;if(!this.multiple)return function(e){return t.internalValue===e};var e=this.internalValue;return Array.isArray(e)?function(t){return e.includes(t)}:function(){return!1}}},watch:{internalValue:function(){this.$nextTick(this.updateItemsState)}},created:function(){this.multiple&&!Array.isArray(this.internalValue)&&Object(V["c"])("Model must be bound to an array if the multiple property is true.",this)},methods:{getValue:function(t,e){return null==t.value||""===t.value?e:t.value},onClick:function(t,e){this.updateInternalValue(this.getValue(t,e))},register:function(t){var e=this,n=this.items.push(t)-1;t.$on("change",function(){return e.onClick(t,n)}),this.mandatory&&null==this.internalLazyValue&&this.updateMandatory(),this.updateItem(t,n)},unregister:function(t){if(!this._isDestroyed){var e=this.items.indexOf(t),n=this.getValue(t,e);this.items.splice(e,1);var a=this.selectedValues.indexOf(n);if(!(a<0)){if(!this.mandatory)return this.updateInternalValue(n);this.multiple&&Array.isArray(this.internalValue)?this.internalValue=this.internalValue.filter(function(t){return t!==n}):this.internalValue=void 0,this.selectedItems.length||this.updateMandatory(!0)}}},updateItem:function(t,e){var n=this.getValue(t,e);t.isActive=this.toggleMethod(n)},updateItemsState:function(){if(this.mandatory&&!this.selectedItems.length)return this.updateMandatory();this.items.forEach(this.updateItem)},updateInternalValue:function(t){this.multiple?this.updateMultiple(t):this.updateSingle(t)},updateMandatory:function(t){if(this.items.length){var e=t?this.items.length-1:0;this.updateInternalValue(this.getValue(this.items[e],e))}},updateMultiple:function(t){var e=Array.isArray(this.internalValue)?this.internalValue:[],n=e.slice(),a=n.findIndex(function(e){return e===t});this.mandatory&&a>-1&&n.length-1<1||null!=this.max&&a<0&&n.length+1>this.max||(a>-1?n.splice(a,1):n.push(t),this.internalValue=n)},updateSingle:function(t){var e=t===this.internalValue;this.mandatory&&e||(this.internalValue=e?void 0:t)}},render:function(t){return t("div",{staticClass:"v-item-group",class:this.classes},this.$slots.default)}}),w=(x.extend({name:"v-item-group",provide:function(){return{itemGroup:this}}}),x.extend({name:"button-group",provide:function(){return{btnToggle:this}},props:{activeClass:{type:String,default:"v-btn--active"}},computed:{classes:function(){return x.options.computed.classes.call(this)}}})),P=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},A=w.extend({name:"v-btn-toggle",props:{activeClass:{type:String,default:"v-btn--active"}},computed:{classes:function(){return P({},w.options.computed.classes.call(this),{"v-btn-toggle":!0,"v-btn-toggle--only-child":1===this.selectedItems.length,"v-btn-toggle--selected":this.selectedItems.length>0})}}}),M=n("a523"),I=n("ce7e"),k=n("0e8f"),E=n("a722"),R=Object(u["a"])(o,a,i,!1,null,null,null);e["default"]=R.exports;h()(R,{VBtn:d["a"],VBtnToggle:A,VContainer:M["a"],VDivider:I["a"],VFlex:k["a"],VLayout:E["a"]})},"58dbb":function(t,e,n){},"934c":function(t,e,n){}}]);
//# sourceMappingURL=chunk-c00c8d82.f33bb732.js.map
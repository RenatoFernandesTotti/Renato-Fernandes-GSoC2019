(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d0293"],{6795:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("h1",{staticClass:"font-weight-light display-3"},[t._v("\n      Sensor Name: "+t._s(t.sensor.name)+"\n      "),s("br")]),s("v-divider"),s("br"),s("br"),s("br"),t.hasRead?s("v-flex",{attrs:{xs12:"","text-xs-center":""}},[s("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[s("v-flex",{attrs:{xs4:"","text-center":""}},[s("h3",{staticClass:"text-xs-center font-weight-light display-3 blue--text text-capitalize "},[t._v("MIN")])]),s("v-flex",{attrs:{xs4:""}},[s("h3",{staticClass:"font-weight-light display-3 text-center text-capitalize"},[t._v("AVG")])]),s("v-flex",{attrs:{xs4:""}},[s("h3",{staticClass:"font-weight-light display-3 red--text darken-4 text-center text-capitalize"},[t._v("MAX")])])],1)],1):t._e(),t.hasRead?s("v-flex",{attrs:{xs12:"","text-xs-center":""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs4:""}},[s("h3",{staticClass:"font-weight-light display-3 blue--text text-center font-weight-black"},[t._v(t._s(t.min))])]),s("v-flex",{attrs:{xs4:""}},[s("h3",{staticClass:"font-weight-light display-3 text-center font-weight-black"},[t._v(t._s(t.avg))])]),s("v-flex",{attrs:{xs4:""}},[s("h3",{staticClass:"font-weight-light display-3 red--text darken-4 text-center font-weight-black"},[t._v(t._s(t.max))])])],1)],1):s("v-flex",{attrs:{xs12:""}},[s("h3",{staticClass:"font-weight-light display-3"},[t._v("The sensor has no reading for the time")])])],1),s("br"),s("br"),s("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[s("v-flex",{attrs:{xs10:"","offset-xs1":""}},[s("lineChart",{attrs:{id:"chart","chart-data":t.datacol}})],1)],1),s("v-flex",{attrs:{xs12:""}},[s("v-layout",{attrs:{row:"",wrap:"","align-end":""}},[s("v-flex",{attrs:{xs3:""}},[s("v-img",{attrs:{src:e("f959")}})],1),s("v-flex",{attrs:{xs3:""}},[s("v-img",{attrs:{src:e("8534")}})],1),s("v-flex",{attrs:{xs3:""}},[s("v-img",{attrs:{src:e("c4c8")}})],1),s("v-flex",{attrs:{xs3:""}},[s("v-img",{attrs:{src:e("0975")}})],1)],1)],1)],1)},l=[],n=(e("ac6a"),e("7f7f"),e("4a88")),r=e("6b40"),i={data:function(){return{sensor:null,datacol:{},data:null,labels:null,max:null,min:null,avg:null,hasRead:!1,minlbl:null,maxlbl:null}},props:{name:String},methods:{getReading:function(t){var a=this,e="/readSensor?name="+this.$options.propsData.name;"setup"!=t&&(e+="&datespan="+t),e=encodeURI(e),this.axios.get(e).then(function(e){var s=[],l=[],n=e.data.result,r=0;if(0==n.length?a.hasRead=!1:a.hasRead=!0,"setup"==t){n.reverse();for(var i=n.length;r<10&&0!=i;i--,r++){var o=n[i-1];s.push(parseFloat(o.value));var h=new Date(o.date);l.push(h.getDate()+"/"+(h.getMonth()+1)+"/"+h.getFullYear())}}else n.forEach(function(t){s.push(parseFloat(t.value));var a=new Date(t.date);l.push(a.getDate()+"/"+(a.getMonth()+1)+"/"+a.getFullYear())});a.data=s,a.labels=l,a.min=Math.min.apply(Math,s),a.max=Math.max.apply(Math,s),a.minlbl=l[s.indexOf(Math.min.apply(Math,s))],a.maxlbl=l[s.indexOf(Math.max.apply(Math,s))];var x=s.reduce(function(t,a){return t+a}),c=x/s.length;a.avg=Math.round(100*c)/100}).finally(function(){a.axios.get("/getSensorInfo?name="+a.$options.propsData.name).then(function(t){var e=t.data.result,s=new Date(e.register),l=s.getDate()+"/"+(s.getMonth()+1)+"/"+s.getFullYear();e.register=l,a.sensor=e;var n=Math.round,r=Math.random,i=255,o="rgba("+n(r()*i)+","+n(r()*i)+","+n(r()*i)+","+r().toFixed(1)+")";a.datacol={labels:a.labels,datasets:[{label:a.sensor.unit,backgroundColor:o,data:a.data}]}})})}},mounted:function(){this.getReading("setup")},components:{lineChart:n["a"],gmap:r["a"]}},o=i,h=e("2877"),x=e("6544"),c=e.n(x),d=e("ce7e"),g=e("0e8f"),u=e("adda"),f=e("a722"),v=Object(h["a"])(o,s,l,!1,null,null,null);a["default"]=v.exports;c()(v,{VDivider:d["a"],VFlex:g["a"],VImg:u["a"],VLayout:f["a"]})}}]);
//# sourceMappingURL=chunk-2d0d0293.33a2ca1a.js.map
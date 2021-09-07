!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=12)}({12:function(e,t,n){n(13)},13:function(e,t){layui.define(["form"],(function(e){var t=layui.jquery,n=layui.form,r={phoneX:"请输入正确的手机号",emailX:"邮箱格式不正确",urlX:"链接格式不正确",numberX:"只能填写数字",dateX:"日期格式不正确",identityX:"请输入正确的身份证号",psw:"密码必须5到12位，且不能出现空格",equalTo:"两次输入不一致",digits:"只能输入整数",digitsP:"只能输入正整数",digitsN:"只能输入负整数",digitsPZ:"只能输入正整数和0",digitsNZ:"只能输入负整数和0",minlength:"最少输入{minlength}个字符",maxlength:"最多输入{maxlength}个字符",min:"值不能小于{min}",max:"值不能大于{max}"},i={phoneX:function(e,t){if(e&&!/^1\d{10}$/.test(e))return r.phoneX},emailX:function(e,t){if(e&&!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e))return r.emailX},urlX:function(e,t){if(e&&!/(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/.test(e))return r.urlX},numberX:function(e,t){if(e&&isNaN(e))return r.numberX},dateX:function(e,t){if(e&&!/^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/.test(e))return r.dateX},identityX:function(e,t){if(e&&!/(^\d{15}$)|(^\d{17}(x|X|\d)$)/.test(e))return r.identityX},psw:function(e,t){if(e&&!/^[\S]{5,12}$/.test(e))return r.psw},equalTo:function(e,n){if(e!=t(t(n).attr("lay-equalTo")).val()){var i=t(n).attr("lay-equalToText");return i||r.equalTo}},digits:function(e,t){if(e&&!/^-?\d+$/.test(e))return r.digits},digitsP:function(e,t){if(e&&!/^[1-9]\d*$/.test(e))return r.digitsP},digitsN:function(e,t){if(e&&!/^-[1-9]\d*$/.test(e))return r.digitsN},digitsPZ:function(e,t){if(e&&!/^\d+$/.test(e))return r.digitsPZ},digitsNZ:function(e,t){if(e&&!/^-[1-9]\d*|0/.test(e))return r.digitsNZ},h5:function(e,n){if(e){var i=t(n).attr("minlength"),a=t(n).attr("maxlength"),o=t(n).attr("min"),l=t(n).attr("max");if(i&&e.length<i)return r.minlength.replace(/{minlength}/g,i);if(a&&e.length>a)return r.maxlength.replace(/{maxlength}/g,a);if(o&&1*e<1*o)return r.min.replace(/{min}/g,o);if(l&&1*e>1*l)return r.max.replace(/{max}/g,l)}}},a={init:function(){n.verify(i)},formVal:function(e,t){a.val(e,t)},val:function(e,r){t('.layui-form[lay-filter="'+e+'"]').each((function(){var e=t(this);for(var n in r)if(r.hasOwnProperty(n)){var i=e.find('[name="'+n+'"]');if(i.length>0){var a=i[0].type;"checkbox"===a?i[0].checked=r[n]:"radio"===a?i.each((function(){this.value==r[n]&&(this.checked=!0)})):i.val(r[n])}}})),n.render(null,e)},renderSelect:function(e){var r={elem:void 0,data:[],name:void 0,value:void 0,hint:"请选择",initValue:void 0,method:"get",where:void 0,headers:void 0,async:!0,done:void 0,error:void 0};if("string"==typeof(e=t.extend(r,e)).data)t.ajax({url:e.data,type:e.method,data:e.where,dataType:"json",headers:e.header||e.headers,async:e.async,success:function(t,n,r){t.data?(e.data=t.data,a.renderSelect(e)):e.error&&e.error(r,t)},error:e.error});else{for(var i=e.hint?'<option value="">'+e.hint+"</option>":"",o=0;o<e.data.length;o++)e.name&&e.value?i+='<option value="'+e.data[o][e.value]+'"'+(e.data[o][e.value]==e.initValue?" selected":"")+">"+e.data[o][e.name]+"</option>":i+='<option value="'+e.data[o]+'"'+(e.data[o]==e.initValue?" selected":"")+">"+e.data[o]+"</option>";t(e.elem).html(i);var l=t(e.elem).parent(".layui-form");0===l.length&&(l=t(e.elem).parentsUntil(".layui-form").last().parent()),n.render("select",l.attr("lay-filter")),e.done&&e.done(e.data)}},startTimer:function(e,n,r){n||(n=60),r||(r=function(e){return e+"s"}),a.timers[e]&&clearInterval(a.timers[e]);var i=t(e).html();t(e).html(r(n)),t(e).prop("disabled",!0),t(e).addClass("layui-btn-disabled");var o=setInterval((function(){--n<=0?(clearInterval(o),t(e).html(i),t(e).removeProp("disabled"),t(e).removeClass("layui-btn-disabled")):t(e).html(r(n))}),1e3);a.timers[e]=o},timers:{},formUpdatedField:function(e,t){for(var r in"string"==typeof e&&(e=n.val(e)),e)e.hasOwnProperty(r)&&e[r]===t[r]&&delete e[r];if(Object.keys(e).length>0)return e}};a.init(),e("formX",a)}))}});
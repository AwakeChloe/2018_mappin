webpackJsonp([3],{"5PX/":function(e,a){},MSKy:function(e,a){},fqTJ:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=t("Xxa5"),r=t.n(s),n=t("exGp"),o=t.n(n),i=t("P9l9"),c=t("Za1Y"),l={name:"loginChange",components:{alertTip:c.a},data:function(){return{emailAddress:"",hasAlert:!1,alertText:""}},methods:{closeAlert:function(){this.hasAlert=!1},cancelChange:function(){this.$emit("cancelChange")},resetPassword:function(){var e=this;return o()(r.a.mark(function a(){var t,s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t={email:e.emailAddress},a.next=3,i.a.resetPassword(t);case 3:(s=a.sent).tip?(e.hasAlert=!0,e.alertText=s.tip):"OK"!==s.response.message&&(e.alertText=s.response.message,e.hasAlert=!0);case 5:case"end":return a.stop()}},a,e)}))()}}},u={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"fullScream"},[t("div",{staticClass:"model"},[t("label",{attrs:{for:"email"}},[e._v("邮箱:")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.emailAddress,expression:"emailAddress"}],attrs:{name:"email",id:"email",type:"text"},domProps:{value:e.emailAddress},on:{input:function(a){a.target.composing||(e.emailAddress=a.target.value)}}}),e._v(" "),t("button",{on:{click:e.resetPassword}},[e._v("确认")]),e._v(" "),t("button",{on:{click:e.cancelChange}},[e._v("取消")])]),e._v(" "),t("alertTip",{directives:[{name:"show",rawName:"v-show",value:e.hasAlert,expression:"hasAlert"}],attrs:{"alert-text":e.alertText},on:{closeAlert:e.closeAlert}})],1)},staticRenderFns:[]};var d=t("VU/8")(l,u,!1,function(e){t("MSKy")},"data-v-42a7279d",null).exports,p=t("pM/h"),v={name:"app",components:{LoginChange:d,Alert:c.a},data:function(){return{isRegister:!1,password:"",username:"",captchaCode:"",captchaCodeImg:"",hasAlert:!1,alertText:"",userInfo:"",hasChange:!1,emailHasChange:!1}},created:function(){this.getCaptchaCode(),this.login()},methods:{closeAlert:function(){this.hasAlert=!1},cancelChange:function(){this.hasChange=!1},resetPassword:function(){this.hasChange=!0},loginOrRegister:function(){this.isRegister=!this.isRegister},getCaptchaCode:function(){var e=this;return o()(r.a.mark(function a(){var t;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,i.a.getCaptchaCode();case 2:t=a.sent,e.captchaCodeImg=t.code;case 4:case"end":return a.stop()}},a,e)}))()},accountLogin:function(){var e=this;return o()(r.a.mark(function a(){var t,s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t={username:e.username,password:e.password},a.next=3,i.a.accountLogin(t);case 3:(s=a.sent).tip?(e.hasAlert=!0,e.alertText=s.tip):"OK"!==s.response.message?(e.alertText=s.response.message,e.hasAlert=!0):"OK"===s.response.message&&(localStorage.setItem("token",s.token),e.$router.push({name:"makePoint"}));case 5:case"end":return a.stop()}},a,e)}))()},accountRegister:function(){var e=this;return o()(r.a.mark(function a(){var t,s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t={captcha_code:e.captchaCode,username:e.username,password:e.password},a.next=3,i.a.CaptchaCode(t);case 3:if(e.userInfo=a.sent,"验证码不正确"!==e.userInfo.response.message){a.next=9;break}e.alertText=e.userInfo.response.message,e.hasAlert=!0,a.next=14;break;case 9:if("验证码不正确"===e.userInfo.response.message){a.next=14;break}return a.next=12,i.a.accountRegister(t);case 12:(s=a.sent).tip?(e.hasAlert=!0,e.alertText=s.tip):"OK"!==s.response.message&&(e.alertText=s.response.message,e.hasAlert=!0);case 14:case"end":return a.stop()}},a,e)}))()}},vuex:{actions:{login:function(e){var a=e.dispatch;e.state;a(p.a)}}}},m={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{attrs:{id:"app"}},[t("fieldset",[t("div",[t("label",{attrs:{for:"userName"}},[e._v("username:")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{name:"userName",id:"userName",type:"text"},domProps:{value:e.username},on:{input:function(a){a.target.composing||(e.username=a.target.value)}}})]),e._v(" "),t("div",[t("label",{attrs:{for:"password"}},[e._v("password:")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{name:"password",id:"password",type:"password"},domProps:{value:e.password},on:{input:function(a){a.target.composing||(e.password=a.target.value)}}})]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.isRegister,expression:"isRegister"}]},[t("label",{attrs:{for:"captchaCode"}},[e._v("验证码:")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.captchaCode,expression:"captchaCode"}],attrs:{name:"password",id:"captchaCode",type:"text"},domProps:{value:e.captchaCode},on:{input:function(a){a.target.composing||(e.captchaCode=a.target.value)}}})])]),e._v(" "),t("div",{on:{click:e.loginOrRegister}},[e._v(e._s(e.isRegister?"去登录":"去注册"))]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.isRegister,expression:"isRegister"}]},[t("img",{attrs:{src:this.captchaCodeImg,alt:"img is wrong"},on:{click:e.getCaptchaCode}}),e._v(" "),t("button",{directives:[{name:"show",rawName:"v-show",value:!0===e.isRegister,expression:"isRegister === true"}],on:{click:e.accountRegister}},[e._v("注册")])]),e._v(" "),t("div",[t("button",{directives:[{name:"show",rawName:"v-show",value:!1===e.isRegister,expression:"isRegister === false"}],on:{click:e.accountLogin}},[e._v("登录")]),e._v(" "),t("button",{directives:[{name:"show",rawName:"v-show",value:!1===e.isRegister,expression:"isRegister === false"}],on:{click:e.resetPassword}},[e._v("重置密码")])]),e._v(" "),t("alert",{directives:[{name:"show",rawName:"v-show",value:e.hasAlert,expression:"hasAlert"}],attrs:{"alert-text":e.alertText},on:{closeAlert:e.closeAlert}}),e._v(" "),t("login-change",{directives:[{name:"show",rawName:"v-show",value:e.hasChange,expression:"hasChange"}],on:{cancelChange:e.cancelChange}}),e._v(" "),t("router-view")],1)},staticRenderFns:[]};var h=t("VU/8")(v,m,!1,function(e){t("5PX/")},"data-v-215f9516",null);a.default=h.exports}});
//# sourceMappingURL=3.cab1bfd3bb08ee4ea9b6.js.map
webpackJsonp([2],{"2wlO":function(e,a){},L4B4:function(e,a,t){e.exports=t.p+"static/img/头像.6b50a67.jpg"},"N8/Y":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=t("Xxa5"),s=t.n(n),i=t("exGp"),l=t.n(i),r=t("P9l9"),o={name:"emailChange",components:{alertTip:t("Za1Y").a},data:function(){return{emailAddress:"",password:"",newEmail:"",hasAlert:!1,alertText:""}},methods:{closeAlert:function(){this.hasAlert=!1},cancelChange:function(){this.$emit("cancelChangeEmail")},emailChange:function(){var e=this;return l()(s.a.mark(function a(){var t,n;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t={email:e.emailAddress,password:e.password,newEmail:e.newEmail},a.next=3,r.a.emailChange(t);case 3:(n=a.sent).tip?(e.hasAlert=!0,e.alertText=n.tip):"OK"!==n.response.message&&(e.alertText=n.response.message,e.hasAlert=!0);case 5:case"end":return a.stop()}},a,e)}))()}}},m={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"fullScream"},[t("div",{staticClass:"model"},[t("div",[t("label",{attrs:{for:"oldEmail"}},[e._v("邮箱:")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.emailAddress,expression:"emailAddress"}],attrs:{name:"oldEmail",id:"oldEmail",type:"text"},domProps:{value:e.emailAddress},on:{input:function(a){a.target.composing||(e.emailAddress=a.target.value)}}})]),e._v(" "),t("div",[t("label",{attrs:{for:"newEmail"}},[e._v("新邮箱:")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.newEmail,expression:"newEmail"}],attrs:{name:"newEmail",id:"newEmail",type:"text"},domProps:{value:e.newEmail},on:{input:function(a){a.target.composing||(e.newEmail=a.target.value)}}})]),e._v(" "),t("div",[t("label",{attrs:{for:"nowPassword"}},[e._v("密码:")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{name:"nowPassword",id:"nowPassword",type:"password"},domProps:{value:e.password},on:{input:function(a){a.target.composing||(e.password=a.target.value)}}})]),e._v(" "),t("button",{on:{click:e.emailChange}},[e._v("确认")]),e._v(" "),t("button",{on:{click:e.cancelChange}},[e._v("取消")])]),e._v(" "),t("alertTip",{directives:[{name:"show",rawName:"v-show",value:e.hasAlert,expression:"hasAlert"}],attrs:{"alert-text":e.alertText},on:{closeAlert:e.closeAlert}})],1)},staticRenderFns:[]};var c={name:"myMessage",components:{EmailChange:t("VU/8")(o,m,!1,function(e){t("2wlO")},"data-v-c3920156",null).exports},data:function(){return{emailHasChange:!1}},methods:{login:function(){this.$router.push({name:"login"})},emailChange:function(){this.emailHasChange=!0},cancelChangeEmail:function(){this.emailHasChange=!1}}},d={render:function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("div",{staticClass:"myMessage"},[n("div",{staticClass:"myMessageTop"}),e._v(" "),n("div",{staticClass:"myMessageCenter"},[n("div",{staticClass:"loginOrMine",on:{click:e.login}},[n("img",{attrs:{id:"head",alt:"头像",src:t("L4B4")}})])]),e._v(" "),n("div",{on:{click:e.emailChange}},[e._v("修改邮箱")]),e._v(" "),n("email-change",{directives:[{name:"show",rawName:"v-show",value:e.emailHasChange,expression:"emailHasChange"}],on:{cancelChangeEmail:e.cancelChangeEmail}})],1)},staticRenderFns:[]};var v=t("VU/8")(c,d,!1,function(e){t("PQPq")},"data-v-7e571118",null);a.default=v.exports},PQPq:function(e,a){}});
//# sourceMappingURL=2.72c0384048b2af3b4cfa.js.map
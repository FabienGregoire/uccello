(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{1:function(t,e,n){t.exports=n("ThBO")},ThBO:function(t,e,n){"use strict";function a(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}n.r(e);var i=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.initCheckboxListener()}var e,n,i;return e=t,(n=[{key:"initCheckboxListener",value:function(){$('meta[name="domain"]').attr("content");$("input[type='checkbox'].module-activation").on("click",function(t){var e=t.currentTarget,n=$("meta[name='module-activation-url']").attr("content");$.post(n,{_token:$("meta[name='csrf-token']").attr("content"),src_module:$(e).data("module"),active:!0===$(e).is(":checked")?"1":"0"}).fail(function(t){swal(uctrans("dialog.error.title"),uctrans("error.save","settings"),"error")})})}}])&&a(e.prototype,n),i&&a(e,i),t}();function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}var l=n("LvDl"),u=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.initMenus(),this.initListeners()}var e,n,a;return e=t,(n=[{key:"initMenus",value:function(){var t=this;this.itemsNumber=0,this.initMenuHtml("main-menu-structure","menu-main"),this.initMenuHtml("admin-menu-structure","menu-admin"),$(".menu-manager").nestable({maxDepth:3}),this.menuToJson(),$(".menu-manager").on("change",function(e){t.menuToJson(),t.save()})}},{key:"initMenuHtml",value:function(t,e){var n=JSON.parse($("meta[name='".concat(t,"']")).attr("content"));if("object"===r(n)){var a="",i=!0,o=!1,l=void 0;try{for(var u,s=n[Symbol.iterator]();!(i=(u=s.next()).done);i=!0){var c=u.value;a+=this.buildItem(c)}}catch(t){o=!0,l=t}finally{try{i||null==s.return||s.return()}finally{if(o)throw l}}$(".menu-manager.".concat(e," ol.dd-list:first")).html(a)}}},{key:"initListeners",value:function(){this.initSaveGroupButtonListener(),this.initSaveRouteLinkButtonListener(),this.initSaveLinkButtonListener(),this.initMenuSwitcherListener(),this.initEditButtonListener(),this.initRemoveButtonListener(),this.initActionsButtonsListener(),this.initResetButtonListener()}},{key:"initMenuSwitcherListener",value:function(){var t=this;$("input#menu-switcher").on("change",function(e){$(e.currentTarget).is(":checked")?($(".menu-manager.menu-admin").show(),$(".menu-manager.menu-main").hide(),$("input#selected-menu").val("admin")):($(".menu-manager.menu-admin").hide(),$(".menu-manager.menu-main").show(),$("input#selected-menu").val("main")),t.menuToJson()})}},{key:"menuToJson",value:function(){this.menuStructure=JSON.stringify($(".menu-manager:visible").nestable("serialize"))}},{key:"save",value:function(){var t=$("meta[name='save-url']").attr("content");$.ajax({url:t,method:"post",data:{_token:$("meta[name='csrf-token']").attr("content"),structure:this.menuStructure,type:$(".menu-manager:visible").data("type")}}).then(function(t){$("span.saved").fadeIn().delay(1e3).fadeOut()}).fail(function(t){swal(uctrans.trans("settings:dialog.error.title"),uctrans.trans("settings:error.save"),"error")})}},{key:"initSaveGroupButtonListener",value:function(){var t=this;$("#save-group").on("click",function(e){var n=$("#groupModal input[name='label']"),a=$("#groupModal input[name='icon']"),i=n.val(),r=a.val();i||n.addClass(["invalid"]),r||a.addClass(["invalid"]),i&&r&&(t.saveGroup(i,r),$("#groupModal").modal("close"))})}},{key:"initSaveRouteLinkButtonListener",value:function(){var t=this;$("#save-route-link").on("click",function(e){var n=$("#routeLinkModal input[name='label']"),a=$("#routeLinkModal input[name='icon']"),i=$("#routeLinkModal input[name='module']"),r=$("#routeLinkModal input[name='route']"),o=n.val(),l=a.val(),u=i.val(),s=r.val();o||n.addClass(["invalid"]),l||a.addClass(["invalid"]),u||i.addClass(["invalid"]),s||r.addClass(["invalid"]),o&&l&&u&&s&&(t.saveRouteLink(o,l,u,s),$("#routeLinkModal").modal("close"))})}},{key:"initSaveLinkButtonListener",value:function(){var t=this;$("#save-link").on("click",function(e){var n=$("#linkModal input[name='label']"),a=$("#linkModal input[name='icon']"),i=$("#linkModal input[name='url']"),r=n.val(),o=a.val(),l=i.val();r||n.addClass(["invalid"]),o||a.addClass(["invalid"]),l||i.addClass(["invalid"]),r&&o&&l&&(t.saveLink(r,o,l),$("#linkModal").modal("close"))})}},{key:"initActionsButtonsListener",value:function(){var t=this;$(".btn-actions").on("click",function(){t.currentItem=null,t.currentItemJson=null,$(".modal input").val(""),$(".modal .form-line").removeClass("focused")})}},{key:"initEditButtonListener",value:function(){var t=this;$(".btn-edit").off("click"),$(".btn-edit").on("click",function(e){var n,a=$(e.currentTarget).parents("li:first"),i=$(a).data("id");switch(t.currentItem=a,t.retrieveCurrentItemJsonById(i,JSON.parse(t.menuStructure)),a.data("type")){case"group":n=$("#groupModal").modal("open"),$("input[name='label']",n).val(a.data("label")).next("label").addClass("active"),$("input[name='icon']",n).val(a.data("icon")).next("label").addClass("active");break;case"link":n=$("#linkModal").modal("open"),$("input[name='label']",n).val(a.data("label")).next("label").addClass("active"),$("input[name='icon']",n).val(a.data("icon")).next("label").addClass("active"),$("input[name='url']",n).val(a.data("url")).next("label").addClass("active");break;case"route":n=$("#routeLinkModal").modal("open"),$("input[name='label']",n).val(a.data("label")).next("label").addClass("active"),$("input[name='icon']",n).val(a.data("icon")).next("label").addClass("active"),$("input[name='module']",n).val(a.data("module")).next("label").addClass("active"),$("input[name='route']",n).val(a.data("route")).next("label").addClass("active")}})}},{key:"initRemoveButtonListener",value:function(){var t=this;$(".btn-remove").off("click"),$(".btn-remove").on("click",function(e){var n=$(e.currentTarget).parents("li:first").data("id");t.retrieveCurrentItemJsonById(n,JSON.parse(t.menuStructure)),t.currentItemJson&&t.currentItemJson.children?swal(uctrans.trans("settings:menu.error.not_empty.title"),uctrans.trans("settings:menu.error.not_empty.description"),"error"):($(".menu-manager:visible").nestable("remove",n),t.menuToJson(),t.save())})}},{key:"initResetButtonListener",value:function(){$("a#btn-reset-menu").on("click",function(t){t.preventDefault();var e,n,a,i=$(t.currentTarget);swal((e={title:uctrans.trans("settings:menu.reset.title"),text:uctrans.trans("settings:menu.reset.text"),icon:"warning",buttons:!0,dangerMode:!0},n="buttons",a=[uctrans.trans("default:no"),uctrans.trans("default:yes")],n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e)).then(function(t){if(!0===t){var e={_token:$("meta[name='csrf-token']").attr("content"),type:$("input#selected-menu").val()};$.post(i.attr("href"),e).then(function(){document.location.reload()})}})})}},{key:"saveGroup",value:function(t,e){if(this.currentItem){if(null!==this.currentItemJson){this.currentItemJson.label=t,this.currentItemJson.icon=e,$(this.currentItem).attr("data-label",t).attr("data-icon",e),$(".icon-label:first",this.currentItem).text(t),$(".material-icons:first",this.currentItem).text(e),$(".menu-manager:visible").nestable("replace",this.currentItemJson);var n=$(this.currentItem).data("id");$("[data-id='".concat(n,"']")).replaceWith(this.currentItem)}}else{var a=this.buildItem({type:"group",label:t,icon:e,color:"green"});$(".menu-manager:visible .dd-list:first").append(a)}$(".menu-manager:visible").trigger("change"),this.initEditButtonListener(),this.initRemoveButtonListener()}},{key:"saveRouteLink",value:function(t,e,n,a){if(this.currentItem){if(null!==this.currentItemJson){this.currentItemJson.label=t,this.currentItemJson.icon=e,this.currentItemJson.module=n,this.currentItemJson.route=a,$(this.currentItem).attr("data-label",t).attr("data-icon",e).attr("data-module",n).attr("data-route",a),$(".icon-label:first",this.currentItem).text(t),$(".material-icons:first",this.currentItem).text(e),$(".menu-manager:visible").nestable("replace",this.currentItemJson);var i=$(this.currentItem).data("id");$("[data-id='".concat(i,"']")).replaceWith(this.currentItem)}}else{var r=this.buildItem({type:"route",module:n,label:t,icon:e,color:"red",route:a});$(".menu-manager:visible .dd-list:first").append(r)}$(".menu-manager:visible").trigger("change"),this.initEditButtonListener(),this.initRemoveButtonListener()}},{key:"saveLink",value:function(t,e,n){if(this.currentItem){if(null!==this.currentItemJson){this.currentItemJson.label=t,this.currentItemJson.icon=e,this.currentItemJson.url=n,$(this.currentItem).attr("data-label",t).attr("data-icon",e).attr("data-url",n),$(".icon-label:first",this.currentItem).text(t),$(".material-icons:first",this.currentItem).text(e),$(".menu-manager:visible").nestable("replace",this.currentItemJson);var a=$(this.currentItem).data("id");$("[data-id='".concat(a,"']")).replaceWith(this.currentItem)}}else{var i=this.buildItem({type:"link",label:t,icon:e,color:"blue",url:n});$(".menu-manager:visible .dd-list:first").append(i)}$(".menu-manager:visible").trigger("change"),this.initEditButtonListener(),this.initRemoveButtonListener()}},{key:"retrieveCurrentItemJsonById",value:function(t,e,n){if("object"==r(e)){var a=!0,i=!1,o=void 0;try{for(var l,u=e[Symbol.iterator]();!(a=(l=u.next()).done);a=!0){var s=l.value;if(s.id==t){this.currentItemJson=s,this.currentItemParentJson=n;break}s.children&&this.retrieveCurrentItemJsonById(t,s.children,s)}}catch(t){i=!0,o=t}finally{try{a||null==u.return||u.return()}finally{if(i)throw o}}}}},{key:"buildItem",value:function(t){var e=this;this.itemsNumber++;var n="";"group"!==t.type&&(n="dd-nochildren");var a="";t.module&&(a='data-module="'.concat(t.module,'"'));var i="";t.url&&(i='data-url="'.concat(t.url,'"'));var r="";t.route&&(r='data-route="'.concat(t.route,'"'));var o="",u=t.label;t.translation&&(o='data-translation="'.concat(t.translation,'"'),u=t.translation);var s="";"module"!==t.type&&(s='<div class="dd3-actions">\n                        <a href="javascript:void(0)" class="btn-edit primary-text"><i class="material-icons">edit</i></a>\n                        <a href="javascript:void(0)" class="btn-remove primary-text"><i class="material-icons">delete</i></a>\n                    </div>');var c='<li class="dd-item dd3-item '.concat(n,'" data-id="').concat(this.itemsNumber,'" ').concat(a," ").concat(r," ").concat(i,' data-type="').concat(t.type,'" data-label="').concat(t.label,'" ').concat(o,' data-icon="').concat(t.icon,'" data-nochildren="').concat(!!t.noChildren,'" data-color="').concat(t.color,'">\n                    <div class="dd-handle dd3-content">\n                        <i class="material-icons left">').concat(t.icon,"</i>\n                        ").concat(u,'\n                        <span class="right ').concat(t.color,'-text">').concat(l.capitalize(t.type),"</span>\n                        </div>\n                    ").concat(s);return t.children&&(c+='<ol class="dd-list">',$.each(t.children,function(t,n){c+=e.buildItem(n)}),c+="</ol>"),c+="</li>"}}])&&o(e.prototype,n),a&&o(e,a),t}();function s(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.lazyLoad()}var e,n,a;return e=t,(n=[{key:"lazyLoad",value:function(){switch($('meta[name="page"]').attr("content")){case"module-manager":new i;break;case"menu-manager":new u}}}])&&s(e.prototype,n),a&&s(e,a),t}())},YuTi:function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},yLpj:function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n}},[[1,0,1]]]);
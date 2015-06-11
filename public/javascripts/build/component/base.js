﻿/*
Copyright 2013, KISSY UI Library v1.40dev
MIT Licensed
build time: Apr 17 00:14
*/
KISSY.add("component/base",function(d,g,e,c,f,a,b,h){d.mix(g,{Controller:e,Render:c,Container:f,DelegateChildren:a,DecorateChild:h,DecorateChildren:b});return g},{requires:"./base/impl,./base/controller,./base/render,./base/container,./base/delegate-children,./base/decorate-children,./base/decorate-child".split(",")});
KISSY.add("component/base/box-render",function(d){function g(){}var e=d.all,c=d.UA,f=d.Env.host.document;g.ATTRS={el:{},elCls:{},elStyle:{},width:{},height:{},elAttrs:{},content:{},elBefore:{},render:{},visible:{},contentEl:{valueFn:function(){return this.get("el")}}};g.HTML_PARSER={el:function(a){return a},content:function(a){return(this.get("contentEl")||a).html()}};g.prototype={__createDom:function(){var a,b=this.getCssClassWithState(),h;(a=this.get("srcNode"))?a.addClass(b):(h=this.get("contentEl"),
a=e(d.substitute('<div class="{cls}"></div>',{cls:b})),h&&a.append(h),this.setInternal("el",a),h||this.setInternal("contentEl",a))},__renderUI:function(){if(!this.get("srcNode")){var a=this.get("render"),b=this.get("el"),h=this.get("elBefore");h?b.insertBefore(h,void 0):a?b.appendTo(a,void 0):b.appendTo(f.body,void 0)}},_onSetElAttrs:function(a){this.get("el").attr(a)},_onSetElCls:function(a){this.get("el").addClass(a)},_onSetElStyle:function(a){this.get("el").css(a)},_onSetWidth:function(a){this.get("el").width(a)},
_onSetHeight:function(a){this.get("el").height(a)},_onSetContent:function(a){var b=this.get("contentEl");if(!this.get("srcNode")||this.get("rendered"))"string"==typeof a?b.html(a):a&&b.empty().append(a);9>c.ie&&!this.get("allowTextSelection")&&b.unselectable(void 0)},_onSetVisible:function(a){var b=this.get("el"),h=this.getCssClassWithState("shown"),c=this.getCssClassWithState("hidden");a?(b.removeClass(c),b.addClass(h)):(b.removeClass(h),b.addClass(c))},__destructor:function(){var a=this.get("el");
a&&a.remove()}};return g},{requires:["node"]});
KISSY.add("component/base/box",function(){function d(){}d.ATTRS={content:{view:1},width:{view:1},height:{view:1},elCls:{view:1},elStyle:{view:1},elAttrs:{view:1},elBefore:{view:1},el:{view:1,setter:function(d){d.isNodeList||(d=$(d));return d}},contentEl:{view:1},render:{view:1},visible:{value:!0,view:1},srcNode:{view:1}};d.prototype={_onSetVisible:function(d){this.get("rendered")&&this.fire(d?"show":"hide")},show:function(){this.render();this.set("visible",!0);return this},hide:function(){this.set("visible",
!1);return this}};return d});KISSY.add("component/base/container",function(d,g,e,c){return g.extend([e,c])},{requires:["./controller","./delegate-children","./decorate-children"]});
KISSY.add("component/base/controller",function(d,g,e,c,f,a,b,h){function s(i){return function(a){this==a.target&&(a=a.newVal,this.get("view").set(i,a))}}function w(i){return function(a){var b=this.get("view");return a===h?b.get(i):a}}function x(i){if(i.target===this){var a=i.component,b=this.get("children"),i=i.index;b.splice(i,0,a);this.get("rendered")&&(a=this.renderChild(a,i));this.fire("afterAddChild",{component:a,index:i})}}function o(a){if(a.target===this){var n=a.component,b,c,h=a.destroy,
d=this.get("children"),a=a.index;-1!=a&&d.splice(a,1);n.setInternal&&n.setInternal("parent",null);if(h)n.destroy&&n.destroy();else if(n.get&&(b=n.get("el")))b=b[0],(c=b.parentNode)&&c.removeChild(b);this.fire("afterRemoveChild",{component:n,index:a})}}function l(i){var b,c,e,f={},g,l=i.get("xrender");b=i.getAttrs();for(e in b)if(c=b[e],c.view){if((g=i.get(e))!==h)f[e]=g;i.on("after"+d.ucfirst(e)+"Change",s(e));c.getter=w(e)}i=i.constructor;for(c=[];i&&i!=v;)(b=a.getXClassByConstructor(i))&&c.push(b),
i=i.superclass&&i.superclass.constructor;f.ksComponentCss=c;return new l(f)}function j(a,b){var c=a.relatedTarget;return c&&(c===b[0]||b.contains(c))}function k(a,b){return function(c){if(!a.get("disabled"))a[b](c)}}var p=d.Env.host.document.documentMode||d.UA.ie,q=d.Features,t=e.Gesture,r=".-ks-component-focus"+d.now(),m=".-ks-component-mouse"+d.now(),u=q.isTouchSupported(),v=f.extend([g],{isController:!0,getCssClassWithPrefix:a.getCssClassWithPrefix,initializer:function(){var a=this.get("defaultChildCfg");
this.publish("beforeAddChild",{defaultFn:x});this.publish("beforeRemoveChild",{defaultFn:o});a.prefixCls=a.prefixCls||this.get("prefixCls");this.setInternal("view",l(this))},createDom:function(){var a;a=this.get("view");a.create();a=a.getKeyEventTarget();this.get("allowTextSelection")||a.unselectable(h)},renderUI:function(){this.get("view").render();this.renderChildren()},renderChildren:function(){var a,b=this.get("children");for(a=0;a<b.length;a++)this.renderChild(b[a],a)},_onSetFocusable:function(a){var b=
this.getKeyEventTarget();if(a)b.attr("tabIndex",0).attr("hideFocus",!0).on("focus"+r,k(this,"handleFocus")).on("blur"+r,k(this,"handleBlur")).on("keydown"+r,k(this,"handleKeydown"));else b.removeAttr("tabIndex"),b.detach(r)},_onSetHandleMouseEvents:function(a){var b=this.get("el");if(a){if(!u)b.on("mouseenter"+m,k(this,"handleMouseEnter")).on("mouseleave"+m,k(this,"handleMouseLeave")).on("contextmenu"+m,k(this,"handleContextMenu"));b.on(t.start+m,k(this,"handleMouseDown")).on(t.end+m,k(this,"handleMouseUp")).on("touchcancel"+
m,k(this,"handleMouseUp")).on(t.tap+m,k(this,"performActionInternal"));if(p&&9>p)b.on("dblclick"+m,k(this,"handleDblClick"))}else b.detach(m)},_onSetFocused:function(a){var b=this.getKeyEventTarget()[0];a?b.focus():b.ownerDocument.body.focus()},focus:function(){this.get("focusable")&&this.set("focused",!0)},blur:function(){this.get("focusable")&&this.set("focused",!1)},getContentElement:function(){return this.get("view").getContentElement()},getKeyEventTarget:function(){return this.get("view").getKeyEventTarget()},
addChild:function(a,b){var d=this.get("children");b===h&&(b=d.length);a=c.create(a,this);this.fire("beforeAddChild",{component:a,index:b});return a},renderChild:function(a,b){var h,e;h=this.get("children");var f;"undefined"===typeof b&&(b=d.indexOf(a,h));a=c.create(a,this);h[b]=a;this.create();f=this.getContentElement();e=f[0];h=e.children[b]||null;a.get("rendered")?(f=a.get("el")[0],f.parentNode!=e&&e.insertBefore(f,h)):(h?a.set("elBefore",h):a.set("render",f),a.render());return a},removeChild:function(a,
b){b===h&&(b=!0);this.fire("beforeRemoveChild",{component:a,index:d.indexOf(a,this.get("children")),destroy:b})},removeChildren:function(a){var b,c=[].concat(this.get("children"));for(b=0;b<c.length;b++)this.removeChild(c[b],a);return this},getChildAt:function(a){return this.get("children")[a]||null},handleDblClick:function(a){this.performActionInternal(a)},handleMouseOver:function(a){var b=this.get("el");j(a,b)||this.handleMouseEnter(a)},handleMouseOut:function(a){var b=this.get("el");j(a,b)||this.handleMouseLeave(a)},
handleMouseEnter:function(a){this.set("highlighted",!!a)},handleMouseLeave:function(a){this.set("active",!1);this.set("highlighted",!a)},handleMouseDown:function(a){var b;if(1==a.which||u)if(b=this.getKeyEventTarget(),this.get("activeable")&&this.set("active",!0),this.get("focusable")&&(b[0].focus(),this.set("focused",!0)),!this.get("allowTextSelection"))b=(b=a.target.nodeName)&&b.toLowerCase(),"input"!=b&&"textarea"!=b&&a.preventDefault()},handleMouseUp:function(a){this.get("active")&&(1==a.which||
u)&&this.set("active",!1)},handleContextMenu:function(){},handleFocus:function(a){this.set("focused",!!a);this.fire("focus")},handleBlur:function(a){this.set("focused",!a);this.fire("blur")},handleKeyEventInternal:function(a){return a.keyCode==e.KeyCodes.ENTER?this.performActionInternal(a):h},handleKeydown:function(a){return this.handleKeyEventInternal(a)?(a.halt(),!0):h},performActionInternal:function(){},destructor:function(){var a,b=this.get("children");for(a=0;a<b.length;a++)b[a].destroy&&b[a].destroy();
this.get("view").destroy()}},{ATTRS:{handleMouseEvents:{value:!0},focusable:{value:!0,view:1},allowTextSelection:{view:1,value:!1},activeable:{value:!0},focused:{view:1},active:{view:1,value:!1},highlighted:{view:1,value:!1},children:{value:[]},prefixCls:{value:d.config("component/prefixCls")||"ks-",view:1},prefixXClass:{},parent:{setter:function(a,b){(b=this.get("parent"))&&this.removeTarget(b);a&&this.addTarget(a)}},disabled:{view:1,value:!1},xrender:{value:b},defaultChildCfg:{value:{}}}},{xclass:"controller"});
return v},{requires:"./box,event,./impl,./uibase,./manager,./render".split(",")});KISSY.add("component/base/decorate-child",function(d,g){function e(){}d.augment(e,g,{decorateInternal:function(c){this.set("el",c);var d=this.get("defaultChildCfg").prefixCls;if(c=c.one("."+(d+this.get("decorateChildCls"))))(d=this.findChildConstructorFromNode(d,c))?this.decorateChildrenInternal(d,c):this.decorateChildren(c)}});return e},{requires:["./decorate-children"]});
KISSY.add("component/base/decorate-children",function(d,g){function e(){}d.augment(e,{decorateInternal:function(c){this.set("el",c);this.decorateChildren(c)},findChildConstructorFromNode:function(c,d){var a=d[0].className||"";return a?(a=a.replace(RegExp("\\b"+c,"ig"),""),g.getConstructorByXClass(a)):null},decorateChildrenInternal:function(c,e,a){a=d.merge(this.get("defaultChildCfg"),a,{srcNode:e});delete a.xclass;return this.addChild(new c(a))},decorateChildren:function(c){var d=this,a=d.get("defaultChildCfg").prefixCls,
b=d.get("defaultChildCfg").xclass;c.children().each(function(c){var e=d.findChildConstructorFromNode(a,c)||b&&g.getConstructorByXClass(b);d.decorateChildrenInternal(e,c)})}});return e},{requires:["./manager"]});
KISSY.add("component/base/delegate-children",function(d,g){function e(){}function c(a){if(!this.get("disabled")){var c=this.getOwnerControl(a.target,a);if(c&&!c.get("disabled"))switch(a.type){case b.start:c.handleMouseDown(a);break;case b.end:c.handleMouseUp(a);break;case b.tap:c.performActionInternal(a);break;case "mouseover":c.handleMouseOver(a);break;case "mouseout":c.handleMouseOut(a);break;case "contextmenu":c.handleContextMenu(a);break;case "dblclick":c.handleDblClick(a)}}}var f=d.UA,a=d.Env.host.document.documentMode||
f.ie,b=g.Gesture,h=d.Features.isTouchSupported();e.ATTRS={delegateChildren:{value:!0}};d.augment(e,{__bindUI:function(){var d;this.get("delegateChildren")&&(d=b.start+" "+b.end+" "+b.tap+" touchcancel ",h||(d+="mouseover mouseout contextmenu "+(a&&9>a?"dblclick ":"")),this.get("el").on(d,c,this))},getOwnerControl:function(a){for(var b=this.get("children"),c=b.length,d=this.get("el")[0];a&&a!==d;){for(var h=0;h<c;h++)if(b[h].get("el")[0]===a)return b[h];a=a.parentNode}return null}});return e},{requires:["event"]});
KISSY.add("component/base/impl",function(d,g,e){return{Manager:e,UIBase:g,create:function(c,f){var a;if(c){!c.isController&&f&&(d.mix(c,f.get("defaultChildCfg"),!1),!c.xclass&&c.prefixXClass&&(c.xclass=c.prefixXClass,c.xtype&&(c.xclass+="-"+c.xtype)));if(!c.isController&&(a=c.xclass))a=e.getConstructorByXClass(a),c=new a(c);c.isController&&f&&c.setInternal("parent",f)}return c}}},{requires:["./uibase","./manager"]});
KISSY.add("component/base/manager",function(d){function g(a){for(var a=d.trim(a).split(/\s+/),b=0;b<a.length;b++)a[b]&&(a[b]=this.get("prefixCls")+a[b]);return a.join(" ")}var e={},c={},f={__instances:c,addComponent:function(a,b){c[a]=b},removeComponent:function(a){delete c[a]},getComponent:function(a){return c[a]},getCssClassWithPrefix:g,getXClassByConstructor:function(a){for(var b in e)if(e[b].constructor==a)return b;return 0},getConstructorByXClass:function(a){for(var a=a.split(/\s+/),b=-1,c,d=
null,f=0;f<a.length;f++){var g=e[a[f]];if(g&&(c=g.priority)>b)b=c,d=g.constructor}return d},setConstructorByXClass:function(a,b){d.isFunction(b)?e[a]={constructor:b,priority:0}:(b.priority=b.priority||0,e[a]=b)}};f.getCssClassWithPrefix=g;return f});
KISSY.add("component/base/render",function(d,g,e,c,f){return c.extend([g],{isRender:1,getCssClassWithState:function(a){var b=this.get("ksComponentCss");if(!b)return"";(a=a||"")&&(a="-"+a);return this.getCssClassWithPrefix(b.join(a+" ")+a)},getCssClassWithPrefix:f.getCssClassWithPrefix,getKeyEventTarget:function(){return this.get("el")},_onSetHighlighted:function(a){var b=this.getCssClassWithState("hover");this.get("el")[a?"addClass":"removeClass"](b)},_onSetDisabled:function(a){var b=this.getCssClassWithState("disabled");
this.get("el")[a?"addClass":"removeClass"](b).attr("aria-disabled",a);this.get("focusable")&&this.getKeyEventTarget().attr("tabIndex",a?-1:0)},_onSetActive:function(a){var b=this.getCssClassWithState("active");this.get("el")[a?"addClass":"removeClass"](b).attr("aria-pressed",!!a)},_onSetFocused:function(a){var b=this.get("el"),c=this.getCssClassWithState("focused");b[a?"addClass":"removeClass"](c)},getContentElement:function(){return this.get("contentEl")||this.get("el")}},{ATTRS:{prefixCls:{},focusable:{},
focused:{},active:{},disabled:{},highlighted:{}},HTML_PARSER:{disabled:function(){var a=this.getCssClassWithState("disabled");return this.get("el").hasClass(a)}}})},{requires:["./box-render","./impl","./uibase","./manager"]});
KISSY.add("component/base/uibase",function(d,g,e,c,f){var e=d.noop,a=g.extend({constructor:function(){var b;a.superclass.constructor.apply(this,arguments);this.decorateInternal&&(b=this.get("srcNode"))&&this.decorateInternal(b);this.get("autoRender")&&this.render()},bindInternal:e,syncInternal:e,initializer:function(){var a,b=d.one(this.get("srcNode"));(a=this.get("id"))&&c.addComponent(a,this);if(b){var e=this.constructor,g,o;o=this.collectConstructorChains();for(a=o.length-1;0<=a;a--)if(e=o[a],
g=e.HTML_PARSER){var e=b,l=void 0,j=void 0,j=void 0,k=this.userConfig||{};for(l in g)l in k||(j=g[l],d.isFunction(j)?(j=j.call(this,e),j!==f&&this.setInternal(l,j)):"string"==typeof j?this.setInternal(l,e.one(j)):d.isArray(j)&&j[0]&&this.setInternal(l,e.all(j[0])))}this.setInternal("srcNode",b)}},create:function(){this.get("created")||(this.fire("beforeCreateDom"),this.callMethodByHierarchy("createDom","__createDom"),this.setInternal("created",!0),this.fire("afterCreateDom"),this.callPluginsMethod("createDom"));
return this},render:function(){this.get("rendered")||(this.create(f),this.fire("beforeRenderUI"),this.callMethodByHierarchy("renderUI","__renderUI"),this.fire("afterRenderUI"),this.callPluginsMethod("renderUI"),this.fire("beforeBindUI"),a.superclass.bindInternal.call(this),this.callMethodByHierarchy("bindUI","__bindUI"),this.fire("afterBindUI"),this.callPluginsMethod("bindUI"),a.superclass.syncInternal.call(this),this.sync(),this.setInternal("rendered",!0));return this},sync:function(){this.fire("beforeSyncUI");
this.callMethodByHierarchy("syncUI","__syncUI");this.fire("afterSyncUI");this.callPluginsMethod("syncUI")},createDom:e,renderUI:e,bindUI:e,syncUI:e,plug:function(){var b;b=this.get("plugins");a.superclass.plug.apply(this,arguments);b=b[b.length-1];this.get("rendered")?(b.pluginCreateDom&&b.pluginCreateDom(this),b.pluginRenderUI&&b.pluginRenderUI(this),b.pluginBindUI&&b.pluginBindUI(this),b.pluginSyncUI&&b.pluginSyncUI(this)):this.get("created")&&b.pluginCreateDom&&b.pluginCreateDom(this);return this},
destructor:function(){var a;(a=this.get("id"))&&c.removeComponent(a)}},{name:"UIBase",ATTRS:{rendered:{value:!1},created:{value:!1},xclass:{valueFn:function(){return c.getXClassByConstructor(this.constructor)}}}}),b=a.extend;d.mix(a,{HTML_PARSER:{},extend:function s(a,e,g){var f=d.makeArray(arguments),j={},k,p=f.length,q=f[p-1];if(k=q.xclass)f[p-2].name=k;f=b.apply(this,f);d.isArray(a)&&(d.each(a.concat(f),function(a){a&&d.each(a.HTML_PARSER,function(a,b){j[b]=a})}),f.HTML_PARSER=j);k&&c.setConstructorByXClass(k,
{constructor:f,priority:q.priority});f.extend=s;return f}});return a},{requires:["rich-base","node","./manager"]});

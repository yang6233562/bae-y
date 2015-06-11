﻿KISSY.add("kison/grammar",function(a,b,c,d,e,f,g,h){function n(a){var c,b=0;for(c in a)b++;return b}function o(a,b){for(var c=0;c<b.length;c++)if(a.equals(b[c]))return c;return-1}function p(){var a=this;p.superclass.constructor.apply(a,arguments)}function q(b){var e,f,g,c=this,d=c.lexer,h=c.table,j=h.gotos,k=h.action,l=c.productions,m=[null],n=[0];for(d.resetInput(b);;){if(e=n[n.length-1],f||(f=d.lex()),!f)return a.log("it is not a valid input: "+b,"error"),!1;if(g=k[e]&&k[e][f],!g){var p,o=[];return k[e]&&a.each(k[e],function(a,b){o.push(c.lexer.mapReverseSymbol(b))}),p="Syntax error at line "+d.lineNumber+":\n"+d.showDebugInfo()+"\n"+"expect "+o.join(", "),a.error(p),!1}switch(g[i.TYPE_INDEX]){case i.SHIFT_TYPE:n.push(f),m.push(d.text),n.push(g[i.TO_INDEX]),f=null;break;case i.REDUCE_TYPE:var q=l[g[i.PRODUCTION_INDEX]],r=q.symbol||q[0],s=q.action||q[2],t=q.rhs||q[1],u=t.length,v=0,w=void 0,x=m[m.length-u];for(c.$$=x;u>v;v++)c["$"+(u-v)]=m[m.length-1-v];s&&(w=s.call(c)),x=void 0!==w?w:c.$$,u&&(n=n.slice(0,2*-1*u),m=m.slice(0,-1*u)),n.push(r),m.push(x);var y=j[n[n.length-2]][n[n.length-1]];n.push(y);break;case i.ACCEPT_TYPE:return x}}return void 0}var i={SHIFT_TYPE:1,REDUCE_TYPE:2,ACCEPT_TYPE:0,TYPE_INDEX:0,PRODUCTION_INDEX:1,TO_INDEX:2},j=c.serializeObject,k=a.mix,l=g.STATIC.END_TAG,m="$START";return a.extend(p,b,{build:function(){var b=this,c=b.lexer,d=b.get("productions");d.unshift({symbol:m,rhs:[d[0].symbol]}),a.each(d,function(b,e){b.symbol=c.mapSymbol(b.symbol);var f=b.rhs;a.each(f,function(a,b){f[b]=c.mapSymbol(a)}),d[e]=new h(b)}),b.buildTerminals(),b.buildNonTerminals(),b.buildNullAble(),b.buildFirsts(),b.buildItemSet(),b.buildLalrItemSets(),b.buildTable()},buildTerminals:function(){var b=this,c=b.get("lexer"),d=c&&c.rules,e=b.get("terminals");e[c.mapSymbol(l)]=1,a.each(d,function(a){var b=a.token||a[0];b&&(e[b]=1)})},buildNonTerminals:function(){var b=this,c=b.get("terminals"),d=b.get("nonTerminals"),e=b.get("productions");a.each(e,function(b){var e=b.get("symbol"),g=d[e];g||(g=d[e]=new f({symbol:e})),g.get("productions").push(b),a.each(b.get("handles"),function(a){c[a]||d[a]||(d[a]=new f({symbol:a}))})})},buildNullAble:function(){for(var c,d,e,f,g,h,i,b=this,j=b.get("nonTerminals"),k=!0;k;){k=!1,a.each(b.get("productions"),function(a){if(!a.get("nullAble")){for(d=a.get("rhs"),c=0,e=0;g=d[c];++c)b.isNullAble(g)&&e++;e===c&&a.set("nullAble",k=!0)}});for(f in j)if(!j[f].get("nullAble"))for(i=j[f].get("productions"),c=0;h=i[c];c++)if(h.get("nullAble")){j[f].set("nullAble",k=!0);break}}},isNullAble:function(a){var b=this,c=b.get("nonTerminals");if(a instanceof Array){for(var e,d=0;e=a[d];++d)if(!b.isNullAble(e))return!1;return!0}return c[a]?c[a].get("nullAble"):!1},findFirst:function(a){var d,e,b=this,c={},f=b.get("nonTerminals");if(a instanceof Array){for(e=0;(d=a[e])&&(f[d]?k(c,f[d].get("firsts")):c[d]=1,b.isNullAble(d));++e);return c}return f[a]?f[a].get("firsts"):[a]},buildFirsts:function(){for(var c,g,h,b=this,e=(b.get("productions"),b.get("nonTerminals")),f=!0;f;){f=!1,a.each(b.get("productions"),function(a){var c=b.findFirst(a.get("rhs"));n(c)!==n(a.get("firsts"))&&(a.set("firsts",c),f=!0)});for(g in e)c=e[g],h={},a.each(c.get("productions"),function(a){k(h,a.get("firsts"))}),n(h)!==n(c.get("firsts"))&&(c.set("firsts",h),f=!0)}},closure:function(b){for(var c=this,e=b.get("items"),f=c.get("productions"),g=1;g;)g=!1,a.each(e,function(e){var h=e.get("dotPosition"),i=e.get("production"),j=i.get("rhs"),k=j[h],l=e.get("lookAhead"),m={};a.each(l,function(b,d){var e=j.slice(h+1);e.push(d),a.mix(m,c.findFirst(e))}),a.each(f,function(a){if(a.get("symbol")==k){var f,c=new d({production:a}),e=b.findItemIndex(c,!0);-1!=e?(f=b.getItemAt(e),g=g||!!f.addLookAhead(m)):(c.addLookAhead(m),b.addItem(c),g=!0)}})});return b},gotos:function(b,c){var f=new e,g=b.get("items");return a.each(g,function(a){var b=a.get("production"),e=a.get("dotPosition"),g=b.get("rhs")[e];if(g==c){var j,h=new d({production:b,dotPosition:e+1}),i=f.findItemIndex(h,!0);-1!=i?(j=f.getItemAt(i),j.addLookAhead(a.get("lookAhead"))):(h.addLookAhead(a.get("lookAhead")),f.addItem(h))}}),this.closure(f)},findItemSetIndex:function(a){var c,b=this.get("itemSets");for(c=0;c<b.length;c++)if(b[c].equals(a))return c;return-1},buildItemSet:function(){var b=this,c=b.lexer,f=b.get("itemSets"),g={},h=b.get("productions");g[c.mapSymbol(l)]=1;var i=b.closure(new e({items:[new d({production:h[0],lookAhead:g})]}));f.push(i);var j=!0,k=a.merge(b.get("terminals"),b.get("nonTerminals"));for(delete k[c.mapSymbol(l)];j;){j=!1;var m=f.concat();a.each(m,function(c){a.each(k,function(a,d){if(c.__cache||(c.__cache={}),!c.__cache[d]){var e=b.gotos(c,d);if(c.__cache[d]=1,0!=e.size()){var g=b.findItemSetIndex(e);g>-1?e=f[g]:(f.push(e),j=!0),c.get("gotos")[d]=e,e.addReverseGoto(d,c)}}})})}},buildLalrItemSets:function(){var c,d,e,f,b=this.get("itemSets");for(c=0;c<b.length;c++)for(e=b[c],d=c+1;d<b.length;d++)if(f=b[d],e.equals(f,!0)){for(var g=0;g<e.get("items").length;g++)e.get("items")[g].addLookAhead(f.get("items")[g].get("lookAhead"));var h=e.get("gotos");a.each(f.get("gotos"),function(a,b){h[b]=a,a.addReverseGoto(b,e)}),a.each(f.get("reverseGotos"),function(b,c){a.each(b,function(a){a.get("gotos")[c]=e,e.addReverseGoto(c,a)})}),b.splice(d--,1)}},buildTable:function(){var j,k,n,p,b=this,c=b.lexer,d=b.get("table"),e=b.get("itemSets"),f=b.get("productions"),g={},h={};for(d.gotos=g,d.action=h,j=b.get("nonTerminals"),k=0;k<e.length;k++)n=e[k],a.each(n.get("gotos"),function(a,b){j[b]?(g[k]=g[k]||{},g[k][b]=o(a,e)):(h[k]=h[k]||{},p=h[k][b]=[],p[i.TYPE_INDEX]=i.SHIFT_TYPE,p[i.PRODUCTION_INDEX]=0,p[i.TO_INDEX]=o(a,e))}),a.each(n.get("items"),function(b){var d=b.get("production");b.get("dotPosition")==d.get("rhs").length&&(d.get("symbol")==c.mapSymbol(m)?b.get("lookAhead")[c.mapSymbol(l)]&&(h[k]=h[k]||{},p=h[k][c.mapSymbol(l)]=[],p[i.TYPE_INDEX]=i.ACCEPT_TYPE,p[i.TO_INDEX]=p[i.PRODUCTION_INDEX]=0):(h[k]=h[k]||{},a.each(b.get("lookAhead"),function(b,c){p=h[k][c]=[],p[i.TYPE_INDEX]=i.REDUCE_TYPE,p[i.TO_INDEX]=0,p[i.PRODUCTION_INDEX]=a.indexOf(d,f)})))})},visualizeTable:function(){var b=this,c=b.get("table"),d=c.gotos,e=c.action,f=b.get("productions"),g=[];return a.each(b.get("itemSets"),function(a,b){g.push(new Array(70).join("*")+" itemSet : "+b),g.push(a.toString()),g.push("")}),g.push(""),g.push(new Array(70).join("*")+" table : "),a.each(e,function(b,c){a.each(b,function(a,b){var d,e=a[i.TYPE_INDEX];if(e==i.ACCEPT_TYPE)d="acc";else if(e==i.REDUCE_TYPE){var h=f[a[i.PRODUCTION_INDEX]];d="r, "+h.get("symbol")+"="+h.get("rhs").join(" ")}else e==i.SHIFT_TYPE&&(d="s, "+a[i.TO_INDEX]);g.push("action["+c+"]"+"["+b+"] = "+d)})}),g.push(""),a.each(d,function(b,c){a.each(b,function(a,b){g.push("goto["+c+"]"+"["+b+"] = "+a)})}),g},genCode:function(b){b=b||{};var c=this,d=c.get("table"),e=c.get("lexer"),f=e.genCode(b);c.build();var g=[];a.each(c.get("productions"),function(a){var b=a.get("action"),c=[a.get("symbol"),a.get("rhs")];b&&c.push(b),g.push(c)});var h=[];return h.push("/* Generated by kison from KISSY */"),h.push("var parser = {},S = KISSY,GrammarConst = "+j(i)+";"),h.push(f),h.push("parser.lexer = lexer;"),b.compressSymbol&&h.push("lexer.symbolMap = "+j(e.symbolMap)+";"),h.push("parser.productions = "+j(g)+";"),h.push("parser.table = "+j(d)+";"),h.push("parser.parse = "+q.toString()+";"),h.push("return parser;"),h.join("\n")}},{ATTRS:{table:{value:{}},itemSets:{value:[]},productions:{value:[]},nonTerminals:{value:{}},lexer:{setter:function(a){return a instanceof g||(a=new g(a)),this.lexer=a,a}},terminals:{value:{}}}}),p},{requires:["base","./utils","./item","./item-set","./non-terminal","./lexer","./production"]}),KISSY.add("kison/item-set",function(a,b){function c(){c.superclass.constructor.apply(this,arguments)}return a.extend(c,b,{addItem:function(a){for(var b=this.get("items"),c=0;c<b.length&&!(b[c].get("production").toString()>a.get("production").toString());c++);b.splice(c,0,a)},size:function(){return this.get("items").length},findItemIndex:function(a,b){for(var c=this.get("items"),d=0;d<c.length;d++)if(c[d].equals(a,b))return d;return-1},getItemAt:function(a){return this.get("items")[a]},equals:function(a,b){var d,c=this.get("items"),e=a.get("items");if(c.length!=e.length)return!1;for(d=0;d<c.length;d++)if(!c[d].equals(e[d],b))return!1;return!0},toString:function(){var b=[];return a.each(this.get("items"),function(a){b.push(a.toString())}),b.join("\n")},addReverseGoto:function(a,b){var c=this.get("reverseGotos");c[a]=c[a]||[],c[a].push(b)}},{ATTRS:{items:{value:[]},gotos:{value:{}},reverseGotos:{value:{}}}}),c},{requires:["base"]}),KISSY.add("kison/item",function(a,b){function c(){c.superclass.constructor.apply(this,arguments)}return a.extend(c,b,{equals:function(b,c){var d=this;return b.get("production").equals(d.get("production"))?b.get("dotPosition")!=d.get("dotPosition")?!1:c||a.equals(d.get("lookAhead"),b.get("lookAhead"))?!0:!1:!1},toString:function(b){return this.get("production").toString(this.get("dotPosition"))+(b?"":","+a.keys(this.get("lookAhead")).join("/"))},addLookAhead:function(b){var c=this.get("lookAhead"),d=0;return a.each(b,function(a,b){c[b]||(c[b]=1,d=1)}),d}},{ATTRS:{production:{},dotPosition:{value:0},lookAhead:{value:{}}}}),c},{requires:["base"]}),KISSY.add("kison",function(a,b,c,d,e){var f={};return f.Grammar=b,f.Production=c,f.Lexer=d,f.Utils=e,a.trim("@DEBUG@")?f:(alert("kison can only use uncompressed version!"),null)},{requires:["kison/grammar","kison/production","kison/lexer","kison/utils"]}),KISSY.add("kison/lexer",function(S,Utils){var serializeObject=Utils.serializeObject,Lexer=function(a){var b=this;b.rules=[],S.mix(b,a),b.resetInput(b.input)};return Lexer.STATIC={INITIAL:"I",DEBUG_CONTEXT_LIMIT:20,END_TAG:"$EOF"},Lexer.prototype={constructor:Lexer,resetInput:function(a){S.mix(this,{input:a,matched:"",stateStack:[Lexer.STATIC.INITIAL],match:"",text:"",firstLine:1,lineNumber:1,lastLine:1,firstColumn:1,lastColumn:1})},genCode:function(cfg){var STATIC=Lexer.STATIC,self=this,compressSymbol=cfg.compressSymbol,compressState=cfg.compressLexerState,code=[],stateMap;self.symbolId=self.stateId=0,compressSymbol&&(self.symbolMap={},self.mapSymbol(STATIC.END_TAG)),compressState&&(stateMap=self.stateMap={}),code.push("var Lexer = "+Lexer.toString()+";"),code.push("Lexer.prototype= "+serializeObject(Lexer.prototype,/genCode/)+";"),code.push("Lexer.STATIC= "+serializeObject(STATIC)+";");var newCfg=serializeObject({rules:self.rules},compressState||compressSymbol?function(a){if(a&&a.regexp){var c,b=a.state,d=a.action,e=a.token||0;return e&&(e=self.mapSymbol(e)),c=[e,a.regexp,d||0],compressState&&b&&(b=S.map(b,function(a){return self.mapState(a)})),b&&c.push(b),c}return void 0}:0);return code.push("var lexer = new Lexer("+newCfg+");"),(compressState||compressSymbol)&&(self.rules=eval("("+newCfg+")").rules,compressState&&code.push("lexer.stateMap = "+serializeObject(stateMap)+";")),code.join("\n")},getCurrentRules:function(){var a=this,b=a.stateStack[a.stateStack.length-1],c=[];return b=a.mapState(b),S.each(a.rules,function(a){var d=a.state||a[3];d?S.inArray(b,d)&&c.push(a):b==Lexer.STATIC.INITIAL&&c.push(a)}),c},pushState:function(a){this.stateStack.push(a)},popState:function(){return this.stateStack.pop()},getStateStack:function(){return this.stateStack},showDebugInfo:function(){var a=this,b=Lexer.STATIC.DEBUG_CONTEXT_LIMIT,c=a.matched,d=a.match,e=a.input;c=c.slice(0,c.length-d.length);var f=(c.length>b?"...":"")+c.slice(-b).replace(/\n/," "),g=d+e;return g=g.slice(0,b)+(g.length>b?"...":""),f+g+"\n"+new Array(f.length+1).join("-")+"^"},mapSymbol:function(a){var b=this,c=b.symbolMap;return c?c[a]||(c[a]=++b.symbolId):a},mapReverseSymbol:function(a){var d,b=this,c=b.symbolMap,e=b.reverseSymbolMap;if(!e&&c){e=b.reverseSymbolMap={};for(d in c)e[c[d]]=d}return e?e[a]:a},mapState:function(a){var b=this,c=b.stateMap;return c?c[a]||(c[a]=++b.stateId):a},lex:function(){var c,d,e,f,g,a=this,b=a.input,h=a.getCurrentRules();if(a.match=a.text="",!b)return a.mapSymbol(Lexer.STATIC.END_TAG);for(c=0;c<h.length;c++){d=h[c];var i=d.regexp||d[1],j=d.token||d[0],k=d.action||d[2]||void 0;if(e=b.match(i)){g=e[0].match(/\n.*/g),g&&(a.lineNumber+=g.length),S.mix(a,{firstLine:a.lastLine,lastLine:a.lineNumber+1,firstColumn:a.lastColumn,lastColumn:g?g[g.length-1].length-1:a.lastColumn+e[0].length});var l;return l=a.match=e[0],a.matches=e,a.text=l,a.matched+=l,f=k&&k.call(a),f=void 0==f?j:a.mapSymbol(f),b=b.slice(l.length),a.input=b,f?f:a.lex()}}return S.error("lex error at line "+a.lineNumber+":\n"+a.showDebugInfo()),void 0}},Lexer},{requires:["./utils"]}),KISSY.add("kison/non-terminal",function(a,b){function c(){c.superclass.constructor.apply(this,arguments)}return a.extend(c,b,{},{ATTRS:{productions:{value:[]},firsts:{value:{}},symbol:{},nullAble:{value:!1}}}),c},{requires:["base"]}),KISSY.add("kison/production",function(a,b){function c(){c.superclass.constructor.apply(this,arguments)}return a.extend(c,b,{equals:function(b){var c=this;return a.equals(b.get("rhs"),c.get("rhs"))?b.get("symbol")==c.get("symbol"):!1},toString:function(b){var c="",d=this.get("rhs");return a.each(d,function(a,d){d==b&&(c+="."),c+=a}),b==d.length&&(c+="."),this.get("symbol")+"=>"+c}},{ATTRS:{firsts:{value:{}},follows:{value:[]},symbol:{},rhs:{value:[]},nullAble:{value:!1},action:{}}}),c},{requires:["base"]}),KISSY.add("kison/utils",function(a){var d,b=/"/g,c=/'/g;return{escapeString:d=function(a,d){var e=c;return'"'==d?e=b:d="'",a.replace(/\\/g,"\\\\").replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(e,"\\"+d)},serializeObject:function e(b,c){var f;if(c&&a.isFunction(c)&&(f=c(b))===!1)return!1;void 0!==f&&(b=f);var g=[];if("string"==typeof b)return"'"+d(b)+"'";if(a.isNumber(b))return b+"";if(a.isRegExp(b))return"/"+b.source+"/"+(b.global?"g":"")+(b.ignoreCase?"i":"")+(b.multiline?"m":"");if(a.isArray(b)){g.push("[");var h=[];return a.each(b,function(a){var b=e(a,c);b!==!1&&h.push(b)}),g.push(h.join(", ")),g.push("]"),g.join("")}if(a.isObject(b)){g=["{"];var i=1;for(var j in b){var k=b[j];if(!(c&&a.isRegExp(c)&&j.match(c))){var l=e(k,c);if(l!==!1){var m="'"+d(j)+"'";g.push((i?"":",")+m+": "+l),i=0}}}return g.push("}"),g.join("\n")}return b+""}}});
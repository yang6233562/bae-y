KISSY.add("waterfall/loader",function(S,Node,Waterfall){var $=Node.all,win=S.Env.host,SCROLL_TIMER=50;function Loader(){var self=this;Loader.superclass.constructor.apply(self,arguments);self.__onScroll=S.buffer(doScroll,SCROLL_TIMER,self);self.start();}
function doScroll(){var self=this;S.log("waterfall:doScroll");if(self.__loading){return;}
if(self.isAdjusting()){self.__onScroll();return;}
var container=self.get("container");if(!container[0].offsetWidth){return;}
var colHeight=container.offset().top,diff=self.get("diff"),curColHeights=self._curColHeights;if(curColHeights.length){colHeight+=Math.min.apply(Math,curColHeights);}
if(diff+$(win).scrollTop()+$(win).height()>=colHeight){S.log("waterfall:loading");loadData.call(self);}}
function loadData(){var self=this,container=self.get("container");self.__loading=1;var load=self.get("load");load&&load(success,end);function success(items,callback){self.__loading=0;self.addItems(items,function(){callback&&callback.apply(this,arguments);doScroll.call(self);});}
function end(){self.end();}}
Loader.ATTRS={diff:{value:0}};S.extend(Loader,Waterfall,{start:function(){this.resume();},end:function(){this.pause();},pause:function(){var self=this;if(self.__destroyed){return;}
$(win).detach("scroll",self.__onScroll);self.__onScroll.stop();},resume:function(){var self=this;if(self.__destroyed){return;}
$(win).on("scroll",self.__onScroll);self.__started=1;doScroll.call(self);},destroy:function(){var self=this;self.end();Loader.superclass.destroy.apply(self,arguments);}});return Loader;},{requires:['node','./base']});
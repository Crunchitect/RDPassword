/*!
* RAFManager v0.1.0
*
* Copyright 2018-2018, ajiemath <ajiemath@gmail.com>
* Licensed under the MIT license
* http://www.opensource.org/licenses/mit-license
*
*/
!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define(i):t.RAFManager=i()}(this,function(){"use strict";return function(){for(var t=["ms","moz","webkit","o"],i=0;i<t.length&&!window.requestAnimationFrame;++i)window.requestAnimationFrame=window[t[i]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[i]+"CancelAnimationFrame"]||window[t[i]+"CancelRequestAnimationFrame"]}(),{timer:0,state:"stop",animations:[],add:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:60,n={callback:t,fps:i,n:60/i,param:arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i:0};return this.animations.push(n),this.animations.length>=1&&this.start(),this},getIndex:function(t){for(var i=0;i<this.animations.length;i++){if(this.animations[i].callback===t)return i}return-1},remove:function(t){if(!(this.getIndex(t)<0))return this.deleteMap(t),0===this.animations.length&&this.stop(),this},deleteMap:function(t){var i=this.getIndex(t),n=this.animations[i];for(var e in n)delete n[e];this.animations.splice(i,1)},start:function(){if("start"!==this.state)return this.state="start",this.tick(),this},stop:function(){if("stop"!==this.state)return this.state="stop",cancelAnimationFrame(this.timer),this},tick:function(){var t=this;this.timer=requestAnimationFrame(function(){t.tick()});for(var i=0;i<this.animations.length;i++){var n=this.animations[i],e=n.callback,a=n.param;n.i++,n.i>=n.n&&(e(a),n.i=0)}}}});
//# sourceMappingURL=RAFManager.min.js.map
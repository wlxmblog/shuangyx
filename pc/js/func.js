function myScroll(sTop, fn) {
  var body = document.querySelector("body");
  myEvent(body, "scroll", function() {
    if(body.scrollTop > sTop) {
      fn();
    }
  });
}

function myEvent(el, ev, fn) {
  if(el.attachEvent) {
    el.attachEvent("on" + ev, fn);
  } else {
    el.addEventListener(ev, fn, false);
  }
}

function myClone(el) {
  return el.cloneNode(true);
}

function myEach(list, fn) {
  var len = list.length,
  i = 0;
  for(i; i<len; i++){
    fn(list[i], i);
  }
}

function myCss(el, obj) {
  for(o in obj) {
    el.style[o] = obj[o];
  }
}

function myFade(el, show, speed, fn) {
  var i = speed, k = 0, n = 5;
  if(!show) {
    i = -speed;
    k = 100;
  }
  // if(show) {
  //   myCss(el, {
  //     top: "100px"
  //   });
  // }
  function step() {
    k += i*n/2;
    n++;
    el.style.top = (100-k) + "px";
    el.style.opacity = k/100;
    if(!show) {
      if(k > 0) {
        requestAnimationFrame(step);
      }
      else{
        el.style.display = "none";
        if(fn)
          fn();
      }
    } else {
      el.style.display = "block";
      if(k < 100)
        requestAnimationFrame(step);
      else{
        // el.style.top = 0;
        if(fn)
          fn();
      }
    }
  }
  step();
}

//删除节点

// 瀑布流
function warterfall(parent, itemNodeName) {
  var oLis = parent.querySelectorAll(itemNodeName),
      pWidth = parseInt(getStyle(parent).width),
      imgW = parseInt(getStyle(oLis[0]).width) + 10,
      colsN = Math.floor(pWidth / imgW),
      arrTop = [], arrLeft = [], minTop = 0, currIndex = 0;
  myEach(oLis, function(v, k) {
    if(k < colsN) {
      arrTop.push(v.offsetTop + parseInt(getStyle(v).height)+10);
      arrLeft.push(k * imgW);
      myCss(v, {
        left: k * imgW + "px"
      });
    } else {
      minTop = Math.min.apply(null, arrTop);
      currIndex = arrTop.indexOf(minTop);
      myCss(v, {
        left: arrLeft[currIndex] + "px",
        top: minTop + "px"
      });
      arrTop[currIndex] = minTop + parseInt(getStyle(v).height)+10;
    }
  });
}

function getStyle(obj) {
  var style = null;
  if(window.getComputedStyle) {
    return style = window.getComputedStyle(obj);
  } else {
    return style = obj.currentStyle;
  }
}

function myQuery(str) {
  var all = document.getEmlmentsByTagName("*"),
  rasult = [], tmpStr = "", tmpArr = [];
  myEach(all, function(v, k) {
    if( !/\s/.test(str) ) {
      if( /\./.test(str) && v.className == str.replace(".", "") ) {
        return v;
      } else if( /\#/.test(str) && v.id == str.replace("#", "") ) {
        return v;
      } else if( v.nodeName == str ) {
        arr.push(v);
      }
    } else {
      tmpArr = str.split(" ");
      if( /\./.test(str) ){}
    }
});
}

function myUppic(e, input) {
  input.onchange = function() {
    var url = getObjectURL(this.files[0]);
    e.style.background = "url(" + url + ") center no-repeat";
    console.log(getObjectURL(input.files[0]));
  }
}

function getObjectURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) {
    url = window.createObjectURL(file)
  } else if (window.URL != undefined) {
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL != undefined) {
    url = window.webkitURL.createObjectURL(file)
  }
  return url
};

function getNextNode( node ){  
  node=   typeof node=="string"?document.getElementById(node):node;  
  var nextnode=node.nextSibling;  
  var t;  
  if(!nextnode){  
    return null;      
  }  

  if( !document.all ){  
    while(  true){  
      if( nextnode.nodeType==1 ){  
        break;    
      }else{  
        t=nextnode.nextSibling;  
        if( t){  
          nextnode=t;   
        }else{  
          break;    
        }  
      }     
    }     
  }  
  return nextnode;  
}  

(function() {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame =
    window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }());

/*
 * Tween.js
 * t: current time（当前时间）
 * b: beginning value（初始值）
 * c: change in value（变化量）
 * d: duration（持续时间）
 */
 var Tween = {
  Linear: function(t, b, c, d) { return c*t/d + b; },
  Quad: {
    easeIn: function(t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOut: function(t, b, c, d) {
      return -c *(t /= d)*(t-2) + b;
    },
    easeInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t-2) - 1) + b;
    }
  },
  Cubic: {
    easeIn: function(t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOut: function(t, b, c, d) {
      return c * ((t = t/d - 1) * t * t + 1) + b;
    },
    easeInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
      return c / 2*((t -= 2) * t * t + 2) + b;
    }
  },
  Quart: {
    easeIn: function(t, b, c, d) {
      return c * (t /= d) * t * t*t + b;
    },
    easeOut: function(t, b, c, d) {
      return -c * ((t = t/d - 1) * t * t*t - 1) + b;
    },
    easeInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
    }
  },
  Quint: {
    easeIn: function(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOut: function(t, b, c, d) {
      return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
    },
    easeInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
      return c / 2*((t -= 2) * t * t * t * t + 2) + b;
    }
  },
  Sine: {
    easeIn: function(t, b, c, d) {
      return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOut: function(t, b, c, d) {
      return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOut: function(t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
    }
  },
  Expo: {
    easeIn: function(t, b, c, d) {
      return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOut: function(t, b, c, d) {
      return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOut: function(t, b, c, d) {
      if (t==0) return b;
      if (t==d) return b+c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  },
  Circ: {
    easeIn: function(t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOut: function(t, b, c, d) {
      return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
    },
    easeInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }
  },
  Elastic: {
    easeIn: function(t, b, c, d, a, p) {
      var s;
      if (t==0) return b;
      if ((t /= d) == 1) return b + c;
      if (typeof p == "undefined") p = d * .3;
      if (!a || a < Math.abs(c)) {
        s = p / 4;
        a = c;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOut: function(t, b, c, d, a, p) {
      var s;
      if (t==0) return b;
      if ((t /= d) == 1) return b + c;
      if (typeof p == "undefined") p = d * .3;
      if (!a || a < Math.abs(c)) {
        a = c; 
        s = p / 4;
      } else {
        s = p/(2*Math.PI) * Math.asin(c/a);
      }
      return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    },
    easeInOut: function(t, b, c, d, a, p) {
      var s;
      if (t==0) return b;
      if ((t /= d / 2) == 2) return b+c;
      if (typeof p == "undefined") p = d * (.3 * 1.5);
      if (!a || a < Math.abs(c)) {
        a = c; 
        s = p / 4;
      } else {
        s = p / (2  *Math.PI) * Math.asin(c / a);
      }
      if (t < 1) return -.5 * (a * Math.pow(2, 10* (t -=1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
    }
  },
  Back: {
    easeIn: function(t, b, c, d, s) {
      if (typeof s == "undefined") s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOut: function(t, b, c, d, s) {
      if (typeof s == "undefined") s = 1.70158;
      return c * ((t = t/d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOut: function(t, b, c, d, s) {
      if (typeof s == "undefined") s = 1.70158; 
      if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
      return c / 2*((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    }
  },
  Bounce: {
    easeIn: function(t, b, c, d) {
      return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
    },
    easeOut: function(t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
      } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
      } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
      } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
      }
    },
    easeInOut: function(t, b, c, d) {
      if (t < d / 2) {
        return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
      } else {
        return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
      }
    }
  }
}
Math.tween = Tween;

//全局对象
Tab = {
  change: function(a, b, c, fn) {
    myEach(a, function(v, k) {
      myEvent(v, "click", function() {
        for(var i=0, _len = a.length; i<_len; i++) {
          a[i].className = "";
          myFade(b[i], false, 1, function() {
            myFade(b[k], true, 1);
          });
        }
        console.log(c);
        v.className = c;
        if(fn) fn();
      });
    });
  },
  out: function(p, c) {
    myEvent(p, "mouseover", function() {
      myFade(c, true, 1)
    });
    myEvent(c, "mouseover", function() {
      myFade(c, true, 1)
    });
    myEvent(p, "mouseout", function() {
      myFade(c, false, 1)
    });
  }
};
Form = {
  invalid: function(el, reg, msg, _msg) {
    var label = el.parentNode.getElementsByTagName('label')[0];
    el.value = el.value.replace(/^ +| +$/g,'');
    !reg.test(el.value)
    ?(el.style.outline = '2px solid #F00', label.innerText = msg, 
      label.style.color ='#F00')
    :(el.style.outline = 'none', label.innerText = _msg, label.style.color = '#999')
  }
}

//canvas截图操作
function ZmCanvasCrop(opt, saveCallBack){
	this.init(opt);
	this._option.crop_box_width = opt.box_width; //剪裁容器的最大宽度
	this._option.crop_box_height = opt.box_height;  //剪裁容器的最大高度
	this._option.crop_min_width = opt.min_width;  //要剪裁图片的最小宽度
	this._option.crop_min_height = opt.min_height;  //要剪裁图片的最小高度
	this._option.crop_scale = opt.min_width / opt.min_height;  //图片会按照最小宽高的比例裁剪
}

ZmCanvasCrop.prototype = {

	_$box : '',
	_$canvasDown: '',
	_$canvasUp: '',
	_input : '',
	_ctxUp: '',//裁剪区域canvas
	_img : '',
	_img_show: {
		width: '',
		height: '',
		scale: '', //显示像素除以实际像素
		crop_width: '',//要裁剪部分显示宽
		crop_height: '',
		min_width: '',//要裁剪部分显示最小宽度
		min_height: ''
	},

	_option : {
		crop_box_width: '',			//图片操作区域宽限制
		crop_box_height: '',			//图片操作区域高限制
		crop_min_width: '',		//剪裁实际最小像素宽
		crop_min_height: '',	//剪裁实际最小像素高
		crop_scale: '' //宽高比
	},
	_save: {
		left: '',
		top: '',
		width: '',
		height: ''
	},
	_resize_point: {
		color: '#69f',
		size: 8
	},
	_resize_btn: {},

	init: function(opt){
		var self = this;
		self._input = opt.fileInput;

		self._$box = $('.canvas-box');
		self.readFile();

		opt.saveBtn.addEventListener('click', function(){
			self.save();
		});
	},

	imgTrue: function(){
		if(this._img.width < this._option.crop_min_width || this._img.height < this._option.crop_min_height){
			return false;
		}
		return true;
	},

	readFile: function(){
		var self = this;

		if(typeof FileReader==='undefined'){ 
		    alert("抱歉，你的浏览器不支持 FileReader"); 
		    input.setAttribute('disabled','disabled'); 
		}else{ 
		    this._input.addEventListener('change', readFile, false);
		} 

		function readFile(){ 
		    var file = this.files[0]; 
		    if(!/image\/\w+/.test(file.type)){ 
		        alert("文件必须为图片！"); 
		        return false; 
		    } 
		    var reader = new FileReader(); 
		    reader.readAsDataURL(file); 
		    reader.onload = function(e){ 
		        //result.innerHTML = '<img src="'+this.result+'" alt=""/>'

		        self.drawCavDown(this.result);
		   	    
		    } 
		}
	},

	drawCavDown: function(src){
		var self = this;
		//清除上一次的
		self._$box.html('');
		self._save = {};
		self._img_show = {};

		self._img = new Image();

	    self._img.onload = function(){

	    	if(!self.imgTrue()){
	    		alert('图片大小必须大于:' + self._option.crop_min_width + '*' + self._option.crop_min_height);
	    		return;
	    	} 
	    	//让宽或者高撑满
	    	self.setShowImg();
	    	self._img_show.scale = self._img_show.width / self._img.width;//缩放比例
	    	//计算裁剪高亮区域的最小宽高
	    	self._img_show.min_width = self._option.crop_min_width * self._img_show.scale;
	    	self._img_show.min_height = self._option.crop_min_height * self._img_show.scale;

	    	//初始化显示剪裁框宽高,按照宽或者高（更小）的一半显示,如果一半值小于最小可剪裁值，还是按最小剪裁值显示
			var size;
            if (self._img.width > self._img.height) {
            	size = self._img.height / 2;
            	if(size<self._option.crop_min_height){
		           self.resizeCrop({
						width: self._option.crop_min_width,
						height: self._option.crop_min_height
					});
            	}else{
            		 self.resizeCrop({
		        		height: size,
		                width: size * self._option.crop_scale 
		            });
            	}
            } else {
            	size = self._img.width / 2;
            	if(size<self._option.crop_min_width){
		           self.resizeCrop({
						width: self._option.crop_min_width,
						height: self._option.crop_min_height
					});
            	}else{
            		 self.resizeCrop({
		        		height: size / self._option.crop_scale ,
		                width: size
		            });
            	}
            }
           
	      
	      	//绘制底层剪裁区域
	      	drawDown();

	      	//载入上层canvas
	      	self.addUpCanvas();
	      	//绑定松开鼠标事件
	      	$(document).on('mouseup', function(){//在外部松开
				$(document).off('mousemove');
/*					$('.resize-point').off('mousedown');
				self._$canvasUp.off('mousedown');
				self.upCanvasEvent();
				self.resizeEvent();*/
			});
	    }

	    self._img.src = src;

	    function drawDown(){
	    	var $canvas = $('<canvas width="' + self._img_show.width  + '" height="' + self._img_show.height + '"></canvas>');
			self._$box.append($canvas);
	      	var $ctx = $canvas[0].getContext('2d');
	      	$ctx.drawImage(self._img, 0, 0, self._img_show.width, self._img_show.height);
			//裁剪区域透明
			$ctx.beginPath();
			$ctx.fillStyle="rgba(0,0,0,0.6)";
			$ctx.fillRect(0, 0, self._img_show.width, self._img_show.height);

			/*for(var i=1;i<5;i++){
				$ctx.moveTo(self._img_show.width/5*i,0);
				$ctx.lineTo(self._img_show.width/5*i, self._img_show.height);
				$ctx.moveTo(0, self._img_show.height/5*i);
				$ctx.lineTo(self._img_show.width, self._img_show.height/5*i);
				$ctx.strokeStyle="rgba(255,255,255,0.9)";
				$ctx.stroke();
			}*/
			
			self._$canvasDown = $canvas;
		}

	},
	setResizePoint: function(direction, left, top){
		return $('<div class="resize-point" style="width:' + this._resize_point.size +'px;height:' + this._resize_point.size + 'px;'+
			'background: ' + this._resize_point.color + ';cursor:'+ direction +';position:absolute;'+
			'left:'+ left +'px;top:'+ top +'px"></div>');
	},

	addUpCanvas: function(){
		
		var self = this;
		self.addResizeBtn();//添加放大缩小按钮

		self._ctxUp = self._$canvasUp[0].getContext('2d'); 
		self._ctxUp.drawImage(self._img,  0, 0, self._img_show.crop_width / self._img_show.scale, self._img_show.crop_height / self._img_show.scale,0, 0, self._img_show.crop_width, self._img_show.crop_height);
	
		//初始化实际存储
		self._save.left = 0;
		self._save.top = 0;
		self._save.width = self._img_show.crop_width / self._img_show.scale;
		self._save.height = self._img_show.crop_height / self._img_show.scale;

		self.upCanvasEvent();
	},
	//绑定鼠标按下事件
	upCanvasEvent: function(){
		var self = this;
		self._$canvasUp.on('mousedown', cavMouseDown);

		function cavMouseDown(e){
			var canv = this;

			//获取到按下时，鼠标和元素的相对位置,相对偏差
			var relativeOffset = { x: e.clientX - $(canv).offset().left, y: e.clientY - $(canv).offset().top };
			$(document).on('mousemove', function(e){
				//阻止移动出图片区域
				if(countPosition().left >= self._img_show.width - self._img_show.crop_width || countPosition().left <= 0) relativeOffset.x = e.clientX - $(canv).offset().left;

				if(countPosition().top >= self._img_show.height - self._img_show.crop_height || countPosition().top<=0) relativeOffset.y = e.clientY - $(canv).offset().top;

				$(canv).css({left: countPosition().left, top: countPosition().top });//移动上层canvas

				//实际存储
				self._save.left = countPosition().left / self._img_show.scale;
				self._save.top = countPosition().top / self._img_show.scale;
				self._save.width = self._img_show.crop_width / self._img_show.scale;
				self._save.height = self._img_show.crop_height / self._img_show.scale;

				//重绘剪裁区域
				self._ctxUp.drawImage(self._img, 
					self._save.left, self._save.top, self._save.width, self._save.height,
					0, 0, self._img_show.crop_width, self._img_show.crop_height
				);
				
				//设置缩放按钮位置
				self.resizePosition();
				function countPosition(){
					var left = (e.clientX - relativeOffset.x) - self._$canvasDown.offset().left;//还要减去父元素到左边窗口的距离
					var top = (e.clientY - relativeOffset.y) - self._$canvasDown.offset().top;//还要减去父元素到左边窗口的距离
					return {left: left, top: top}
				}
			});
		}
	},
	addResizeBtn: function(){
		var self = this;
		//载入方向按钮
		var $seResize =	self.setResizePoint('se-resize', self._img_show.crop_width - self._resize_point.size/2, self._img_show.crop_height - self._resize_point.size/2);
		var $swResize = self.setResizePoint('sw-resize', -self._resize_point.size/2, self._img_show.crop_height - self._resize_point.size/2);
		var $neResize = self.setResizePoint('ne-resize', self._img_show.crop_width - self._resize_point.size/2, -self._resize_point.size/2);
		var $nwResize = self.setResizePoint('nw-resize', -self._resize_point.size/2, -self._resize_point.size/2);

		var $canvas = $('<canvas class="overlay" width="' + self._img_show.crop_width  + '" height="' + self._img_show.crop_height + '"></canvas>');
		
		self._$box.append($canvas);
		self._$canvasUp = $canvas;

		self._$box.append($seResize);
		self._$box.append($swResize);
		self._$box.append($neResize);
		self._$box.append($nwResize);

		self._resize_btn.$se = $seResize;
		self._resize_btn.$sw = $swResize;
		self._resize_btn.$ne = $neResize;
		self._resize_btn.$nw = $nwResize;
	
		self.resizeEvent();
	},
				//绑定方向按钮事件
	resizeEvent: function(){
		var self = this;
		$('.resize-point').on('mousedown', function(){

			var pLeft = $(this).position().left + self._resize_point.size/2,
				pTop = $(this).position().top + self._resize_point.size/2;
			var upLeft = self._$canvasUp.position().left,
				upTop = self._$canvasUp.position().top;
			var noChangeX,noChangeY;
			if(upLeft >= pLeft) noChangeX = -(upLeft + self._img_show.crop_width);//为负在右
			else noChangeX = upLeft;
			if(upTop >= pTop) noChangeY = -(upTop + self._img_show.crop_height);//为负在下
			else noChangeY = upTop;

			$(document).on('mousemove', function(e){
				if(noChangeX >= 0 ){
					self._$canvasUp.css("left", noChangeX)
				}else{
					self._$canvasUp.css("left",  Math.abs(noChangeX) - self._img_show.crop_width);
				}
				if(noChangeY >= 0 ){
					self._$canvasUp.css("top", noChangeY)
				}else{
					self._$canvasUp.css("top",  Math.abs(noChangeY) - self._img_show.crop_height);
				}
				//阻止移动出图片区域
				self._img_show.crop_width = Math.abs(Math.abs(noChangeX) - countPosition().left);
				self._img_show.crop_height = self._img_show.crop_width / self._option.crop_scale;
				if(noChangeX >= 0 && noChangeX + self._img_show.crop_width > self._img_show.width){
					self._img_show.crop_width = self._img_show.width - noChangeX;
					self._img_show.crop_height = self._img_show.crop_width / self._option.crop_scale;
				}else if(noChangeX < 0 && Math.abs(noChangeX) - self._img_show.crop_width < 0 ){
					self._img_show.crop_width = Math.abs(noChangeX);
					self._img_show.crop_height = self._img_show.crop_width / self._option.crop_scale;
				}
				if(noChangeY >= 0 && noChangeY + self._img_show.crop_height > self._img_show.height) {
					self._img_show.crop_height = self._img_show.height - noChangeY;
					self._img_show.crop_width = self._img_show.crop_height * self._option.crop_scale;
				}else if(noChangeY < 0 && Math.abs(noChangeY) - self._img_show.crop_height < 0){
					self._img_show.crop_height = Math.abs(noChangeY);
					self._img_show.crop_width = self._img_show.crop_height * self._option.crop_scale;
				}
				//如果宽高小于限制
				if(self._img_show.crop_width < self._img_show.min_width){
					self._img_show.crop_width = self._img_show.min_width;
					self._img_show.crop_height = self._img_show.crop_width / self._option.crop_scale;
				}
				if(self._img_show.crop_height < self._img_show.min_height){
					self._img_show.crop_height = self._img_show.min_height;
					self._img_show.crop_width = self._img_show.crop_height / self._option.crop_scale;
				}

				//实际存储
				if(noChangeX>=0){
					self._save.left = noChangeX / self._img_show.scale;
				}else{
					self._save.left = (Math.abs(noChangeX) - self._img_show.crop_width) / self._img_show.scale;
				}
				if(noChangeY>=0){
					self._save.top = noChangeY / self._img_show.scale;
				}else{
					self._save.top = (Math.abs(noChangeY) - self._img_show.crop_height) / self._img_show.scale;
				}
				self._save.width = self._img_show.crop_width / self._img_show.scale;
				self._save.height = self._img_show.crop_height / self._img_show.scale;

				//重绘剪裁区域,修改属性宽高，否则无效
				self._$canvasUp.attr("width", self._img_show.crop_width);
				self._$canvasUp.attr("height", self._img_show.crop_height);
				self._ctxUp.drawImage(self._img, 
					self._save.left, self._save.top, self._save.width, self._save.height,
					0, 0, self._img_show.crop_width, self._img_show.crop_height
				);
				self.resizePosition();
	
				function countPosition(){//鼠标在底层canvas的相对位置
					var left = e.clientX - self._$canvasDown.offset().left ;
					var top = e.clientY - self._$canvasDown.offset().top ;
					return {left: left, top: top}
				}

			});

		});
		
	},
	resizePosition: function(){
		var self = this;
		self._resize_btn.$se.css({left: self._$canvasUp.position().left + self._img_show.crop_width- self._resize_point.size/2, top: self._$canvasUp.position().top + self._img_show.crop_height - self._resize_point.size/2});//加上宽高,减去本身大小
		self._resize_btn.$sw.css({left: self._$canvasUp.position().left - self._resize_point.size/2, top: self._$canvasUp.position().top + self._img_show.crop_height - self._resize_point.size/2});//加上宽高,减去本身大小
		self._resize_btn.$ne.css({left: self._$canvasUp.position().left + self._img_show.crop_width - self._resize_point.size/2, top: self._$canvasUp.position().top - self._resize_point.size/2});//加上宽高,减去本身大小
		self._resize_btn.$nw.css({left: self._$canvasUp.position().left - self._resize_point.size/2, top: self._$canvasUp.position().top - self._resize_point.size/2});//加上宽高,减去本身大小
	},
	parseInt: function(){
		this._save.width = parseInt(this._save.width);
		this._save.height = parseInt(this._save.height);
		this._save.top = parseInt(this._save.top);
		this._save.left = parseInt(this._save.left);
	},
	//保存
	save: function(){
		this.parseInt();//取整，避免出现杂边线条
		var self = this;
		var $result = $("<canvas width='"+ self._save.width +"' height='"+ self._save.height +"'></canvas>");
		// $('body').append($result);
		$result[0].getContext('2d').drawImage(self._img, 
			self._save.left, self._save.top, self._save.width, self._save.height,
			0, 0, self._save.width, self._save.height
		);

		var base64Url = $result[0].toDataURL('image/jpeg');

		saveCallBack && saveCallBack(base64Url);

		return base64Url;
	},
	
	
	//显示的图片大小,三种结果，撑满宽或者高，或者原图大小
	setShowImg: function(){
		if( this._img.width <= this._option.crop_box_width && this._img.height <= this._option.crop_box_height ) {
			this._img_show.width = this._img.width;
			this._img_show.height = this._img.height;
			return;
		}

		var weight = 0;//设置权重
		if( this._img.width > this._option.crop_box_width ) weight+=10;
		if( this._img.height > this._option.crop_box_height ) weight-=10;
		if( this._img.width / this._img.height > this._option.crop_box_width / this._option.crop_box_height) weight+=5;
		else weight-=5;
		if( this._img.width >= this._img.height ) weight++;
		else weight--;

		if(weight > 0){//撑满宽度
			this._img_show.width = this._option.crop_box_width;
			this._img_show.height =  this._option.crop_box_width / ( this._img.width / this._img.height );
		}else{//撑满高度
			this._img_show.height = this._option.crop_box_height;
			this._img_show.width =  this._option.crop_box_height / ( this._img.height / this._img.width );
		}
	},

	resizeCrop: function(real){//剪裁框大小
		this._img_show.crop_width = real.width * this._img_show.scale;
		this._img_show.crop_height = real.height * this._img_show.scale;
	}


}



// 公告信息
var M_msg = function(m) {
  var oLis = m.querySelectorAll("li"),
      oLas = oLis[0].querySelectorAll("a"),
      oRas = oLis[1].querySelectorAll("a"),
      play, time;
  play = function(els) {
    var i = 0;
    els[0].style.display = "inline";
    time = setInterval(function() {
      myEach(els, function(v, k) {
        v.style.display = "none";
      });
      els[i].style.display = "inline";
      i++;
      i = i == els.length? 0: i;
    }, 2000);
  };
  play(oLas);
  play(oRas);
}
var m_msg = document.querySelector(".m-msg");
M_msg(m_msg);
// 项目服务推荐模块
var M_service = function(m, n) {
  var uPre = m.querySelector(".u-pre"),
      uNext = m.querySelector(".u-next"),
      oDiv = m.querySelector(".outer"),
      oUl = m.querySelector("ul"),
      oLis = oUl.querySelectorAll("li"),
      len = oLis.length,
      w = oLis[0].clientWidth + 20,
      Play, time;
  for(var i=0; i<n; i++) {
    oUl.appendChild(myClone(oLis[i]));
  }
  oLis = oUl.querySelectorAll("li");
  len = oLis.length;
  myCss(oDiv, {
    width: w * n - 20 + "px",
    marginLeft: -(w * n - 20)/2 + "px"
  });
  myCss(oUl, {
    width: w * len + "px",
    transition: "all .5s",
    "-o-transition": "all .5s",
    "-webkit-transition": "all .5s"
  });
  myEach(oLis, function(v, k) {
    v.style.left = w * k + "px";
  });
  Play = {
    id: 0,
    play: function(_n) {
       myCss(oUl, {
        transition: "all .5s",
        left: w * _n + "px"
      });
    },
    auto: function() {
      var i = Play.id;
      time = setInterval(function() {
        Play.play(-i);
        i++;
        if(i == len-n+2) {
          myCss(oUl, {
            transition: "all 0s",
            left: 0
          });
          i = 1;
        }
        Play.id = i;
      }, 2000);
    },
    pre: function() {
      Play.contr(uPre);
    },
    next: function() {
      Play.contr(uNext);
    },
    contr: function(el) {
      var id = Play.id;
      Play.stop(el);
      myEvent(el, "click", function() {
        Play.play(-id);
        Play.id = id;
        if(el == uPre) {
          id--;
          id = id < 0? len-n-1: id;
          console.log(id);
        } else {
          id++;
          if(id > len-n+1) {
            myCss(oUl, {
              transition: "all 0s",
              left: 0
            });
            id = 0;
          }
        }
      });
    },
    stop: function(el) {
      myEvent(el, "mouseover", function() {
        clearInterval(time);
      });
      myEvent(el, "mouseout", function() {
        Play.auto();
      });
    }
  };
  Play.auto();
  Play.pre();
  Play.next();
}

var m_service = document.querySelector(".m-service");
M_service(m_service, 4);

// 技师直约推荐
var M_order = function(m) {
  var oTab = m.querySelector(".m-tab"),
      oTlis = oTab.querySelectorAll("li"),
      oUl = m.querySelector(".list"),
      oLis = oUl.querySelectorAll("li"),
      len = oLis.length,
      Play, time;
  Play = {
    init: function() {
      myEach(oLis, function(v, k) {
        Play.start(k);
        v.className = "show"
      });
    },
    start: function(i) {
      var setCss = function(n) {
        for(var _i=n;_i>0;_i--) {
          n = n - Math.random();
          myCss(oLis[i], {
            transitionDelay: i/_i/10 + "s",
          });
        }
      };
      if(i % 2 !== 0) {
        setCss(5)
      } else {
        setCss(4)
      }
    }
  };
  // Play.init();
  myEach(oTlis, function(v, k) {
    myEvent(v, "click", function() {
      myEach(oTlis, function(v, k) {
        v.className = "";
        myEach(oLis, function(_v, _k) {
          _v.className = "";
          console.log(_v);
        })
      });
      this.className = "z-crt";
      setTimeout(Play.init, 1200);
    });
  });
  return Play;
};
var m_order = document.querySelector(".m-order");
var o_order = M_order(m_order);

// 项目流程
var M_objflow = function (m) {
  var pic1 = m.querySelector(".pic1"),
      pic2 = m.querySelector(".pic2"),
      pic3 = m.querySelector(".pic3"),
      p = m.querySelectorAll("p"),
      h5 = m.querySelectorAll("h5"),
      pic1s = pic1.querySelector("img"),
      pic2s = pic2.querySelectorAll("img"),
      pic3s = pic3.querySelector("img"),
      w = pic2s[0].clientWidth + 12,
      len = pic2s.length,
      sTop = m.offsetTop-350;
  myEvent(window, "scroll", function() {
    var orderTop = m_order.offsetTop-350,
        scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    if(scrollTop > sTop) {
      pic1s.className = "a-to-tp";
      myEach(pic2s, function(v, k) {
        if(k % 2 == 0)
          v.className = "a-to-tp";
        else
          v.className = "a-to-bt";
        pic2s[len-1].className = "a-to-rt";
        pic3s.className = "a-to-tp"
      });
      myEach(p, function(v, k) {
        v.className = "a-to-tp";
        h5[k].className = "a-to-tp";
      });
    } else if(scrollTop > orderTop) {
      o_order.init();
    }
  });
};
var m_objflow = document.querySelector(".m-objflow");
M_objflow(m_objflow);
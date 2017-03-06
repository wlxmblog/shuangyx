var M_ucenter = function(m) {
  var incards = m.querySelectorAll(".incard"),
      oTab = document.querySelector(".g-sd>ul"),
      oLis = oTab.querySelectorAll("li");
  Tab.change(oLis, incards, "z-crt");
}
var m_ucenter = document.querySelector(".g-mn.m-ucenter");
M_ucenter(m_ucenter);
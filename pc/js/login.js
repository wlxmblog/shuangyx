var M_login = function(m) {
  var oTab = m.querySelectorAll(".m-tab"),
      oLis = oTab[0].querySelectorAll("li"),
      _olis = oTab[1].querySelectorAll("li"),
      oDiv = m.querySelectorAll(".card"),
      _oDiv = m.querySelectorAll(".incard"),
      upfile = m.querySelector("input[type=file]"),
      len = oLis.length,
      _len = _olis.length;
  Tab.change(oLis, oDiv, "z-crt");
  Tab.change(_olis, _oDiv, "z-crt");
  myUppic(upfile.parentNode, upfile);
};
var m_login = document.querySelector(".g-mn.m-login");
M_login(m_login);
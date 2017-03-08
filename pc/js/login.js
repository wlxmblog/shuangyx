var M_login = function(m) {
  var oTab = m.querySelectorAll(".m-tab"),
      // oLis = oTab[0].querySelectorAll("li"),
      // _olis = oTab[1].querySelectorAll("li"),
      // oDiv = m.querySelectorAll(".card"),
      // _oDiv = m.querySelectorAll(".incard"),
      upfile = m.querySelector("input[type=file]");
      // len = oLis.length,
      // _len = _olis.length;
  // Tab.change(oLis, oDiv, "z-crt");
  // Tab.change(_olis, _oDiv, "z-crt");
  myUppic(upfile.parentNode, upfile);
};
var m_login = document.querySelector(".g-mn.m-login");
M_login(m_login);

var selectVal = new CitySelect({
    data   : data,
    provId : "#prov4",
    cityId : '#city4',
    areaId : '#area4'
  });
      
var selectVa2 = new CitySelect({
    data   : data,
    provId : "#prov5",
    cityId : '#city5',
    areaId : '#area5',
    isSelect: false
  });
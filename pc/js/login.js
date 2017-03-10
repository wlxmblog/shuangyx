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
  // myUppic(upfile.parentNode, upfile);
  $(".m-clipPop").hide();
  upfile.onchange = function() {
    $(".m-clipPop").show();
  }
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

function saveCallBack(base64) {
  $(".m-hdpic").css({
    background: 'url('+ base64 +') center no-repeat',
    backgroundSize: '100%'
  });
  $(".m-clipPop").hide();
  //最终把此base64传给后端
  /**
  $.ajax({
    data: {
      base64: base64
    } 
  })
  **/
}

var c = new ZmCanvasCrop({
    fileInput: $('#hd')[0],
    saveBtn: $('#save')[0],
    box_width: 400,  //剪裁容器的最大宽度
    box_height: 300, //剪裁容器的最大高度
    min_width: 110,  //要剪裁图片的最小宽度
    min_height: 110  //要剪裁图片的最小高度
  }, saveCallBack);
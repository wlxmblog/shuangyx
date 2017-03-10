var M_ucenter = function(m) {
  var incards = m.querySelectorAll(".incard"),
      oTab = document.querySelector(".g-sd>ul"),
      oLis = oTab.querySelectorAll("li"),
      oServ = m.querySelector('.m-serv'),
      oServIps = oServ.querySelectorAll('input[type=checkbox]'),
      oServ = m.querySelector('.m-apply'),
      oAppIps = oServ.querySelectorAll('input[type=checkbox]'),
      oPhoto = m.querySelector('.m-photos'),
      oEdit = oPhoto.parentNode.querySelector("button"),
      oDel = oPhoto.querySelectorAll("span");
      upfile = m.querySelector("input[type=file]");
  Tab.change(oLis, incards, "z-crt");
  myEach(oServIps, function(v, k) {
    v.onchange = function() {
      v.parentNode.className = v.checked? 'z-crt': '';
    }
  });
  myEach(oAppIps, function(v, k) {
    v.onchange = function() {
      v.parentNode.className = v.checked? 'z-crt': '';
    }
  });
  oTab.onclick = function() {
    setTimeout(function() {
      if(oPhoto.clientWidth)
        warterfall(oPhoto, 'li');
    }, 1000);
  };
  oPhoto.querySelector('input[type=file]').onchange = function() {
    var newLi = oPhoto.querySelectorAll("li")[1].cloneNode(true);
    var url = getObjectURL(this.files[0]);
    newLi.querySelector('img').src = url;
    oPhoto.insertBefore(newLi, oPhoto.querySelectorAll('li')[1]);
    warterfall(oPhoto, 'li');
    setTimeout(function() {
      warterfall(oPhoto, 'li');
    }, 200);
  };
  var isEdit = false;
  oEdit.onclick = function() {
    if(!isEdit) {
      oPhoto.parentNode.className = oPhoto.parentNode.className.replace('noedit', 'edit');
      oEdit.innerText = '退出编辑';
    } else {
      oPhoto.parentNode.className = oPhoto.parentNode.className.replace('edit', 'noedit');
      oEdit.innerText = '编辑';
    }
    isEdit = !isEdit;
  }
  //删除照片
  myEach(oDel, function(v, k) {
    v.onclick = function() {
      if(confirm('是否要删除？')) {
        oPhoto.removeChild(oPhoto.querySelectorAll('li')[k+1]);
        warterfall(oPhoto, 'li');
      }
    }
  });
  $(".m-clipPop").hide();
  upfile.onchange = function() {
    $(".m-clipPop").show();
  }
};
var m_ucenter = document.querySelector(".g-mn.m-ucenter");
M_ucenter(m_ucenter);

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
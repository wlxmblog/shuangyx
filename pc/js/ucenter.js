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
}
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
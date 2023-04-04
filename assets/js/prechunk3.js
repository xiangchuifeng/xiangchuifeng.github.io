//获取code参数
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = decodeURIComponent(window.location.search).substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  } else {
    return null;
  }
}

function showMyToast(msg) {
  var myToast = document.getElementsByClassName('my_toast')[0];
  myToast.innerText = msg;
  myToast.style.display = 'block';
}

let loginFlag = getQueryString('loginFlag');
let t = getQueryString('token');
if (loginFlag && t) {
  let companyId = getQueryString('companyId');
  let companyName = getQueryString('companyName');
  let userId = getQueryString('userId');
  let userName = companyName;
  let obj = {
    companyId,
    companyName,
    userId,
    userName,
  };

  localStorage.setItem('userInfo', JSON.stringify(obj));
  localStorage.setItem('userName', userName);
  localStorage.setItem('login_flag', 1);
  localStorage.setItem('LD-ENT-TOKEN', t);
  window.location.href = location.href.replace(location.search, '');
  // showMyToast(res.data.ErrMsg);
}

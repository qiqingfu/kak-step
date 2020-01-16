function _homeajax(options) {

  let url = options.url,
    asy = options.async !== false,
    type = (options.type || 'GET').toUpperCase(),
    data = options.data || null;
    suc = options.success || null,
    err = options.error || null;

  xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  //new XMLHttpRequest()  IE7+, Firefox, Chrome, Opera, Safari
  //new ActiveXObject('Microsoft.XMLHTTP')  ie5、6

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      xhr.status == 200 ? suc && suc(xhr.responseText) : err && err();
    }
  }

  data = (function (data) {
    if (data) {
      let arr = [];
      for (let i in data) {
        arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        //encodeURIComponent处理中文等特殊字符编码成%E5%93%88%E5%93%88形式
      }
      return arr.join('&');    //将数组变成字符串：username=name%E5%93%88%E5%93%88&password=123
    } else {
      return data;
    }
  })(data);

  if (type == 'GET' && data) {
    url += url.indexOf('?') != -1 ? '&' : '?';
    url += data + '&t=' + Math.random();
  }
  //用一个永远在变的数值Math.random()处理get方式留下的缓存，还可以用时间戳，new Date().getTime()
  //让url成: a.php?username=name%E5%93%88%E5%93%88&password=123&t=0.06531456997618079

  xhr.open(type, url, asy);

  switch (type) {
    case 'POST':
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      data ? xhr.send(data) : xhr.send();
      break;
    default:
      xhr.send();
  }
}
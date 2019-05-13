//base64解码
function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

export { b64DecodeUnicode }

//正则匹配html中的img，把img中alt换成style样式 //alt
function changeImgStyle(html) {
  var newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
    var match = match.replace(/title=\"(.*)\"/gi, 'style="width: 100%;height:auto"');
    return match;
  });
  return newContent;
}


function format(startTime) {
  var time = new Date(startTime);
  var mouth = time.getMonth() + 1;
  var day = time.getDate();
  var hour = time.getHours();
  var minute = time.getMinutes();
  mouth = mouth < 10 ? 0 + mouth : mouth
  day = day < 10 ? 0 + day : day
  hour = hour < 10 ? 0 + hour : hour
  minute = minute < 10 ? 0 + minute : minute
  return mouth + '月' + day + '日' + hour + ':' + minute
}

export {format}
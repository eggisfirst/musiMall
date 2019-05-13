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
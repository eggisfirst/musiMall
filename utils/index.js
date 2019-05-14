//base64解码
function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

export { b64DecodeUnicode }

function base64_decode(input) { // 解码，配合decodeURIComponent使用
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  while (i < input.length) {
    enc1 = base64EncodeChars.indexOf(input.charAt(i++));
    enc2 = base64EncodeChars.indexOf(input.charAt(i++));
    enc3 = base64EncodeChars.indexOf(input.charAt(i++));
    enc4 = base64EncodeChars.indexOf(input.charAt(i++));
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output = output + String.fromCharCode(chr1);
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }
  }
  return utf8_decode(output);
}
export { base64_decode }

function utf8_decode(utftext) { // utf-8解码
  var string = '';
  let i = 0;
  let c = 0;
  let c1 = 0;
  let c2 = 0;
  while (i < utftext.length) {
    c = utftext.charCodeAt(i);
    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if ((c > 191) && (c < 224)) {
      c1 = utftext.charCodeAt(i + 1);
      string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
      i += 2;
    } else {
      c1 = utftext.charCodeAt(i + 1);
      c2 = utftext.charCodeAt(i + 2);
      string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
      i += 3;
    }
  }
  return string;
}



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
  mouth = mouth < 10 ? '0' + mouth : mouth
  day = day < 10 ? '0' + day : day
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  return mouth + '月' + day + '日' + hour + ':' + minute
}

export {format}

function getTime(time) {
  let tempDay = time.split(" ")[0]
  let tempSec = time.split(" ")[1]
  let temp1 = tempDay.split("/")
  let y = temp1[0]
  let m = temp1[1]
  let d = temp1 [2]
  let temp2 = tempSec.split(":")
  let h = temp2[0]
  let mm = temp2[1]
  let sec = temp2[2]
  return [y,m,d,h,mm,sec]
}

function getSec(endTime, startTime) {
  let end = getTime(endTime)
  let start = getTime(startTime)
  let d = (end[0] - start[0]) * 365 + (end[1] - start[1])*30 + end[2] - start[2]
  let sec = (end[3] - start[3]) * 60*60 + (end[4] - start[4]) * 60 + end[5] - start[5]
  console.log(end[3],start[3])
  let sec1 = d*24*60*60 + sec
  // return sec
}
export {getSec}
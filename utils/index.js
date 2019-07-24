

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


function format(time) {
  var timeArr = time.split(" ")
  var dayArr = timeArr[0].split("-")
  return dayArr[0] + '年' + dayArr[1] + '月' + dayArr[2] + '日' + timeArr[1]
   // var time = new Date(startTime*1000);
  // var mouth = time.getMonth() + 1;
  // var day = time.getDate();
  // var hour = time.getHours();
  // var minute = time.getMinutes();
  // var second = time.getSeconds()
  // mouth = mouth < 10 ? '0' + mouth : mouth
  // day = day < 10 ? '0' + day : day
  // hour = hour < 10 ? '0' + hour : hour
  // minute = minute < 10 ? '0' + minute : minute
  // second = second < 10 ? '0' + second : second

  // return mouth + '月' + day + '日' + hour + ':' + minute + ":" + second
}

export {format}

//sha1
function encodeUTF8(s) {
  var i, r = [], c, x;
  for (i = 0; i < s.length; i++)
    if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
    else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
    else {
      if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
        c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
          r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
      else r.push(0xE0 + (c >> 12 & 0xF));
      r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
    };
  return r;
};

function sha1(s) {
  console.log(123,s)
  // var data = new Uint8Array(encodeUTF8(s))
  // var i, j, t;
  // var l = ((data.length + 8) >>> 6 << 4) + 16, s = new Uint8Array(l << 2);
  // s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
  // for (t = new DataView(s.buffer), i = 0; i < l; i++)s[i] = t.getUint32(i << 2);
  // s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
  // s[l - 1] = data.length << 3;
  // var w = [], f = [
  //   function () { return m[1] & m[2] | ~m[1] & m[3]; },
  //   function () { return m[1] ^ m[2] ^ m[3]; },
  //   function () { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
  //   function () { return m[1] ^ m[2] ^ m[3]; }
  // ], rol = function (n, c) { return n << c | n >>> (32 - c); },
  //   k = [1518500249, 1859775393, -1894007588, -899497514],
  //   m = [1732584193, -271733879, null, null, -1009589776];
  // m[2] = ~m[0], m[3] = ~m[1];
  // for (i = 0; i < s.length; i += 16) {
  //   var o = m.slice(0);
  //   for (j = 0; j < 80; j++)
  //     w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
  //       t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
  //       m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
  //   for (j = 0; j < 5; j++)m[j] = m[j] + o[j] | 0;
  // };
  // t = new DataView(new Uint32Array(m).buffer);
  // for (var i = 0; i < 5; i++)m[i] = t.getUint32(i << 2);

  // var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
  //   return (e < 16 ? "0" : "") + e.toString(16);
  // }).join("");

  // return hex;
};

export {sha1}
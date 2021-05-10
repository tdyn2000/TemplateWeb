export function parseNumber(value, locales = navigator.languages) {
  if (value === undefined || value == null) {
    return "";
  }
  const example = Intl.NumberFormat(locales).format("1.1");
  const cleanPattern = new RegExp(`[^-+0-9${example.charAt(1)}]`, "g");
  const cleaned = value.toString().replace(cleanPattern, "");
  const normalized = cleaned.replace(example.charAt(1), ".");

  var result = parseFloat(normalized);
  return isNaN(result) ? 0 : result;
}

export const loaiCKs = [
  { id: 0, tenCK: "không chiết khấu" },
  { id: 1, tenCK: "chiết khấu theo phần trăm" },
  { id: 2, tenCK: "chiết khấu trừ tiền" },
];

export const formatTimeStamp = (timestamp) => {
  var a = new Date(timestamp * 1000);
  // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = a.getMonth()+1;//months[a.getMonth()];
  month = month < 10 ? '0' + month : month;
  var day = a.getDate();
  day = day < 10 ? '0' + day : day;
  var hour = a.getHours();
  hour = hour < 10 ? '0' + hour : hour;
  var min = a.getMinutes();
  min = min < 10 ? '0' + min : min;
  var sec = a.getSeconds();
  sec = sec < 10 ? '0' + sec : sec;
  var time = day + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}


export const itemsPerPage = 3000;
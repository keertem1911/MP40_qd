/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
};
/* js小数乘法
*@parameter arg1：被乘数（接受小数和整数）
*@parameter arg2：乘数（接受小数和整数）
*@parameter fix: 乘积保留几位（接受正负整数以及0）
*/
export function accMul(arg1,arg2,fix) {
  if(!parseInt(fix)==fix)
  {
    return;
  }
  var m=0,s1=arg1.toString(),s2=arg2.toString();
  try{m+=s1.split(".")[1].length}catch(e){}
  try{m+=s2.split(".")[1].length}catch(e){}
  if(m>fix){
    return (Math.round(Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m-fix))/Math.pow(10,fix));
  }else if(m<=fix){
    return (Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)).toFixed(fix);
  }else{
    return (arg1*arg2).toFixed(fix);
  }
}

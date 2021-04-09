/* let data = {"username": "admin", "pwd": "passwd", "bas": "1", "acd": "2"};
let s_data = sortByascii(data);
console.log(s_data); */

/**按ascii码从小到大排序
 *
 * @param obj
 * @returns {string}
 */
function sortByascii(obj) {
	let arr = new Array();
	let num = 0;
	for (let i in obj) {
		arr[num] = i;
		num++;
	}
	let sortArr = arr.sort();
	//let sortObj = {};    //完成排序值
	let str = '';             //自定义排序字符串
	for (let i in sortArr) {
		str += sortArr[i] + '=' + obj[sortArr[i]] + '&';
		//sortObj[sortArr[i]] = obj[sortArr[i]];
	}
	//去除两侧字符串
	let char = '&'
	str = str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
	return str;
}

/**
 * 
 * @param {*} obj {"username": "admin", "pwd": "passwd", "bas": "1", "acd": "2"}
 * 返回 acd=2&bas=1&pwd=passwd&username=admin
 */
function md5Sign(obj){
	var data = sortByascii(obj);
	// console.log("MD5签名前的源数据: ", data);
	data = encodeURIComponent(data + "Potato");
	var sData = md5(data);
	// console.log("MD5签名后的hash: ", sData);
	return sData;
}

function isUndefiend(obj) {
	if (typeof obj == "undefined" || obj == null) {
		return true;
	} else {
		return false;
	}
}

/**
 * 封装参数，不为Null和undefiend的参数放入obj中，经过MD5加密后，再放入obj中，返回obj(obj是接口需要的参数对象)
 * @param {*} map 
 */
function dealParams(map){
	let obj = {};
	map.forEach(function(value, key){
		if (!isUndefiend(value)){
			obj[key] = value;
		}
　　});
	let signData = md5Sign(obj);
	obj["sign"] = signData;
	return obj;
}

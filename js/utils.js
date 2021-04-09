function isNull(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return true;
    } else {
        return false;
    }
}

function usdtConvert(value) {
    return value * 1000000;
}

function sum(arr) {
    var len = arr.length;
    if (len == 0) {
        return 0;
    } else if (len == 1) {
        return arr[0];
    } else {
        return arr[0] + sum(arr.slice(1));
    }
}

var regNumber = /^[0-9]{1,10}\.{0,1}\d{0,5}$/;

function validNum(value) {
    if (!regNumber.test(value)) {
        return false;
    } else {
        return true;
    }
}
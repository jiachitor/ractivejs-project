import localStorage from 'store2'
import _ from 'lodash'
import {
    Promise
}
from 'es6-promise'

// 错误提示
function errorShow(type, title) {
    switch (type) {
        case 1:
            alert(title);
            break;
        case 2:
            alert(title);
            break;
        default:
            alert(title);
    }
    return false;
}

// validate.extend(o1, o2) === o1;
// validate.extend({}, o1);
function extend(obj) {
    [].slice.call(arguments, 1).forEach(function(source) {
        for (var attr in source) {
            obj[attr] = source[attr];
        }
    });
    return obj;
}

var validate = {
    // If the given argument is a call: function the and: function return the value
    // otherwise just return the value. Additional arguments will be passed as
    // arguments to the function.
    // Example:
    // ```
    // result('foo') // 'foo'
    // result(Math.max, 1, 2) // 2
    // ```
    result: function(value) {
        var args = [].slice.call(arguments, 1);
        if (typeof value === 'function') {
            value = value.apply(null, args);
        }
        return value;
    },
    // Checks if the value is a number. This function does not consider NaN a
    // number like many other `isNumber` functions do.
    isNumber: function(value) {
        return typeof value === 'number' && !isNaN(value);
    },

    // Returns false if the object is not a function
    isFunction: function(value) {
        return typeof value === 'function';
    },

    isString: function(value) {
        return typeof value === 'string';
    },

    isArray: function(value) {
        return {}.toString.call(value) === '[object Array]';
    },

    // A simple check to verify that the value is an integer. Uses `isNumber`
    // and a simple modulo check.
    isInteger: function(value) {
        return v.isNumber(value) && value % 1 === 0;
    },

    // Uses the `Object` function to check if the given argument is an object.
    isObject: function(obj) {
        return obj === Object(obj);
    },

    // Simply checks if the object is an instance of a date
    isDate: function(obj) {
        return obj instanceof Date;
    },

    // Returns false if the object is `null` of `undefined`
    isDefined: function(obj) {
        return obj !== null && obj !== undefined;
    },

    // Checks if the given argument is a promise. Anything with a `then`
    // function is considered a promise.
    isPromise: function(p) {
        return !!p && v.isFunction(p.then);
    },

    isJqueryElement: function(o) {
        return o && v.isString(o.jquery);
    },

    isDomElement: function(o) {
        if (!o) {
            return false;
        }

        if (!v.isFunction(o.querySelectorAll) || !v.isFunction(o.querySelector)) {
            return false;
        }

        if (v.isObject(document) && o === document) {
            return true;
        }

        // http://stackoverflow.com/a/384380/699304
        /* istanbul ignore else */
        if (typeof HTMLElement === "object") {
            return o instanceof HTMLElement;
        } else {
            return o &&
                typeof o === "object" &&
                o !== null &&
                o.nodeType === 1 &&
                typeof o.nodeName === "string";
        }
    },

    isEmpty: function(value) {
        var v = this;
        var attr;

        // Null and undefined are empty
        if (!v.isDefined(value)) {
            return true;
        }

        // functions are non empty
        if (v.isFunction(value)) {
            return false;
        }

        // Whitespace only strings are empty
        if (v.isString(value)) {
            return /^\s*$/.test(value);
        }

        // For arrays we use the length property
        if (v.isArray(value)) {
            return value.length === 0;
        }

        // Dates have no attributes but aren't empty
        if (v.isDate(value)) {
            return false;
        }

        // If we find at least one property we consider it non empty
        if (v.isObject(value)) {
            for (attr in value) {
                return false;
            }
            return true;
        }

        return false;
    },
    contains: function(obj, value) {
        if (!v.isDefined(obj)) {
            return false;
        }
        if (v.isArray(obj)) {
            return obj.indexOf(value) !== -1;
        }
        return value in obj;
    },
    forEachKeyInKeypath: function(object, keypath, callback) {
        if (!v.isString(keypath)) {
            return undefined;
        }

        var key = "",
            i, escape = false;

        for (i = 0; i < keypath.length; ++i) {
            switch (keypath[i]) {
                case '.':
                    if (escape) {
                        escape = false;
                        key += '.';
                    } else {
                        object = callback(object, key, false);
                        key = "";
                    }
                    break;

                case '\\':
                    if (escape) {
                        escape = false;
                        key += '\\';
                    } else {
                        escape = true;
                    }
                    break;

                default:
                    escape = false;
                    key += keypath[i];
                    break;
            }
        }

        return callback(object, key, true);
    },

    getDeepObjectValue: function(obj, keypath) {
        if (!v.isObject(obj)) {
            return undefined;
        }

        return v.forEachKeyInKeypath(obj, keypath, function(obj, key) {
            if (v.isObject(obj)) {
                return obj[key];
            }
        });
    },
    // 判断一个数组里是否存在空值
    isAnyOneEmpty: function(arr){
        var _emptyVal = false,
            _emptyMsg = [],
            self = this;
        arr.forEach(function(item, i) {
            if(self.isEmpty(item.data)){
                _emptyVal = true;
                _emptyMsg.push(item.msg);
            }
        });
        return {
            val: _emptyVal, 
            msg: _emptyMsg[0]
        };
    },
    // 获取图片信息
    getImageInfo:function(_src){
        return new Promise(function (resolve, reject) {
            $("<img/>").attr("id","checkImg").attr("src", _src).load(function() {
                if(this){
                    resolve({
                        width:this.naturalWidth,
                        height:this.naturalHeight,
                        size:this.fileSize
                    });
                }else{
                    reject({
                        xhr: xhr
                    });
                }
            });
        })
    }
}


function promiseDATA(data){
    var promise = new Promise(function (resolve, reject) {
            if(data){
                resolve(data);
            }else{
                reject({
                    error: "errer"
                });
            }
        });
    return promise;
}


export {
    Promise,
    extend,
    validate,
    errorShow,
    promiseDATA
}

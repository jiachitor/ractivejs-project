// http://www.w3ctech.com/topic/854?from=groupmessage&isappinstalled=1

import $http from '_common/ajax.js'

import localStorage from 'store2'
import 'whatwg-fetch'

function getToken() {
    if (localStorage.has("config_react")) {
        return localStorage.get("config_react").token;
    } else {
        if (localStorage.has("config")) {
            return localStorage.get("config").token;
        } else {
            return '';
        }
    }
}

function get(api, params) {
    var self = this,
        extensionArr = new Array();
    if(typeof(params) != 'undefined'){
        for (var key in params) {
            var item = key + '=' + params[key];
            extensionArr.push(item);
        }
        api += '?' +  extensionArr.join('&');
    }
    return fetch(api, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Session-Token': self.getToken() || params.token
            }
        })
        .then(function(response) {
            return response.json()
        }).then(function(data) {
            return data;
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })
}

function post(api, params) {
    var self = this,
        _headers;
    return fetch(api, {
            method: 'post',
            data: params,
            headers: (api === '/admin/api/signin') ? {
                'SESSION-TOKEN': 'sign-in',
                'accepts': 'text/html'
            } : {
                'Session-Token': self.getToken() || params.token
            }
        })
        .then(function(response) {
            return response.json()
        }).then(function(data) {
            return data;
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })
}

export {
    getToken,
    get,
    post
};

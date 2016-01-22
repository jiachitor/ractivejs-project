'use strict';

import Ractive from 'ractive'  
import 'ractive-touch'

import appTemplate from '_templates/app.html'
import loginComponent from '_components/login.js'
import homeComponent from '_components/home.js'

import '_sass/app.scss'

import Store from "_stores/_app.store.js"
window.Store = Store;

function extend(obj) {
    [].slice.call(arguments, 1).forEach(function(source) {
        for (var attr in source) {
            obj[attr] = source[attr];
        }
    });
    return obj;  
}

var _signedIn = Store.actions.home.isLogin();

if (!_signedIn) {
    window.location.replace(location.href.replace(/\/upload.*$/i, '/news_i18n/?origin=upload/'));
} else {
    Store.actions.home.setLocalConfig();

    var _countries = Store.states.home.get('appConfig').locales;

    if (typeof(_countries) === 'undefined') {
        Store.event.on('SUCCESS_LOADLOCALES_app', initConfig);
        Store.actions.home.loadLocales();
    } else {
        initApp();
    }

    function initConfig(data) {
        var _config = extend(Store.states.home.get('appConfig'), {
            locales: data.data
        });
        initApp();  
    }

    function initApp() {

        // Ractive 自带有 promise ，不过我们也可以用原生的 promise
        var Promise = Ractive.Promise;

        var app = new Ractive({
            el: 'container',
            template: appTemplate,
            components: {
                Home: homeComponent,
                Login: loginComponent
            },
            data: {
                loginStatus: true
            },
            oninit: function() {

            },
        });

        app.on({
            clicked: function(ev) {
                console.log('clicked');
            }
        });
    }
}

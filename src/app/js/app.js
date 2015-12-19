'use strict';

import Ractive from 'ractive'
import 'ractive-touch'

import '_sass/app.scss'

import appTemplate from '_templates/app.html'
import loginComponent from '_components/login.js'  
import homeComponent from '_components/home.js'  

// Ractive 自带有 promise ，不过我们也可以用原生的 promise
var Promise = Ractive.Promise;

console.log("start!!!")    

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
    oninit:function(){

    },
});

app.on({
    clicked: function (ev) {
        console.log('clicked');
    }
});

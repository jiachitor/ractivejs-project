'use strict';

import Ractive from 'ractive'
import 'ractive-touch'

import '_sass/app.scss'

import appTPL from '_templates/app.html'
import fooComponent from '_components/foo.js'  


console.log("start!")  

/*var ractive = new Ractive({
    el: 'container',
    template: testTPL,
    data: {
        visible: 1
    }
});*/


var ractive = new Ractive({
    el: 'container',
    template: appTPL,
    components: {
        Foo: fooComponent
    },
    data: {
        myData: 1
    }
});

ractive.on('clicked', function(ev) {
    console.log('clicked');
});

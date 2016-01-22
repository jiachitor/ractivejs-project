import Ractive from 'ractive'

import template from './pagination.html'
import './pagination.scss'

var LoadingV = Ractive.extend({
    template: template,
    components: {

    },
    data: function() {
        return {
            pageOpts: [5,10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        };
    },
    oncomplete: function() {
        var self = this;
        this.on({
            // 监听子组件事件
            'gotoPage': function(event) {
                console.log(111)
            },
        }, this);
    },
});

export default LoadingV

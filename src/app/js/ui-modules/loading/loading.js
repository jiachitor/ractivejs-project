import Ractive from 'ractive'

import template from './loading.html'
import './loading.scss'

var LoadingV = Ractive.extend({
    template: template,
    components: {
        
    },
    data: function() {
        return {
            myData: 2
        };
    },
});

export default LoadingV

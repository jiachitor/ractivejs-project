
import Ractive from 'ractive'

import formTemplate from '_templates/home/form/index.html'


var FormV = Ractive.extend({
    template: formTemplate,
    components: {
        
    },
    data: function() {
        return {
            myData: 2
        };
    },
});

export default FormV


import Ractive from 'ractive'

import loginTemplate from '_templates/login.html'

var Login = Ractive.extend({
    template: loginTemplate,
    data: function() {
        return {
            myData: 2
        };
    },
});

export default Login

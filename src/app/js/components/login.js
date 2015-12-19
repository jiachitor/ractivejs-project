
import Ractive from 'ractive'

import loginTemplate from '_templates/login.html'

import goComponent from '_components/go.js'

var Login = Ractive.extend({
    template: loginTemplate,
    data: {
        myData: 2
    }
});

export default Login

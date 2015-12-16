
import Ractive from 'ractive'

import fooTPL from '_templates/foo.html'

import goComponent from '_components/go.js'

var Foo = Ractive.extend({
    template: fooTPL,
    components: {
        Go: goComponent
    },
    data: {
        myData: 2
    }
});

export default Foo

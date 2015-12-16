
import Ractive from 'ractive'

var go = Ractive.extend({
    template: '<div>{{ yield }} ai {{ myData }}</div>',
});

export default go

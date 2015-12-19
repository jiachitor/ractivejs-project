import Ractive from 'ractive'

import sidebarTemplate from '_templates/home/sidebar.html'

var Sidebar = Ractive.extend({
    template: sidebarTemplate,
    data: function() {
        return {
            cats: [{
                id: 101,
                name: "demo1"
            }, {
                id: 102,
                name: "demo2"
            }, {
                id: 103,
                name: "demo3"
            }, {
                id: 104,
                name: "demo4"
            }, {
                id: 105,
                name: "demo5"
            }]
        };
    },
    oncomplete: function() {
        this.on({
            'selectCat': function(event, item) {
                console.log('select ' + item.id);
            },
        }, this);
    },
});

export default Sidebar

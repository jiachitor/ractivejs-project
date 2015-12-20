import Ractive from 'ractive'

import sidebarTemplate from '_templates/home/sidebar.html'

var Sidebar = Ractive.extend({
    template: sidebarTemplate,
    data: function() {
        return {
            cats: [{
                id: 101,
                name: "news"
            }, {
                id: 102,
                name: "form"
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

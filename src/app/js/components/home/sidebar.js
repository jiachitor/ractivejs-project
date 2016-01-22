import Ractive from 'ractive'

import sidebarTemplate from '_templates/home/sidebar.html'

var Sidebar = Ractive.extend({
    template: sidebarTemplate,
    data: function() {
        return {
            title: 'Image Upload',
            cats: [{
                id: 101,
                type: 'bigthumb',
                name: "Bigthumb Images"
            }, {
                id: 102,
                type: 'banner_ad_image',
                name: "Banner Ad Images"
            }, {
                id: 103,
                type: 'circle_image',
                name: "Circle Images"
            }, {
                id: 104,
                type: 'topic_image',
                name: "Topic Images"
            }],
            activeIndex: 0,
            countries: [],
            localesValue: 0
        };
    },
    onrender: function() {
        var _countries = Store.states.home.get('appConfig').locales;
        this.set('countries', _countries);
        this.set('curLocale', _countries[0].id);
    },
    oncomplete: function() {
        var __countries = this.get('countries');
        this.on({
            'selectCat': function(event, item, i) {
                this.set("activeIndex", i).then(function() {
                    console.log('select ' + item.name);
                });
            },
        }, this);
        this.observe('localesValue', function(index) {
            // Change `this.set()` to `this.animate()`
            this.set('localesValue', index);
            Store.states.home.set('curLocale',__countries[index].id);
            Store.event.emit('change_country');
        });
    },
});

export default Sidebar

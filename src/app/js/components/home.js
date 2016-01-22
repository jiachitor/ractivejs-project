import Ractive from 'ractive'

import homeTemplate from '_templates/home.html'

import sidebarComponent from './home/sidebar.js'


import uploadComponent from "./home/upload/upload.js"

var Home = Ractive.extend({
    template: homeTemplate,
    components: {
        Sidebar: sidebarComponent,
        Upload: uploadComponent
    },
    data: function() {
        return {
            cat: 101
        };
    },
    onrender: function() {
        Store.states.home.set('active_type', {
            id: 101,
            type: 'bigthumb',
            name: "Bigthumb Images"
        });
    },
    oncomplete: function() {
        var self = this;
        this.on({
            // 监听子组件事件
            'Sidebar.selectCat': function(event, item) {
                var _cat = this.get('cat');
                if (item.id !== _cat) {
                    this.set("cat", item.id).then(function() {
                        Store.actions.home.setActiveType(item);
                    });
                }
                /* 观察子组件数据变化
                event.component.observe( 'foo', function ( n, o, k ) {
                    console.log( 'foo changed from', o, 'to', n );
                });
                */
            },
        }, this);
    },
    onunrender: function() {
        
    },
});

export default Home

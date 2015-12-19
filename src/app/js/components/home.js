import Ractive from 'ractive'

import homeTemplate from '_templates/home.html'

import sidebarComponent from '_components/home/sidebar.js'
import goComponent from '_components/go.js'

var Home = Ractive.extend({
    template: homeTemplate,
    components: {
        Sidebar: sidebarComponent
    },
    data: {
        cat: 101
    },
    onrender: function() {

    },
    oncomplete: function() {
        this.on({
            // 监听子组件事件
            'Sidebar.selectCat': function(event, item) {
                console.log('item', item);
                this.set("cat", item.id).then(function(){
                    console.log('transitions complete!');
                });

                /* 观察子组件数据变化
                event.component.observe( 'foo', function ( n, o, k ) {
                    console.log( 'foo changed from', o, 'to', n );
                });
                */
            },
        }, this);
    },
});

export default Home

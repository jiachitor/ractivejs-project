
import Ractive from 'ractive'

import newsTemplate from '_templates/home/news/index.html'


var News = Ractive.extend({
    template: newsTemplate,
    components: {
       
    },
    data: function() {
        return {
            news_list: []
        };
    },
});

export default News

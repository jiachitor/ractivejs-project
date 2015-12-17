// 数据与状态
let state = {
    data: {
        arr1: ["test1", "tset2"]
    },
    set:function(){
        this.data.arr1 = [];
    },
    get:function(){
        return this.data;
    }
}

// 行为
let action = {
    rootStore: {},
    actionA: function() {
        console.log("state", state)
        console.log("rootStore", this.rootStore)
        this.message = 'action A triggered'
    },
    actionB: function() {
        this.message = 'action B triggered'
    }
}

export default {
    displayName:'demo',
    state: state,
    action: action
}

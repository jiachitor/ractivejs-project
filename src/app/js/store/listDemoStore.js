import Firebase from 'firebase'

const api = new Firebase('https://hacker-news.firebaseio.com/v0')
const itemsCache = Object.create(null)

// 数据与状态
let state = {
    data: {
        storiesPerPage: 30,
        topStoryIds: []
    },
    set: function() {
        this.data.arr1 = [];
    },
    get: function() {
        return this.data;
    }
}

// 行为
let action = {
    rootStore: {},
    loadInitNews() {
        api.child('topstories').on('value', snapshot => {
            state.data.topStoryIds = snapshot.val()
            this.rootStore.event.emit('topstories-updated')
        })
    },
    fetchItem(id) {
        return new Promise((resolve, reject) => {
            if (itemsCache[id]) {
                resolve(itemsCache[id])
            } else {
                api.child('item/' + id).once('value', snapshot => {
                    const story = itemsCache[id] = snapshot.val()
                    resolve(story)
                }, reject)
            }
        })
    },
    fetchItems(ids) {
        if (!ids || !ids.length) {
            return Promise.resolve([])
        } else {
            return Promise.all(ids.map(id => this.fetchItem(id)))
        }
    },
    fetchItemsByPage(page) {
        const start = (page - 1) * state.data.storiesPerPage
        const end = page * state.data.storiesPerPage
        const ids = state.data.topStoryIds.slice(start, end)
        return this.fetchItems(ids)
    },
    fetchUser(id) {
        return new Promise((resolve, reject) => {
            api.child('user/' + id).once('value', snapshot => {
                resolve(snapshot.val())
            }, reject)
        })
    }
}

export default {
    displayName: 'listDemo',
    state: state,
    action: action
}

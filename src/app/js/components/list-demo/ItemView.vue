<script>
import store from '_store'
import Item from './Item.vue'
import Comment from './Comment.vue'

export default {

  name: 'ItemView',

  components: {
    Item,
    Comment
  },

  data () {
    return {
      item: {},
      comments: [],
      pollOptions: null
    }
  },

  route: {
    data ({ to }) {
      return store.actions.listDemo.fetchItem(to.params.id).then(item => ({
        item,
        // the final resolved data can further contain Promises
        comments: store.actions.listDemo.fetchItems(item.kids),
        pollOptions: item.type === 'poll'
          ? store.actions.listDemo.fetchItems(item.parts)
          : null
      }))
    }
  }
}
</script>

<template>
  <div class="item-view" v-show="item">
    <item :item="item"></item>
    <ul class="poll-options" v-if="pollOptions">
      <li v-for="option in pollOptions">
        <p>{{option.text}}</p>
        <p class="subtext">{{option.score}} points</p>
      </li>
    </ul>
    <ul class="comments" v-if="comments">
      <comment
        v-for="comment in comments"
        :comment="comment">
      </comment>
    </ul>
    <p v-show="!comments.length">No comments yet.</p>
  </div>
</template>



<style lang="stylus">
@import "../../../style/variables.styl"

.item-view
  .item
    padding-left 0
    margin-bottom 30px
    .index
      display none
  .poll-options
    margin-left 30px
    margin-bottom 40px
    li
      margin 12px 0
    p
      margin 8px 0
    .subtext
      color $gray
      font-size 11px
</style>

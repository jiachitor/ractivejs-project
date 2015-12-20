# Ractive.js demo 
由于自己一直有个ractive 的项目在开发维护，所以难免对这个框架有感情。在两年前前端模块化的开发思想还没有如今这么深入彻底，当时利用ractive为基础搭起来的一套MVC框架能够满足彼时项目快速开发部署的需求，但是随着时间的推移，项目需求的复杂化导致这一套代码在开发时显得力不从心。到如今，以react 为首的数据驱动框架爆发出强大威力的时候，ractive 这种模板驱动的框架显得小众。经过几个版本的升级迭代，如今ractive 更倾向于组件化开发，但模板驱动的理念并没有改变，所以我个人认为这是开发单页面应用最简单的框架，因为模板驱动保留了传统前端开发的理念，而数据处理和angular 1.x一样便捷，所以想学习react 和 angular 2 的同学可以了解下ractive，作为一个小而美的框架，它肯定能让你惊叹。

这个项目demo 以最新的组件化开发方式编写，个人本想写的完善点，但是觉得模板驱动要完成这样一个例子实在太简单，所以就到此为止吧。有兴趣的多看看官方文档，会发现很多有趣的东西。

###### 某些有用的代码，个人还没使用过的
```
    getJSON( '/temperature.json' ).then( function ( cities ) {
      ractive.set( 'cities', cities );

      // when the user makes a selection from the drop-down, update the chart
      // 观察
      ractive.observe( 'selectedIndex', function ( index ) {
        // Change `this.set()` to `this.animate()`
        this.set( 'selectedCity', cities[ index ] );
      });
    });

    <!-- 使用变量 -->
    <button on-click="{{handler}}">click me!</button>

    <!-- 判断  这个也蛮有用 -->
    <button on-click="{{#active}}select{{/}}">click me!</button>

    <button on-click='set( "foo", true)'>make foo true</button>
```
# Ractive.js demo 





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

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
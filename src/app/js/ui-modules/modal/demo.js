BasicModal = Modal.extend({
  partials: {
    modalContent: '<p>This is some important content!</p><a class="modal-button" on-tap="okay">Okay</a>'
  },

  onrender: function ( options ) {
    this.on( 'okay', function () {
      this.teardown();
    });
  }
});

basicModal = new BasicModal();
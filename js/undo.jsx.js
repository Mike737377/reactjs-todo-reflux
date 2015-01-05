(function(Reflux, TodoActions, UndoActions, global) {
  'use strict';

  global.undoListStore = Reflux.createStore({
    listenables: [UndoActions],
    onAddRemovedItems: function(removedItems) {
        this.removedItems = removedItems;
        this.trigger(this.removedItems);
    },
    onUndo: function() {
      TodoActions.addSetOfItems(this.removedItems);
      this.removedItems = [];
      this.trigger(this.removedItems);
    },
    getDefaultData: function() {
      this.removedItems = [];
      return this.removedItems;
    }
  });

})(window.Reflux, window.TodoActions, window.UndoActions, window);

(function(React, Reflux, UndoActions, undoListStore, global) {

  var UndoApp = React.createClass({
      mixins: [Reflux.connect(undoListStore,"removedItems")],
      getInitialState: function() {
        return {removedItems: []};
      },
      handleUndo: function() {
        UndoActions.undo();
      },
      render: function() {
          return this.state.removedItems.length > 0 && (
              <div id="undo">
                <a href="javascript:;" onClick={this.handleUndo}>Undo remove</a>
              </div>
          );
      }
  });

  React.render(<UndoApp/>, document.getElementById('undocontainer'));

})(window.React, window.Reflux, window.UndoActions, window.undoListStore, window);

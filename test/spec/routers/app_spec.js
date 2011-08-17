(function() {
  describe('App Router', function() {
    return describe('Index handler', function() {
      beforeEach(function() {
        var app;
        this.collection_dummy = new Backbone.Collection();
        sinon.stub(this.collection_dummy, 'fetch').returns(null);
        this.collection_stub = sinon.stub(window, 'Colors').returns(this.collection_dummy);
        this.listview_spy = sinon.spy(window, 'ColorListView');
        app = new AppRouter();
        return app.index();
      });
      afterEach(function() {
        this.collection_stub.restore();
        return this.listview_spy.restore();
      });
      it('creates a Colors collection', function() {
        return expect(this.collection_stub).toHaveBeenCalled();
      });
      it('creates a Colors list view', function() {
        return expect(this.listview_spy).toHaveBeenCalled();
      });
      return it('fetches records of Colors list from local storage', function() {
        return expect(this.collection_dummy.fetch).toHaveBeenCalled();
      });
    });
  });
}).call(this);

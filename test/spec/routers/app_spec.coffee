describe 'App Router', ->
    
  describe 'Index handler', ->
    
    beforeEach ->
      #@collection_dummy = {fetch: sinon.spy(), bind: ->}
      @collection_dummy = new Backbone.Collection()
      sinon.stub(@collection_dummy, 'fetch').returns(null)
      @collection_stub = sinon.stub(window, 'Colors').returns(@collection_dummy)
      @listview_spy = sinon.spy(window, 'ColorListView')
      app = new AppRouter()
      app.index()
    
    afterEach ->
      @collection_stub.restore()
      @listview_spy.restore()
  
    it 'creates a Colors collection', ->
      expect(@collection_stub).toHaveBeenCalled()
      
    it 'creates a Colors list view', ->
      expect(@listview_spy).toHaveBeenCalled()
    
    it 'fetches records of Colors list from local storage', ->
      expect(@collection_dummy.fetch).toHaveBeenCalled()
    
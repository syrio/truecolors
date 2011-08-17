describe 'Colors Collection', ->
  
  beforeEach ->
    @colors = new Colors()
    @color = sinon.stub(window, 'Color')

  afterEach ->
    @color.restore()

  describe 'when initialized with a given color model', ->
    
    beforeEach ->
      model = new Backbone.Model( { color : '58AA01', id: 1 } ) 
      @color.returns(model)
      @colors.add( { color : '58AA01', id: 1 } )
  
    it 'should use color as model', ->
      expect(@colors.model.name).toEqual 'Color'
  
    it 'should have one color model', ->
      expect(@colors.length).toEqual 1
      
    it 'should initialize the local storage', ->
      expect(@colors.localStorage).toBeDefined()
    
    describe 'when removing the given color model', ->
      beforeEach ->
        @colors.remove( { id: 1 } )
      it 'should not have any models', ->
        expect(@colors.length).toEqual 0

    

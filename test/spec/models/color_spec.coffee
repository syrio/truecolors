describe 'Color Model', () ->

  beforeEach ->
      
    @color = new Color({ color: 'A839B2' })
    @color.collection = { localStorage : { create: sinon.stub().returns({ color: '58AA00'}) }}
  
  describe 'when initialized', () ->
    
  
    it 'should have the color attribute', () ->
      expect(@color.get('color')).toEqual 'A839B2'
  
    
  describe 'when saving', () ->
    
    beforeEach ->
      @event_spy = sinon.spy()
    
    it 'should not save when there is no color', () ->
      @color.bind 'error', @event_spy
      @color.save({ })
      
      expect(@event_spy).toHaveBeenCalledOnce()
      expect(@event_spy).toHaveBeenCalledWith(@color, 'must have a color')
    
    it 'should save against local storage', () ->
      @color.save()
      expect(@color.collection.localStorage.create).toHaveBeenCalledOnce()
    
    describe 'if model data changed', () ->
      it 'should fire the model change event', () ->
        @color.bind 'change', @event_spy
        @color.save({ color : '58AA00'})
        expect(@event_spy).toHaveBeenCalledOnce()
  
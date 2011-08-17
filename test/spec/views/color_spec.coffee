describe 'Color View', ->

  
  beforeEach ->
    
    # stub random to fixture the otherwise randomized color view font size
    sinon.stub(Math, 'random').returns(0)
    
    @model = new Backbone.Model( { color: '58AA01' } )
    
    @template = '<span class="black" style="background-color:black"> <%= color %> </span>' +
                '<span class="white" style="background-color:white"> <%= color %> </span>'
    @view = new ColorView({ model : @model, template : @template })
    setFixtures('<ul id="colors"></ul>')
  
  afterEach ->
    Math.random.restore()


  it 'loads the Color template', ->
  
  describe 'Root Element', ->
    it 'is a list element', ->
      expect(@view.el.tagName).toEqual 'LI'
    
  describe 'Rendering', ->
  
    it 'returns the view', ->
      expect(@view.render()).toEqual @view
    
    beforeEach ->
     el = @view.render().el
     $("ul#colors}").append(el);

    

    describe 'template', ->
    
      it 'has the correct text color', ->
        
        # dummy item for color in rgb form from jquery 
        item = $('<div>').css('color', '#'+@model.get('color'))
        # compare returned rgb form span color with dummy item that contains the models color
        expect($(@view.el).find('span.black').css('color')).toEqual item.css('color')
        
      it 'has a randomized font size for black display', ->
        expect($(@view.el).find('span.black').css('font-size')).toEqual '12px'
      
      it 'has a randomized font size for white display', ->
        expect($(@view.el).find('span.white').css('font-size')).toEqual '12px'
      
      # not using dummy here - black and white are hardcoded in rgb form
      it 'has a black background for black display', ->
        expect($(@view.el).find('span.black').css('background-color')).toEqual 'rgb(0, 0, 0)'
      
      it 'has a white background for white display', ->
        expect($(@view.el).find('span.white').css('background-color')).toEqual 'rgb(255, 255, 255)'

      it 'has a tooltip indicating the color in black display', ->
         expect($(@view.el).find('span.black')).toHaveAttr('title', '#'+@model.get('color'))
         
      it 'has a tooltip indicating the color in white display', ->
        expect($(@view.el).find('span.white')).toHaveAttr('title', '#'+@model.get('color'))

         
         
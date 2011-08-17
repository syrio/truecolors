describe 'Color List View', ->
  beforeEach ->
    @view = new ColorListView({bind : ->})

  describe 'initialization', ->
    it 'should create a div element', ->
      expect(@view.el.nodeName).toEqual 'DIV'
    describe 'div element', ->
      it 'should have the colors style', ->
        expect($(@view.el)).toHaveClass 'colors'
    it 'should create a list element', ->
      expect($(@view.el).find('ul')).toExist()
    it 'should create an input element', ->
      expect($(@view.el).find('input')).toExist()

  describe 'rendering', ->

    beforeEach ->
      @color_view = new Backbone.View()
      @color_view_render_stub = sinon.stub(@color_view, 'render').returns({ el : '<li></li>'})

      @color_view_stub = sinon.stub(window, 'ColorView').returns(@color_view)

      @first_color = new Backbone.Model({color: '1'})
      @second_color = new Backbone.Model({color: '2'})
      @third_color = new Backbone.Model({color: '3'})
      colors_models = [@first_color, @second_color, @third_color]
      @view.collection = new Backbone.Collection(colors_models)
      @view.render()

    afterEach ->
      @color_view_stub.restore()

    it 'should create a Color view for each color item', ->
      expect(@color_view_stub).toHaveBeenCalledThrice()

    it 'should render the Color view for each color item', ->
      expect(@color_view_render_stub).toHaveBeenCalledThrice()

    it 'should prepend the rendering result for each color item to the color list', ->
      expect($(@view.el).find('ul').children().length).toEqual 3

  describe 'inserting', ->

    beforeEach ->
      @input = $(@view.el).find('input#insert')
      @input.trigger('focus')
    describe 'input field', ->
      it 'should have inserting style', ->
          expect(@input).toHaveClass('inserting')

  describe 'adding', ->

    beforeEach ->
      @view.collection = new Colors()
      @create_model_spy = sinon.spy(@view.collection, 'create')
      # trigger input submit here
      input = $(@view.el).find('input#insert')
      input.val('0074AE')
      e = $.Event('keypress')
      e.keyCode = 13
      input.trigger(e)  
      
    it 'should add a new color to the color list', ->
      expect(@create_model_spy).toHaveBeenCalledOnce()
      expect(@create_model_spy.args[0][0].color).toEqual '0074AE'
      
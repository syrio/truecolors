(function() {
  describe('Color List View', function() {
    beforeEach(function() {
      return this.view = new ColorListView({
        bind: function() {}
      });
    });
    describe('initialization', function() {
      it('should create a div element', function() {
        return expect(this.view.el.nodeName).toEqual('DIV');
      });
      describe('div element', function() {
        return it('should have the colors style', function() {
          return expect($(this.view.el)).toHaveClass('colors');
        });
      });
      it('should create a list element', function() {
        return expect($(this.view.el).find('ul')).toExist();
      });
      return it('should create an input element', function() {
        return expect($(this.view.el).find('input')).toExist();
      });
    });
    describe('rendering', function() {
      beforeEach(function() {
        var colors_models;
        this.color_view = new Backbone.View();
        this.color_view_render_stub = sinon.stub(this.color_view, 'render').returns({
          el: '<li></li>'
        });
        this.color_view_stub = sinon.stub(window, 'ColorView').returns(this.color_view);
        this.first_color = new Backbone.Model({
          color: '1'
        });
        this.second_color = new Backbone.Model({
          color: '2'
        });
        this.third_color = new Backbone.Model({
          color: '3'
        });
        colors_models = [this.first_color, this.second_color, this.third_color];
        this.view.collection = new Backbone.Collection(colors_models);
        return this.view.render();
      });
      afterEach(function() {
        return this.color_view_stub.restore();
      });
      it('should create a Color view for each color item', function() {
        return expect(this.color_view_stub).toHaveBeenCalledThrice();
      });
      it('should render the Color view for each color item', function() {
        return expect(this.color_view_render_stub).toHaveBeenCalledThrice();
      });
      return it('should prepend the rendering result for each color item to the color list', function() {
        return expect($(this.view.el).find('ul').children().length).toEqual(3);
      });
    });
    describe('inserting', function() {
      beforeEach(function() {
        this.input = $(this.view.el).find('input#insert');
        return this.input.trigger('focus');
      });
      return describe('input field', function() {
        return it('should have inserting style', function() {
          return expect(this.input).toHaveClass('inserting');
        });
      });
    });
    return describe('adding', function() {
      beforeEach(function() {
        var e, input;
        this.view.collection = new Colors();
        this.create_model_spy = sinon.spy(this.view.collection, 'create');
        input = $(this.view.el).find('input#insert');
        input.val('0074AE');
        e = $.Event('keypress');
        e.keyCode = 13;
        return input.trigger(e);
      });
      return it('should add a new color to the color list', function() {
        expect(this.create_model_spy).toHaveBeenCalledOnce();
        return expect(this.create_model_spy.args[0][0].color).toEqual('0074AE');
      });
    });
  });
}).call(this);

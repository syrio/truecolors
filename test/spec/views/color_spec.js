(function() {
  describe('Color View', function() {
    beforeEach(function() {
      sinon.stub(Math, 'random').returns(0);
      this.model = new Backbone.Model({
        color: '58AA01'
      });
      this.template = '<span class="black" style="background-color:black"> <%= color %> </span>' + '<span class="white" style="background-color:white"> <%= color %> </span>';
      this.view = new ColorView({
        model: this.model,
        template: this.template
      });
      return setFixtures('<ul id="colors"></ul>');
    });
    afterEach(function() {
      return Math.random.restore();
    });
    it('loads the Color template', function() {});
    describe('Root Element', function() {
      return it('is a list element', function() {
        return expect(this.view.el.tagName).toEqual('LI');
      });
    });
    return describe('Rendering', function() {
      it('returns the view', function() {
        return expect(this.view.render()).toEqual(this.view);
      });
      beforeEach(function() {
        var el;
        el = this.view.render().el;
        return $("ul#colors}").append(el);
      });
      return describe('template', function() {
        it('has the correct text color', function() {
          var item;
          item = $('<div>').css('color', '#' + this.model.get('color'));
          return expect($(this.view.el).find('span.black').css('color')).toEqual(item.css('color'));
        });
        it('has a randomized font size for black display', function() {
          return expect($(this.view.el).find('span.black').css('font-size')).toEqual('12px');
        });
        it('has a randomized font size for white display', function() {
          return expect($(this.view.el).find('span.white').css('font-size')).toEqual('12px');
        });
        it('has a black background for black display', function() {
          return expect($(this.view.el).find('span.black').css('background-color')).toEqual('rgb(0, 0, 0)');
        });
        it('has a white background for white display', function() {
          return expect($(this.view.el).find('span.white').css('background-color')).toEqual('rgb(255, 255, 255)');
        });
        it('has a tooltip indicating the color in black display', function() {
          return expect($(this.view.el).find('span.black')).toHaveAttr('title', '#' + this.model.get('color'));
        });
        return it('has a tooltip indicating the color in white display', function() {
          return expect($(this.view.el).find('span.white')).toHaveAttr('title', '#' + this.model.get('color'));
        });
      });
    });
  });
}).call(this);

(function() {
  describe('Colors Collection', function() {
    beforeEach(function() {
      this.colors = new Colors();
      return this.color = sinon.stub(window, 'Color');
    });
    afterEach(function() {
      return this.color.restore();
    });
    return describe('when initialized with a given color model', function() {
      beforeEach(function() {
        var model;
        model = new Backbone.Model({
          color: '58AA01',
          id: 1
        });
        this.color.returns(model);
        return this.colors.add({
          color: '58AA01',
          id: 1
        });
      });
      it('should use color as model', function() {
        return expect(this.colors.model.name).toEqual('Color');
      });
      it('should have one color model', function() {
        return expect(this.colors.length).toEqual(1);
      });
      it('should initialize the local storage', function() {
        return expect(this.colors.localStorage).toBeDefined();
      });
      return describe('when removing the given color model', function() {
        beforeEach(function() {
          return this.colors.remove({
            id: 1
          });
        });
        return it('should not have any models', function() {
          return expect(this.colors.length).toEqual(0);
        });
      });
    });
  });
}).call(this);

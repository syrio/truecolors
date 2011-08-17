(function() {
  describe('Color Model', function() {
    beforeEach(function() {
      this.color = new Color({
        color: 'A839B2'
      });
      return this.color.collection = {
        localStorage: {
          create: sinon.stub().returns({
            color: '58AA00'
          })
        }
      };
    });
    describe('when initialized', function() {
      return it('should have the color attribute', function() {
        return expect(this.color.get('color')).toEqual('A839B2');
      });
    });
    return describe('when saving', function() {
      beforeEach(function() {
        return this.event_spy = sinon.spy();
      });
      it('should not save when there is no color', function() {
        this.color.bind('error', this.event_spy);
        this.color.save({});
        expect(this.event_spy).toHaveBeenCalledOnce();
        return expect(this.event_spy).toHaveBeenCalledWith(this.color, 'must have a color');
      });
      it('should save against local storage', function() {
        this.color.save();
        return expect(this.color.collection.localStorage.create).toHaveBeenCalledOnce();
      });
      return describe('if model data changed', function() {
        return it('should fire the model change event', function() {
          this.color.bind('change', this.event_spy);
          this.color.save({
            color: '58AA00'
          });
          return expect(this.event_spy).toHaveBeenCalledOnce();
        });
      });
    });
  });
}).call(this);

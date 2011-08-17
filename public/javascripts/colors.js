(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  $(function() {
    var app;
    window.Color = (function() {
      __extends(Color, Backbone.Model);
      function Color() {
        Color.__super__.constructor.apply(this, arguments);
      }
      Color.prototype.initialize = function() {};
      Color.prototype.validate = function(attrs) {
        if (attrs.color == null) {
          return 'must have a color';
        }
      };
      return Color;
    })();
    window.Colors = (function() {
      __extends(Colors, Backbone.Collection);
      function Colors() {
        Colors.__super__.constructor.apply(this, arguments);
      }
      Colors.prototype.model = Color;
      Colors.prototype.localStorage = new Store("Colors");
      return Colors;
    })();
    window.ColorView = (function() {
      __extends(ColorView, Backbone.View);
      function ColorView() {
        ColorView.__super__.constructor.apply(this, arguments);
      }
      ColorView.prototype.tagName = 'li';
      ColorView.prototype.className = 'color_item';
      ColorView.prototype.initialize = function(options) {
        var _ref;
        this.model.bind('change', this.render);
        this.template = _.template((_ref = options.template) != null ? _ref : '');
        return this.model = options.model;
      };
      ColorView.prototype.render = function() {
        var css_color, random_font_size;
        random_font_size = function() {
          return Math.round(12 + (Math.random() * 40));
        };
        css_color = '#' + this.model.get('color');
        $(this.el).html(this.template(this.model.toJSON()));
        $(this.el).css('color', css_color);
        $(this.el).find('span.black').css('font-size', random_font_size).attr('title', css_color);
        $(this.el).find('span.white').css('font-size', random_font_size).attr('title', css_color);
        return this;
      };
      return ColorView;
    })();
    window.ColorListView = (function() {
      __extends(ColorListView, Backbone.View);
      function ColorListView() {
        ColorListView.__super__.constructor.apply(this, arguments);
      }
      ColorListView.prototype.tagName = 'div';
      ColorListView.prototype.className = 'colors';
      ColorListView.prototype.events = {
        'focus input#insert': 'insertingColor',
        'keypress input#insert': 'addedColor'
      };
      ColorListView.prototype.initialize = function(collection) {
        var input, list;
        this.collection = collection;
        _.bindAll(this, 'render', 'addColor', 'insertingColor', 'addedColor');
        this.collection.bind('add', this.addColor);
        list = _.template('<ul id="colors_list" class="row"></ul>');
        $(this.el).prepend(list);
        input = _.template('<input id="insert" type="text" placeholder="Enter New Color Here!" class="row"></input>');
        return $(this.el).prepend(input);
      };
      ColorListView.prototype.render = function() {
        this.collection.each(this.addColor);
        return this;
      };
      ColorListView.prototype.addColor = function(color) {
        var view;
        view = new ColorView({
          model: color,
          template: $('#color-template').html()
        });
        return this.$('#colors_list').append(view.render().el);
      };
      ColorListView.prototype.insertingColor = function() {
        return this.$('input#insert').addClass('inserting');
      };
      ColorListView.prototype.addedColor = function(e) {
        var color;
        if (e.keyCode !== 13 && e.keyCode !== 9) {
          return;
        }
        color = this.$('input#insert').val();
        this.collection.create({
          color: color.toUpperCase()
        });
        return this.$('input#insert').val('');
      };
      return ColorListView;
    })();
    window.AppRouter = (function() {
      __extends(AppRouter, Backbone.Router);
      function AppRouter() {
        AppRouter.__super__.constructor.apply(this, arguments);
      }
      AppRouter.prototype.routes = {
        '': 'index'
      };
      AppRouter.prototype.initialize = function() {};
      AppRouter.prototype.index = function() {
        var colors, content, list_view;
        colors = new Colors();
        list_view = new ColorListView(colors);
        colors.fetch();
        content = $('div#content');
        return content.append(list_view.render().el);
      };
      return AppRouter;
    })();
    app = new window.AppRouter();
    Backbone.history.start({
      pushState: true
    });
    if (/index\.html/.test(window.location.pathname)) {
      return app.index();
    }
  });
}).call(this);

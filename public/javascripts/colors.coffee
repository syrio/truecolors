$ ->
  
  class window.Color extends Backbone.Model
  
    initialize: ->
  
    validate: (attrs) ->
      'must have a color' unless attrs.color?
  
  class window.Colors extends Backbone.Collection
  
    model: Color
    localStorage: new Store("Colors")
  

  class window.ColorView extends Backbone.View
  
    tagName: 'li'
    className: 'color_item'
  
    initialize: (options) ->
      @model.bind 'change', this.render
      @template = _.template(options.template ? '')
      @model = options.model
    
    render: ->
      
      random_font_size = ->
        Math.round(12 + (Math.random()*40))
      
      css_color = '#'+@model.get('color')
      $(@el).html( @template(@model.toJSON()) )
      $(@el).css('color', css_color)
      $(@el).find('span.black').css('font-size', random_font_size).attr('title', css_color)
      $(@el).find('span.white').css('font-size', random_font_size).attr('title', css_color)
      this
    
  class window.ColorListView extends Backbone.View
  
    tagName: 'div'
    className: 'colors'
  
    events:
      'focus input#insert' : 'insertingColor'
      'keypress input#insert' : 'addedColor'
      
    
    initialize: (@collection) ->
      _.bindAll(this, 'render', 'addColor', 'insertingColor', 'addedColor')
      @collection.bind('add', @addColor)
      
      list = _.template( '<ul id="colors_list" class="row"></ul>' )
      $(@el).prepend(list)
      
      input = _.template( '<input id="insert" type="text" placeholder="Enter New Color Here!" class="row"></input>' )
      $(@el).prepend(input)
    
    render: ->
      @collection.each(@addColor)
      this
  
    addColor: (color) ->
      view = new ColorView({model : color, template: $('#color-template').html()})
      this.$('#colors_list').append(view.render().el)

    insertingColor : ->
      this.$('input#insert').addClass('inserting')
    
    addedColor : (e) ->
      return if e.keyCode != 13 and e.keyCode !=9
      color = this.$('input#insert').val()
      @collection.create({ color : color.toUpperCase() })
      this.$('input#insert').val('')


  class window.AppRouter extends Backbone.Router
  
    routes : 
      '' : 'index'
  
    initialize: ->
        
    index: ->
      colors = new Colors()
      list_view = new ColorListView(colors)
      colors.fetch()

      content = $('div#content')
      content.append(list_view.render().el)

    
  app = new window.AppRouter()
  Backbone.history.start({pushState: true})
  
  if (/index\.html|github/).test(window.location.pathname) or 
      app.index()
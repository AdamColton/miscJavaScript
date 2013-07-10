function Event(){
  var
    _listeners = [],
    event = {
      fire: function(){
        var
          i,
          length = _listeners.length;
        for(i=0; i<length; i++){
          _listeners[i].apply(this, arguments);
        }
      },
      register: function(fn){
        _listeners.push(fn);
      }
    };
  if (Array.prototype.hasOwnProperty("remove")){
    event.deregister = function(fn){
      _listeners.remove(fn);
    }
  }
  return event;
}
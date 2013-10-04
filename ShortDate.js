var ShortDate = function(_year, _month, _date){
  _year = parseInt(_year);
  _month = parseInt(_month);
  _date = parseInt(_date);
  var _self = {};
  var _jsDate = new Date(_year, _month, _date, 0, 0, 0, 0);
  _self.year = function(){ return _year; };
  _self.month = function(){ return _month; };
  _self.date = function(){ return _date; };
  _self.timestamp = function(){ return _jsDate.getTime(); };
  _self.getDay = function(){ return _jsDate.getDay(); };
  _self.getDayName = function(){ return ShortDate.dayNames[_jsDate.getDay()]; };
  _self.getMonthName = function(){ return ShortDate.monthNames[_month]; };
  _self.addDays = function(days){
    var date = new Date(_jsDate);
    date.setDate( date.getDate() + days);
    return ShortDate(date.getFullYear(), date.getMonth(), date.getDate());
  };
  _self.addMonths = function(months){
    var date = new Date(_jsDate);
    date.setMonth( date.getMonth() + months);
    return ShortDate(date.getFullYear(), date.getMonth(), date.getDate());
  };
  _self.daysInMonth = function(){
    // by setting date to 0, it will regress to the last day of the previous month
    var d = new Date(_year, _month+1, 0,0,0,0,0);
    return d.getDate();
  };
  _self.week = function(){
    var firstOfTheMonth = new Date(_year, _month, 1, 0, 0, 0, 0);
    var startOfWeekOne = ((7-firstOfTheMonth.getDay())%7) + 1;
    if (_date < startOfWeekOne) return 0;
    return 1 + Math.floor( (_date-startOfWeekOne) / 7);
  };
  return _self;
}

ShortDate.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wedneday', 'Thursday', 'Friday', 'Saturday'];
ShortDate.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December'];
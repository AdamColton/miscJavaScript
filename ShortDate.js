/*
== A note about months ==
The JavaScript Date object indexes months begining at 0, most
date formats begin at one. As a result, throughout this class
you will see the month incrementd or decremented by one when
transitioning between a string and a Date.
*/
var ShortDate = function(){
  var _dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wedneday', 'Thursday', 'Friday', 'Saturday'];
  var _monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December'];
  var _dateStringFormat = /^\d{4}-\d\d?-\d\d?$/;
  return function(_yearOrDateObj, _month, _date){
    var _year;
    if (_month < 0) return null;
    if (_month === undefined && _date === undefined){
      if (_yearOrDateObj === undefined) _yearOrDateObj = new Date();
      if (typeof(_yearOrDateObj) === "string" && _dateStringFormat.test(_yearOrDateObj)){
        _yearOrDateObj = _yearOrDateObj.split("-");
        _date = parseInt(_yearOrDateObj[2]);
        _month = parseInt(_yearOrDateObj[1])-1;
        _year = parseInt(_yearOrDateObj[0]);
      }
      if (_yearOrDateObj instanceof Date){
        _month = _yearOrDateObj.getMonth();
        _date = _yearOrDateObj.getDate();
        _yearOrDateObj = _yearOrDateObj.getFullYear();
      }
    }
    _year = parseInt(_yearOrDateObj);
    _month = parseInt(_month);
    _date = parseInt(_date);
    var _self = {};
    var _jsDate = new Date(_year, _month, _date, 0, 0, 0, 0);
    _self.year = function(){ return _year; };
    _self.month = function(){ return _month; };
    _self.date = function(){ return _date; };
    _self.timestamp = function(){ return _jsDate.getTime(); };
    _self.getDay = function(){ return _jsDate.getDay(); };
    _self.getDayName = function(){ return _dayNames[_jsDate.getDay()]; };
    _self.getMonthName = function(){ return _monthNames[_month]; };
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
    _self.str = function(){
      return [_year,_month+1,_date].join("-");
    }
    _self.diff = function(otherDate){
      if (otherDate === undefined) otherDate = ShortDate();
      // 86400000 = number of miliseconds in a day
      // but we have to round or we will get fraction around DST
      return Math.round( (_self.timestamp() - otherDate.timestamp())/86400000 );
    }
    return _self;
  }
}();
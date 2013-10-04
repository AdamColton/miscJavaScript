/*
Day Recurrence
    r[n] where n is any integer
    Repeats after N days
Weekly Pattern
    w[(0-6)*] for instance w135 for mon, wed, fri
    next weekday matching the pattern
Monthly day pattern
    m[((0-5)(0-6))*] for every two integer set, the first number is the week (0-5) and the second integer is the day of the week
    m1131 would be the second and fourth monday of a month 
Monthly Date pattern
    M[(-/+)01-31*] every signed two integer pair represents a day of the month, if a number is negative, it counts from the end of the month.
    M+01+15-1 would the 1st, 15th and last day of every month 
Year Pattern
    y(((01-12)(01-31))*] the first two integers would be the month, the second two would be the date
    y011504150815 would be the 15th of January, April and August every year. 

*/
var Recurrence = function(){
  var _patterns = {
    "days": /^r\d+$/,
    "weekly": /^w[0-6]{1,7}$/,
    "monthlyDay": /^m([0-5][0-6])+$/,
    "monthlyDate": /^M([\-+]\d\d)+$/,
    "year": /^y(\d{4})+$/
  };
  return function(_recurrencePattern){
    var _self = {};
    var i,l;
    if (_patterns.days.test(_recurrencePattern)){
      // == Day Pattern ==
      var _repeatInterval = parseInt(_recurrencePattern.slice(1));
      _self.next = function(shortDate){
        return shortDate.addDays(_repeatInterval);
      };
    } else if (_patterns.weekly.test(_recurrencePattern)){
      // == Week Pattern ==
      var _repeatDays = _recurrencePattern.slice(1).split("");
      l = _repeatDays.length;
      for(i=0; i<l; i+=1){ _repeatDays[i] = parseInt(_repeatDays[i]);}
      console.log(_repeatDays);
      _self.next = function(shortDate){
        shortDate = shortDate.addDays(1);
        while (_repeatDays.indexOf(shortDate.getDay()) === -1){
          shortDate = shortDate.addDays(1);
        }
        return shortDate;
      };
    } else if (_patterns.monthlyDay.test(_recurrencePattern)){
      // == Monthly Day Pattern ==
      var _repeatDates = [];
      l = _recurrencePattern.length;
      for(i=1; i<l; i+=2){
        _repeatDates.push( [parseInt(_recurrencePattern.slice(i,i+1)), parseInt(_recurrencePattern.slice(i+1,i+2))] );
      }
      console.log(_repeatDates);
      _self.next = function(shortDate){
        var l = _repeatDates.length;
        while(true){
          shortDate = shortDate.addDays(1);
          for(i=0; i<l; i+=1){
            if ( _repeatDates[i][0] === shortDate.week() && _repeatDates[i][1] === shortDate.getDay() ) return shortDate;
          } 
        }
      };
    } else if (_patterns.monthlyDate.test(_recurrencePattern)){
      // == Monthly Date Pattern ==
      var _repeatDates = [];
      l = _recurrencePattern.length;
      for(i=1; i<l; i+=3){
        _repeatDates.push( parseInt(_recurrencePattern.slice(i,i+3)) );
      }
      _self.next = function(shortDate){
        var l = _repeatDates.length;
        var d;
        while(true){
          shortDate = shortDate.addDays(1);
          for(i=0; i<l; i+=1){
            d = _repeatDates[i];
            if (d < 1) d = shortDate.daysInMonth() + d;
            if (d === shortDate.date()) return shortDate;
          }
        }
      };
    } else if (_patterns.year.test(_recurrencePattern)){
      // == Yearly Pattern ==
      var _repeatDates = [];
      l = _recurrencePattern.length;
      for(i=1; i<l; i+=4){
        _repeatDates.push( [parseInt(_recurrencePattern.slice(i,i+2)), parseInt(_recurrencePattern.slice(i+2,i+4))] );
      }
      _self.next = function(shortDate){
        var l = _repeatDates.length;
        while(true){
          shortDate = shortDate.addDays(1);
          for(i=0; i<l; i+=1){
            if ( _repeatDates[i][0] === shortDate.month() && _repeatDates[i][1] === shortDate.date() ) return shortDate;
          } 
        }
      };
    }
    _self.str = function(){ return _recurrencePattern; };
    return _self;
  };
}();
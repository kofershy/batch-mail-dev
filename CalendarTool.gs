function isJapaneseHoliday(date){
  // 土日か判定
  var weekInt = date.getDay();
  if(weekInt == 6 || weekInt == 0) {
    return true;
  }
  // 祝日か
  var japaneseCalId = "ja.japanense#holiday@group.v.calendar.google.com";
  var calendar = CalendarApp.getCalendarById(japaneseCalId);
  var dateEvents = calendar.getEventsForDay(date);
  if(dateEvents.length > 0){
    return true;
  }
  return false;
}
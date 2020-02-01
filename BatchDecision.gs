var properties = PropertiesService.getScriptProperties();
// properties.setProperty(key, value);


function isBatchMailReceived(mailBody){
  if(mailBody==null || mailBody==""){
    return false;
  }
  return true;
}

function getBatchSuccessfullyCompleted(mailBody){
  return true;
}

function getBatchProcessCountWorked(mailBody){
  
  if(isCalendarJapaneseHoliday()){
    // process count = 0
    return true;
  }
  
  return true;
}

function (mailBody){

}


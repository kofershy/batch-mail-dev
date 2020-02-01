function logProductInfo() {
  var sheet = SpreadsheetApp.getActiveSheet();
  Logger.log('Sheet: ' + sheet);
  
  var data = sheet.getDataRange().getValues();
  
  for (var i = 0; i < data.length; i++) {
    Logger.log('Product name: ' + data[i][0]);
    Logger.log('Product number: ' + data[i][1]);
  }
  
}

function addProduct() {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow(['Cotton Sweatshirt XL', 'css004']);
}


// ラベル名でメールを取得する。
// エポスカード 
// アマゾン ウェブ サービス ジャパンなど柳様のご経験・希望条件に近い求人情報をご紹介します
function getMailsByLabels(labelNames){
  Logger.log("getMailsByLabels");
  Logger.log(labelNames);
  // get Labels by name
  //for(var labelName in labelNames){
  for(var i in labelNames) {
    var labelName = labelNames[i];
    Logger.log(labelName);
    if (labelName == "" || labelName == null) {
      continue;
    }
    
    var userLabel = GmailApp.getUserLabelByName(labelName);
    Logger.log(userLabel);
    if (userLabel == null){
      continue;
    }
    
    Logger.log("!!!!!!!lllllllllllllll!!!!!!");
    var userThreads = userLabel.getThreads();
    for(var i in userThreads){
      var userThread = userThreads[i];
      var messages = userThread.getMessages();
      for(var i in messages){
        Logger.log("Subject:");
        Logger.log(messages[i].getSubject());
        Logger.log("Body:");
        Logger.log(messages[i].getPlainBody());
      }
    }
    
  }
//  
//  var label = GmailApp.getUserLabelByName(name);
//  
//
//  var userLabels = GmailApp.getUserLabels().forEach(function(userLabel){
//    var userLabelName = userLabel.getName();
//    Logger.log("!!!!!!!!!!!!!");
//    Logger.log(userLabelName);
//    Logger.log("!!!!!!!!!!!!!");
//    
//    if(userLabelName == "エポスカード"){
//      Logger.log("!!!!!!!OKOK!!!!!!");
//      GmailApp.getUserLabelByName(name)
//    }
//    
    
    
// });
}



// バッチ実行結果メールを取得する。
function getBatchMails(){
  var sheet = SpreadsheetApp.getActiveSheet();
  Logger.log('Sheet: ' + sheet);
  
  var data = sheet.getDataRange().getValues();
  
  for (var i = 0; i < data.length; i++) {
    Logger.log('Product name: ' + data[i][0]);
    Logger.log('Product number: ' + data[i][1]);
  }
  
}


function getGmailEmails(){
  var input = ui.prompt('Label Name', 'Enter the label name that is assigned to your emails:', Browser.Buttons.OK_CANCEL);
  
  if (input.getSelectedButton() == ui.Button.CANCEL){
    return;
  }
  
  var label = GmailApp.getUserLabelByName(input.getResponseText());
  var threads = label.getThreads();
  
  for(var i = threads.length - 1; i >=0; i--){
    var messages = threads[i].getMessages();
    
    for (var j = 0; j <messages.length; j++){
      var message = messages[j];
      extractDetails(message);
      GmailApp.markMessageRead(message);
    }
    threads[i].removeLabel(label);
    
  }
  
}

function extractDetails(message){
  var dateTime = message.getDate();
  var subjectText = message.getSubject();
  var senderDetails = message.getFrom();
  var bodyContents = message.getPlainBody();
  
  var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  activeSheet.appendRow([dateTime, senderDetails, subjectText, bodyContents]);
}
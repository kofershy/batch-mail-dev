var mailListSheetname = "MaliList";
var ui = SpreadsheetApp.getUi();
var resultSheetItemRow = ["ラベル名", "メイル名", "メール内容"];

function onOpen(e){
  // バッチ調査実施UI
  var menu = ui.createMenu("バッチ調査")
  .addItem("定例当日バッチ調査実行", "investigateBatchesDaily")
  .addItem("日付設定バッチ調査", "investigateBatchesOnCustomDate")
  .addToUi();
}

// get labels and subjects on the batches
function investigateBatchesDaily(){
  Logger.log("investigateBatchesDaily");
  var batchMails = SpreadsheetApp.getActiveSpreadsheet().getDataRange().getValues();
  var mailSearchSentences = new Array();
  for(var i in batchMails){
    var mailSearchkey = {
      label    :   batchMails[i][0],
      sublabel :   batchMails[i][1],
      subject  :   batchMails[i][2]
    };
    var mailSearchSentence = makeMailSearchSentence(mailSearchkey);
    mailSearchSentences[i] = mailSearchSentence;
  }
  
  var mailResults = getBatchResult(mailSearchSentences);
  var resultSheet = writeResultSpreadsheet(mailResults);
}

function makeMailSearchSentence(mailSearchkey){
  Logger.log("makemakeMailSearchSentence");
  Logger.log("label:"+mailSearchkey.label+" "+"subject:"+mailSearchkey.subject+" "+"newer_than:1d");
  // return "label:"+label+" "+"subject:"+subject+" "+"newer_than:1d";
  return "label:"+mailSearchkey.label+" "+"subject:"+mailSearchkey.subject+" "+"newer_than:1d";
}

function getBatchResult(mailSearchSentences){
  for(var i in mailSearchSentences){
    var threads = GmailApp.search(mailSearchSentences[i]);
    Logger.log(threads);
    threads.forEach(function(thread){
      var mail = thread.getMessages()[0]; // get only first mail.
      // hot(thread.getMessages()[0].getPlainBody());
      Logger.log("subject:"+mail.getSubject());
      Logger.log("received date:"+mail.getDate());      
      Logger.log(thread.getMessages()[0].getSubject())
      resultSheet.appendRow([label, subject, thread.getMessages()[0].getPlainBody()]);
    });
  }

}

function hot(mailBody){
      Logger.log("hot");
      if(mailBody.indexOf("※２．通販サイト等でのご利用の場合、ご利用日時・金額と異なる場合がございます。")>-1){
        Logger.log("OK!!!!!!!!!");
        Logger.log(mailBody.indexOf("※２．通販サイト等でのご利用の場合、ご利用日時・金額と異なる場合がございます。"));
      }

}

function writeResultSpreadsheet(){
  var todayString = Utilities.formatDate(new Date(),"JST","yyyy/MM/dd hh:mm");
  var resultSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(todayString);
  resultSheet.appendRow(resultSheetItemRow);
  return resultSheet;
}



function getYesterday(){
  var MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
  var now = new Date();
  var yesterday = new Date(now.getTime() - MILLIS_PER_DAY);
  return yesterday;
}

function getDate(date){
 return date.getDate();
}

function getWeeksNo(){
  var no = new Date();
  var week = no.getWeek();
  Logger.log(week);
}
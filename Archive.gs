function archiveComplete() {
  
  //Define where to look, and for what
  var sheetToWatch = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Copy of Feb');
  var rangeToWatch = sheetToWatch.getDataRange();
  var dataToWatch = rangeToWatch.getValues();
  //var condStatus = "/Com.*|Can.*|Rej.*/gi";
  var condStatus = RegExp(/Com.*|Can.*|Rej.*/i);
  
  //Define where the data will go: use destination array
  //Destination array: take the MONTH of date, toNumber minus 1, so 01 for Jan = [0] in text list
  var monthSheetNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  
  for (var i=1; i < dataToWatch.length; i++){
    var thisRow = [];
    var dateCode = '';
    var sheetToReceive = '';
    
    thisRow = dataToWatch[i];
    Logger.log("thisRow data: " + thisRow);
    
    dateCode = thisRow[1].getMonth().toFixed();
    Logger.log("dateCode: " + dateCode);
    
    sheetToReceive = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(monthSheetNames[dateCode]);
    Logger.log("monthSheetNames[code] " + monthSheetNames[dateCode] + " = sheetToReceive " + sheetToReceive.getSheetName());
    
  
  
    //If status is complete|cancelled|rejected; Then check the sheet of the corresponding month for the siteID, if it isn't there, move it.
    Logger.log("thisRow[0]: " + thisRow[0]);
    Logger.log("condStatus: " + condStatus.test(thisRow[0]));
    if (condStatus.test(thisRow[0]) && thisRow[5] !== ''){
      Logger.log("condStatus: " + condStatus.test(thisRow[0]));
      
      var siteID = thisRow[5]; //get siteID
      Logger.log("siteID: " + siteID);
      
      var monthData = sheetToReceive.getDataRange().getValues();
      Logger.log(monthData);
      
      var columnIndexSiteID = 6; //column Index   
      var columnValuesSiteID = sheetToReceive.getRange(1, columnIndexSiteID, sheetToReceive.getLastRow()).getValues(); //1st is header row
      Logger.log("columnValuesSiteID: " + columnValuesSiteID);
      
      //var searchResult = columnValuesSiteID.findIndex(siteID); //Row Index - 2
      var searchResult = columnValuesSiteID.indexOf(siteID);
      Logger.log("searchResult: " + searchResult);
      Logger.log("rangeToWatch[" + i + "] = " + rangeToWatch[i]);
      
      //check right sheet for siteID
       if (searchResult == -1){
         Logger.log("siteID not found, moving: " + thisRow[5] + " to sheet: " + sheetToReceive.getSheetName());
         
         // isn't able to find the row we're wanting to move. indexing rangeToWatch[i] returns "undefined"
         //thisRow.moveTo(sheetToReceive);
         
         //sheet.getRange(range.getRow(), 1, 1, sheet.getLastColumn()).moveTo(targetRange);
       }
    }
  }
}

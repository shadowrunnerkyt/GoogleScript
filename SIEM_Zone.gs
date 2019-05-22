function SIEMZone() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('INC_Tracking');
  var data = sheet.getDataRange().getValues();
  var is30E = '';
  var digits = '';
  var Zone = '' ;
  
  for(var i=1; i<data.length; i++){
    var thisRow = data[i];
    is30E = thisRow[4]; // Is device 30E 'Y' or 'N'
    digits = thisRow[6].split('_').pop(); // Customer 4-digit from device name
    Zone = thisRow[11]; // SIEM
    
    if (is30E == 'N' && Zone === "" && digits !== ''){
      var name = thisRow[3].split('-')[0].replace(/\W/g,'');
      sheet.getRange(i+1,12).setValue('WL-' + name + '_' + digits);
      
    }
  }
}

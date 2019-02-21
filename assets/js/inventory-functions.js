$(function(){
  $('#download_csv_sheet').click(function(){
      var url, searchStr, origin;
      origin = window.location.origin;
      searchStr = window.location.search;
      url = origin +'/inventory_details/download-csv'+ searchStr;
      window.open(url, '_blank');
  });
});
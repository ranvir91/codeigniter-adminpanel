<!-- The actual snackbar -->
<div id="snackbar">Some text some message..</div>
<link href="<?php echo base_url('assets/css/snackbar.css')?>" rel="stylesheet" />
<script type="text/javascript">
function show_snackbar(html, styleX='') {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";
    if(html) {
      x.innerHTML = html;
    }
    // if additional css style then add
    if(styleX) {
      x.style = styleX;
    }
    
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
</script>
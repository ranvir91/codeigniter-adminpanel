<?php 
class MY_Exceptions extends CI_Exceptions
{
    function show_error($heading, $message, $template = 'error_general', $status_code = 500)
    {
    	//print_r(join(', ',$message));
        //log_message( 'debug', print_r( $message, TRUE ) );
        
        throw new Exception(is_array($message) ? join(', ',$message) : $message, $status_code );
    }
}
?>
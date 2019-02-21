<?php 
ob_start();
if( ! defined('BASEPATH')) exit('No direct script access allowed');
class My404 extends CI_Controller {
	public function __construct()
       {
          parent::__construct(); 
       }
	public function index()
	{
		
      //  $this->output->set_status_header('404'); 
        $this->load->view('404');//loading in my template
	}
}	
?>		 
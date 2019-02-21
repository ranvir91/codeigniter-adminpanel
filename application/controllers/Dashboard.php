<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Dashboard extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        // Your own constructor code
        $this->load->library(array('pagination', 'session', 'email', 'form_validation'));
        $this->load->helper(array( 'url', 'form', 'pagination_helper'));
    }

    #*****Dashboard
    public function index()
    {
        $this->load->view('dashboard/dashboard', []);
    }
    #*****Dashboard ends

}

/* End of file Dashboard.php */
/* Location: ./application/controllers/Dashboard.php */
<?php
/*
 * Author : Ranvir Singh
 * Created : 20 Feb 2018
 * Edited : 01 Aug 2018
 * Description : this file is used to create all the common functionality for all controllers used in application
 */

if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MY_Controller extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->check_session(); // check session for logged in users | checking valid session only not role, access level
    }
    
    
    private function check_session(){
        if ($this->session->userdata('logged_in') == null) {
            redirect('home/logout', 'refresh');
        }
    }
    
}


/*
 * End of file MY_Controller.php
 * Location: ./application/core/MY_Controller.php
*/

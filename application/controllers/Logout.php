<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Logout extends CI_Controller {
	public function index(){	   
	   $this->session->sess_destroy();
	   redirect('home');
	 }
	#***logout All Users
	#***5-9-16(H)
	function logoutAll()
	{
		$this->db->from('ci_sessions');
		$this->db->truncate();
		redirect('home');
	}
}
/* End of file home.php */
/* Location: ./application/controllers/home.php */
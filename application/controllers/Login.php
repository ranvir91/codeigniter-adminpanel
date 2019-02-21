<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library(['form_validation', 'email']);
        $this->load->model(['Crud_model']);
    }
    
    public function index() {
        
      if($this->input->post()) {
        $username = $this->input->post('username');
        $password = $this->input->post('password');
        //query the database
        if (strpos($username, "'") === FALSE && strpos($username, '"') === FALSE && strpos($username, '`') === FALSE) {
            $option = [
              "select" => "id",
              "table" => "pe_administrator",
              "where" => ["username"=> $username, "password"=>($password)],
              "single" => true,
            ];
            
            $result = $this->Crud_model->common_query($option);
        } else {
            $result = FALSE;
        }

        if ($result) {
            $sess_array = [];
            foreach ($result as $row) {
                $sess_array = array(
                    'row_id' => $row->id,
                );
                $this->session->set_userdata('logged_in', $sess_array);
            }
            redirect(base_url('/dashboard'));
        } else {
            $this->session->set_flashdata('error', 'Invalid username or password');
        }
      }
      $this->load->view('login/index');
    }

    public function logout() {
        $all_data = $this->session->all_userdata();
        $this->session->unset_userdata('logged_in');
        $this->session->unset_userdata($all_data);
        redirect('login', 'refresh');
    }
    
}


/* End of file login.php */
/* Location: ./application/controllers/login.php */

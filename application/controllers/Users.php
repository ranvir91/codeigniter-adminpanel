<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Users extends CI_Controller {

    private $tablename;
    private $created_at;
    private $updated_at;

    public function __construct() {
        parent::__construct();
        $this->load->library(['form_validation', 'email', 'pagination']);
        $this->load->model(['Crud_model']);
        $this->load->helper(array('file', 'pagination_helper'));
        $this->tablename = "pe_users";
        $this->created_at = $this->updated_at = date("Y-m-d H:i:s");
    }
    
    
    public function index() {
        $pagging = getPaginationConfig(); // get pagging config from helper
        $page = (null!==$this->input->get('page') && !empty($this->input->get('page'))) ? $this->input->get('page', true) : 1;
        $rows = $pagging['per_page'];
        // calculate offset
        if ($page) {
          $offset = (int)$rows * ((int)($page)-1);
        }
        
        $options = [
          "select" => "sid",
          "table" => $this->tablename,
          "count" => true,
        ];
        $total_rows = $this->Crud_model->common_query($options);

        $options1 = [
          "select" => "sid,first_name,last_name,email,gender,created_at",
          "table" => $this->tablename,
//          "where" => ["status"=> 1],
          "limit" => [$rows, $offset],
          "order" => ["sid"=> "DESC"],
        ];
        $results = $this->Crud_model->common_query($options1);
        $data['results'] = $results;

        $getParams = [];
        $pagging['base_url'] 	= base_url("users/index?". http_build_query($getParams) );
        $pagging['total_rows'] 	= $total_rows;

        $this->pagination->initialize($pagging);
        $data['links'] = $this->pagination->create_links();

        $this->load->view('users/index', $data);
    }
    
    
    public function add() {
//        pr($this->input->post()); die;
      if($this->input->post()) {
        $first_name = $this->input->post('first_name');
        $last_name = $this->input->post('last_name');
        $email = $this->input->post('email');
        $gender = $this->input->post('gender');
        //query the database
        if (!empty($first_name) && !empty($last_name) && !empty($email) && !empty($gender)) {
            $data = [
              "first_name" => $first_name,
              "last_name" => $last_name,
              "email" => $email,
              "gender" => $gender,
              "created_at" => $this->created_at,
              "updated_at" => $this->updated_at,
            ];
            $result = $this->Crud_model->insert_row($this->tablename, $data);
            $this->session->set_flashdata('success', 'Item Created Successfully.');
            redirect(base_url("users"));
        } else{
            $this->session->set_flashdata('error', 'Please fill all details.');
        }
      }
      $this->load->view('users/add');
    }

    public function edit() {
        $sid = $this->uri->segment(3);
        $first_name = $this->input->post('first_name');
        $last_name = $this->input->post('last_name');
        $email = $this->input->post('email');
        $gender = $this->input->post('gender');
        if(!empty($sid)) {
            $options = [
              "select" => "sid,first_name,last_name,email,gender",
              "table" => $this->tablename,
              "where" => ["sid"=> $sid],
              "single" => true,
            ];
            $data['results'] = $this->Crud_model->common_query($options);
        }
        
        if($post = $this->input->post()){
            $updateData = [
              "first_name" => $first_name,
              "last_name" => $last_name,
              "email" => $email,
              "gender" => $gender,
              "updated_at" => $this->updated_at,
            ];
            $this->Crud_model->update_row($this->tablename, $updateData, ["sid"=> $sid]);
            $this->session->set_flashdata('success', 'Item Updated Successfully.');
            redirect(base_url("users"));
        } else {
//            show_404();
        }
        
      $this->load->view('users/add', $data);
    }


    public function delete() {
        $sid = $this->uri->segment(3);
        if(!empty($sid)) {
            $this->Crud_model->delete_row($this->tablename, ["sid"=> $sid]);
            $this->session->set_flashdata('success', 'Item Deleted Successfully.');
            redirect(base_url("users"));
        } else {
//            show_404();
        }
    }
    
}


/* End of file users.php */
/* Location: ./application/controllers/users.php */

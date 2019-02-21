<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class News extends CI_Controller {

    private $tablename;
    private $created_at;
    private $updated_at;

    public function __construct() {
        parent::__construct();
        $this->load->library(['form_validation', 'pagination']);
        $this->load->model(['Crud_model']);
        $this->load->helper(array('file', 'pagination_helper'));
        $this->tablename = "pe_news";
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
          "select" => "sid,content,created_at,status",
          "table" => $this->tablename,
          "where" => ["status"=> 1],
          "count" => true,
        ];
        $total_rows = $this->Crud_model->common_query($options);

        $options1 = [
          "select" => "sid,content,created_at,status",
          "table" => $this->tablename,
//          "where" => ["status"=> 1],
          "limit" => [$rows, $offset],
          "order" => ["sid"=> "DESC"],
        ];
        $results = $this->Crud_model->common_query($options1);
        $data['results'] = $results;

        $getParams = [];
        $pagging['base_url'] 	= base_url("news/index?". http_build_query($getParams) );
        $pagging['total_rows'] 	= $total_rows;

        $this->pagination->initialize($pagging);
        $data['links'] = $this->pagination->create_links();

        $this->load->view('news/index', $data);
    }
    
    
    public function add() {
//        pr($this->input->post()); die;
      if($this->input->post()) {
        $content = $this->input->post('content');
        $status = $this->input->post('status');
        //query the database
        if (!empty($content)) {
            $data = [
              "content" => $content,
              "status" => $status,
              "created_at" => $this->created_at,
              "updated_at" => $this->updated_at,
            ];
            $result = $this->Crud_model->insert_row($this->tablename, $data);
            $this->session->set_flashdata('success', 'Item Created Successfully.');
            redirect(base_url("news"));
        } else{
            $this->session->set_flashdata('error', 'Please fill all details.');
        }
      }
      $this->load->view('news/add');
    }

    public function edit() {
        $sid = $this->uri->segment(3);
        $content = $this->input->post('content');
        $status = $this->input->post('status');
        if(!empty($sid)) {
            $options = [
              "select" => "sid,content,status",
              "table" => $this->tablename,
              "where" => ["sid"=> $sid],
              "single" => true,
            ];
            $data['results'] = $this->Crud_model->common_query($options);
        }
        
        if($post = $this->input->post()){
            
            $updateData = [
              "content" => $post['content'],
              "status" => $post['status'],
              "updated_at" => $this->updated_at,
            ];
            $this->Crud_model->update_row($this->tablename, $updateData, ["sid"=> $sid]);
            $this->session->set_flashdata('success', 'Item Updated Successfully.');
            redirect(base_url("news"));
        } else {
//            show_404();
        }
        
      $this->load->view('news/add', $data);
    }


    public function delete() {
        $sid = $this->uri->segment(3);
        if(!empty($sid)) {
            $this->Crud_model->delete_row($this->tablename, ["sid"=> $sid]);
            $this->session->set_flashdata('success', 'Item Deleted Successfully.');
            redirect(base_url("news"));
        } else {
//            show_404();
        }
    }
    
}


/* End of file news.php */
/* Location: ./application/controllers/news.php */

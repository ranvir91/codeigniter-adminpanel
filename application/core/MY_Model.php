<?php 
class MY_Model extends CI_Model
{
    
    public function __construct() {
        // Call the Model constructor
        parent::__construct();
    }
  
    // insert row into table
    public function my_insert_row($table, array $data){
        $this->db->insert($table, $data); 
        return $this->db->insert_id(); // will return the new inserted id
    }
    
    // update row from table
    public function my_update_row($table, array $data, $where){
        foreach ($where as $key => $value) {
            $this->db->where("$key", "$value");
        }
        return $this->db->update($table, $data);
//        return $this->db->affected_rows();  // will return number of rows affected or 0 if not
    }

    // delete row from table
    public function my_delete_row($table , array $where){
        foreach ($where as $key => $value) {
            $this->db->where("$key", "$value");
        }
        $this->db->delete($table);
        return $this->db->affected_rows(); // will return number of rows affected or 0 if not
    }
    
    public function get_table_rows_count($table, $select='*', array $where)
    {
      if(count($where)) {
        foreach ($where as $key => $value) {
            $this->db->where("$key", "$value");
        }
      }

      if($select=='*') {
        $this->db->select($select);
        $result = $this->db->get($table)->num_rows();
      } else {
        $this->db->select($select);
        $query = $this->db->get($table);
        $res = $query->result();
        $result = ($res[0]->total);
      }
        return $result;
    }
    

    public function get_listings($table, $columns='*', array $where, $whereCustom, array $whereIN, $limit, $offset=0, array $order, $count=false)
    {
        $this->db->select($columns , FALSE); // false for escaping quetes/backticks

        $this->db->from($table);

        if(count($where)) {
            foreach($where as $k=>$v){
              $this->db->where($k, $v);
            }
        }

        if(count($whereIN)) {
            foreach($whereIN as $k=>$v){
              $this->db->where_in($k, $v);
            }
        }
        
/*
*  $this->db->where() accepts an optional third parameter.
*  If you set it to FALSE, CodeIgniter will not try to protect your field or table names with backticks.
*/
        if($whereCustom) {
            $this->db->where("$whereCustom", NULL, FALSE);
        }

        foreach($order as $k=>$v){
          $this->db->order_by("$k", "$v");
        }

        if($count== false) {
            if($limit) {
                $this->db->limit($limit, $offset);
            }
        }
        
        if($count) {
          $this->results = $this->db->count_all_results(); // run query and return number of rows
        } else {
          $this->results = $this->db->get()->result(); // run query
        }
            
        return $this->results; // return the final data
    }


}



<?php
class Crud_model extends CI_Model {

    public function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
  
    // insert row into table
    public function insert_row($table, array $data){
        $this->db->insert($table, $data);
        return $this->db->insert_id(); // will return the new inserted id
    }
    public function fetch_row($table, $columns, array $where, $whereCustom='', $limit=0, $offset=0){
        $column = ($columns) ? $columns : "*";
        $this->db->select($column);
        $this->db->from($table);
        if(count($where)) {
          foreach ($where as $key => $value) {
            $this->db->where($key, $value);
          }
        }
        if($whereCustom) {
            $this->db->where($whereCustom);
        }
        if($limit){
            $this->db->limit($limit, $offset);
        }
        $query = $this->db->get();
        return $query->result();
    }

    // update row from table
    public function update_row($table, array $data, array $where){
        foreach ($where as $key => $value) {
            $this->db->where("$key", "$value");
        }
        return $this->db->update($table, $data);
//        return $this->db->affected_rows();  // will return number of rows affected or 0 if not
    }

    // delete row from table
    public function delete_row($table , array $where){
        foreach ($where as $key => $value) {
            $this->db->where("$key", "$value");
        }
        $this->db->delete($table);
        return $this->db->affected_rows(); // will return number of rows affected or 0 if not
    }
    function updateDataBatch($data,$tab,$whereAttr)
    {
        $this->db->update_batch($tab, $data, $whereAttr);
    }
    function insertDataBatch($table,$data){
        $this->db->insert_batch($table, $data);
    }
    
    /*
     * Update the column value by 1 or more [ increment / decrement ]
     * params : table name , columns arrray, where array, where_custom [string]
     */
    function updateTheColumnByOne($table, $columns, $where, $where_custom='')
    {
        if(count($where)) {
          foreach ($where as $key => $value) {
            $this->db->where("$key", "$value");
          }
        }
        if(!empty($where_custom)) {
            $where = ' 1 '. $where_custom ;
            $this->db->where($where, null, false);
        }

        if(count($columns)) {
          foreach ($columns as $key => $value) {
            $this->db->set("$key", "$value", false);
          }
        }
        $this->db->update($table);
    }

    
    public function common_query($options) {

        $select = false;
        $table = false;
        $join = false; // should be array | array('t2' => 't2.id = t1.id')
        $order = false;
        $limit = false;
        $where = false;
        $where_custom = false;
        $where_custom_unescaped = false;
        $or_where = false;
        $where_not_in = false;
        $where_in = false;
        $single = false;
        $like = false;
        $count = false;
        $groupby = false;

        extract($options);

        if ($select != false)
            $this->db->select($select);

        if ($table != false)
            $this->db->from($table);

        if ($where != false)
            $this->db->where($where);

        if ($where_not_in != false) {
            foreach ($where_not_in as $key => $value) {
                if (count($value) > 0)
                    $this->db->where_not_in($key, $value);
            }
        }

        if ($like != false) {
            $this->db->like($like);
        }

        if ($or_where != false)
            $this->db->or_where($or_where);

        if ($where_custom != false)
            $this->db->where($where_custom);
        
        if ($where_custom_unescaped != false)
            $this->db->where($where_custom_unescaped, null, false);

        if ($where_in != false)
            $this->db->where_in($where_in[0], $where_in[1]);
        
        if($count == false) {
            if ($limit != false) {
                if (is_array($limit)) {
                    $this->db->limit($limit[0], $limit[1]);
                } else {
                    $this->db->limit($limit);
                }
            }
        }

        if ($order != false) {
            foreach ($order as $key => $value) {
                if (is_array($value)) {
                    foreach ($order as $orderby => $orderval) {
                        $this->db->order_by($orderby, $orderval);
                    }
                } else {
                    $this->db->order_by($key, $value);
                }
            }
        }

        if ($join != false) {
            foreach ($join as $key => $value) {
                if (is_array($value)) {
                    if (count($value) == 3) {
                        $this->db->join($value[0], $value[1], $value[2]);
                    } else {
                        foreach ($value as $key1 => $value1) {
                            $this->db->join($key1, $value1);
                        }
                    }
                } else {
                    $this->db->join($key, $value);
                }
            }
        }
        
        if($groupby) {
            $this->db->group_by($groupby);
        }

        if ($single) {
            return $this->db->get()->row();
        }

        if($count) {
          return $this->db->get()->num_rows(); // run query and return number of rows
        } else {
          return $this->db->get()->result(); // run query
        }
       
    }


    function productDetail($cond)
        {
            $this->db->select('uop.*,ucmd.delivery_date as cdelivery_date,ucmd.status as cstatus,ucmd.consignment_num,ucmd.carrier');
            $this->db->from('uc_order_products as uop');
            $this->db->join('uc_courier_management_detail as ucmd', 'uop.order_id  = ucmd.order_id', 'left');

            $this->db->where('1'.$cond);
            $q = $this->db->get();
            $row = $q->result();
            return $row;
        }

        function slotInfo($cond)
        {
            $this->db->select('sm.*,st.description as desc');
            $this->db->from('slot_management as sm');
            $this->db->join('slot_types as st', 'st.id = sm.type', 'left');
            
            $this->db->where('1'.$cond);
            $q = $this->db->get();
            $row = $q->result();
            return $row;
        }

        function orderDetails($order_id,$cond){
            $this->db->select('uomd.*, uo.order_status as status1');
            $this->db->from('uc_order_management_detail as uomd');
            $this->db->join('uc_orders as uo', 'uomd.order_id  = uo.order_id', 'left');
            $this->db->where('1 AND ' .$cond);
            $q = $this->db->get();
            $row = $q->result();
            return $row;
        }

}

<?php
/*
 * Author : Ranvir Singh
 * Created : 23 Feb 2018
 * Edited : 23 Feb 2018
 * Description : File is used to implement pagination functionality
 *  */


function getPaginationConfig()
{
    $config = [];

    $config["per_page"] = 5;
    //$config["uri_segment"] = 3;
    $config["num_links"] = 9;

    $config['page_query_string'] = true;
    $config['use_page_numbers'] = true;
    $config['query_string_segment'] = 'page';

    $config['full_tag_open'] = '<ul class="pagination">';
    $config['full_tag_close'] = '</ul>';

    $config['first_link'] = 'First Page';
    $config['first_tag_open'] = '<li class="page-item firstlink">';
    $config['first_tag_close'] = '</li>';

    $config['last_link'] = 'Last Page';
    $config['last_tag_open'] = '<li class="page-item lastlink">';
    $config['last_tag_close'] = '</li>';

    $config['next_link'] = 'Next Page';
    $config['next_tag_open'] = '<li class="page-item nextlink">';
    $config['next_tag_close'] = '</li>';

    $config['prev_link'] = 'Prev Page';
    $config['prev_tag_open'] = '<li class="page-item prevlink">';
    $config['prev_tag_close'] = '</li>';

    $config['cur_tag_open'] = '<li class="page-item active"><a href="javascript:void();">';
    $config['cur_tag_close'] = '</a></li>';

    $config['num_tag_open'] = '<li class="page-item numlink">';
    $config['num_tag_close'] = '</li>';
    
    return $config;
}
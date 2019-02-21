<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/* * *************************************************************
 * FlowerAura
 * File Name     : image_helper.php
 * File Desc.    : handles all image upload / crop / compress operations
 * Created By    : Ranvir Singh <twitter @ranvir2012>
 * Created Date  : 05 Mar 2018
 * Updated Date  : 11 Mar 2018
 * ************************************************************* */



/*
* Function to compress image
* Params : image path (upload/abc.jpg), width, quality in percent
* Returns : boolean true or error message array
*/

function compressImage($full_path, $width=700, $quality='100%') {
  $that = &get_instance();
  $configer =  array(
    'image_library' => 'gd2',
    'source_image' => $full_path,
    'create_thumb' => false,//tell the CI do not create thumbnail on image
    'maintain_ratio' => TRUE,
    'quality' => $quality, //tell CI to reduce the image quality and affect the image size
    'width' => $width,
  );
  $that->load->library('image_lib', $configer);
  $that->image_lib->clear();
  $that->image_lib->initialize($configer);
  $that->image_lib->resize();

  if( ! $that->image_lib->resize()) {
    return $that->image_lib->display_errors();
  } else {
    return true;
  }
}

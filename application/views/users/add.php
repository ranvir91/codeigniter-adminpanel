<?php
$this->view("common/header");
?>
<?php
$this->view("common/page-loader");
?>

<?php $this->view("common/navbar"); ?>
    
    <section>
    <?php $this->view("common/leftmenu"); ?>
        <!-- Right Sidebar -->
        <aside id="rightsidebar" class="right-sidebar">
            <ul class="nav nav-tabs tab-nav-right" role="tablist">
                <li role="presentation" class="active"><a href="#skins" data-toggle="tab">SKINS</a></li>
                <li role="presentation"><a href="#settings" data-toggle="tab">SETTINGS</a></li>
            </ul>
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane fade in active in active" id="skins">
                    <ul class="demo-choose-skin">
                        <li data-theme="red" class="active">
                            <div class="red"></div>
                            <span>Red</span>
                        </li>
                        <li data-theme="pink">
                            <div class="pink"></div>
                            <span>Pink</span>
                        </li>
                        <li data-theme="purple">
                            <div class="purple"></div>
                            <span>Purple</span>
                        </li>
                        <li data-theme="deep-purple">
                            <div class="deep-purple"></div>
                            <span>Deep Purple</span>
                        </li>
                        <li data-theme="indigo">
                            <div class="indigo"></div>
                            <span>Indigo</span>
                        </li>
                        <li data-theme="blue">
                            <div class="blue"></div>
                            <span>Blue</span>
                        </li>
                        <li data-theme="light-blue">
                            <div class="light-blue"></div>
                            <span>Light Blue</span>
                        </li>
                        <li data-theme="cyan">
                            <div class="cyan"></div>
                            <span>Cyan</span>
                        </li>
                        <li data-theme="teal">
                            <div class="teal"></div>
                            <span>Teal</span>
                        </li>
                        <li data-theme="green">
                            <div class="green"></div>
                            <span>Green</span>
                        </li>
                        <li data-theme="light-green">
                            <div class="light-green"></div>
                            <span>Light Green</span>
                        </li>
                        <li data-theme="lime">
                            <div class="lime"></div>
                            <span>Lime</span>
                        </li>
                        <li data-theme="yellow">
                            <div class="yellow"></div>
                            <span>Yellow</span>
                        </li>
                        <li data-theme="amber">
                            <div class="amber"></div>
                            <span>Amber</span>
                        </li>
                        <li data-theme="orange">
                            <div class="orange"></div>
                            <span>Orange</span>
                        </li>
                        <li data-theme="deep-orange">
                            <div class="deep-orange"></div>
                            <span>Deep Orange</span>
                        </li>
                        <li data-theme="brown">
                            <div class="brown"></div>
                            <span>Brown</span>
                        </li>
                        <li data-theme="grey">
                            <div class="grey"></div>
                            <span>Grey</span>
                        </li>
                        <li data-theme="blue-grey">
                            <div class="blue-grey"></div>
                            <span>Blue Grey</span>
                        </li>
                        <li data-theme="black">
                            <div class="black"></div>
                            <span>Black</span>
                        </li>
                    </ul>
                </div>
                <div role="tabpanel" class="tab-pane fade" id="settings">
                    <div class="demo-settings">
                        <p>GENERAL SETTINGS</p>
                        <ul class="setting-list">
                            <li>
                                <span>Report Panel Usage</span>
                                <div class="switch">
                                    <label><input type="checkbox" checked><span class="lever"></span></label>
                                </div>
                            </li>
                            <li>
                                <span>Email Redirect</span>
                                <div class="switch">
                                    <label><input type="checkbox"><span class="lever"></span></label>
                                </div>
                            </li>
                        </ul>
                        <p>SYSTEM SETTINGS</p>
                        <ul class="setting-list">
                            <li>
                                <span>Notifications</span>
                                <div class="switch">
                                    <label><input type="checkbox" checked><span class="lever"></span></label>
                                </div>
                            </li>
                            <li>
                                <span>Auto Updates</span>
                                <div class="switch">
                                    <label><input type="checkbox" checked><span class="lever"></span></label>
                                </div>
                            </li>
                        </ul>
                        <p>ACCOUNT SETTINGS</p>
                        <ul class="setting-list">
                            <li>
                                <span>Offline</span>
                                <div class="switch">
                                    <label><input type="checkbox"><span class="lever"></span></label>
                                </div>
                            </li>
                            <li>
                                <span>Location Permission</span>
                                <div class="switch">
                                    <label><input type="checkbox" checked><span class="lever"></span></label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
        <!-- #END# Right Sidebar -->
    </section>

    <section class="content">
        <div class="container-fluid">
            <div class="block-header">
                <ol class="breadcrumb breadcrumb-col-orange">
                    <li><a href="<?php echo base_url("dashboard")?>">Home</a></li>
                    <li><a href="<?php echo base_url("users")?>">News Listing</a></li>
                    <li class="active">Add New</li>
                </ol>
            </div>

            <!-- Striped Rows -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>News : Add new</h2>
                        </div>
                        
                        <div class="body">
                            
                    <?php if($msg = $this->session->flashdata('error')){ ?>
                    <div class="alert alert-danger alert-dismissible" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <?php echo $msg;?>
                    </div>
                    <?php } ?>

                            <form class="" name="" method="post" autocomplete="off">
                                
                                <div class="form-group form-float">
                                    <div class="form-line  col-sm-6">
                                        <input type="text" name="first_name" class="form-control" id="first_name" value="<?php echo !empty($results->first_name) ? $results->first_name : ""?>" />
                                        <label class="form-label">First name</label>
                                    </div>
                                </div>

                                <div class="form-group form-float">
                                    <div class="form-line  col-sm-6">
                                        <input type="text" name="last_name" class="form-control" id="last_name" value="<?php echo !empty($results->last_name) ? $results->last_name : ""?>" />
                                        <label class="form-label">Last name</label>
                                    </div>
                                </div>

                                <div class="form-group form-float">
                                    <div class="form-line  col-sm-6">
                                        <input type="text" name="email" class="form-control" id="email" value="<?php echo !empty($results->email) ? $results->email : ""?>" />
                                        <label class="form-label">Email</label>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                  <div class="col-sm-6">
                                    <select class="form-control show-tick" name="gender">
                                        <option value="">-- select gender --</option>
                                        <option value="Male" <?php echo (isset($results->gender) && ($results->gender == 'Male')) ? "selected" : ""?>>Male</option>
                                        <option value="Female" <?php echo (isset($results->gender) && ($results->gender == 'Female')) ? "selected" : ""?>>Female</option>
                                    </select>
                                  </div>
                                </div>

                                
                                <br>
                                <button type="submit" class="btn btn-primary m-t-15 waves-effect">Save</button>
                                <a href="<?php echo base_url("users");?>" class="btn btn-grey m-t-15 waves-effect">Cancel</a>
                            </form>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
            <!-- #END# Striped Rows -->

        </div>
    </section>

<link href="<?php echo base_url("public/plugins/bootstrap-select/css/bootstrap-select.css")?>" rel="stylesheet" />

<?php
$this->view("common/footer");
?>
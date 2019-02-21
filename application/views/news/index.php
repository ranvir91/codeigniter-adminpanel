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
                    <li class="active">News Listing</li>
                </ol>
            </div>

            <!-- Striped Rows -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>News Listing <a href="<?php echo base_url("news/add");?>" class="btn bg-indigo waves-effect right">Add New</a></h2>
                        </div>

                        <div class="body table-responsive">

                    <?php if($msg = $this->session->flashdata('success')){ ?>
                    <div class="alert alert-success alert-dismissible" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <?php echo $msg;?>
                    </div>
                    <?php } ?>
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Content</th>
                                        <th>Create On</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php if(count($results)) {
                                            foreach ($results as $key => $value) {
                                    ?>
                                    <tr>
                                        <th scope="row"><?php echo ($key+1);?></th>
                                        <td><?php echo $value->content?></td>
                                        <td><?php echo $value->created_at?></td>
                                        <td><?php echo ($value->status) ? "Active" : "Deactive"?></td>
                                        <td>
                                            <a href="<?php echo base_url("news/edit/" . $value->sid)?>"><i class="material-icons">mode_edit</i></a>
                                            <a onclick="return confirm('Are you sure to perform this action?')" href="<?php echo base_url("news/delete/" . $value->sid)?>"><i class="material-icons">delete</i></a>
                                        </td>
                                    </tr>
                                    <?php
                                    } } else {
                                    ?>
                                    <tr>
                                        <td colspan="5"></td>
                                    </tr>
                                    <?php
                                    }
                                    ?>
  
                                </tbody>
                            </table>
                            <?php echo $links?>
<!--                            <ul class="pagination">
                                <li class="disabled">
                                    <a href="javascript:void(0);">
                                        <i class="material-icons">chevron_left</i>
                                    </a>
                                </li>
                                <li class="active"><a href="javascript:void(0);">1</a></li>
                                <li><a href="javascript:void(0);" class="waves-effect">2</a></li>
                                <li><a href="javascript:void(0);" class="waves-effect">3</a></li>
                                <li><a href="javascript:void(0);" class="waves-effect">4</a></li>
                                <li><a href="javascript:void(0);" class="waves-effect">5</a></li>
                                <li>
                                    <a href="javascript:void(0);" class="waves-effect">
                                        <i class="material-icons">chevron_right</i>
                                    </a>
                                </li>
                            </ul>-->
                            
                        </div>
                    </div>
                </div>
            </div>
            <!-- #END# Striped Rows -->

        </div>
    </section>

<?php
$this->view("common/footer");
?>
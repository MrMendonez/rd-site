<?php
    include(dirname(__FILE__) . '/../../inc/pre_config.php');
    include(dirname(__FILE__) . '/../../../config/config.php');
    include(PERCH_CORE . '/inc/loader.php');
    $Perch  = PerchAdmin::fetch();
    include(PERCH_CORE . '/inc/auth.php');
    
    $Perch->page_title = PerchLang::get('Help');
    $Alert = new PerchAlert;
    
    include('../modes/textile.pre.php');
    
    include(PERCH_CORE . '/inc/top.php');

    include('../modes/textile.post.php');

    include(PERCH_CORE . '/inc/btm.php');

?>

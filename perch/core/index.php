<?php
    $auth_page = true;

    include(dirname(__FILE__) . '/inc/pre_config.php');
    include(dirname(__FILE__) . '/../config/config.php');

    if (!defined('PERCH_PATH')) {
        header('Location: setup');
        exit;
    }

    include(PERCH_CORE . '/inc/loader.php');
    $Perch  = PerchAdmin::fetch();
    include(PERCH_CORE . '/inc/auth.php');
    
    // Check for logout
    if ($CurrentUser->logged_in() && isset($_GET['logout']) && is_numeric($_GET['logout'])) {
        $CurrentUser->logout();
    }

    // If the user's logged in, send them to edit content
    if ($CurrentUser->logged_in()) {
        //PerchUtil::redirect(PERCH_LOGINPATH . '/core/apps/content/');
        if ($Settings->get('dashboard')->settingValue()) {
            PerchUtil::redirect(PERCH_LOGINPATH . '/core/dashboard/');
        }
        
        $apps = $Perch->get_apps();
        if (PerchUtil::count($apps)) {
            PerchUtil::redirect($apps[0]['path']);
        }
        
    }

    $Perch->page_title = PerchLang::get('Log in');
    
    include('inc/top.php');
?>
<div class="logincont <?php echo $Settings->get('headerScheme')->settingValue();?>">
    <div id="login">
        <div id="hd" class="topbar">
			<?php
				$logo = $Settings->get('logoPath')->settingValue();
				if ($logo) {
					echo '<img src="'.PerchUtil::html($logo).'" alt="Logo" />';
				}else{
					echo '<img src="'.PERCH_LOGINPATH.'/core/assets/img/logo.png" width="110" class="logo" alt="Perch" />';
				}
			?>
            
        </div>
        <div class="bd">
            <form action="<?php echo PerchUtil::html(PERCH_LOGINPATH); ?>/" method="post">
                
                <?php
					if ($db_error) {
						echo '<p class="alert-failure alert failure">' . PerchLang::get('There\'s a problem with connecting to the database. Please check your settings.');
					}
					
                    if (isset($_POST['login']) && @$_POST['username']!='' && @$_POST['password']!='') {
                        if ($CurrentUser->activation_failed) {
                            echo '<p class="alert-failure alert failure">' . PerchLang::get('Sorry, your license key isn\'t valid for this domain.');
                            
                            if (!$Settings->get('hideBranding')->settingValue()) {
                                echo '<br />';
                                echo PerchLang::get('Log into your %sPerch account%s and add the following as your <em>live</em> or <em>testing</em> domain:', '<a href="https://grabaperch.com/account">', '</a>');
                                echo ' <code>'.PerchUtil::html($_SERVER['SERVER_NAME']).'</code>';
                            }
                            
                            echo '</p>';
                        }else{
                            echo '<p class="alert-failure alert failure">' . PerchLang::get('Sorry, those details are incorrect. Please try again.') . '</p>';
                        }
                    }
                ?>
                
                <?php
                    $login_attempt = false;
                    if (isset($_POST['login'])) {
                        $login_attempt = true;
                    }
                
                    $username = '';
                    if (isset($_POST['username'])) {
                        $username = $_POST['username'];
                    }
                    $password = '';
                    if (isset($_POST['password'])) {
                        $password = $_POST['password'];
                    }
                ?>
                
                <div<?php if ($login_attempt && $username=='') echo ' class="error"'; ?>>
                    <label for="username"><?php echo PerchLang::get('Username'); ?></label>
                    <input type="text" name="username" value="<?php echo PerchUtil::html($username,1); ?>" id="username" class="text" />
                    <?php if ($login_attempt && $username=='') echo '<span class="error">'.PerchLang::get('Required').'</span>'; ?>
                </div>
                
                <div<?php if ($login_attempt && $password=='') echo ' class="error"'; ?>>
                    <label for="password"><?php echo PerchLang::get('Password'); ?></label>
                    <input type="password" name="password" value="" id="password" class="text" />
                    <?php if ($login_attempt && $password=='') echo '<span class="error">'.PerchLang::get('Required').'</span>'; ?>
                </div>

                <p>
                    <input type="submit" class="button" value="<?php echo PerchLang::get('Log in'); ?>">
                    <input type="hidden" name="login" value="1" />
                </p>
            </form>
        </div>
</div>
<?php
    include('inc/btm.php');

?>
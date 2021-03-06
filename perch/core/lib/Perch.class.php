<?php

class Perch
{
    static protected $instance;
	
    public $version = '2.0.4';
    
    private $page        = false;
    public $debug        = false;
    public $debug_output = '';
    public $page_title   = 'Welcome';
    public $help_html    = '';
    public $form_count   = 0;
    public $form_errors  = array();

    public $admin        = false;
    
    public $ignore_pattern  = '/^CVS$/i';
    
    function __construct()
    {
        if (!defined('PERCH_DEBUG'))            define('PERCH_DEBUG', false);
        if (!defined('PERCH_PREVIEW_ARG'))      define('PERCH_PREVIEW_ARG', 'preview');
        if (!defined('PERCH_TEMPLATE_PATH'))    define('PERCH_TEMPLATE_PATH', PERCH_PATH.'/templates');
        if (!defined('PERCH_DEFAULT_DOC'))      define('PERCH_DEFAULT_DOC', 'index.php');
        if (!defined('PERCH_DEFAULT_EXT'))      define('PERCH_DEFAULT_EXT', '.php');
        if (!defined('PERCH_PRODUCTION_MODE'))  define('PERCH_PRODUCTION_MODE', 1);
        
        if (PERCH_DEBUG) $this->debug = true;
    }
    
    public static function fetch()
	{	    
        if (!isset(self::$instance)) {
            $c = __CLASS__;
            self::$instance = new $c;
        }

        return self::$instance;
	}
    
    public function get_page($request_uri=false)
    {
        if ($request_uri) {
            $out = str_replace('index.php', '', strtolower($_SERVER['SCRIPT_NAME']));
            if (isset($_SERVER['QUERY_STRING']) && $_SERVER['QUERY_STRING']!='') {
                $out .= '?'.$_SERVER['QUERY_STRING'];
            }
            $out = preg_replace('/(\/)\\1+/', '/', $out);           
            return $out;
        }
        
        if ($this->page === false) {
            $this->page = strtolower($_SERVER['SCRIPT_NAME']);
        }
        
        if ($this->page != false) {
            $this->page = preg_replace('/(\/)\\1+/', '/', $this->page);
        }
                
        return $this->page;
    }
    
    public function set_page($page)
    {
        $this->page = $page;
    }
    
    public function find_installed_apps($CurrentUser)
    {
        return false;
    }
    
    public function dispatch_form($key, $post, $files)
    {
        $key      = base64_decode($key);
        $parts    = explode(':', $key);
        $formID   = $parts[0];
        $appID    = $parts[1];
        $template = $parts[2];

        if (function_exists($appID.'_form_handler')) {
            $API = new PerchAPI(1.0, $appID);
            $SubmittedForm = $API->get('SubmittedForm');
            $SubmittedForm->populate($formID, $template, $post, $files);
            call_user_func($appID.'_form_handler', $SubmittedForm);
        }else{
            PerchUtil::debug($appID.' form handler not found.', 'error');
        }
    }
    
    public function log_form_error($formID, $fieldID, $type="required")
    {
        if (!isset($this->form_errors[$formID])) $this->form_errors[$formID]=array();
        $this->form_errors[$formID][$fieldID] = $type;
    }
    
    public function get_form_errors($formID)
    {
        if (isset($this->form_errors[$formID])) return $this->form_errors[$formID];
        
        return false;
    }
    
    
    
}

?>
<?php

// Textpattern config.

$txpcfg['db'] = '';
$txpcfg['user'] = '';
$txpcfg['pass'] = '';
$txpcfg['host'] = 'localhost';
$txpcfg['table_prefix'] = '';
$txpcfg['txpath'] = '/path/to/txpmag-website/public/textpattern';
$txpcfg['dbcharset'] = 'utf8';

// Configures rah_cache. Add this after you have installed Textpattern *and* rah_cache.

include txpath . '/../../vendor/rah/rah_cache/src/Rah/Cache/Handler.php';

new Rah_Cache_Handler(
    array(
        'path' => txpath . '/../../cache',
        'skip' => array('file_download/')
    )
);
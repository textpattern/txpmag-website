<?php

// Configures rah_cache.

include txpath . '/../../vendor/rah/rah_cache/src/Rah/Cache/Handler.php';

new Rah_Cache_Handler(
    array(
        'path' => txpath . '/../../cache',
        'skip' => array('file_download/')
    )
);

// Textpattern config.

$txpcfg['db'] = '';
$txpcfg['user'] = '';
$txpcfg['pass'] = '';
$txpcfg['host'] = 'localhost';
$txpcfg['table_prefix'] = '';
$txpcfg['txpath'] = txpath;
$txpcfg['dbcharset'] = 'utf8';
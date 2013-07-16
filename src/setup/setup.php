<?php

`mkdir -pv tmp`;
chdir('tmp');

echo "Downloading Textpattern via SVN...\n";
`rm -Rf dev`;
`svn export http://textpattern.googlecode.com/svn/development/4.x dev`;
echo "Cleaning up the downloaded package...\n";

chdir('dev');

foreach (array_merge((array) glob('*'), array('.gitignore')) as $file)
{
    if (!in_array($file, array('textpattern', 'css.php', 'index.php', 'rpc')))
    {
        echo "Remove {$file}...\n";
        `rm -Rf '{$file}'`;
    }
}

chdir('../../');

// Keep existing configuration.

if (file_exists('public/textpattern/config.php'))
{
    echo "Keep existing config.php...\n";
    copy('public/textpattern/config.php', 'tmp/dev/textpattern/config.php');
    echo "Remove setup/...\n";
    `rm -Rf 'tmp/dev/textpattern/setup'`;
}

// Keep existing additional themes.

if (is_dir('public/textpattern/theme') && chdir('public/textpattern/theme'))
{
    foreach ((array) glob('*') as $file)
    {
        if (!in_array($file, array('classic', 'hive', 'remora', '.htaccess')))
        {
            `cp -rf '{$file}/' ../../../tmp/dev/textpattern/theme/`;
        }
    }

    chdir('../../../');
}

echo "Moving in the new installation...\n";
`rm -Rf public/textpattern`;
`rm -f public/css.php`;
`rm -f public/index.php`;
`rm -Rf public/rpc`;
`cp -rf tmp/dev/ public/`;
`mkdir -p -m 755 public/files`;
`mkdir -p -m 755 public/images`;
`mkdir -p -m 755 cache`;

echo "Removing trash...\n";
`rm -Rf tmp`;
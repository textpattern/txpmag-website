PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,null,"	\n\r  "]],[[PR.PR_COMMENT,/^#!(?:.*)/],[PR.PR_KEYWORD,/^\b(?:import|library|part of|part|as|show|hide)\b/i],[PR.PR_COMMENT,/^\/\/(?:.*)/],[PR.PR_COMMENT,/^\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//],[PR.PR_KEYWORD,/^\b(?:class|interface)\b/i],[PR.PR_KEYWORD,/^\b(?:assert|break|case|catch|continue|default|do|else|finally|for|if|in|is|new|return|super|switch|this|throw|try|while)\b/i],[PR.PR_KEYWORD,/^\b(?:abstract|const|extends|factory|final|get|implements|native|operator|set|static|typedef|var)\b/i],[PR.PR_TYPE,/^\b(?:bool|double|Dynamic|int|num|Object|String|void)\b/i],[PR.PR_KEYWORD,/^\b(?:false|null|true)\b/i],[PR.PR_STRING,/^r?[\']{3}[\s|\S]*?[^\\][\']{3}/],[PR.PR_STRING,/^r?[\"]{3}[\s|\S]*?[^\\][\"]{3}/],[PR.PR_STRING,/^r?\'(\'|(?:[^\n\r\f])*?[^\\]\')/],[PR.PR_STRING,/^r?\"(\"|(?:[^\n\r\f])*?[^\\]\")/],[PR.PR_PLAIN,/^[a-z_$][a-z0-9_]*/i],[PR.PR_PUNCTUATION,/^[~!%^&*+=|?:<>/-]/],[PR.PR_LITERAL,/^\b0x[0-9a-f]+/i],[PR.PR_LITERAL,/^\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i],[PR.PR_LITERAL,/^\b\.\d+(?:e[+-]?\d+)?/i],[PR.PR_PUNCTUATION,/^[(){}\[\],.;]/]]),["dart"]);
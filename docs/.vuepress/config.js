module.exports = {
    locales: {
        '/': {
            base: '/',
            lang: 'zh-CN',
            title: 'Ronald Zhao\'s Blog',
            description: 'Stay hungary. Stay foolish. —— Steve Jobs',
            // 编辑链接文字
            editLinkText: '在 GitHub 上编辑此页',
            // Service Worker 的配置
            serviceWorker: {
                updatePopup: {
                    message: "检测到文章发生更新.",
                    buttonText: "刷新"
                }
            },
        }
    },
    head: [
        ['link', {rel: 'icon', href: '/logo.png'}]  // 设置博客的logo
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        // sidebar: 'auto',
        sidebar: {
          '/python3/': [
            '',// 放最新文章, 其他同理
            //'python-decorator',
            'generate-random-array',
            'python-electronjs',
            'blzyy',
            'closure',
            'interview',
            'multiple-inheritance-mixin',
            'traps',
            'yield-generator',
            'yield-from',
          ],
          '/lintcode/': [
            'level-0',
            'level-1',
            'level-2',
            'level-3',
            'level-4',
          ],
          '/leetcode/': [
            //'',
            'easy',
            'medium',
            'hard',
          ],
          '/newcoder/': [
              '',
          ],
          '/codewars/': [
            '',
          ],
          '/mysql/': [
            '',
          ],
          '/redis/': [
            '',
          ],
          '/algorithms/': [
            '',
            'algorithm-and-data-structure',
          ],
          '/guide/': [
            '',
            // 'aliyunos-install-nginx',
            //'kxsw',
          ],
          '/notes/': [
            '',
            'lastUpdated',
          ],
          '/devtools/': [
            '',
            // 'chocolatey',
            'powershell',
            'atom-flight-manual',
            'vscode-config',
            'from-pip-to-pipenv',
            'vim-screen-split',
            'git-cheatsheet'
          ],
          '/': [
            '',
            'about',
          ]
        },
        repo: 'https://github.com/RonaldZhao/RonaldZhao.github.io',
        // 默认是 false, 设置为 true 来启用
        editLinks: false,
        // 默认为 "Edit this page"
        editLinkText: '帮助我改善此页面！',
        // 最后更新时间
        lastUpdated: true,
        // search: false,
        // searchMaxSuggestions: 10,
        /*
        algolia: {
            apiKey: '',
            indexName: ''
        },
        */
        nav: [
            {text: 'Python3', link: '/python3/'},
            {
              text: '刷题',
              items: [
                {text: 'LintCode', link: '/lintcode/level-0'},
                {text: 'LeetCode', link: '/leetcode/easy'},
                {text: 'NerCoder', link: '/newcoder/'},
                {text: 'CodeWars', link: '/codewars/'},
              ]
            },
            {
              text: '数据库',
              items: [
                {text: 'MySQL', link: '/mysql/'},
                {text: 'Redis', link: '/redis/'},
              ]
            },
            {text: 'Algorithms', link: '/algorithms/'},
            {text: 'Guide', link: '/guide/'},
            {text: 'Notes', link: '/notes/'},
            {text: 'Tools', link: '/devtools/'},
            {text: 'About', link: '/about'},
            {text: '💗', link: '/love/'},
        ]
    },
}

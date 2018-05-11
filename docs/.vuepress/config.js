module.exports = {
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'RonaldZhao的博客',
            description: 'Stay hungary.Stay foolish. —— Steve Jobs'
        }
    },
    head: [
        ['link', {rel: 'icon', href: `/logo.png`}]
    ],
    themeConfig: {
        lastUpdated: '最后更新于',
        nav: [
            {text: 'Python3', link: '/python3/'},
            {text: 'Java', link: '/java/'},
            {text: 'Git', link: '/git/'},
            {text: '教程/指南', link: '/guide/'},
            {text: '开发工具', link: '/devtools/'},
            {text: '刷题集', link: '/stj/'},
            {text: '关于', link: '/about/'},
            { text: '💗', link: '/love/'},
        ],
        sidebarDepth: 0,
        sidebar: [
            {
                title: 'Python3',
                collapsable: true,
                children: [
                    '/python3/interview_question_list',
                    '/python3/closure',
                ]
            },
            {
                title: 'Java',
                collapsable: true,
                children: [
                    '/java/fasterinputforjava',
                ]
            },
            {
                title: 'Git',
                collapsable: true,
                children: [
                    '/git/cheatsheet',
                ]
            },
            {
                title: '教程/指南',
                collapsable: true,
                children: [
                    '/guide/fqguide',
                    '/guide/centosinstallnginxandhttps',
                ]
            },
            {
                title: '开发工具',
                collapsable: true,
                children: [
                    '/devtools/vimfp',
                ]
            },
        ],
        // algolia: {
        //     apiKey: '<API_KEY>',
        //     indexName: '<INDEX_NAME>'
        // }
        repo: 'RonaldZhao',
  }
}

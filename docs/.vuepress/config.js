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
        nav: [
            {text: '主页', link: '/'},
            { text: '关于', link: '/about/'},
            { text: 'love', link: '/love/index.html'}
        ],
        sidebarDepth: 0,
        sidebar: [
            {
                title: 'Python3',
                collapsable: true,
                children: [
                    '/blog/python3/',
                ]
            },
            {
                title: 'Java',
                collapsable: true,
                children: [
                    '/blog/java/fasterinputforjava',
                ]
            },
            {
                title: 'Git',
                collapsable: true,
                children: [
                    '/blog/git/',
                ]
            },
            {
                title: '教程/指南',
                collapsable: true,
                children: [
                    '/blog/guide/',
                    '/blog/guide/centosinstallnginxandhttps',
                ]
            },
            {
                title: '开发工具',
                collapsable: true,
                children: [
                    '/blog/devtools/vimfp',
                ]
            },
            {
                title: '刷题集',
                collapsable: true,
                children: [
                    '/blog/stj/',
                ]
            },
            '/about/'
        ],
        // algolia: {
        //     apiKey: '<API_KEY>',
        //     indexName: '<INDEX_NAME>'
        // }
        repo: 'RonaldZhao',
  }
}

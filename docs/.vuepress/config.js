module.exports = {
    locales: {
        '/': {
            base: '/',
            lang: 'zh-CN',
            title: 'Ronald Zhao \'s Blog',
            description: 'Stay hungary.Stay foolish. —— Steve Jobs',
            // 编辑链接文字
            editLinkText: '在 GitHub 上编辑此页',
            // Service Worker 的配置
            /*
            serviceWorker: {
                updatePopup: {
                    message: "发现新内容可用.",
                    buttonText: "刷新"
                }
            },
            */
        }
    },
    head: [
        ['link', {rel: 'icon', href: '/logo.png'}]  // 设置博客的logo
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        sidebar: 'auto',
        /*
        sidebar: [
            '/',
            '/about/',
        ],
        */
        repo: 'https://github.com/RonaldZhao/RonaldZhao.github.io',
        // 默认是 false, 设置为 true 来启用
        editLinks: true,
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
            {text: 'Notes', link: '/notes/'},
            {text: 'About', link: '/about/'},
            {text: '💗', link: '/love/'},
        ]
    },
}
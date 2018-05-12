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
            {text: 'codewars', link: '/codewars/'},
            {
                text: '开发工具的使用',
                items: [
                    {text: 'Git', link: '/devtools/git/'},
                    {text: 'Vim', link: '/devtools/vim/'},
                ]
            },
            {text: '关于', link: '/about/'},
            {text: '💗', link: '/love/'},
        ],
        sidebar: [
            {
                title: 'Python3',
                collapsable: true,
                children: [
                    '/python3/interview_question_list',
                    '/python3/closure',
                    '/python3/blzyy',
                    '/python3/pythonfullstack',
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
                title: '教程/指南',
                collapsable: true,
                children: [
                    '/guide/fqguide',
                    '/guide/centosinstallnginxandhttps',
                ]
            },
        ],
        repo: 'RonaldZhao',
  }
}

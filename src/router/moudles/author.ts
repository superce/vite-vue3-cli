import layout from '@/layout/index.vue'
import metaType from '../types';
const auth = [
    {
        path: '/',
        component: layout,
        name: 'bozhu',
        meta: {
          index:1,
          title: '博主素材',
          icon: 'icon-zhuboguanli',
          hidden: false,
        },
        redirect:'/author',
        children: [
            {
                path: '/author',
                name: 'Author',
                component: () => import('@/views/Author/Author.vue'),
                meta:<metaType> {
                  title: '文章博主',
                  icon: '',
                  hidden: false,
                }
            },
            {
              path: '/article',
              name: 'Aricle',
              component: () => import('@/views/Author/collectionArticle.vue'),
              meta:<metaType> {
                title: '采集文章',
                icon: '',
                hidden: false,
              }
          },
          {
            path: '/feed',
            name: 'Feed',
            component: () => import('@/views/Author/feed.vue'),
            meta:<metaType> {
              title: '文章贴文',
              icon: '',
              hidden: false,
            }
          },
        ]
    },
]
export default auth

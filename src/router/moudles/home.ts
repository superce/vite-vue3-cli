import layout from '@/layout/index.vue'
import metaType from '../types';
const auth = [
    {
        path: '/',
        component: layout,
        name: 'bozhu',
        meta: {
          index:1,
          title: 'Home',
          icon: 'icon-zhuboguanli',
          hidden: false,
        },
        redirect:'/author',
        children: [
            {
                path: '/author',
                name: 'Author',
                component: () => import('@/views/Home/index.vue'),
                meta:<metaType> {
                  title: 'Home',
                  icon: '',
                  hidden: false,
                }
            }
        ]
    },
]
export default auth

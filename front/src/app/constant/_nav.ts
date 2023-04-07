export const navbar={

    menus : [
        {
            path:'dashboard',
            text:'Dashboard',
            roles:['admin','user'],
        },
        {
            path:'register',
            text:'Add User',
            roles:['admin']
        },
        {
            path:'users',
            text:'Users',
            roles:['admin']
        },
        {
            path:'update',
            text:'Update',
            roles:['user']
        },
        {
            path:'user-profile',
            text:'My Profile',
            roles:['admin','user']
        }
    ]
}
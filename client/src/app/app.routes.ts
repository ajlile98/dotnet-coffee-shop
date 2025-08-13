import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { CustomerList } from '../features/customers/customer-list/customer-list';
import { CustomerDetailed } from '../features/customers/customer-detailed/customer-detailed';
import { Lists } from '../features/lists/lists';
import { Messages } from '../features/messages/messages';
import { Menu } from '../features/menu/menu';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [
    {path: '', component: Home},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {path: 'customers', component: CustomerList},
            {path: 'customers/:id', component: CustomerDetailed},
            {path: 'lists', component: Lists},
            {path: 'messages', component: Messages},
            {path: 'menu', component: Menu},
        ]
    },
    {path: '**', component: Home},
];

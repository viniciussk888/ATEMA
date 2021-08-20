import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import homeFill from '@iconify/icons-eva/home-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import folderFill from '@iconify/icons-eva/folder-add-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Inicío',
    path: '/dashboard/app',
    icon: getIcon(homeFill)
  },
  {
    title: 'Atlas toponímico',
    path: '/dashboard/atlas',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'Relacionar dados',
    path: '/dashboard/products',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'Usuários',
    path: '/dashboard/users',
    icon: getIcon(personAddFill)
  },
  {
    title: 'Dados',
    path: '/register',
    icon: getIcon(folderFill)
  }
];

export default sidebarConfig;

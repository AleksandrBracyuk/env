import createMenu from './menu';
var menu = createMenu(['Vendors', 'Группы продуктов', 'Категории продуктов', 'Пользователи', 'Продукция',
    'Контрагенты', 'SO (Ордера заказа)'], 'menu');
document.body.appendChild(menu);

export default function (array, className) {

    var listItems = '<ul class="menu">';
    array.forEach(function (item) {
        listItems += '<li class="menu-item ' + item.class + '">' + item.name + '</li>';
    });
    listItems += '</ul>'

    return listItems;
};

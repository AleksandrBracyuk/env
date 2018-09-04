import './assets/styles/styles.scss'

import $ from 'jquery';
import createMenu from './assets/js/menu';
import Backbone from 'backbone';
import _ from 'underscore';

window.App = {
    token: '95790e3c92674a2686ef788a013053a5',
    Models: {},
    Views: {},
    Collections: {}
};

var menu = createMenu([
    {
        name: 'Vendors', class: 'vendors'
    },
    {
        name: 'Группы продуктов', class: 'c1'
    },
    {
        name: 'Категории продуктов', class: 'c2'
    },
    {
        name: 'Пользователи', class: 'c3'
    },
    {
        name: 'Продукция', class: 'c4'
    },
    {
        name: 'Контрагенты', class: 'c5'
    },
    { name: 'SO (Ордера заказа)', class: 'c6' }], 'menu');

$('div.menu').html(menu);
$('.menu-item').click(function (e) {
    $('div.page').html("<h1>" + $(e.target).text() + "</h1><br/><h3>"
        + $(e.target).attr('class').split(' ').join('.')
        + "</h3>");
    // console.log(e);
    switch ($(e.target).attr('class').split(' ').join('.')) {
        case 'menu-item.vendors':

            break;
        default:
            break;
    }
});


// App.Models.Authentication = Backbone.Model.extend({
//     default: {},
//     urlRoot: 'http://localhost:14003/Api/v1/Authentication/Login'
// });
// window.authentication = Backbone.sync("create",
//     { login: "matt.winter@sourcemaster.pro", password: "sm123ABC456!" }

//     new window.App.Models.Authentication();
// window.authentication.create(
//     {
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader('Authorization', 'Bearer ' + App.token);
//         }
//     { login: "matt.winter@sourcemaster.pro", password: "sm123ABC456!" });
// console.log(window.authentication);

App.Models.Vendor = Backbone.Model.extend({
    default: { name: '', id: '' },
    urlRoot: 'http://localhost:14003/Api/v1/Vendors'
});
App.Collections.Vendors = Backbone.Collection.extend({
    model: App.Models.Vendor,
    url: 'http://localhost:14003/Api/v1/Vendors'
});

App.Views.Vendor = Backbone.View.extend({
    tagname: 'li',
    template: _.template('<strong> <%= name %> </strong> ( <%= id %>)'),
    initialize: function () { this.render(); },
    render: function () {
        // console.log(this.model);
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
})
App.Views.Vendors = Backbone.View.extend({
    tagname: 'ul',
    initialize: function () {
        // console.log(this.collection);
    },
    render: function () {
        // console.log(this.collection);
        this.collection.each(function (item) {
            console.log('item');
            var itemView = new App.Views.Vendor({ model: item });
            this.$el.append(itemView.render().el);
        }, this);
        return this;
    }
})

// window.vendors = new window.App.Collections.Vendors();
// window.vendors.fetch({
//     beforeSend: function (xhr) {
//         xhr.setRequestHeader('Authorization', 'Bearer ' + App.token);
//     }
// });

// // console.log(window.vendors);
// var viewVendors = new App.Views.Vendors({ collection: window.vendors });
// console.log(viewVendors);
// $('div.page').html(viewVendors.render().$el);

$.ajax({
    url: "http://localhost:14003/Api/v1/Authentication/Login",
    type: 'POST',
    contentType: 'application/json',
    data: '{"login":"matt.winter@sourcemaster.pro","password":"sm123ABC456!"}',
    success: function (resp) {
        window.App.token = resp.token;
        console.log('success', resp.token);

        window.vendors = new window.App.Collections.Vendors();
        window.vendors.fetch({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + App.token);
            }
        });
        console.log(window.vendors);

        var viewVendors = new App.Views.Vendors({ collection: window.vendors });
        console.log(viewVendors);
        $('div.page').html(viewVendors.render().$el);

    },
    error: function () { console.log('error'); }
});

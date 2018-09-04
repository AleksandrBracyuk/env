import { Model, View, Collection } from "backbone"
import $ from "jquery"
import _ from "underscore"
import './assets/styles/styles.scss'


(function () {
    window.App = {
        Models: {},
        Views: {},
        Collections: {}
    };

    //хэлпер шаблона
    window.template = function (id) {
        return _.template('<strong><%= name %></strong> (<%= age %>) - <%= job %>');
    };



    // //Модель человека
    // App.Models.Person = Model.extend({
    //     defaults: {
    //         name: 'Иван Петров',
    //         age: 40,
    //         job: 'слесарь'
    //     }
    // });


    //Список людей
    App.Collections.People = Collection.extend({
        model: App.Models.Person
    });


    //Вид списка людей
    App.Views.People = View.extend({
        tagName: 'ul',

        initialize: function () {
        },

        render: function () {
            this.collection.each(function (person) {
                var personView = new App.Views.Person({ model: person });

                this.$el.append(personView.render().el);
            }, this);

            return this;
        }

    });


    //Вид одного человека
    App.Views.Person = View.extend({
        tagName: 'li',

        template: template('person-id'),


        initialize: function () {
            this.render();
        },

        render: function () {
            //замечательный шаблон
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });


    var peopleCollection = new App.Collections.People([
        {
            name: 'Петр',
            age: 20,
            job: 'Таксист'
        },
        {
            name: 'Олег',
            age: 24,
            job: 'Менеджер'
        },
        {
            name: 'Анна',
            age: 18,
            job: 'Студентка'
        }
    ]);

    var peopleView = new App.Views.People({ collection: peopleCollection });

    $('#root').append(peopleView.render().el);

    console.log(App.Models);

}());

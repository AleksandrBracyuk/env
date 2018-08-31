import { Model, View, Collection } from "backbone"
import $ from "jquery"
import _ from "underscore"

//Модель человека
App.Models.Person = Model.extend({
    defaults: {
        name: 'Иван Петров',
        age: 40,
        job: 'слесарь'
    }
});

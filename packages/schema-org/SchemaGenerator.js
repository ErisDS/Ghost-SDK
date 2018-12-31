const _ = require('lodash');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const nameRegExp = /\/(.*)\.hbs/;

const trim = (schema) => {
    var schemaObject = {};

    _.each(schema, function (value, key) {
        if (!_.isNil(value) && !_.isEmpty(value)) {
            schemaObject[key] = value;
        }
    });

    return schemaObject;
};

class SchemaGenerator {
    constructor(options) {
        this.options = options || {};

        this.loadTemplates();
        this.loadPartials();
    }

    loadTemplates() {
        let templateFiles = glob.sync('templates/*.hbs', {cwd: __dirname});
        this.templates = {};
        _.forEach(templateFiles, (templatePath) => {
            let name = templatePath.match(nameRegExp)[1];
            let template = fs.readFileSync(path.join(__dirname, templatePath)).toString();
            this.templates[name] = handlebars.compile(template);
        });
    }

    loadPartials() {
        let partialFiles = glob.sync('partials/*.hbs', {cwd: __dirname});
        _.forEach(partialFiles, (partialPath) => {
            let name = partialPath.match(nameRegExp)[1];
            let partial = fs.readFileSync(path.join(__dirname, partialPath)).toString();
            handlebars.registerPartial(name, partial);
        });
    }

    finalize(jsonString) {
        let json = JSON.parse(jsonString);

        return trim(json);
    }

    createSchema(type, data) {
        if (!_.has(this.templates, type)) {
            type = 'home';
        }

        return this.finalize(
            this.templates[type](data)
        );
    }
}

module.exports = SchemaGenerator;

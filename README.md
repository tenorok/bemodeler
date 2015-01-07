# Bemodeler — Data store for [i-bem.js](http://tenorok.github.io/get-i-bem/)

[:ru: Bemodeler — Хранилище данных для i-bem.js](README.ru.md)

BEM — is methodology for effective web-development. More information at http://ru.bem.info.

[I-bem.js](http://tenorok.github.io/get-i-bem/) — is library for writting client side JavaScript with [BEM](http://ru.bem.info/libs/bem-bl/dev/desktop.sets/i-bem/).

`Bemodeler` — is extension for `i-bem`, which realizing ability to store data of block in separate place and ability to declaration this data in simple models.

## Install

    bower install bemodeler

### Include

For working `bemodeler` requires `i-bem`, which in turn requires `jquery`.

After install `bemodeler` from `bower` by dependencies will be installed the latest version of `i-bem` and `jquery`.

Group of abovementioned technologies working only in browser, where should be include all three libraries in the following order:

```html
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/i-bem/i-bem.min.js"></script>
<script src="bower_components/bemodeler/bemodeler.min.js"></script>
```

## Usage

`Bemodeler` adds method `model` in `this` each block.
This method accepts one or two parameters depending on what gets or sets the value for specified field in the model.

For example, let's take arbitrary block:

```js
BEM.decl('block', {});
var block = BEM.create('block');
```

Now lets's add to received instance of the block in the model property `greeter` with the value `hello world`:

```js
block.model('greeter', 'hello world'); // → block
```

After call with two parameters, method `model` returns block, for ability write the call chain.

Now values of property `greeter` stored in `bemodeler` and we can get it by calling the method `model` with one parameter:

```js
block.model('greeter'); // → 'hello world'
```

## Declaration models

Models declared similarly as block in `i-bem`:

```js
BEM.decl('block', {});
BEM.model('block', {});
```

Model always should be declared in scope `BEM` even if block was declared in scope `BEM.DOM`:

```js
BEM.DOM.decl('button', {});
BEM.model('button', {});
```

To declaring model for the block with modifiers `bemodeler` supports syntax similar `i-bem`.

Example declaration of model by the name of block modifier:

```js
BEM.model({ block: 'component', modName: 'disabled' }, {});
```

Example declaration of model by the name and value of block modifier:

```js
BEM.model({ block: 'component', modName: 'type', modVal: 'text' }, {});
```

### Property `value`

Property `value` used for preset the default value of data in model declaration.

Example for block `component`:

```js
BEM.decl('component', {});
```

Declaring property `name` with preset value:

```js
BEM.model('component', {
    name: { value: 'Jhon' }
});
```

This value will be set for block `component` by default:

```js
BEM.create('component').model('name'); // → 'Jhon'
```

If you need to make certain calculations, it is possible to pass a function in the value of property `value`. Context of this function will be the block:

```js
BEM.model('component', {
    name: { value: function() {
        return this.__self.getName();
    }}
});
BEM.create('component').model('name'); // → 'component'
```

### Property `get`

For data processing when trying their getting, in model declaration you can use property `get`.

Property `get` takes a function, which is passed one parameter — current value of the model for the described property.

Example for block `component`:

```js
BEM.decl('component', {});
```

Let's declare property `name` with handler on getting:

```js
BEM.model('component', {
    name: {
        value: 'Steve',
        get: function(value) {
            return value.toUpperCase();
        }
    }
});
BEM.create('component').model('name'); // → 'STEVE'
```

### Property `set`

For data processing when setting their values, in model declaration you can use property `set`.

Property `set` takes a function, which is passed two parameters:
* new value
* current value

Example for block `component`:

```js
BEM.decl('component', {});
```

Let's declare property `count` with handler on setting value:

```js
BEM.model('component', {
    count: {
        value: 30,
        set: function(value, currentValue) {
            return value < 100 ? value : currentValue;
        }
    }
});
var component = BEM.create('component');
component.model('count', 50).model('count'); // → 50
component.model('count', 150).model('count'); // → 50
```

## Specifying properties in JS-parameters

Data values may be specified in property `model` of JS-parameters block.

Example for block `component`:

```js
BEM.decl('component', {});
```

Let's declare model with property `name`:

```js
BEM.model('component', {
    name: { value: 'Jhon' }
});
```

Let's create an instance of the block `component` with specifying the values for properties of his model.

```js
var component = BEM.create('component', { model: {
    name: 'Steve'
}});
```

The values specified in JS-parameters of block take precedence over the values specified in declaration of model:

```js
component.model('name'); // → 'Steve'
```

The field `model` not available directly in the block parameters:

```js
component.params.model; // → undefined
```

# Bemodeler — Хранилище данных для [i-bem.js](http://tenorok.github.io/get-i-bem/)

БЭМ — это методология эффективной разработки веб-приложений.
Большое количество информации размещено на официальном сайте http://ru.bem.info.

[I-bem.js](http://tenorok.github.io/get-i-bem/) — это бибилотека для
написания клиентского JavaScript по методологии [БЭМ](http://ru.bem.info/libs/bem-bl/dev/desktop.sets/i-bem/).

`Bemodeler` — это дополнение к `i-bem`, которое реализует
возможность хранения данных блока в отдельном месте и
возможность декларации данных в простых моделях.

## Установка

    bower install bemodeler

### Подключение

Для работы `bemodeler` требуется `i-bem`, а для работы `i-bem` требуется `jquery`.

После установки `bemodeler` из `bower` по зависимостям будут так же установлены
последние версии `i-bem` и `jquery`.

Связка вышеуказанных технологий работает только в браузере,
где необходимо подключить все три библиотеки в следующем порядке:

```html
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/i-bem/i-bem.min.js"></script>
<script src="bower_components/bemodeler/bemodeler.min.js"></script>
```

## Использование

`Bemodeler` добавляет в `this` каждого блока метод `model`.
Этот метод принимает один или два параметра, в зависимости от чего
возвращает или устанавливает значение для указанного поля в моделе.

Например, возьмём произвольный блок:

```js
BEM.decl('block', {});
var block = BEM.create('block');
```

Теперь добавим полученному экземпляру блока в модель
поле `greeter` со значением `hello world`:

```js
block.model('greeter', 'hello world'); // → block
```

После вызова с двумя параметрами, метод `model` возвращает
блок, для возможности записи цепочек вызовов.

Теперь значение поля `greeter` хранится в `bemodeler` и его можно
получить, вызвав метод `model` с одним параметром:

```js
block.model('greeter'); // → 'hello world'
```

## Декларация моделей

Модель декларируется точно так же, как блок в `i-bem`:

```js
BEM.decl('block', {});
BEM.model('block', {});
```

Модель декларируется всегда в области `BEM`,
даже если блок задекларирован в области `BEM.DOM`:

```js
BEM.DOM.decl('button', {});
BEM.model('button', {});
```

`Bemodeler` поддерживает аналогичный `i-bem` синтаксис декларации моделей
для блоков с модификаторами.

Пример декларации модели по имени модификатора блока:

```js
BEM.model({ block: 'component', modName: 'disabled' }, {});
```

Пример декларации модели по имени и значению модификатора блока:

```js
BEM.model({ block: 'component', modName: 'type', modVal: 'text' }, {});
```

### Поле `value`

Для предустановки стандартного значения данных,
в декларации модели возможно использование поля `value`.

Например, для блока `component`:

```js
BEM.decl('component', {});
```

Задекларируем поле `name` с предзаданным значением:

```js
BEM.model('component', {
    name: { value: 'Jhon' }
});
```

Это значение будет установлено для блока `component` по умолчанию:

```js
BEM.create('component').model('name'); // → 'Jhon'
```

При необходимости произвести некие вычисления, в значение полю `value`
возможно передать функцию, контекстом которой будет являться блок:

```js
BEM.model('component', {
    name: { value: function() {
        return this.__self.getName();
    }}
});
BEM.create('component').model('name'); // → 'component'
```

### Поле `get`

Для обработки данных при попытке их получения,
в декларации модели возможно использование поля `get`.

Поле `get` принимает функцию, в которую передаётся
один параметр — текущее значение модели для описываемого поля.

Например, для блока `component`:

```js
BEM.decl('component', {});
```

Задекларируем поле `name` с обработчиком на получение:

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

### Поле `set`

Для обработки данных при установке их значения,
в декларации модели возможно использование поля `set`.

Поле `set` принимает функцию, в которую передаётся
два параметра
* новое значение
* текущее значение

Например, для блока `component`:

```js
BEM.decl('component', {});
```

Задекларируем поле `count` с обработчиком на установку:

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

## Указание полей в JS-параметрах

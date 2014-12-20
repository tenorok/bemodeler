describe('The declaration model with `set` property.', function() {

    var block;

    BEM.decl('blockSet', {});

    beforeEach(function() {
        block = BEM.create('blockSet');
    });

    afterEach(function() {
        block = null;
    });

    BEM.model('blockSet', {
        name: {
            value: 'Jhon',
            set: function(value) {
                return (value + '').toUpperCase() + '!';
            }
        },
        context: { set: function() {
            return this;
        }},
        count: { set: function(value, currentValue) {
            return value < 100 ? value : currentValue;
        }}
    });

    it('Default value should be preset using `set` context', function() {
        assert.equal(block.model('name'), 'JHON!');
    });

    it('Should be call `set` callback', function() {
        assert.equal(block.model('name', 'Steve').model('name'), 'STEVE!');
    });

    it('In `set` callback, context should store the block', function() {
        assert.deepEqual(block.model('context'), block);
    });

    it('`Set` callback should take current value as second parameter', function() {
        assert.equal(block.model('count', 20).model('count'), 20);
        assert.equal(block.model('count', 150).model('count'), 20);
    });

});

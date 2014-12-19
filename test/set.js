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

});

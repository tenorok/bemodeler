describe('The declaration model with `get` property.', function() {

    var block;

    BEM.decl('blockGet', {});

    beforeEach(function() {
        block = BEM.create('blockGet');
    });

    afterEach(function() {
        block = null;
    });

    BEM.model('blockGet', {
        name: { get: function(value) {
            return (value + '').toUpperCase() + '!';
        }},
        context: { get: function() {
            return this;
        }}
    });

    it('Should be call `get` callback', function() {
        assert.equal(block.model('name'), 'UNDEFINED!');
        assert.deepEqual(block.model('name', 'Steve'), block);
        assert.equal(block.model('name'), 'STEVE!');
    });

    it('In `get` callback, context should store the block', function() {
        assert.deepEqual(block.model('context'), block);
    });

});

describe('The declaration model with `value` property.', function() {

    var block;

    BEM.decl('blockValue', {});

    beforeEach(function() {
        block = BEM.create('blockValue');
    });

    afterEach(function() {
        block = null;
    });

    BEM.model('blockValue', {
        name: { value: 'Jhon' }
    });

    it('Property `name` should be preset', function() {
        assert.equal(block.model('name'), 'Jhon');
    });

    BEM.model('blockValue', {
        count: { value: function() { return 100 + 50; }}
    });

    it('Model value can be function', function() {
        assert.equal(block.model('count'), 150);
    });

    BEM.model('blockValue', {
        context: { value: function() {
            return this;
        }}
    });

    it('In value as function, context should store the block', function() {
        assert.equal(block.model('context'), block);
    });

});

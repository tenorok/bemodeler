describe('Set model values in block parameters.', function() {

    var block;

    BEM.decl('blockParams', {});

    beforeEach(function() {
        block = BEM.create('blockParams', { model: {
            name: 'Steve',
            count: 24,
            undecl: true
        }});
    });

    afterEach(function() {
        block = null;
    });

    BEM.model('blockParams', {
        name: {
            value: 'Jhon'
        },
        count: { set: function(value, currentValue) {
            return value < 100 ? value : currentValue;
        }}
    });

    it('Default value should be taken from block parameters', function() {
        assert.equal(block.model('count'), 24);
        assert.equal(block.model('count', 67).model('count'), 67);
    });

    it('Default value should be taken from block parameters with higher priority than model declaration', function() {
        assert.equal(block.model('name'), 'Steve');
    });

    it('Should preset model property from js-parameters even though this property not declared in model', function() {
        assert.isTrue(block.model('undecl'));
    });

    it('Parameter `model` should be deleted', function() {
        assert.isUndefined(block.params.model);
    });

});

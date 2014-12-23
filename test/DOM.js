describe('The declaration DOM block.', function() {

    var block,
        block2;

    BEM.DOM.decl('blockDOM', {});
    BEM.DOM.decl('blockDOM2', {});

    beforeEach(function() {
        block = BEM.DOM.append($('body'), bemer({
            block: 'blockDOM',
            js: true
        })).bem('blockDOM');

        block2 = BEM.DOM.append($('body'), bemer({
            block: 'blockDOM2',
            js: { model: { current: true }}
        })).bem('blockDOM2');
    });

    afterEach(function() {
        BEM.DOM.destruct(block.domElem);
        BEM.DOM.destruct(block2.domElem);
    });

    BEM.model('blockDOM', {
        position: {
            value: 5,
            set: Number
        }
    });

    BEM.model('blockDOM2', {
        context: {
            value: function() {
                return this;
            }
        }
    });

    it('Model should work for DOM block', function() {
        assert.equal(block.model('position'), 5);
        assert.equal(block.model('position', '14').model('position'), 14);
    });

    it('In `value` callback, context should store the block', function() {
        assert.deepEqual(block2.model('context'), block2);
    });

    it('Default value should be taken from block parameters', function() {
        assert.isTrue(block2.model('current'));
    });

});

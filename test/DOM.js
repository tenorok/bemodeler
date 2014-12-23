describe('The declaration DOM block.', function() {

    var block;

    BEM.DOM.decl('blockDOM', {});

    beforeEach(function() {
        block = BEM.DOM.append($('body'), bemer({
            block: 'blockDOM',
            js: true
        })).bem('blockDOM');
    });

    afterEach(function() {
        BEM.DOM.destruct(block.domElem);
    });

    BEM.model('blockDOM', {
        position: {
            value: 5,
            set: Number
        }
    });

    it('Model should work for DOM block', function() {
        assert.equal(block.model('position'), 5);
        assert.equal(block.model('position', '14').model('position'), 14);
    });

});

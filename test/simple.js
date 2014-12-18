describe('Simple test.', function() {

    describe('Block without DOM.', function() {
        var block,
            block2;

        BEM.decl('block', {});
        BEM.decl('block2', {});

        beforeEach(function() {
            block = BEM.create('block');
            block2 = BEM.create('block2');
        });

        afterEach(function() {
            block = null;
            block2 = null;
        });

        it('Should automatically be added method with name `model` to every block', function() {
            assert.isUndefined(block.model('value'));
            assert.deepEqual(block.model('value', 'hello world'), block);
            assert.equal(block.model('value'), 'hello world');
        });

        it('Value can be `undefined`', function() {
            assert.isUndefined(block.model('size'));
            assert.deepEqual(block.model('size', 100), block);
            assert.equal(block.model('size'), 100);
            assert.deepEqual(block.model('size', undefined), block);
            assert.isUndefined(block.model('size'));
        });

        it('Block models should not affect each other', function() {
            assert.isUndefined(block2.model('value'));
        });

    });

});

describe('Simple test.', function() {

    describe('Block without DOM.', function() {
        var block;

        beforeEach(function() {
            BEM.decl('block', {});
            block = BEM.create('block');
        });

        afterEach(function() {
            block = null;
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
    });

});

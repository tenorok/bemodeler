describe('The declaration blocks with modifiers.', function() {

    describe('The declaration block with only `modName` property.', function() {
        var block,
            blockDecl = { block: 'component', modName: 'disabled' };

        BEM.decl(blockDecl, {});
        BEM.model(blockDecl, {
            size: { value: 'large' }
        });

        beforeEach(function() {
            block = BEM.create({ block: 'component', mods: { disabled: true }});
        });

        afterEach(function() {
            block = null;
        });

        it('Property `name` should be preset', function() {
            assert.equal(block.model('size'), 'large');
        });

    });

    describe('The declaration block with both `modName` and `modVal` properties.', function() {
        var block,
            blockDecl = { block: 'component', modName: 'type', modVal: 'text' };

        BEM.decl(blockDecl, {});
        BEM.model(blockDecl, {
            val: { value: 'Yo!' }
        });

        beforeEach(function() {
            block = BEM.create({ block: 'component', mods: { type: 'text' }});
        });

        afterEach(function() {
            block = null;
        });

        it('Property `name` should be preset', function() {
            assert.equal(block.model('val'), 'Yo!');
        });

    });

});

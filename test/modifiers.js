describe('The declaration blocks with modifiers.', function() {

    describe('The declaration block with only `modName` property.', function() {
        var block,
            blockMod,
            blockModDecl = { block: 'component', modName: 'disabled' };

        BEM.decl('component', {});
        BEM.decl(blockModDecl, {});
        BEM.model(blockModDecl, {
            size: { value: 'large' }
        });

        beforeEach(function() {
            block = BEM.create('component');
            blockMod = BEM.create({ block: 'component', mods: { disabled: true }});
        });

        afterEach(function() {
            block = null;
            blockMod = null;
        });

        it('Block without modifier should not have property `size`', function() {
            assert.isUndefined(block.model('size'));
        });

        it('Property `size` should be preset', function() {
            assert.equal(blockMod.model('size'), 'large');
        });

    });

    describe('The declaration block with both `modName` and `modVal` properties.', function() {
        var block,
            blockMod,
            blockModVal,
            blockDecl = { block: 'component', modName: 'type', modVal: 'text' };

        BEM.decl('component', {});
        BEM.decl({ block: 'component', modName: 'type' }, {});
        BEM.decl(blockDecl, {});
        BEM.model(blockDecl, {
            val: { value: 'Yo' }
        });
        BEM.model(blockDecl, {
            val: { value: 'Yo!' },
            count: { value: 50 }
        });

        beforeEach(function() {
            block = BEM.create('component');
            blockMod = BEM.create({ block: 'component', mods: { type: true }});
            blockModVal = BEM.create({ block: 'component', mods: { type: 'text' }});
        });

        afterEach(function() {
            block = null;
            blockMod = null;
            blockModVal = null;
        });

        it('Block without modifier should not have property `val`', function() {
            assert.isUndefined(block.model('val'));
            assert.isUndefined(block.model('count'));
        });

        it('Block without modifier value should not have property `val`', function() {
            assert.isUndefined(blockMod.model('val'));
            assert.isUndefined(blockMod.model('count'));
        });

        it('Property `val` should be preset with overridden value', function() {
            assert.equal(blockModVal.model('val'), 'Yo!');
            assert.equal(blockModVal.model('count'), 50);
        });

    });

});

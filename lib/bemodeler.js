(function($, BEM, undefined) {

    /**
     * Declaration of block.
     * Block name as string or description as hash.
     *
     * @typedef {string|{}} Bemodeler~decl
     * @property {string} block|name Block name
     * @property {string} [modName] Modifier name
     * @property {string} [modVal] Modifier value
     */

    /**
     * Model list.
     *
     * @example
     * {
     *     button: {
     *         __withoutMod: { value: 'press me' },
     *         disabled: {
     *             true: { name: 'off' }
     *         }
     *     },
     *     input: {
     *         __withoutMod: {},
     *         size: {
     *             small: { maxlength: 80 }
     *         }
     *     }
     * }
     *
     * @private
     * @property {{}} * Block name
     * @property {{}} *.__withoutMod Properties for block without modifiers
     * @property {{}} [*.*] Modifier values
     * @property {{}} [*.*.*] Properties for block with current modifier
     */
    var models = {};

    /**
     * Set properties to model.
     *
     * @private
     * @param {{}} props Properties to set into model
     */
    function setModelProps(props) {
        for(var key in props) { if(props.hasOwnProperty(key)) {
            var val = props[key].value;
            this.model(key, typeof val === 'function' ? val.call(this) : val);
        }}
    }

    this.BEM = $.inherit(BEM, {

        /**
         * @override
         */
        __constructor: function() {
            this.__base.apply(this, arguments);

            /**
             * Store for property of block model.
             *
             * @private
             * @type {{}}
             */
            this._modelProps = {};

            var model = models[this.__self.getName()];
            if(!model) return;

            setModelProps.call(this, model.__withoutMod);

            var mods = this._modCache;
            for(var modName in mods) { if(mods.hasOwnProperty(modName)) {
                if(!model[modName]) continue;
                var props = model[modName][mods[modName]];
                if(!props) continue;

                setModelProps.call(this, props);
            }}
        },

        /**
         * Get/set model property.
         *
         * @param {string} name Property name
         * @param {*} [value] Property value
         * @returns {BEM|*}
         */
        model: function(name, value) {
            var props = this._modelProps;

            if(arguments.length === 1) {
                return (props[name] || {}).value;
            }

            if(props[name] === undefined) {
                props[name] = {};
            }

            props[name].value = value;
            return this;
        }

    });

    /**
     * Declare block model.
     *
     * @static
     * @param {Bemodeler~decl} decl Declaration of block
     * @param {{}} [props] Model properties
     */
    this.BEM.model = function(decl, props) {
        if(typeof decl === 'string') {
            decl = { block: decl };
        } else if(decl.name) {
            decl.block = decl.name;
        }

        var block = decl.block,
            modName = decl.modName,
            modVal = decl.modVal,
            key;

        if(!models[block]) {
            models[block] = {
                __withoutMod: {}
            };
        }

        if(modName === undefined) {
            for(key in props) { if(props.hasOwnProperty(key)) {
                models[block].__withoutMod[key] = props[key];
            }}
            return;
        }

        if(!models[block][modName]) {
            models[block][modName] = {};
        }

        if(modVal === undefined) {
            modVal = true;
        }

        if(!models[block][modName][modVal]) {
            models[block][modName][modVal] = {};
        }

        for(key in props) { if(props.hasOwnProperty(key)) {
            models[block][modName][modVal][key] = props[key];
        }}
    };

})($, BEM);

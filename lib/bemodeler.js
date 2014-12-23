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
     *         __withoutMod: {
     *             text: { value: 'press me' }
     *         },
     *         disabled: {
     *             true: {
     *                 name: {
     *                     get: function(value) { return value.toLowerCase(); }
     *                     set: function(value) { return value.toUpperCase(); }
     *                 }
     *             }
     *         }
     *     },
     *     input: {
     *         __withoutMod: {},
     *         size: {
     *             small: {
     *                 maxlength: { value: 80 }
     *             }
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
        var modelProps = this._modelProps;

        for(var name in props) { if(props.hasOwnProperty(name)) {
            var prop = props[name],
                val = this._paramsModel[name] || prop.value;

            if(modelProps[name] === undefined) {
                modelProps[name] = {};
            }

            modelProps[name].get = prop.get;
            modelProps[name].set = prop.set;

            this.model(name, typeof val === 'function' ? val.call(this) : val);
        }}
    }

    /**
     * Prototype section for extend BEM and BEM.DOM.
     *
     * @type {{}}
     */
    var prototype = {

        /**
         * @override
         */
        __constructor: function(modsOrDomElem, params) {
            params = params || {};
            if(params.model) {

                /**
                 * Store for model values from block parameters.
                 *
                 * @private
                 * @type {{}}
                 */
                this._paramsModel = params.model;

                delete params.model;
            } else {
                this._paramsModel = {};
            }

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

            setModelProps.call(this, this._paramsModel);
        },

        /**
         * Get/set model property.
         *
         * @param {string} name Property name
         * @param {*} [value] Property value
         * @returns {BEM|*}
         */
        model: function(name, value) {
            var props = this._modelProps,
                prop = props[name];

            if(arguments.length === 1) {
                if(prop === undefined) return;
                return prop.get ? prop.get.call(this, prop.value) : prop.value;
            }

            if(props[name] === undefined) {
                prop = props[name] = {};
            }

            props[name].value = prop.set ? prop.set.call(this, value, prop.value) : value;
            return this;
        }

    };

    this.BEM = $.inherit(BEM, prototype);
    this.BEM.DOM = $.inherit(BEM.DOM, prototype);

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

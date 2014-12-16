(function($, BEM, undefined) {

    /**
     * Declaration of block.
     * Block name as string or description as hash.
     *
     * @typedef {string|{}} Bemodeler~decl
     * @property {string} decl.block|decl.name Block name
     * @property {string} [decl.modName] Modifier name
     * @property {string} [decl.modVal] Modifier value
     */

    /**
     * Normalized declaration of block.
     *
     * @typedef {{}} Bemodeler~normalizedDecl
     * @property {string} decl.block Block name
     * @property {string} [decl.modName] Modifier name
     * @property {string} [decl.modVal] Modifier value
     */

    /**
     * Information about model.
     *
     * @typedef {{}} Bemodeler~modelInfo
     * @property {Bemodeler~normalizedDecl} decl Declaration of block model
     * @property {{}} props Model properties
     */

    /**
     * Model list.
     *
     * @private
     * @type {Bemodeler~modelInfo[]}
     */
    var models = [];

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

            for(var i = 0; i < models.length; i++) {
                if(this.__self.getName() !== models[i].decl.block) continue;

                var props = models[i].props;
                for(var key in props) { if(props.hasOwnProperty(key)) {
                    this.model(key, props[key].value);
                }}
            }
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

        models.push({
            decl: decl,
            props: props
        });
    };

})($, BEM);

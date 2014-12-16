(function($, BEM, undefined) {

    this.BEM = $.inherit(BEM, {

        /**
         * Set/get model property.
         *
         * @param {string} name Property name
         * @param {*} [value] Property value
         * @returns {BEM|*}
         */
        model: function(name, value) {
            if(this.model.__props === undefined) {
                this.model.__props = {};
            }

            var props = this.model.__props;

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

})($, BEM);

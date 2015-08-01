/* jshint ignore:start */

/* jshint ignore:end */

define('config/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var ApplicationAdapter;

  ApplicationAdapter = DS['default'].ActiveModelAdapter.extend({
    namespace: 'apiv2'
  });

  exports['default'] = ApplicationAdapter;

});
define('config/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'config/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('config/components/adaptive-camera', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var AdaptiveCameraComponent;

  AdaptiveCameraComponent = Ember['default'].Component.extend({
    classNames: ["adaptive-camera"],
    acceptableTypes: ["img-cgi", "user-media"],
    isImageCam: Ember['default'].computed.alias("camera.isImageCam"),
    isWebCam: Ember['default'].computed.alias("camera.isWebCam"),
    isKnown: Ember['default'].computed.alias("camera.isKnown")
  });

  exports['default'] = AdaptiveCameraComponent;

});
define('config/components/blank-tile', ['exports', 'ember', 'config/components/just-tile'], function (exports, Ember, JustTile) {

  'use strict';

  var BlankTile;

  BlankTile = JustTile['default'].extend({
    width: Ember['default'].computed.alias('parentView.pxPerWidth'),
    height: Ember['default'].computed.alias('parentView.pxPerHeight'),
    cornerX: 0,
    cornerY: 0,
    strokeWidth: 0.75,
    stroke: '#434343',
    fill: '#fff',
    hideText: true,
    tileType: 'blank',
    eventManager: Ember['default'].Object.create({
      mouseEnter: function mouseEnter(event, view) {
        return view.set('hideText', false);
      },
      mouseLeave: function mouseLeave(event, view) {
        return view.set('hideText', true);
      },
      click: function click(event, view) {
        return view.sendAction('action', view.get('model'), event);
      }
    })
  });

  exports['default'] = BlankTile;

});
define('config/components/ember-modal-dialog-positioned-container', ['exports', 'ember-modal-dialog/components/positioned-container'], function (exports, Component) {

	'use strict';

	exports['default'] = Component['default'];

});
define('config/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, Component) {

	'use strict';

	exports['default'] = Component['default'];

});
define('config/components/grid-interactions', ['exports', 'ember', 'ember-cpm'], function (exports, Ember, CPM) {

  'use strict';

  var GridInteractions, faicon, i, product, results;

  product = function (xs, ys) {
    var i, j, len, len1, output, x, y;
    output = [];
    for (i = 0, len = xs.length; i < len; i++) {
      x = xs[i];
      for (j = 0, len1 = ys.length; j < len1; j++) {
        y = ys[j];
        output.push([x, y]);
      }
    }
    return output;
  };

  faicon = function (type) {
    return String.fromCharCode((function () {
      switch (type) {
        case 'barn':
          return 62009;
        case 'road':
          return 61464;
        case 'warehouse':
          return 61875;
        case 'station':
          return 61584;
        case 'scale':
          return 61932;
        default:
          return 61607;
      }
    })());
  };

  GridInteractions = Ember['default'].Component.extend({
    tagName: 'g',
    classNames: ['interactions'],
    rawTiles: product((function () {
      results = [];
      for (i = -8; i <= 14; i++) {
        results.push(i);
      }
      return results;
    }).apply(undefined), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]),
    pxPerWidth: Ember['default'].computed.alias('parentView.pxPerWidth'),
    pxPerHeight: Ember['default'].computed.alias('parentView.pxPerHeight'),
    icon: Ember['default'].computed('type', function () {
      return faicon(this.get('type'));
    }),
    tiles: Ember['default'].computed.map('rawTiles', function (arg) {
      var x, y;
      x = arg[0], y = arg[1];
      return {
        x: x,
        y: y
      };
    }),
    gridModeEngaged: CPM['default'].Macros.among('mode', 'build', 'move'),
    actions: {
      interact: function interact(arg, event) {
        var x, y;
        x = arg.x, y = arg.y;
        return this.sendAction('action', [x, y], event);
      }
    }
  });

  exports['default'] = GridInteractions;

});
define('config/components/just-tile', ['exports', 'ember', 'ember-cpm'], function (exports, Ember, CPM) {

  'use strict';

  var JustTile;

  JustTile = Ember['default'].Component.extend({
    tagName: 'g',
    classNameBindings: ['tileType'],
    attributeBindings: ['transform'],
    tile: Ember['default'].computed.alias('model'),
    x: CPM['default'].Macros.product('parentView.pxPerWidth', 'model.x'),
    y: CPM['default'].Macros.product('parentView.pxPerHeight', 'model.y'),
    width: CPM['default'].Macros.product('parentView.pxPerWidth', 'model.width'),
    height: CPM['default'].Macros.product('parentView.pxPerHeight', 'model.height'),
    tileType: Ember['default'].computed.alias('tile.tileType'),
    transform: CPM['default'].Macros.fmt('x', 'y', 'translate(%@, %@)'),
    rectX: CPM['default'].Macros.quotient('width', -2),
    rectY: CPM['default'].Macros.quotient('height', -2),
    cornerX: 10,
    cornerY: 10,
    strokeWidth: 2,
    rectW: CPM['default'].Macros.difference('width', 1),
    rectH: CPM['default'].Macros.difference('height', 1),
    stroke: CPM['default'].Macros.conditional('tile.hasCamera', '#b71c1c', '#212121'),
    fill: Ember['default'].computed('tileType', function () {
      switch (this.get('tileType')) {
        case 'barn':
          return '#ffcdd2';
        case 'road':
          return '#424242';
        case 'warehouse':
          return '#d7ccc8';
        case 'station':
          return '#f0f4c3';
        case 'scale':
          return '#b2ebf2';
        default:
          return '#fff';
      }
    }),
    iconText: Ember['default'].computed('tileType', function () {
      return String.fromCharCode((function () {
        switch (this.get('tileType')) {
          case 'barn':
            return 62009;
          case 'road':
            return 61464;
          case 'warehouse':
            return 61875;
          case 'station':
            return 61584;
          case 'scale':
            return 61932;
          default:
            return '?';
        }
      }).call(this));
    }),
    eventManager: Ember['default'].Object.create({
      click: function click(event, view) {
        return view.sendAction('action', view.get('model'), event);
      }
    })
  });

  exports['default'] = JustTile;

});
define('config/components/labeled-radio-button', ['exports', 'ember-radio-button/components/labeled-radio-button'], function (exports, LabeledRadioButton) {

	'use strict';

	exports['default'] = LabeledRadioButton['default'];

});
define('config/components/materialize-badge', ['exports', 'ember', 'config/components/md-badge'], function (exports, Ember, MaterializeBadge) {

  'use strict';

  exports['default'] = MaterializeBadge['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-badge}} has been deprecated. Please use {{md-badge}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-button-submit', ['exports', 'ember', 'config/components/md-btn-submit'], function (exports, Ember, MaterializeButtonSubmit) {

  'use strict';

  exports['default'] = MaterializeButtonSubmit['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-button-submit}} has been deprecated. Please use {{md-btn-submit}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-button', ['exports', 'ember', 'config/components/md-btn'], function (exports, Ember, MaterializeButton) {

  'use strict';

  exports['default'] = MaterializeButton['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-button}} has been deprecated. Please use {{md-btn}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-card-action', ['exports', 'ember', 'config/components/md-card-action'], function (exports, Ember, MaterializeCardAction) {

  'use strict';

  exports['default'] = MaterializeCardAction['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-card-action}} has been deprecated. Please use {{md-card-action}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-card-content', ['exports', 'ember', 'config/components/md-card-content'], function (exports, Ember, MaterializeCardContent) {

  'use strict';

  exports['default'] = MaterializeCardContent['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-card-content}} has been deprecated. Please use {{md-card-content}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-card-panel', ['exports', 'ember', 'config/components/md-card-panel'], function (exports, Ember, MaterializeCardPanel) {

  'use strict';

  exports['default'] = MaterializeCardPanel['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-card-panel}} has been deprecated. Please use {{md-card-panel}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-card-reveal', ['exports', 'ember', 'config/components/md-card-reveal'], function (exports, Ember, MaterializeCardReveal) {

  'use strict';

  exports['default'] = MaterializeCardReveal['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-card-reveal}} has been deprecated. Please use {{md-card-reveal}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-card', ['exports', 'ember', 'config/components/md-card'], function (exports, Ember, MaterializeCard) {

  'use strict';

  exports['default'] = MaterializeCard['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-card}} has been deprecated. Please use {{md-card}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-checkbox', ['exports', 'ember', 'config/components/md-check'], function (exports, Ember, materializeCheckbox) {

  'use strict';

  exports['default'] = materializeCheckbox['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-checkbox}} has been deprecated. Please use {{md-check}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-checkboxes', ['exports', 'ember', 'config/components/md-checks'], function (exports, Ember, materializeCheckboxes) {

  'use strict';

  exports['default'] = materializeCheckboxes['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-checkboxes}} has been deprecated. Please use {{md-checks}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-collapsible-card', ['exports', 'ember', 'config/components/md-card-collapsible'], function (exports, Ember, MaterializeCollapsibleCard) {

  'use strict';

  exports['default'] = MaterializeCollapsibleCard['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-collapsible-card}} has been deprecated. Please use {{md-card-collapsible}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-collapsible', ['exports', 'ember', 'config/components/md-collapsible'], function (exports, Ember, MaterializeCollapsible) {

  'use strict';

  exports['default'] = MaterializeCollapsible['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-collapsible}} has been deprecated. Please use {{md-collapsible}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-copyright', ['exports', 'ember', 'config/components/md-copyright'], function (exports, Ember, materializeCopyright) {

  'use strict';

  exports['default'] = materializeCopyright['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-copyright}} has been deprecated. Please use {{md-copyright}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-date-input', ['exports', 'ember', 'config/components/md-input-date'], function (exports, Ember, materializeDateInput) {

  'use strict';

  exports['default'] = materializeDateInput['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-date-input}} has been deprecated. Please use {{md-input-date}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-input-field', ['exports', 'ember', 'config/components/md-input-field'], function (exports, Ember, materializeInputField) {

  'use strict';

  exports['default'] = materializeInputField['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-input-field}} has been deprecated. Please use {{md-input-field}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-input', ['exports', 'ember', 'config/components/md-input'], function (exports, Ember, materializeInput) {

  'use strict';

  exports['default'] = materializeInput['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-input}} has been deprecated. Please use {{md-input}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-loader', ['exports', 'ember', 'config/components/md-loader'], function (exports, Ember, materializeLoader) {

  'use strict';

  exports['default'] = materializeLoader['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-loader}} has been deprecated. Please use {{md-loader}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-modal', ['exports', 'ember', 'config/components/md-modal'], function (exports, Ember, MaterializeModal) {

  'use strict';

  exports['default'] = MaterializeModal['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-modal}} has been deprecated. Please use {{md-modal}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-navbar', ['exports', 'ember', 'config/components/md-navbar'], function (exports, Ember, MaterializeNavBar) {

  'use strict';

  exports['default'] = MaterializeNavBar['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-navbar}} has been deprecated. Please use {{md-navbar}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-pagination', ['exports', 'ember', 'config/components/md-pagination'], function (exports, Ember, materializePagination) {

  'use strict';

  exports['default'] = materializePagination['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-pagination}} has been deprecated. Please use {{md-pagination}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-parallax', ['exports', 'ember', 'config/components/md-parallax'], function (exports, Ember, materializeParallax) {

  'use strict';

  exports['default'] = materializeParallax['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-parallax}} has been deprecated. Please use {{md-parallax}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-radio', ['exports', 'ember', 'config/components/md-radio'], function (exports, Ember, materializeRadio) {

  'use strict';

  exports['default'] = materializeRadio['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-radio}} has been deprecated. Please use {{md-radio}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-radios', ['exports', 'ember', 'config/components/md-radios'], function (exports, Ember, materializeRadios) {

  'use strict';

  exports['default'] = materializeRadios['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-radios}} has been deprecated. Please use {{md-radios}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-range', ['exports', 'ember', 'config/components/md-range'], function (exports, Ember, materializeRange) {

  'use strict';

  exports['default'] = materializeRange['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-range}} has been deprecated. Please use {{md-range}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-select', ['exports', 'ember', 'config/components/md-select'], function (exports, Ember, materializeSelect) {

  'use strict';

  exports['default'] = materializeSelect['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-select}} has been deprecated. Please use {{md-select}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-switch', ['exports', 'ember', 'config/components/md-switch'], function (exports, Ember, materializeSwitch) {

  'use strict';

  exports['default'] = materializeSwitch['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-switch}} has been deprecated. Please use {{md-switch}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-switches', ['exports', 'ember', 'config/components/md-switches'], function (exports, Ember, materializeSwitches) {

  'use strict';

  exports['default'] = materializeSwitches['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-switches}} has been deprecated. Please use {{md-switches}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-tabs-tab', ['exports', 'ember', 'config/components/md-tab'], function (exports, Ember, materializeTabsTab) {

  'use strict';

  exports['default'] = materializeTabsTab['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-tabs-tab}} has been deprecated. Please use {{md-tab}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-tabs', ['exports', 'ember', 'config/components/md-tabs'], function (exports, Ember, materializeTabs) {

  'use strict';

  exports['default'] = materializeTabs['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-tabs}} has been deprecated. Please use {{md-tabs}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/materialize-textarea', ['exports', 'ember', 'config/components/md-textarea'], function (exports, Ember, materializeTextarea) {

  'use strict';

  exports['default'] = materializeTextarea['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate('{{materialize-textarea}} has been deprecated. Please use {{md-textarea}} instead', false, { url: 'https://github.com/sgasser/ember-cli-materialize/issues/67' });
    }
  });

});
define('config/components/md-badge', ['exports', 'ember-cli-materialize/components/md-badge'], function (exports, materializeBadge) {

	'use strict';

	exports['default'] = materializeBadge['default'];

});
define('config/components/md-btn-submit', ['exports', 'ember-cli-materialize/components/md-btn-submit'], function (exports, MaterializeButtonSubmit) {

	'use strict';

	exports['default'] = MaterializeButtonSubmit['default'];

});
define('config/components/md-btn', ['exports', 'ember-cli-materialize/components/md-btn'], function (exports, MaterializeButton) {

	'use strict';

	exports['default'] = MaterializeButton['default'];

});
define('config/components/md-card-action', ['exports', 'ember-cli-materialize/components/md-card-action'], function (exports, MaterializeCardAction) {

	'use strict';

	exports['default'] = MaterializeCardAction['default'];

});
define('config/components/md-card-collapsible', ['exports', 'ember-cli-materialize/components/md-card-collapsible'], function (exports, MaterializeCollapsibleCard) {

	'use strict';

	exports['default'] = MaterializeCollapsibleCard['default'];

});
define('config/components/md-card-content', ['exports', 'ember-cli-materialize/components/md-card-content'], function (exports, MaterializeCardContent) {

	'use strict';

	exports['default'] = MaterializeCardContent['default'];

});
define('config/components/md-card-panel', ['exports', 'ember-cli-materialize/components/md-card-panel'], function (exports, MaterializeCardPanel) {

	'use strict';

	exports['default'] = MaterializeCardPanel['default'];

});
define('config/components/md-card-reveal', ['exports', 'ember-cli-materialize/components/md-card-reveal'], function (exports, MaterializeCardReveal) {

	'use strict';

	exports['default'] = MaterializeCardReveal['default'];

});
define('config/components/md-card', ['exports', 'ember-cli-materialize/components/md-card'], function (exports, MaterializeCard) {

	'use strict';

	exports['default'] = MaterializeCard['default'];

});
define('config/components/md-check', ['exports', 'ember-cli-materialize/components/md-check'], function (exports, materializeCheckbox) {

	'use strict';

	exports['default'] = materializeCheckbox['default'];

});
define('config/components/md-checks', ['exports', 'ember-cli-materialize/components/md-checks'], function (exports, materializeCheckboxes) {

	'use strict';

	exports['default'] = materializeCheckboxes['default'];

});
define('config/components/md-collapsible', ['exports', 'ember-cli-materialize/components/md-collapsible'], function (exports, MaterializeCollapsible) {

	'use strict';

	exports['default'] = MaterializeCollapsible['default'];

});
define('config/components/md-copyright', ['exports', 'ember-cli-materialize/components/md-copyright'], function (exports, materializeCopyright) {

	'use strict';

	exports['default'] = materializeCopyright['default'];

});
define('config/components/md-fixed-btn', ['exports', 'ember-cli-materialize/components/md-fixed-btn'], function (exports, md_fixed_btn) {

	'use strict';



	exports.default = md_fixed_btn.default;

});
define('config/components/md-fixed-btns', ['exports', 'ember-cli-materialize/components/md-fixed-btns'], function (exports, md_fixed_btns) {

	'use strict';



	exports.default = md_fixed_btns.default;

});
define('config/components/md-input-date', ['exports', 'ember-cli-materialize/components/md-input-date'], function (exports, materializeDateInput) {

	'use strict';

	exports['default'] = materializeDateInput['default'];

});
define('config/components/md-input-field', ['exports', 'ember-cli-materialize/components/md-input-field'], function (exports, materializeInputField) {

	'use strict';

	exports['default'] = materializeInputField['default'];

});
define('config/components/md-input', ['exports', 'ember-cli-materialize/components/md-input'], function (exports, materializeInput) {

	'use strict';

	exports['default'] = materializeInput['default'];

});
define('config/components/md-loader', ['exports', 'ember-cli-materialize/components/md-loader'], function (exports, materializeLoader) {

	'use strict';

	exports['default'] = materializeLoader['default'];

});
define('config/components/md-modal-container', ['exports', 'ember-cli-materialize/components/md-modal-container'], function (exports, mdModalContainer) {

	'use strict';

	exports['default'] = mdModalContainer['default'];

});
define('config/components/md-modal', ['exports', 'ember-cli-materialize/components/md-modal'], function (exports, materializeModal) {

	'use strict';

	exports['default'] = materializeModal['default'];

});
define('config/components/md-navbar', ['exports', 'ember-cli-materialize/components/md-navbar'], function (exports, MaterializeNavBar) {

	'use strict';

	exports['default'] = MaterializeNavBar['default'];

});
define('config/components/md-pagination', ['exports', 'ember-cli-materialize/components/md-pagination'], function (exports, materializePagination) {

	'use strict';

	exports['default'] = materializePagination['default'];

});
define('config/components/md-parallax', ['exports', 'ember-cli-materialize/components/md-parallax'], function (exports, materializeParallax) {

	'use strict';

	exports['default'] = materializeParallax['default'];

});
define('config/components/md-radio', ['exports', 'ember-cli-materialize/components/md-radio'], function (exports, materializeRadio) {

	'use strict';

	exports['default'] = materializeRadio['default'];

});
define('config/components/md-radios', ['exports', 'ember-cli-materialize/components/md-radios'], function (exports, materializeRadios) {

	'use strict';

	exports['default'] = materializeRadios['default'];

});
define('config/components/md-range', ['exports', 'ember-cli-materialize/components/md-range'], function (exports, materializeRange) {

	'use strict';

	exports['default'] = materializeRange['default'];

});
define('config/components/md-select', ['exports', 'ember-cli-materialize/components/md-select'], function (exports, materializeSelect) {

	'use strict';

	exports['default'] = materializeSelect['default'];

});
define('config/components/md-switch', ['exports', 'ember-cli-materialize/components/md-switch'], function (exports, materializeSwitch) {

	'use strict';

	exports['default'] = materializeSwitch['default'];

});
define('config/components/md-switches', ['exports', 'ember-cli-materialize/components/md-switches'], function (exports, materializeSwitches) {

	'use strict';

	exports['default'] = materializeSwitches['default'];

});
define('config/components/md-tab', ['exports', 'ember-cli-materialize/components/md-tab'], function (exports, materializeTabsTab) {

	'use strict';

	exports['default'] = materializeTabsTab['default'];

});
define('config/components/md-tabs', ['exports', 'ember-cli-materialize/components/md-tabs'], function (exports, materializeTabs) {

	'use strict';

	exports['default'] = materializeTabs['default'];

});
define('config/components/md-textarea', ['exports', 'ember-cli-materialize/components/md-textarea'], function (exports, materializeTextarea) {

	'use strict';

	exports['default'] = materializeTextarea['default'];

});
define('config/components/modal-dialog', ['exports', 'ember-modal-dialog/components/modal-dialog'], function (exports, Component) {

	'use strict';

	exports['default'] = Component['default'];

});
define('config/components/radio-button', ['exports', 'ember-radio-button/components/radio-button'], function (exports, RadioButton) {

	'use strict';

	exports['default'] = RadioButton['default'];

});
define('config/components/vector-canvas', ['exports', 'ember', 'ember-cpm'], function (exports, Ember, CPM) {

  'use strict';

  var VectorCanvasComponent, assertNumericality;

  assertNumericality = function (x) {
    Ember['default'].assert('Expected a number, instead got ' + x, x <= 0 || x > 0);
    return x;
  };

  VectorCanvasComponent = Ember['default'].Component.extend({
    classNames: ['vector-canvas'],
    attributeBindings: ['width', 'height'],
    pxPerWidth: 55,
    pxPerHeight: 55,
    canvasTransform: CPM['default'].Macros.fmt('translateX', 'translateY', 'translate(%@, %@)'),
    init: function init() {
      this.set('translateX', 0);
      this.set('translateY', 0);
      return this._super.apply(this, arguments);
    },
    didInsertElement: function didInsertElement() {
      this.set('translateX', this.canvasThirdWidth());
      this.set('translateY', this.canvasQuarterHeight());
      return d3.select(this.$('svg')[0]).call(this.makeDragBehavior());
    },
    canvasThirdWidth: function canvasThirdWidth() {
      return assertNumericality(this.$().width() / 3);
    },
    canvasQuarterHeight: function canvasQuarterHeight() {
      return assertNumericality(this.$().height() / 4);
    },
    makeDragBehavior: function makeDragBehavior() {
      return d3.behavior.drag().origin(function () {
        return {
          x: 0,
          y: 0
        };
      }).on('drag', (function (_this) {
        return function () {
          var dx, dy, ref;
          ref = d3.event, dx = ref.dx, dy = ref.dy;
          _this.incrementProperty('translateX', dx / 2);
          return _this.incrementProperty('translateY', dy / 2);
        };
      })(this));
    }
  });

  exports['default'] = VectorCanvasComponent;

});
define('config/components/vector-tiles', ['exports', 'ember', 'ember-cpm'], function (exports, Ember, CPM) {

  'use strict';

  var VectorTilesComponent;

  VectorTilesComponent = Ember['default'].Component.extend({
    tagName: 'g',
    classNames: ['layer', 'layer-tiles'],
    pxPerWidth: Ember['default'].computed.alias('parentView.pxPerWidth'),
    pxPerHeight: Ember['default'].computed.alias('parentView.pxPerHeight'),
    tiles: Ember['default'].computed.alias('models'),
    actions: {
      interact: function interact(tile, event) {
        return this.sendAction('action', tile, event);
      }
    }
  });

  exports['default'] = VectorTilesComponent;

});
define('config/components/webcam-wrapper', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var WebamWrapper;

  WebamWrapper = Ember['default'].Component.extend({
    options: {
      width: 320,
      height: 240
    },
    didInsertElement: function didInsertElement() {
      Webcam.set(this.get("options"));
      return Webcam.attach(this.$()[0]);
    },
    willDestroyElement: function willDestroyElement() {
      return Webcam.reset();
    }
  });

  exports['default'] = WebamWrapper;

});
define('config/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('config/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('config/controllers/tiles', ['exports', 'ember', 'ember-cpm'], function (exports, Ember, CPM) {

  'use strict';

  var TilesController;

  TilesController = Ember['default'].Controller.extend({
    currentMode: 'query',
    buildModeEngaged: Ember['default'].computed.equal('currentMode', 'build'),
    buildTypeLegal: CPM['default'].Macros.among('buildType', 'road', 'barn', 'warehouse', 'scale', 'station'),
    busyCounter: 0,
    transitionMode: Ember['default'].computed.gt('busyCounter', 0),
    tellUserToSelectTile: function tellUserToSelectTile() {
      return alert('You forgot to select a tile type');
    },
    enterTransitionMode: function enterTransitionMode() {
      return this.incrementProperty('busyCounter');
    },
    exitTransitionMode: function exitTransitionMode() {
      return this.decrementProperty('busyCounter');
    },
    handleMove: function handleMove(tile) {
      if (Ember['default'].isPresent(this.get('alreadyMovingBlank'))) {
        this.assignTilePosition(tile, this.get('alreadyMovingBlank'));
        return this.set('alreadyMovingBlank', null);
      }
      if (Ember['default'].isPresent(this.get('alreadyMovingTile'))) {
        this.swapTilePlaces(tile, this.get('alreadyMovingTile'));
        return this.set('alreadyMovingTile', null);
      } else {
        return this.set('alreadyMovingTile', tile);
      }
    },
    handleBlank: function handleBlank(point) {
      if (Ember['default'].isPresent(this.get('alreadyMovingTile'))) {
        this.assignTilePosition(this.get('alreadyMovingTile'), point);
        return this.set('alreadyMovingTile', null);
      }
      if (Ember['default'].isPresent(this.get('alreadyMovingBlank'))) {
        return this.set('alreadyMovingBlank', null);
      } else {
        return this.set('alreadyMovingBlank', point);
      }
    },
    assignTilePosition: function assignTilePosition(tile, arg) {
      var x, y;
      x = arg[0], y = arg[1];
      this.enterTransitionMode();
      tile.set('x', x);
      tile.set('y', y);
      return tile.save().then((function (_this) {
        return function () {
          return _this.get('model').update();
        };
      })(this))['finally']((function (_this) {
        return function () {
          return _this.exitTransitionMode();
        };
      })(this));
    },
    swapTilePlaces: function swapTilePlaces(tileA, tileB) {
      var pointA, pointB;
      pointA = [tileA.get('x'), tileA.get('y')];
      pointB = [tileB.get('x'), tileB.get('y')];
      this.assignTilePosition(tileA, pointB);
      return this.assignTilePosition(tileB, pointA);
    },
    buildTile: function buildTile(arg) {
      var x, y;
      x = arg[0], y = arg[1];
      if (!this.get('buildTypeLegal')) {
        return this.tellUserToSelectTile();
      }
      this.enterTransitionMode();
      return this.store.createRecord('tile', {
        tileType: this.get('buildType'),
        x: x,
        y: y
      }).save().then((function (_this) {
        return function () {
          return _this.get('model').update();
        };
      })(this))['finally']((function (_this) {
        return function () {
          return _this.exitTransitionMode();
        };
      })(this));
    },
    tellOffUser: function tellOffUser(arg) {
      var clientX, clientY;
      clientX = arg.clientX, clientY = arg.clientY;
      return Ember['default'].$('#busy-mouse-flash').removeClass('hidden').show().attr('style', 'top: ' + clientY + 'px; left: ' + clientX + 'px').hide(1250);
    },
    actions: {
      clickTile: function clickTile(tile, event) {
        if (this.get('transitionMode')) {
          return this.tellOffUser(event);
        }
        switch (this.get('currentMode')) {
          case 'delete':
            return this.send('destroyTile', tile);
          case 'move':
            return this.handleMove(tile);
          default:
            return this.transitionToRoute('tiles.tile.index', tile.get('id'));
        }
      },
      clickBlank: function clickBlank(point, event) {
        if (this.get('transitionMode')) {
          return this.tellOffUser(event);
        }
        switch (this.get('currentMode')) {
          case 'build':
            return this.buildTile(point);
          case 'move':
            return this.handleBlank(point);
          default:
            return alert('You clicked a blank tile, but no action is applicable right now');
        }
      },
      changeMode: function changeMode(mode) {
        this.set('buildType', null);
        if (this.get('currentMode') === mode) {
          return this.set('currentMode', null);
        }
        return this.set('currentMode', mode);
      },
      selectBuild: function selectBuild(type) {
        if (this.get('buildType') === type) {
          return this.set('buildType', null);
        }
        return this.set('buildType', type);
      }
    }
  });

  exports['default'] = TilesController;

});
define('config/controllers/tiles/camera/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var TilesCameraIndexController;

  TilesCameraIndexController = Ember['default'].Controller.extend({
    actions: {
      destroy: function destroy() {
        var model, tileId;
        if (this.get("destroyModeEngaged")) {
          model = this.get("model");
          tileId = model.get("tileId");
          this.toggleProperty("destroyModeEngaged");
          model.destroyRecord().then((function (_this) {
            return function () {
              return _this.transitionToRoute("tiles.tile.camera", tileId);
            };
          })(this));
        } else {
          this.toggleProperty("destroyModeEngaged");
        }
      },
      undestroy: function undestroy() {
        return this.set("destroyModeEngaged", false);
      },
      cancel: function cancel() {
        return this.transitionToRoute("tiles.tile.cameras", this.get("model.tileId"));
      },
      editCamera: function editCamera() {
        return this.get("model").save().then((function (_this) {
          return function (camera) {
            return _this.transitionToRoute("tiles.tile.cameras", _this.get("model.tileId"));
          };
        })(this))["catch"](function (error) {
          window.error = error;
          return console.log(error);
        });
      }
    }
  });

  exports['default'] = TilesCameraIndexController;

});
define('config/controllers/tiles/tile/cameras', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var TilesTileCamerasController;

  TilesTileCamerasController = Ember['default'].Controller.extend({
    actions: {
      newCamera: function newCamera() {
        return this.transitionToRoute("tiles.tile.cameras.new", this.get("model.id"));
      },
      showCamera: function showCamera(camera) {
        return this.transitionToRoute("tiles.camera", camera.get("id"));
      }
    }
  });

  exports['default'] = TilesTileCamerasController;

});
define('config/controllers/tiles/tile/cameras/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var TilesTileCamerasNewController;

  TilesTileCamerasNewController = Ember['default'].Controller.extend({
    actions: {
      newCamera: function newCamera() {
        return this.get("model").save().then((function (_this) {
          return function (camera) {
            return _this.transitionToRoute("tiles.tile.cameras", camera.get("tileId"));
          };
        })(this));
      },
      cancel: function cancel() {
        return this.transitionToRoute("tiles.tile.cameras", this.get("model.tileId"));
      }
    }
  });

  exports['default'] = TilesTileCamerasNewController;

});
define('config/controllers/tiles/tile/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var TilesTileIndexController;

  TilesTileIndexController = Ember['default'].Controller.extend({
    actions: {
      destroy: function destroy() {
        if (this.get("destroyModeEngaged")) {
          this.send("destroyTile", this.get("model"));
          this.transitionToRoute("tiles");
        }
        this.toggleProperty("destroyModeEngaged");
      },
      undestroy: function undestroy() {
        return this.set("destroyModeEngaged", false);
      },
      cancel: function cancel() {
        return this.transitionToRoute("tiles");
      },
      editTile: function editTile() {
        return this.get("model").save().then((function (_this) {
          return function (tile) {
            return _this.transitionToRoute("tiles");
          };
        })(this))["catch"](function (error) {
          alert("Something went wrong, check the console");
          return console.log(error);
        });
      }
    }
  });

  exports['default'] = TilesTileIndexController;

});
define('config/helpers/fa-icon', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var FA_PREFIX = /^fa\-.+/;

  var warn = Ember['default'].Logger.warn;

  /**
   * Handlebars helper for generating HTML that renders a FontAwesome icon.
   *
   * @param  {String} name    The icon name. Note that the `fa-` prefix is optional.
   *                          For example, you can pass in either `fa-camera` or just `camera`.
   * @param  {Object} options Options passed to helper.
   * @return {Ember.Handlebars.SafeString} The HTML markup.
   */
  var faIcon = function faIcon(name, options) {
    if (Ember['default'].typeOf(name) !== 'string') {
      var message = 'fa-icon: no icon specified';
      warn(message);
      return Ember['default'].String.htmlSafe(message);
    }

    var params = options.hash,
        classNames = [],
        html = '';

    classNames.push('fa');
    if (!name.match(FA_PREFIX)) {
      name = 'fa-' + name;
    }
    classNames.push(name);
    if (params.spin) {
      classNames.push('fa-spin');
    }
    if (params.flip) {
      classNames.push('fa-flip-' + params.flip);
    }
    if (params.rotate) {
      classNames.push('fa-rotate-' + params.rotate);
    }
    if (params.lg) {
      warn('fa-icon: the \'lg\' parameter is deprecated. Use \'size\' instead. I.e. {{fa-icon size="lg"}}');
      classNames.push('fa-lg');
    }
    if (params.x) {
      warn('fa-icon: the \'x\' parameter is deprecated. Use \'size\' instead. I.e. {{fa-icon size="' + params.x + '"}}');
      classNames.push('fa-' + params.x + 'x');
    }
    if (params.size) {
      if (Ember['default'].typeOf(params.size) === 'string' && params.size.match(/\d+/)) {
        params.size = Number(params.size);
      }
      if (Ember['default'].typeOf(params.size) === 'number') {
        classNames.push('fa-' + params.size + 'x');
      } else {
        classNames.push('fa-' + params.size);
      }
    }
    if (params.fixedWidth) {
      classNames.push('fa-fw');
    }
    if (params.listItem) {
      classNames.push('fa-li');
    }
    if (params.pull) {
      classNames.push('pull-' + params.pull);
    }
    if (params.border) {
      classNames.push('fa-border');
    }
    if (params.classNames && !Ember['default'].isArray(params.classNames)) {
      params.classNames = [params.classNames];
    }
    if (!Ember['default'].isEmpty(params.classNames)) {
      Array.prototype.push.apply(classNames, params.classNames);
    }

    html += '<';
    var tagName = params.tagName || 'i';
    html += tagName;
    html += ' class=\'' + classNames.join(' ') + '\'';
    if (params.title) {
      html += ' title=\'' + params.title + '\'';
    }
    if (params.ariaHidden === undefined || params.ariaHidden) {
      html += ' aria-hidden="true"';
    }
    html += '></' + tagName + '>';
    return Ember['default'].String.htmlSafe(html);
  };

  exports['default'] = Ember['default'].Handlebars.makeBoundHelper(faIcon);

  exports.faIcon = faIcon;

});
define('config/initializers/add-modals-container', ['exports', 'ember-modal-dialog/initializers/add-modals-container'], function (exports, initialize) {

  'use strict';

  exports['default'] = {
    name: 'add-modals-container',
    initialize: initialize['default']
  };

});
define('config/initializers/app-version', ['exports', 'config/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('config/initializers/data-complex', ['exports', 'ember-data-complex/initializers/data-complex'], function (exports, DataComplexInitializer) {

	'use strict';

	exports['default'] = DataComplexInitializer['default'];

});
define('config/initializers/ember-moment', ['exports', 'ember-moment/helpers/moment', 'ember-moment/helpers/ago', 'ember-moment/helpers/duration', 'ember'], function (exports, moment, ago, duration, Ember) {

  'use strict';

  var initialize = function initialize() {
    var registerHelper;

    if (Ember['default'].HTMLBars) {
      registerHelper = function (helperName, fn) {
        Ember['default'].HTMLBars._registerHelper(helperName, Ember['default'].HTMLBars.makeBoundHelper(fn));
      };
    } else {
      registerHelper = Ember['default'].Handlebars.helper;
    };

    registerHelper('moment', moment['default']);
    registerHelper('ago', ago['default']);
    registerHelper('duration', duration['default']);
  };

  exports['default'] = {
    name: 'ember-moment',

    initialize: initialize
  };
  /* container, app */

  exports.initialize = initialize;

});
define('config/initializers/export-application-global', ['exports', 'ember', 'config/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('config/initializers/key-responder', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = {
    name: 'ember-key-responder',

    initialize: function initialize(container, application) {
      application.inject('view', 'keyResponder', 'key-responder:main');
      application.inject('component', 'keyResponder', 'key-responder:main');

      //TextField/TextArea are currently uninjectable, so we're going to hack our
      //way in
      Ember['default'].TextSupport.reopen({
        keyResponder: Ember['default'].computed(function () {
          return this.container.lookup('key-responder:main');
        }).readOnly()
      });

      // Set up a handler on the document for keyboard events that are not
      // handled by Ember's event dispatcher.
      Ember['default'].$(document).on('keyup.outside_ember_event_delegation', null, function (event) {

        if (Ember['default'].$(event.target).closest('.ember-view').length === 0) {
          var keyResponder = container.lookup('key-responder:main');
          var currentKeyResponder = keyResponder.get('current');
          if (currentKeyResponder && currentKeyResponder.get('isVisible')) {
            return currentKeyResponder.respondToKeyEvent(event, currentKeyResponder);
          }
        }

        return true;
      });

      // Set up a handler on the ApplicationView for keyboard events that were
      // not handled by the current KeyResponder yet
      container.lookupFactory('view:application').reopen({
        delegateToKeyResponder: Ember['default'].on('keyUp', function (event) {
          var currentKeyResponder = this.get('keyResponder.current');
          if (currentKeyResponder && currentKeyResponder.get('isVisible')) {
            // check to see if the event target is the keyResponder or the
            // keyResponders parents.  if so, no need to dispatch as it has
            // already had a chance to handle this event.
            var id = '#' + currentKeyResponder.get('elementId');
            if (Ember['default'].$(event.target).closest(id).length === 1) {
              return true;
            }
            return currentKeyResponder.respondToKeyEvent(event, currentKeyResponder);
          }
          return true;
        })
      });
    }
  };

});
define('config/initializers/link-view', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    Ember['default'].LinkView.reopen({
      attributeBindings: ['data-activates']
    });
  }

  exports['default'] = {
    name: 'link-view',
    initialize: initialize
  };
  /* container, application */

});
define('config/key-responder', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var get = Ember['default'].get;

  /*
    Holds a stack of key responder views. With this we can neatly handle
    restoring the previous key responder when some modal UI element is closed.
    There are a few simple rules that governs the usage of the stack:
     - mouse click does .replace (this should also be used for programmatically taking focus when not a modal element)
     - opening a modal UI element does .push
     - closing a modal element does .pop

    Also noteworthy is that a view will be signaled that it loses the key focus
    only when it's popped off the stack, not when something is pushed on top. The
    idea is that when a modal UI element is opened, we know that the previously
    focused view will re-gain the focus as soon as the modal element is closed.
    So if the previously focused view was e.g. in the middle of some edit
    operation, it shouldn't cancel that operation.
  */
  var KeyResponder = Ember['default'].ArrayProxy.extend({
    init: function init() {
      this.set('isActive', true);
      this.set('content', Ember['default'].A());
      this._super.apply(this, arguments);
    },

    current: Ember['default'].computed.readOnly('lastObject'),
    pushView: function pushView(view, wasTriggeredByFocus) {
      if (!Ember['default'].isNone(view)) {
        view.trigger('willBecomeKeyResponder', wasTriggeredByFocus);
        this.pushObject(view);
        view.trigger('didBecomeKeyResponder', wasTriggeredByFocus);
      }
      return view;
    },

    resume: function resume() {
      this.set('isActive', true);
    },

    pause: function pause() {
      this.set('isActive', false);
    },

    popView: function popView(wasTriggeredByFocus) {
      if (get(this, 'length') > 0) {
        var view = get(this, 'current');
        if (view) {
          view.trigger('willLoseKeyResponder', wasTriggeredByFocus);
        }
        view = this.popObject();
        if (view) {
          view.trigger('didLoseKeyResponder', wasTriggeredByFocus);
        }
        return view;
      } else {
        return undefined;
      }
    },

    replaceView: function replaceView(view, wasTriggeredByFocus) {
      if (get(this, 'current') !== view) {
        this.popView(wasTriggeredByFocus);
        return this.pushView(view, wasTriggeredByFocus);
      }
    }
  });

  exports['default'] = KeyResponder;

  var KEY_EVENTS = {
    8: 'deleteBackward',
    9: 'insertTab',
    13: 'insertNewline',
    27: 'cancel',
    32: 'insertSpace',
    37: 'moveLeft',
    38: 'moveUp',
    39: 'moveRight',
    40: 'moveDown',
    46: 'deleteForward'
  };

  var MODIFIED_KEY_EVENTS = {
    8: 'deleteForward',
    9: 'insertBacktab',
    37: 'moveLeftAndModifySelection',
    38: 'moveUpAndModifySelection',
    39: 'moveRightAndModifySelection',
    40: 'moveDownAndModifySelection'
  };

  var KeyResponderSupportViewMixin = Ember['default'].Mixin.create({
    // Set to true in your view if you want to accept key responder status (which
    // is needed for handling key events)
    acceptsKeyResponder: false,
    canBecomeKeyResponder: Ember['default'].computed('acceptsKeyResponder', 'disabled', 'isVisible', function () {
      return get(this, 'acceptsKeyResponder') && !get(this, 'disabled') && get(this, 'isVisible');
    }).readOnly(),

    becomeKeyResponderViaMouseDown: Ember['default'].on('mouseDown', function (evt) {
      var responder = this.get('keyResponder');
      if (responder === undefined) {
        return;
      }

      Ember['default'].run.later(function () {
        responder._inEventBubblingPhase = undefined;
      }, 0);

      if (responder._inEventBubblingPhase === undefined) {
        responder._inEventBubblingPhase = true;
        this.becomeKeyResponder(false);
      }
    }),

    /*
      Sets this view as the target of key events. Call this if you need to make
      this happen programmatically.  This gets also called on mouseDown if the
      view handles that, returns true and doesn't have property
      'acceptsKeyResponder'
      set to false. If mouseDown returned true but 'acceptsKeyResponder' is
      false, this call is propagated to the parent view.
       If called with no parameters or with replace = true, the current key
      responder is first popped off the stack and this view is then pushed. See
      comments for Ember.KeyResponderStack above for more insight.
    */
    becomeKeyResponder: function becomeKeyResponder(replace, wasTriggeredByFocus) {
      if (wasTriggeredByFocus === undefined) {
        wasTriggeredByFocus = false;
      }

      var keyResponder = get(this, 'keyResponder');

      if (!keyResponder) {
        return;
      }

      if (get(keyResponder, 'current') === this) {
        return;
      }

      if (get(this, 'canBecomeKeyResponder')) {
        if (replace === undefined || replace === true) {
          return keyResponder.replaceView(this, wasTriggeredByFocus);
        } else {
          return keyResponder.pushView(this, wasTriggeredByFocus);
        }
      } else {
        var parent = get(this, 'parentView');

        if (parent && parent.becomeKeyResponder) {
          return parent.becomeKeyResponder(replace, wasTriggeredByFocus);
        }
      }
    },

    becomeKeyResponderViaFocus: function becomeKeyResponderViaFocus() {
      return this.becomeKeyResponder(true, true);
    },

    /*
      Resign key responder status by popping the head off the stack. The head
      might or might not be this view, depending on whether user clicked anything
      since this view became the key responder. The new key responder
      will be the next view in the stack, if any.
    */
    resignKeyResponder: function resignKeyResponder(wasTriggeredByFocus) {
      if (wasTriggeredByFocus === undefined) {
        wasTriggeredByFocus = false;
      }

      var keyResponder = get(this, 'keyResponder');

      if (!keyResponder) {
        return;
      }

      keyResponder.popView(wasTriggeredByFocus);
    },

    resignKeyResponderViaFocus: function resignKeyResponderViaFocus() {
      return this.resignKeyResponder(true);
    },

    respondToKeyEvent: function respondToKeyEvent(event) {
      Ember['default'].run(this, function () {
        if (get(this, 'keyResponder.isActive')) {
          if (get(this, 'keyResponder.current.canBecomeKeyResponder')) {
            get(this, 'keyResponder.current').interpretKeyEvents(event);
          }
        }
      });
    },

    interpretKeyEvents: function interpretKeyEvents(event) {
      var mapping = event.shiftKey ? MODIFIED_KEY_EVENTS : KEY_EVENTS;
      var eventName = mapping[event.keyCode];

      if (eventName && this.has(eventName)) {
        return this.trigger(eventName, event);
      }

      return false;
    }
  });

  Ember['default'].View.reopen(KeyResponderSupportViewMixin);
  Ember['default'].Component.reopen(KeyResponderSupportViewMixin);

  var KeyResponderInputSupport = Ember['default'].Mixin.create({
    acceptsKeyResponder: true,
    init: function init() {
      this._super.apply(this, arguments);
      this.on('focusIn', this, this.becomeKeyResponderViaFocus);
      this.on('focusOut', this, this.resignKeyResponderViaBlur);
    },

    didBecomeKeyResponder: function didBecomeKeyResponder(wasTriggeredByFocus) {
      if (!wasTriggeredByFocus && this._state === 'inDOM') {
        this.$().focus();
      }
    },

    didLoseKeyResponder: function didLoseKeyResponder(wasTriggeredByFocus) {
      if (!wasTriggeredByFocus && this._state === 'inDOM') {
        this.$().blur();
      }
    }
  });

  Ember['default'].TextSupport.reopen(KeyResponderInputSupport);
  Ember['default'].Checkbox.reopen(KeyResponderInputSupport);
  Ember['default'].Select.reopen(KeyResponderInputSupport);

  exports.KEY_EVENTS = KEY_EVENTS;
  exports.MODIFIED_KEY_EVENTS = MODIFIED_KEY_EVENTS;
  exports.KeyResponderInputSupport = KeyResponderInputSupport;

});
define('config/models/camera', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Camera;

  Camera = DS['default'].Model.extend({
    tileId: DS['default'].attr("string"),
    cameraStyle: DS['default'].attr("string"),
    permalink: DS['default'].attr("string"),
    cameraName: DS['default'].attr("string"),
    macAddress: DS['default'].attr("string"),
    createdAt: DS['default'].attr("date"),
    updatedAt: DS['default'].attr("date"),
    isImageCam: Ember.computed.equal("cameraStyle", "img-cgi"),
    isWebCam: Ember.computed.equal("cameraStyle", "user-media"),
    isKnown: Ember.computed.or("isImageCam", "isWebCam")
  });

  exports['default'] = Camera;

});
define('config/models/tile', ['exports', 'ember', 'ember-data'], function (exports, Ember, DS) {

  'use strict';

  var Tile;

  Tile = DS['default'].Model.extend({
    tileType: DS['default'].attr('string'),
    tileName: DS['default'].attr('string'),
    status: DS['default'].attr('string'),
    x: DS['default'].attr('number'),
    y: DS['default'].attr('number'),
    z: DS['default'].attr('number'),
    width: DS['default'].attr('number', {
      defaultValue: 1
    }),
    height: DS['default'].attr('number', {
      defaultValue: 1
    }),
    cameras: DS['default'].hasMany('camera'),
    createdAt: DS['default'].attr('date'),
    updatedAt: DS['default'].attr('date'),
    hasCamera: Ember['default'].computed.gt('cameras.length', 0)
  });

  exports['default'] = Tile;

});
define('config/router', ['exports', 'ember', 'config/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router;

  Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    return this.resource('tiles', {
      path: '/tiles'
    }, function () {
      this.resource('tiles.camera', {
        path: '/c/:cameraId'
      }, function () {
        return this.route('view');
      });
      return this.resource('tiles.tile', {
        path: '/t/:tileId'
      }, function () {
        return this.resource('tiles.tile.cameras', {
          path: '/cameras'
        }, function () {
          return this.route('new');
        });
      });
    });
  });

  exports['default'] = Router;

});
define('config/routes/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var IndexRoute;

  IndexRoute = Ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      return this.transitionTo("tiles");
    }
  });

  exports['default'] = IndexRoute;

});
define('config/routes/tiles', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var TilesRoute;

  TilesRoute = Ember['default'].Route.extend({
    model: function model() {
      return this.store.find("tile");
    },
    actions: {
      destroyTile: function destroyTile(tile) {
        return tile.destroyRecord()["finally"]((function (_this) {
          return function () {
            return _this.refresh();
          };
        })(this));
      },
      closeModal: function closeModal() {
        return this.transitionTo("tiles");
      }
    }
  });

  exports['default'] = TilesRoute;

});
define('config/routes/tiles/camera', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var TilesCameraRoute;

  TilesCameraRoute = Ember['default'].Route.extend({
    model: function model(arg) {
      var cameraId;
      cameraId = arg.cameraId;
      return this.store.find("camera", cameraId);
    }
  });

  exports['default'] = TilesCameraRoute;

});
define('config/routes/tiles/tile', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var TilesTileRoute;

  TilesTileRoute = Ember['default'].Route.extend({
    model: function model(arg) {
      var tileId;
      tileId = arg.tileId;
      return this.store.find("tile", tileId);
    }
  });

  exports['default'] = TilesTileRoute;

});
define('config/routes/tiles/tile/cameras/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var TilesTileCamerasNewRoute;

  TilesTileCamerasNewRoute = Ember['default'].Route.extend({
    model: function model() {
      var tile;
      tile = this.modelFor("tiles.tile");
      return this.store.createRecord("camera", {
        tileId: tile.get("id")
      });
    },
    tearDown: Ember['default'].on("deactivate", function () {
      var model;
      model = this.controller.get("model");
      if (Ember['default'].get(model, "isDirty")) {
        return model.deleteRecord();
      }
    })
  });

  exports['default'] = TilesTileCamerasNewRoute;

});
define('config/services/modal-dialog', ['exports', 'ember-modal-dialog/services/modal-dialog'], function (exports, Service) {

	'use strict';

	exports['default'] = Service['default'];

});
define('config/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.12.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("a");
            var el2 = dom.createTextNode("Step 1");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
          block(env, morph0, context, "link-to", ["index"], {"tagName": "li"}, child0, null);
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1,"class","grey-text text-lighten-1 right");
          dom.setAttribute(el1,"href","#!");
          var el2 = dom.createTextNode("Installer");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("main");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        dom.setAttribute(el2,"id","navigation");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        dom.setAttribute(el2,"id","content");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        dom.setAttribute(el1,"id","footer");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, block = hooks.block, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var morph0 = dom.createMorphAt(dom.childAt(element0, [1]),1,1);
        var morph1 = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
        var morph2 = dom.createMorphAt(element0,5,5);
        var morph3 = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        block(env, morph0, context, "md-navbar", [], {"name": "Configuration", "class": "indigo"}, child0, null);
        content(env, morph1, context, "outlet");
        content(env, morph2, context, "md-modal-container");
        block(env, morph3, context, "md-copyright", [], {"text": "SIMWMS", "startYear": 2014}, child1, null);
        return fragment;
      }
    };
  }()));

});
define('config/templates/components/adaptive-camera', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("img");
          dom.setAttribute(el1,"class","camera-feed");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [0]);
          element(env, element0, context, "bind-attr", [], {"src": get(env, context, "camera.permalink")});
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
          content(env, morph0, context, "webcam-wrapper");
          return fragment;
        }
      };
    }());
    var child2 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("img");
          dom.setAttribute(el1,"src","images/nocam.png");
          dom.setAttribute(el1,"class","fail-fallback");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        var morph1 = dom.createMorphAt(fragment,1,1,contextualElement);
        var morph2 = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, null);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "if", [get(env, context, "isImageCam")], {}, child0, null);
        block(env, morph1, context, "if", [get(env, context, "isWebCam")], {}, child1, null);
        block(env, morph2, context, "unless", [get(env, context, "isKnown")], {}, child2, null);
        return fragment;
      }
    };
  }()));

});
define('config/templates/components/blank-tile', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("text");
          dom.setAttribute(el1,"class","fa");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
          content(env, morph0, context, "iconText");
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("rect");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, attribute = hooks.attribute, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var attrMorph0 = dom.createAttrMorph(element0, 'x');
        var attrMorph1 = dom.createAttrMorph(element0, 'y');
        var attrMorph2 = dom.createAttrMorph(element0, 'rx');
        var attrMorph3 = dom.createAttrMorph(element0, 'ry');
        var attrMorph4 = dom.createAttrMorph(element0, 'width');
        var attrMorph5 = dom.createAttrMorph(element0, 'height');
        var attrMorph6 = dom.createAttrMorph(element0, 'stroke-width');
        var attrMorph7 = dom.createAttrMorph(element0, 'stroke');
        var attrMorph8 = dom.createAttrMorph(element0, 'fill');
        var morph0 = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, null);
        attribute(env, attrMorph0, element0, "x", get(env, context, "rectX"));
        attribute(env, attrMorph1, element0, "y", get(env, context, "rectY"));
        attribute(env, attrMorph2, element0, "rx", get(env, context, "cornerX"));
        attribute(env, attrMorph3, element0, "ry", get(env, context, "cornerY"));
        attribute(env, attrMorph4, element0, "width", get(env, context, "rectW"));
        attribute(env, attrMorph5, element0, "height", get(env, context, "rectH"));
        attribute(env, attrMorph6, element0, "stroke-width", get(env, context, "strokeWidth"));
        attribute(env, attrMorph7, element0, "stroke", get(env, context, "stroke"));
        attribute(env, attrMorph8, element0, "fill", get(env, context, "fill"));
        block(env, morph0, context, "unless", [get(env, context, "hideText")], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('config/templates/components/grid-interactions', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.12.0",
          blockParams: 1,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement, blockArguments) {
            var dom = env.dom;
            var hooks = env.hooks, set = hooks.set, get = hooks.get, inline = hooks.inline;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
            set(env, context, "tile", blockArguments[0]);
            inline(env, morph0, context, "blank-tile", [], {"model": get(env, context, "tile"), "action": "interact", "iconText": get(env, context, "icon")});
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
          block(env, morph0, context, "each", [get(env, context, "tiles")], {}, child0, null);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, null);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "if", [get(env, context, "gridModeEngaged")], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('config/templates/components/just-tile', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("rect");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("text");
        dom.setAttribute(el1,"class","fa");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, attribute = hooks.attribute, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var attrMorph0 = dom.createAttrMorph(element0, 'x');
        var attrMorph1 = dom.createAttrMorph(element0, 'y');
        var attrMorph2 = dom.createAttrMorph(element0, 'rx');
        var attrMorph3 = dom.createAttrMorph(element0, 'ry');
        var attrMorph4 = dom.createAttrMorph(element0, 'width');
        var attrMorph5 = dom.createAttrMorph(element0, 'height');
        var attrMorph6 = dom.createAttrMorph(element0, 'stroke-width');
        var attrMorph7 = dom.createAttrMorph(element0, 'stroke');
        var attrMorph8 = dom.createAttrMorph(element0, 'fill');
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [2]),0,0);
        attribute(env, attrMorph0, element0, "x", get(env, context, "rectX"));
        attribute(env, attrMorph1, element0, "y", get(env, context, "rectY"));
        attribute(env, attrMorph2, element0, "rx", get(env, context, "cornerX"));
        attribute(env, attrMorph3, element0, "ry", get(env, context, "cornerY"));
        attribute(env, attrMorph4, element0, "width", get(env, context, "rectW"));
        attribute(env, attrMorph5, element0, "height", get(env, context, "rectH"));
        attribute(env, attrMorph6, element0, "stroke-width", get(env, context, "strokeWidth"));
        attribute(env, attrMorph7, element0, "stroke", get(env, context, "stroke"));
        attribute(env, attrMorph8, element0, "fill", get(env, context, "fill"));
        content(env, morph0, context, "iconText");
        return fragment;
      }
    };
  }()));

});
define('config/templates/components/labeled-radio-button', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        var morph1 = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, 0);
        inline(env, morph0, context, "radio-button", [], {"changed": "innerRadioChanged", "disabled": get(env, context, "disabled"), "groupValue": get(env, context, "groupValue"), "name": get(env, context, "name"), "required": get(env, context, "required"), "value": get(env, context, "value")});
        content(env, morph1, context, "yield");
        return fragment;
      }
    };
  }()));

});
define('config/templates/components/modal-dialog', ['exports', 'ember-modal-dialog/templates/components/modal-dialog'], function (exports, template) {

	'use strict';

	exports['default'] = template['default'];

});
define('config/templates/components/vector-canvas', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el1 = dom.createElement("svg");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("g");
        dom.setAttribute(el2,"class","master-canvas");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, attribute = hooks.attribute, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0, 1]);
        var morph0 = dom.createMorphAt(element0,1,1);
        var attrMorph0 = dom.createAttrMorph(element0, 'transform');
        attribute(env, attrMorph0, element0, "transform", get(env, context, "canvasTransform"));
        content(env, morph0, context, "yield");
        return fragment;
      }
    };
  }()));

});
define('config/templates/components/vector-tiles', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 1,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement, blockArguments) {
          var dom = env.dom;
          var hooks = env.hooks, set = hooks.set, get = hooks.get, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
          set(env, context, "tile", blockArguments[0]);
          inline(env, morph0, context, "just-tile", [], {"model": get(env, context, "tile"), "action": "interact"});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, null);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "each", [get(env, context, "tiles")], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('config/templates/tiles', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
          content(env, morph0, context, "md-loader");
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          var morph1 = dom.createMorphAt(fragment,1,1,contextualElement);
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
          inline(env, morph0, context, "grid-interactions", [], {"mode": get(env, context, "currentMode"), "type": get(env, context, "buildType"), "action": "clickBlank"});
          inline(env, morph1, context, "vector-tiles", [], {"models": get(env, context, "model"), "action": "clickTile"});
          return fragment;
        }
      };
    }());
    var child2 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.12.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("span");
            var el2 = dom.createTextNode("Query mode allows you to inspect your layout tiles.");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            return fragment;
          }
        };
      }());
      var child1 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.12.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("span");
            var el2 = dom.createTextNode("Move mode lets you move tiles around.");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            return fragment;
          }
        };
      }());
      var child2 = (function() {
        var child0 = (function() {
          var child0 = (function() {
            var child0 = (function() {
              return {
                isHTMLBars: true,
                revision: "Ember@1.12.0",
                blockParams: 0,
                cachedFragment: null,
                hasRendered: false,
                build: function build(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createElement("span");
                  var el2 = dom.createTextNode("Place a road tile");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  return el0;
                },
                render: function render(context, env, contextualElement) {
                  var dom = env.dom;
                  dom.detectNamespace(contextualElement);
                  var fragment;
                  if (env.useFragmentCache && dom.canClone) {
                    if (this.cachedFragment === null) {
                      fragment = this.build(dom);
                      if (this.hasRendered) {
                        this.cachedFragment = fragment;
                      } else {
                        this.hasRendered = true;
                      }
                    }
                    if (this.cachedFragment) {
                      fragment = dom.cloneNode(this.cachedFragment, true);
                    }
                  } else {
                    fragment = this.build(dom);
                  }
                  return fragment;
                }
              };
            }());
            var child1 = (function() {
              return {
                isHTMLBars: true,
                revision: "Ember@1.12.0",
                blockParams: 0,
                cachedFragment: null,
                hasRendered: false,
                build: function build(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createElement("span");
                  var el2 = dom.createTextNode("Place a dock tile");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  return el0;
                },
                render: function render(context, env, contextualElement) {
                  var dom = env.dom;
                  dom.detectNamespace(contextualElement);
                  var fragment;
                  if (env.useFragmentCache && dom.canClone) {
                    if (this.cachedFragment === null) {
                      fragment = this.build(dom);
                      if (this.hasRendered) {
                        this.cachedFragment = fragment;
                      } else {
                        this.hasRendered = true;
                      }
                    }
                    if (this.cachedFragment) {
                      fragment = dom.cloneNode(this.cachedFragment, true);
                    }
                  } else {
                    fragment = this.build(dom);
                  }
                  return fragment;
                }
              };
            }());
            var child2 = (function() {
              return {
                isHTMLBars: true,
                revision: "Ember@1.12.0",
                blockParams: 0,
                cachedFragment: null,
                hasRendered: false,
                build: function build(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createElement("span");
                  var el2 = dom.createTextNode("Place a yard tile");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  return el0;
                },
                render: function render(context, env, contextualElement) {
                  var dom = env.dom;
                  dom.detectNamespace(contextualElement);
                  var fragment;
                  if (env.useFragmentCache && dom.canClone) {
                    if (this.cachedFragment === null) {
                      fragment = this.build(dom);
                      if (this.hasRendered) {
                        this.cachedFragment = fragment;
                      } else {
                        this.hasRendered = true;
                      }
                    }
                    if (this.cachedFragment) {
                      fragment = dom.cloneNode(this.cachedFragment, true);
                    }
                  } else {
                    fragment = this.build(dom);
                  }
                  return fragment;
                }
              };
            }());
            var child3 = (function() {
              return {
                isHTMLBars: true,
                revision: "Ember@1.12.0",
                blockParams: 0,
                cachedFragment: null,
                hasRendered: false,
                build: function build(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createElement("span");
                  var el2 = dom.createTextNode("Place a scale tile");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  return el0;
                },
                render: function render(context, env, contextualElement) {
                  var dom = env.dom;
                  dom.detectNamespace(contextualElement);
                  var fragment;
                  if (env.useFragmentCache && dom.canClone) {
                    if (this.cachedFragment === null) {
                      fragment = this.build(dom);
                      if (this.hasRendered) {
                        this.cachedFragment = fragment;
                      } else {
                        this.hasRendered = true;
                      }
                    }
                    if (this.cachedFragment) {
                      fragment = dom.cloneNode(this.cachedFragment, true);
                    }
                  } else {
                    fragment = this.build(dom);
                  }
                  return fragment;
                }
              };
            }());
            var child4 = (function() {
              return {
                isHTMLBars: true,
                revision: "Ember@1.12.0",
                blockParams: 0,
                cachedFragment: null,
                hasRendered: false,
                build: function build(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createElement("span");
                  var el2 = dom.createTextNode("Place a gateway tile");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  return el0;
                },
                render: function render(context, env, contextualElement) {
                  var dom = env.dom;
                  dom.detectNamespace(contextualElement);
                  var fragment;
                  if (env.useFragmentCache && dom.canClone) {
                    if (this.cachedFragment === null) {
                      fragment = this.build(dom);
                      if (this.hasRendered) {
                        this.cachedFragment = fragment;
                      } else {
                        this.hasRendered = true;
                      }
                    }
                    if (this.cachedFragment) {
                      fragment = dom.cloneNode(this.cachedFragment, true);
                    }
                  } else {
                    fragment = this.build(dom);
                  }
                  return fragment;
                }
              };
            }());
            return {
              isHTMLBars: true,
              revision: "Ember@1.12.0",
              blockParams: 0,
              cachedFragment: null,
              hasRendered: false,
              build: function build(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                return el0;
              },
              render: function render(context, env, contextualElement) {
                var dom = env.dom;
                var hooks = env.hooks, block = hooks.block;
                dom.detectNamespace(contextualElement);
                var fragment;
                if (env.useFragmentCache && dom.canClone) {
                  if (this.cachedFragment === null) {
                    fragment = this.build(dom);
                    if (this.hasRendered) {
                      this.cachedFragment = fragment;
                    } else {
                      this.hasRendered = true;
                    }
                  }
                  if (this.cachedFragment) {
                    fragment = dom.cloneNode(this.cachedFragment, true);
                  }
                } else {
                  fragment = this.build(dom);
                }
                var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
                var morph1 = dom.createMorphAt(fragment,1,1,contextualElement);
                var morph2 = dom.createMorphAt(fragment,2,2,contextualElement);
                var morph3 = dom.createMorphAt(fragment,3,3,contextualElement);
                var morph4 = dom.createMorphAt(fragment,4,4,contextualElement);
                dom.insertBoundary(fragment, null);
                dom.insertBoundary(fragment, 0);
                block(env, morph0, context, "md-collapsible", [], {"icon": "fa fa-road", "title": "Road", "action": "selectBuild", "model": "road"}, child0, null);
                block(env, morph1, context, "md-collapsible", [], {"icon": "fa fa-subway", "title": "Dock", "action": "selectBuild", "model": "barn"}, child1, null);
                block(env, morph2, context, "md-collapsible", [], {"icon": "fa fa-cubes", "title": "Yard", "action": "selectBuild", "model": "warehouse"}, child2, null);
                block(env, morph3, context, "md-collapsible", [], {"icon": "fa fa-calculator", "title": "Scale", "action": "selectBuild", "model": "scale"}, child3, null);
                block(env, morph4, context, "md-collapsible", [], {"icon": "fa fa-sign-in", "title": "Gate", "action": "selectBuild", "model": "station"}, child4, null);
                return fragment;
              }
            };
          }());
          return {
            isHTMLBars: true,
            revision: "Ember@1.12.0",
            blockParams: 0,
            cachedFragment: null,
            hasRendered: false,
            build: function build(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            render: function render(context, env, contextualElement) {
              var dom = env.dom;
              var hooks = env.hooks, block = hooks.block;
              dom.detectNamespace(contextualElement);
              var fragment;
              if (env.useFragmentCache && dom.canClone) {
                if (this.cachedFragment === null) {
                  fragment = this.build(dom);
                  if (this.hasRendered) {
                    this.cachedFragment = fragment;
                  } else {
                    this.hasRendered = true;
                  }
                }
                if (this.cachedFragment) {
                  fragment = dom.cloneNode(this.cachedFragment, true);
                }
              } else {
                fragment = this.build(dom);
              }
              var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
              dom.insertBoundary(fragment, null);
              dom.insertBoundary(fragment, 0);
              block(env, morph0, context, "md-card-collapsible", [], {}, child0, null);
              return fragment;
            }
          };
        }());
        return {
          isHTMLBars: true,
          revision: "Ember@1.12.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","exposition");
            var el2 = dom.createTextNode("Build mode lets you put tiles onto the board.");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, block = hooks.block;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
            dom.insertBoundary(fragment, null);
            block(env, morph0, context, "if", [get(env, context, "buildModeEngaged")], {}, child0, null);
            return fragment;
          }
        };
      }());
      var child3 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.12.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("span");
            var el2 = dom.createTextNode("You can delete tiles in delete mode.");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          var morph1 = dom.createMorphAt(fragment,1,1,contextualElement);
          var morph2 = dom.createMorphAt(fragment,2,2,contextualElement);
          var morph3 = dom.createMorphAt(fragment,3,3,contextualElement);
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
          block(env, morph0, context, "md-collapsible", [], {"icon": "fa-info-circle fa", "active": true, "title": "Query", "action": "changeMode", "model": "query"}, child0, null);
          block(env, morph1, context, "md-collapsible", [], {"icon": "fa-arrows fa", "title": "Move", "action": "changeMode", "model": "move"}, child1, null);
          block(env, morph2, context, "md-collapsible", [], {"icon": "fa-building fa", "title": "Build", "action": "changeMode", "model": "build"}, child2, null);
          block(env, morph3, context, "md-collapsible", [], {"icon": "fa-trash fa", "title": "Delete", "action": "changeMode", "model": "delete"}, child3, null);
          return fragment;
        }
      };
    }());
    var child3 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
          inline(env, morph0, context, "md-fixed-btn", [], {"btnClass": "grey", "btnIcon": "fa fa-bomb", "action": "destroyEverything"});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        dom.setAttribute(el1,"id","game");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        dom.setAttribute(el1,"id","right-nav");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("span");
        dom.setAttribute(el1,"id","busy-mouse-flash");
        dom.setAttribute(el1,"class","hidden");
        var el2 = dom.createTextNode("busy!!");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [2]);
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        var morph1 = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
        var morph2 = dom.createMorphAt(element0,0,0);
        var morph3 = dom.createMorphAt(element0,1,1);
        var morph4 = dom.createUnsafeMorphAt(fragment,3,3,contextualElement);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "if", [get(env, context, "transitionMode")], {}, child0, null);
        block(env, morph1, context, "vector-canvas", [], {}, child1, null);
        block(env, morph2, context, "md-card-collapsible", [], {}, child2, null);
        block(env, morph3, context, "md-fixed-btns", [], {"btnIcon": "mdi-alert-warning", "btnClass": "btn red darken-2"}, child3, null);
        content(env, morph4, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('config/templates/tiles/camera', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("span");
          dom.setAttribute(el1,"class","capitalize");
          var el2 = dom.createTextNode("cameras");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("span");
          dom.setAttribute(el1,"class","capitalize");
          var el2 = dom.createTextNode("camera data");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child2 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("span");
          dom.setAttribute(el1,"class","capitalize");
          var el2 = dom.createTextNode("feed video");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"id","tile-modal");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","row");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col l6 m8 s12 offset-l3 offset-m2");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","card");
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","card-content blue-grey-text text-darken-4");
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","card-title blue-grey-text text-darken-4");
        var el8 = dom.createElement("span");
        dom.setAttribute(el8,"class","capitalize");
        var el9 = dom.createTextNode("camera no.");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("span");
        var el9 = dom.createComment("");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("ul");
        dom.setAttribute(el7,"class","tabs");
        var el8 = dom.createElement("li");
        dom.setAttribute(el8,"class","tab col s4");
        var el9 = dom.createComment("");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("li");
        dom.setAttribute(el8,"class","tab col s4");
        var el9 = dom.createComment("");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("li");
        dom.setAttribute(el8,"class","tab col s4");
        var el9 = dom.createComment("");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content, inline = hooks.inline, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0, 0, 0, 0, 0, 0]);
        var element1 = dom.childAt(element0, [0]);
        var element2 = dom.childAt(element0, [1]);
        var morph0 = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
        var morph1 = dom.createMorphAt(element1,2,2);
        var morph2 = dom.createMorphAt(dom.childAt(element2, [0]),0,0);
        var morph3 = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
        var morph4 = dom.createMorphAt(dom.childAt(element2, [2]),0,0);
        var morph5 = dom.createUnsafeMorphAt(element0,2,2);
        content(env, morph0, context, "model.id");
        inline(env, morph1, context, "md-btn", [], {"icon": "mdi-navigation-close", "action": "closeModal", "buttonType": "floating", "class": "btn float-right blue-grey darken-3"});
        block(env, morph2, context, "link-to", ["tiles.tile.cameras", get(env, context, "model.tileId")], {}, child0, null);
        block(env, morph3, context, "link-to", ["tiles.camera.index", get(env, context, "model.id")], {}, child1, null);
        block(env, morph4, context, "link-to", ["tiles.camera.view", get(env, context, "model.id")], {}, child2, null);
        content(env, morph5, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('config/templates/tiles/camera/-form', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, inline = hooks.inline, get = hooks.get;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          var morph1 = dom.createMorphAt(fragment,1,1,contextualElement);
          var morph2 = dom.createMorphAt(fragment,2,2,contextualElement);
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
          inline(env, morph0, context, "md-switch", [], {"value": "img-cgi", "name": "IP Camera"});
          inline(env, morph1, context, "md-switch", [], {"value": "user-media", "name": "Web Cam"});
          inline(env, morph2, context, "md-input", [], {"value": get(env, context, "model.cameraName"), "label": "camera name"});
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          var morph1 = dom.createMorphAt(fragment,1,1,contextualElement);
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
          inline(env, morph0, context, "md-input", [], {"value": get(env, context, "model.permalink"), "label": "permalink"});
          inline(env, morph1, context, "md-input", [], {"value": get(env, context, "model.macAddress"), "label": "mac address"});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block, inline = hooks.inline;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        var morph1 = dom.createMorphAt(fragment,1,1,contextualElement);
        var morph2 = dom.createMorphAt(fragment,2,2,contextualElement);
        var morph3 = dom.createMorphAt(fragment,3,3,contextualElement);
        dom.insertBoundary(fragment, null);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "md-switches", [], {"multiple": false, "selection": get(env, context, "model.cameraStyle")}, child0, null);
        block(env, morph1, context, "if", [get(env, context, "model.isImageCam")], {}, child1, null);
        inline(env, morph2, context, "md-btn", [], {"text": "cancel", "icon": "mdi-av-not-interested", "action": "cancel", "class": "grey darken-3", "buttonType": "large"});
        inline(env, morph3, context, "md-btn-submit", [], {"icon": "mdi-content-send", "iconPosition": "right", "text": "Submit", "buttonType": "large"});
        return fragment;
      }
    };
  }()));

});
define('config/templates/tiles/camera/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","very-spacious center-align");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element1 = dom.childAt(fragment, [0]);
          var morph0 = dom.createMorphAt(element1,0,0);
          var morph1 = dom.createMorphAt(element1,1,1);
          inline(env, morph0, context, "md-btn", [], {"text": "confirm", "icon": "mdi-alert-warning", "action": "destroy", "class": "red darken-3", "buttonType": "large"});
          inline(env, morph1, context, "md-btn", [], {"text": "nevermind", "icon": "mdi-av-not-interested", "action": "undestroy", "class": "grey darken-3", "buttonType": "large"});
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","spacious center-align");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          dom.setAttribute(el1,"class","card-form");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, inline = hooks.inline, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1]);
          var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
          var morph1 = dom.createUnsafeMorphAt(element0,0,0);
          inline(env, morph0, context, "md-btn", [], {"text": "destroy", "icon": "mdi-alert-warning", "action": "destroy", "class": "red darken-3"});
          element(env, element0, context, "action", ["editCamera"], {"on": "submit"});
          inline(env, morph1, context, "partial", ["tiles/camera/form"], {});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, null);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "if", [get(env, context, "destroyModeEngaged")], {}, child0, child1);
        return fragment;
      }
    };
  }()));

});
define('config/templates/tiles/camera/view', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","very-spacious center-align");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
        inline(env, morph0, context, "adaptive-camera", [], {"camera": get(env, context, "model")});
        return fragment;
      }
    };
  }()));

});
define('config/templates/tiles/tile', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("span");
          dom.setAttribute(el1,"class","capitalize");
          var el2 = dom.createTextNode("attributes");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("span");
          dom.setAttribute(el1,"class","capitalize");
          var el2 = dom.createTextNode("cameras");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"id","tile-modal");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","row");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col l6 m8 s12 offset-l3 offset-m2");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","card");
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","card-content blue-grey-text text-darken-4");
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","card-title blue-grey-text text-darken-4");
        var el8 = dom.createElement("span");
        dom.setAttribute(el8,"class","capitalize");
        var el9 = dom.createTextNode("tile no.");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("span");
        var el9 = dom.createComment("");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("ul");
        dom.setAttribute(el7,"class","tabs");
        var el8 = dom.createElement("li");
        dom.setAttribute(el8,"class","tab col s6");
        var el9 = dom.createComment("");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("li");
        dom.setAttribute(el8,"class","tab col s6");
        var el9 = dom.createComment("");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content, inline = hooks.inline, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0, 0, 0, 0, 0, 0]);
        var element1 = dom.childAt(element0, [0]);
        var element2 = dom.childAt(element0, [1]);
        var morph0 = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
        var morph1 = dom.createMorphAt(element1,2,2);
        var morph2 = dom.createMorphAt(dom.childAt(element2, [0]),0,0);
        var morph3 = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
        var morph4 = dom.createUnsafeMorphAt(element0,2,2);
        content(env, morph0, context, "model.id");
        inline(env, morph1, context, "md-btn", [], {"icon": "mdi-navigation-close", "action": "closeModal", "buttonType": "floating", "class": "btn float-right blue-grey darken-3"});
        block(env, morph2, context, "link-to", ["tiles.tile.index", get(env, context, "model.id")], {}, child0, null);
        block(env, morph3, context, "link-to", ["tiles.tile.cameras", get(env, context, "model.id")], {}, child1, null);
        content(env, morph4, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('config/templates/tiles/tile/cameras', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.12.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, content = hooks.content;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createUnsafeMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, null);
            dom.insertBoundary(fragment, 0);
            content(env, morph0, context, "outlet");
            return fragment;
          }
        };
      }());
      var child1 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.12.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, null);
            dom.insertBoundary(fragment, 0);
            inline(env, morph0, context, "md-collapsible", [], {"icon": "mdi-image-camera-alt", "title": get(env, context, "camera.cameraName"), "action": "showCamera", "model": get(env, context, "camera")});
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, block = hooks.block, get = hooks.get;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          var morph1 = dom.createMorphAt(fragment,1,1,contextualElement);
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
          block(env, morph0, context, "md-collapsible", [], {"icon": "mdi-av-my-library-add", "title": "New Camera", "action": "newCamera"}, child0, null);
          block(env, morph1, context, "each", [get(env, context, "model.cameras")], {"keyword": "camera"}, child1, null);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, null);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "md-card-collapsible", [], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('config/templates/tiles/tile/cameras/new', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("form");
        dom.setAttribute(el1,"class","card-form");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, element = hooks.element, inline = hooks.inline;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var morph0 = dom.createUnsafeMorphAt(element0,0,0);
        element(env, element0, context, "action", ["newCamera"], {"on": "submit"});
        inline(env, morph0, context, "partial", ["tiles/camera/form"], {});
        return fragment;
      }
    };
  }()));

});
define('config/templates/tiles/tile/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","very-spacious center-align");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element1 = dom.childAt(fragment, [0]);
          var morph0 = dom.createMorphAt(element1,0,0);
          var morph1 = dom.createMorphAt(element1,1,1);
          inline(env, morph0, context, "md-btn", [], {"text": "confirm", "icon": "mdi-alert-warning", "action": "destroy", "class": "red darken-3", "buttonType": "large"});
          inline(env, morph1, context, "md-btn", [], {"text": "nevermind", "icon": "mdi-av-not-interested", "action": "undestroy", "class": "grey darken-3", "buttonType": "large"});
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","spacious center-align");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          dom.setAttribute(el1,"class","card-form");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, inline = hooks.inline, element = hooks.element, get = hooks.get;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1]);
          var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
          var morph1 = dom.createMorphAt(element0,0,0);
          var morph2 = dom.createMorphAt(element0,1,1);
          var morph3 = dom.createMorphAt(element0,2,2);
          var morph4 = dom.createMorphAt(element0,3,3);
          var morph5 = dom.createMorphAt(element0,4,4);
          var morph6 = dom.createMorphAt(element0,5,5);
          inline(env, morph0, context, "md-btn", [], {"text": "destroy", "icon": "mdi-alert-warning", "action": "destroy", "class": "red darken-3"});
          element(env, element0, context, "action", ["editTile"], {"on": "submit"});
          inline(env, morph1, context, "md-input", [], {"value": get(env, context, "model.tileType"), "label": "tile type"});
          inline(env, morph2, context, "md-input", [], {"value": get(env, context, "model.tileName"), "label": "tile name"});
          inline(env, morph3, context, "md-input", [], {"type": "number", "value": get(env, context, "model.width"), "label": "width"});
          inline(env, morph4, context, "md-input", [], {"type": "number", "value": get(env, context, "model.height"), "label": "height"});
          inline(env, morph5, context, "md-btn", [], {"text": "cancel", "icon": "mdi-av-not-interested", "action": "cancel", "class": "grey darken-3", "buttonType": "large"});
          inline(env, morph6, context, "md-btn-submit", [], {"icon": "mdi-content-send", "iconPosition": "right", "text": "Submit", "buttonType": "large"});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, null);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "if", [get(env, context, "destroyModeEngaged")], {}, child0, child1);
        return fragment;
      }
    };
  }()));

});
define('config/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('config/tests/helpers/resolver', ['exports', 'ember/resolver', 'config/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('config/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('config/tests/helpers/start-app', ['exports', 'ember', 'config/app', 'config/router', 'config/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('config/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('config/tests/test-helper', ['config/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('config/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('config/views/application', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].View.extend({});

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('config/config/environment', ['ember'], function(Ember) {
  var prefix = 'config';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("config/tests/test-helper");
} else {
  require("config/app")["default"].create({"name":"config","version":"0.0.0.550db0f1"});
}

/* jshint ignore:end */
//# sourceMappingURL=config.map
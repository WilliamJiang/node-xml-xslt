
/**
 * extract available modules from <pane> array
 * @param panes: Array
 * return:
 * { '091e9c5e80f046b5':
       { chronic_id: '091e9c5e80f046b5',
         class: 'EditorialModule',
         r_object_id: '091e9c5e8131b989',
         path: '/Editorial_091e9c5e80f4bedb.wxml' },
  '091e9c5e80f4bedb':
       { chronic_id: '091e9c5e80f4bedb',
         class: 'EditorialModule',
         r_object_id: '091e9c5e81165b24',
         path: '/Editorial_091e9c5e80f4bedb.wxml' },
  '091e9c5e80f08908':
       { chronic_id: '091e9c5e80f08908',
         class: 'LinkListModule',
         r_object_id: '091e9c5e81165b2c',
         path: '/LinkList_091e9c5e80f08908.wxml' }
  }
 */
function get_available_modules(panes) {

    var available_panes = [], available_modules = [];

    available_panes = panes.filter(function (pane) {
        return pane.module && Array.isArray(pane.module);
    });

    if (available_panes.length > 0) {
        available_panes.forEach(function (ap) {
            ap.module.forEach(function (m) {
                available_modules.push(m);
                //available_modules[m.chronic_id] = m;
            });
        });
    }
    return available_modules;
}

///////////////////
function get_available_modules_1(panes) {

    var available_panes = [], available_modules = {};

    /**
     * TODO: fix the issue
     */
    available_panes = panes.filter(function (pane) {
        return typeof pane.module === 'object';
    });

    //console.log('======: ', available_panes);

    if (available_panes.length > 0) {
        available_panes.forEach(function (ap) {

            ap.module.forEach(function (m) {

                if (!available_modules[ap.name]) {
                    available_modules[ap.name] = [];
                }
                available_modules[ap.name].push(m);
            });
        });
    }
    return available_modules;
}


module.exports = {
    webmd_page: webmd_page,
    get_available_modules: get_available_modules,
    get_available_modules_1: get_available_modules_1
};




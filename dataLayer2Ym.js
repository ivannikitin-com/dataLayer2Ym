(function(){
    // ID Яндекс.Метрики
    const YM_ID = 123456789;

    // Режим отладки включается параметром Метрики
    const DEBUG = /_ym_debug=1/.test(location.search);

    // Объект переменных dataLayer
    window.dataLayerVars = {};

    // Прокси на dataLayer
    window.dataLayer = new Proxy((window.dataLayer || []), {
        get(obj, prop) {
            if (prop === 'push') {
                // Обработка dataLayer.push()
                return function(v) {
                    let data = {...v};
                    // Если передано событие
                    if (typeof(data.event) !== 'undefined') {
                        // Имя события
                        let event = data.event;
                        delete data.event;
                        window.dataLayerVars = Object.assign(window.dataLayerVars, data);
                        DEBUG && console.log('dataLayer event', event, window.dataLayerVars);
                        try {
                            ym(YM_ID, 'reachGoal', event, data);
                        }
                        catch (ex) {
                            DEBUG && console.warn('YM Error:', ex.message);
                        }
                    }
                    else {
                        // Просто передача параметров без события
                        window.dataLayerVars = Object.assign(window.dataLayerVars, data);
                        DEBUG && console.log('dataLayer variables', window.dataLayerVars);
                    }
                    return obj.push.apply(obj, arguments);
                }
            } else {
                // Все остальные обращения в datalayer
                return Reflect.get(...arguments);
            }
        }
    });
})();
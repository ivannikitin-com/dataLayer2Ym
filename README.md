# dataLayer2Ym
Передача событий dataLayer в Яндекс.Метрику без GTM

Описание скрипта
----------------

В современных реалиях возможна ситуация когда продукты компании Google могут быть отключены с сайта.
Особенно это касается Google Analytics, и особенно Google Tag Manager. 
Отключение GTM приводит к тому что приходится переделывать всю логику передачи событий в аналитические системы.

Данный скрипт позволяет уменьшить количество изменений на сайте. Скрипт перехватывает все обращения к объекту `dataLayer` 
и передает все события в Яндекс метрику со всеми переданными параметрами. 
Кроме того данный скрипт сохраняет установленные значения переменных `dataLayer`, что позволяет ими пользоваться ранее установленными переменными в своих передачах значений. Значения всех переменных сохраняются в глобальном объекте `dataLayerVars`.

Описание скрипта доступно на сайте
https://ivannikitin.com/2022/04/02/datalayer-yandex-metrika/

Как пользоваться скриптом передачи событий в Яндекс.Метрику без GTM
-------------------------------------------------------------------

1.	Возьмите последнюю версию скрипта dataLayer2Ym из репозитария Github. 
2.	Найдите в самом начале скрипта строку const YM_ID = 123456789; и замените в ней код счетчика Яндекс.Метрики на свой.
3.	Разместите ее на всех страницах своего сайта в любом месте кода HTML.

Всё! С этого момента любые события, передаваемые в dataLayer, уходят в Яндекс.Метрику.

Как пользоваться переменными dataLayer
--------------------------------------

Если в событии передаются любые параметры, например так:

```
dataLayer.push({
    'event' : 'login', 
    'user_id' : 'U-XXXXXXXX'
});
```

Или просто устанавливаются переменные, например, так:

```
dataLayer.push({
    'user_id' : 'U-XXXXXXXX'
});
```

То все эти параметры (переменные dataLayer) доступны для дальнейшего использования в любое время, например, так:

```
let userId = dataLayerVars.user_id;
```

Или так

```
let userId = dataLayerVars['user_id'];
```

Отладка скрипта передачи событий в Яндекс.Метрику
-------------------------------------------------

Режим отладки скрипта включается автоматически вместе с 
[отладкой Яндекс.Метрики](https://yandex.ru/support/metrica/general/check-goal.html). 
В режиме отладки все свои действия скрипт выводит в консоль браузера. Чтобы включить режим отладки, просто добавьте в URL своего сайта параметр `_ym_debug=1`, например  
https://example.com/?_ym_debug=1

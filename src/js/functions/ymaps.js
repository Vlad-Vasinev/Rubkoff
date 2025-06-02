//////////
// YMAPS
//////////

import { isDesktop } from "./check-viewport";

APP.Plugins.Ymaps = {
  data: {
    scriptsCreated: false,
    ymapsLoaded: false,
    clusterMap: undefined,
    activeFilters: []
  },
  init: function () {

    if (document.querySelectorAll('.js-ymap').length > 0) {
      if (this.data.ymapsLoaded) {
        ymaps.ready(this.initMaps.bind(this));
      } else {
        this.tryLoadScripts();
      }
    }
  },
  createScripts: function () {
    var ymapsK = '5be99777-28b1-4aa9-a6d7-768b88abf16c';
    var ymapsScript = document.createElement('script');
    ymapsScript.type = 'text/javascript';
    ymapsScript.src = 'https://api-maps.yandex.ru/2.1/?apikey=' + ymapsK + '&lang=ru_RU';
    document.querySelector('head').appendChild(ymapsScript);
    this.data.scriptsCreated = true;
  },
  tryLoadScripts: function () {
    var _this = this;
    if (!_this.data.scriptsCreated) {
      _this.createScripts();
    }

    var ticker = setInterval(readyChecker, 250);
    function readyChecker() {
      if (!_this.data.ymapsLoaded) {
        try {
          if (ymaps.ready()) {
            _this.data.ymapsLoaded = true;
            _this.init(); // reinit
            clearInterval(ticker);
          }
        } catch (e) {
          // console.log('maps not ready yeat, another try');
        }
      }
    }
  },
  initMaps: function () {
    var _this = this;
    document.querySelectorAll('.js-ymap').forEach(function (domElement, i) {
      _this.drawMap(domElement);
    });
  },
  drawMap: function (domElement) {
    window.maps = []
    var _this = this;
    var domElement = domElement

    var type = domElement.dataset.type || 'simple';
    if (domElement.length === 0) return;

    var myMap;
    var params = {
      center: _this.geoStringToArr(domElement.dataset.center),
      zoom: domElement.dataset.zoom || 10,
      icon: domElement.dataset.iconUrlEnc || undefined,

    };


    // CREATE MAP INSTANCE
    myMap = new ymaps.Map(domElement, {
      center: params.center,
      zoom: params.zoom,
    });
    // save insance
    if (type === 'cluster') {
      _this.data.clusterMap = myMap;
    } else if (type === 'simple') {
      // _this.data.
    }
    // CONTROLS
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('searchControl');
    myMap.controls.remove('fullscreenControl');
    myMap.controls.remove('rulerControl');
    myMap.controls.remove('geolocationControl');
    myMap.controls.remove('routeEditor');
    myMap.controls.remove('typeSelector');

    if(isDesktop()) {
      myMap.behaviors.disable('scrollZoom');
    }
    // if(isMobile()) myMap.behaviors.disable('drag'); .page__block_header-offset
    // myMap.controls.remove('zoomControl');

    // PLACEMARKS
    if (type === 'cluster') {
      function buildBallon(objectData) {
        const balloonTpl = document.querySelector('.map-balloon-tpl').content.firstElementChild.cloneNode(true);
        let params
        try {
          params = objectData
        } catch (error) {
          // console.log('map balloon params json error')
        }
        if (params) {
          if (params.title) {
            balloonTpl.querySelector('.product-card__title h3, .product-card__title .h3').innerHTML = params.title
          }
          if (params.img) {
            balloonTpl.querySelector('.product-card__img img').src = params.img
          }
          if (params.href) {
            balloonTpl.href = params.href
          }
          const ctr = balloonTpl.querySelector('.product-card__chars-ctr')
          params.chars.forEach((el) => {
            if(!el.val){
              return
            }
            const char = document.createElement('div')
            char.classList.add('product-card__char')
            char.innerHTML = `<div class="_key h6">${el.key}:</div><div class="h6">${el.val}</div>`
            ctr.appendChild(char)
          })

          return balloonTpl.outerHTML
        }
      }

      async function getPoints(url) {
        try {
          // console.log(url);
          return fetch(url).then((response) => {
            return response.json();
          })
            .then((data) => {
              return data
            });
        } catch (error) {
          console.error(error)
          return undefined
        }
      }

      getPoints(domElement.dataset.pointsUrl).then((data) => {
        const geoPoints = data.points
        const icons = data.icons
        let onMapModal
        let onMapModalBody
        // console.log('geoPoints', geoPoints)
        if(isMobile()){
          const modaltpl = document.querySelector('#modal-template').content.firstElementChild.cloneNode(true)
          const mbg = document.querySelector('.modal-background')
          modaltpl.dataset.modalName = 'on-map-modal'
          const newModal =  mbg.parentNode.insertBefore(modaltpl, mbg)
          newModal.classList.add('_inited', 'modal_on-map')
          newModal.querySelector('.modal__close-button')?.addEventListener('click', window.closeModal)
          

          onMapModal = newModal
          onMapModalBody = newModal.querySelector('.modal__body')

        }
        if (geoPoints && geoPoints.length > 0) {

          var placemarkCluster1 = new ymaps.Clusterer({
            preset: 'islands#redClusterIcons',
          });
          var placemarkCluster2 = new ymaps.Clusterer({
            preset: 'islands#blueClusterIcons',
          });
          var placemarkArr = [];

          const manager = new ymaps.ObjectManager({
            clusterize: true,

            clusterIconLayout: "default#pieChart",
            clusterIconPieChartStrokeWidth: 0,

            clusterIconPieChartRadius: isMobile() ? 22.5 : aPixels(22.5),
            pieChartCoreRadius: isMobile() ? 17.5 : aPixels(17.5)



          });
          // manager.clusters.options.set({
          //   pieChartStrokeStyle: '#f00'
          // });



          geoPoints.forEach(function (point, pointIndx) {
            // var $point = $(point);
            var geodata = _this.geoStringToArr(point.geodata);
            var marker = point.marker;
            var shopId = point.shopId;

            let placemark

            manager.add({
              type: 'Feature',
              id: pointIndx,
              geometry: {
                type: 'Point',
                coordinates: geodata
              },
              properties: {
                type: point.projType,
                clusterCaption: point.projType,
                balloonContentBody: !isMobile() ? point.ballonHTML || buildBallon(point.objectData) : undefined,
              },
              options: {
                iconColor: icons[point.projType]?.color,
                iconLayout: icons[point.projType]?.icon ? 'default#image' : undefined,
                iconImageHref: icons[point.projType]?.icon,
                iconImageSize: isMobile() ? [40, 45] : [aPixels(45), aPixels(50)],
                iconImageOffset: isMobile() ? [-20, -45] : [aPixels(-22.5), aPixels(-50)],
              }
            });
            placemarkArr.push({ id: shopId, geoObj: placemark });
            manager.objects.getById(pointIndx)
          });
          if(isMobile()){
            manager.objects.events.add('click', function (e) {
              var objectId = e.get('objectId');
              window.openModal(undefined, onMapModal, ()=>{onMapModalBody.innerHTML = geoPoints[objectId].ballonHTML || buildBallon(geoPoints[objectId].objectData)})
            });
          }

          
          
          myMap.geoObjects.add(manager);

          document.querySelectorAll('.map-block__flt-btn[data-point-type]').forEach((btn) => {
            btn.addEventListener('click', (e) => {
              //console.log(typeof(e.currentTarget.dataset.pointType))
              e.currentTarget.classList.toggle('toggle-tag_active');
              const activeBtns = document.querySelectorAll('.map-block__flt-btn.toggle-tag_active')

              if (activeBtns.length) {
                const fltArr = Array.from(activeBtns).map(el => el.dataset.pointType)
                // console.log(fltArr)
                manager.setFilter(function (object) {
                  return fltArr.includes(object.properties.type);
                });

              }
              else {
                manager.setFilter(() => { return true });
              }
            })
          })
        }
      })

    } else if (type === 'simple') {
      var placemark = new ymaps.Placemark(
        params.center,
        {
          // balloonContent: params.placeholder.balloon,
          // iconCaption: params.placeholder.caption,
        },
        {
          // preset: 'islands#darkGreenPocketIcon',
          iconLayout: params.icon ? 'default#image' : undefined,
          iconImageHref: params.icon,
          iconImageSize: isMobile() ? [46, 56] : [70, 85],
          iconImageOffset: isMobile() ? [-23, -56] : [-35, -85],
        }
      );

      myMap.geoObjects.add(placemark);
      

    }
    window.maps.push(myMap)
  },
  geoStringToArr: function (str) {
    var split = str.split(',');
    if (split.length === 2) {
      return [parseFloat(split[0]), parseFloat(split[1])];
    }
    return false;
  },
};


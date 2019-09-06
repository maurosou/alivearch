webpackJsonp([10],{

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoriteProvider; });
/* unused harmony export Favorite */
/* unused harmony export FavoriteList */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(130);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var STORAGE_KEY = 'favoriteBuildings';
var FavoriteProvider = /** @class */ (function () {
    function FavoriteProvider(storage) {
        this.storage = storage;
    }
    FavoriteProvider.prototype.isFavorite = function (buildingId) {
        return this.getAllFavoriteBuildings().then(function (result) {
            return result && result.indexOf(buildingId) !== -1;
        });
    };
    FavoriteProvider.prototype.favoriteBuilding = function (buildingId) {
        var _this = this;
        return this.getAllFavoriteBuildings().then(function (result) {
            if (result) {
                result.push(buildingId);
                return _this.storage.set(STORAGE_KEY, result);
            }
            else {
                return _this.storage.set(STORAGE_KEY, [buildingId]);
            }
        });
    };
    FavoriteProvider.prototype.unfavoriteBuilding = function (buildingId) {
        var _this = this;
        return this.getAllFavoriteBuildings().then(function (result) {
            if (result) {
                var index = result.indexOf(buildingId);
                result.splice(index, 1);
                return _this.storage.set(STORAGE_KEY, result);
            }
        });
    };
    FavoriteProvider.prototype.getAllFavoriteBuildings = function () {
        return this.storage.get(STORAGE_KEY);
    };
    FavoriteProvider.prototype.getAll = function () {
        var contacts = [];
        return this.storage.forEach(function (value, key, iterationNumber) {
            var contact = new FavoriteList();
            contact.key = key;
            contact.favorite = value;
            contacts.push(contact);
        })
            .then(function () {
            return Promise.resolve(contacts);
        })
            .catch(function (error) {
            return Promise.reject(error);
        });
    };
    FavoriteProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], FavoriteProvider);
    return FavoriteProvider;
}());

var Favorite = /** @class */ (function () {
    function Favorite() {
    }
    return Favorite;
}());

var FavoriteList = /** @class */ (function () {
    function FavoriteList() {
    }
    return FavoriteList;
}());

//# sourceMappingURL=favorite.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuildingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_favorite_favorite__ = __webpack_require__(129);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BuildingPage = /** @class */ (function () {
    function BuildingPage(viewCtrl, navParams, http, socialSharing, platform, geo, favoriteProvider, zone, loadingCtrl) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.http = http;
        this.socialSharing = socialSharing;
        this.platform = platform;
        this.geo = geo;
        this.favoriteProvider = favoriteProvider;
        this.zone = zone;
        this.loadingCtrl = loadingCtrl;
        this.message = "Check out this building on AliveArchApp";
        this.link = null;
        this.file = null;
        this.subject = null;
        this.isFavorite = false;
        this.myParam = navParams.get('myParam');
        this.favoriteProvider.isFavorite(this.myParam).then(function (isFav) {
            _this.isFavorite = isFav;
        });
    }
    BuildingPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        var that = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('http://alivearchapp.com/viagemdearquiteto/api/buildings/read_one.php?id=' + that.myParam)
                .subscribe(function (result) {
                _this.buildingDetails = result.json();
                _this.buildingDetails.nome = _this.buildingDetails.nome.toUpperCase();
                resolve(result.json());
            }, function (error) {
                reject(error.json());
            });
        });
    };
    BuildingPage.prototype.swipeEvent = function (e) {
        if (e.direction == 2) {
            //direction 2 = right to left swipe.
        }
        this.dismiss();
    };
    BuildingPage.prototype.favoriteBuilding = function () {
        var _this = this;
        this.favoriteProvider.favoriteBuilding(this.myParam).then(function () {
            _this.zone.run(function () {
                _this.isFavorite = true;
            });
        });
    };
    BuildingPage.prototype.unfavoriteBuilding = function () {
        var _this = this;
        this.favoriteProvider.unfavoriteBuilding(this.myParam).then(function () {
            _this.zone.run(function () {
                _this.isFavorite = false;
            });
        });
    };
    BuildingPage.prototype.share = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'ios'
        });
        this.loading.present();
        setTimeout(function () {
            _this.message = "Check out this building at Alive Arch " + _this.buildingDetails.nome;
            _this.file = "http://alivearchapp.com/viagemdearquiteto/painel/upload/edificio/" + _this.buildingDetails.foto;
            _this.link = "link do app na loja";
            _this.socialSharing.share(_this.message, _this.subject, _this.file, _this.link)
                .then(function () {
            }).catch(function () {
            });
        }, 4000);
        this.loading.dismiss();
    };
    BuildingPage.prototype.createRoute = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'ios'
        });
        this.loading.present();
        setTimeout(function () {
            _this.geo.getCurrentPosition().then(function (position) {
                _this.latUser = position.coords.latitude;
                _this.lngUser = position.coords.longitude;
            });
            // ios
            if (_this.platform.is('ios')) {
                window.open('maps://?q=' + _this.buildingDetails.nome + '&saddr=' + _this.latUser + ',' + _this.lngUser + '&daddr=' + _this.buildingDetails.latitude + ',' + _this.buildingDetails.longitude, '_system');
                _this.loading.dismiss();
            }
            ;
            // android
            if (_this.platform.is('android')) {
                //window.open('https://www.google.com/maps/dir/' + this.latUser + ',' + this.lngUser + '/' + this.buildingDetails.latitude + ',' + this.buildingDetails.longitude);
                'geo://' + _this.latUser + ',' + _this.lngUser + '?q=' + _this.buildingDetails.latitude + ',' + _this.buildingDetails.longitude + '(' + _this.buildingDetails.nome + ')', '_system';
                _this.loading.dismiss();
            }
            ;
        }, 4000);
        this.loading.dismiss();
    };
    BuildingPage.prototype.dismiss = function () {
        if (!this.isFavorite) {
            this.viewCtrl.dismiss(this.buildingDetails.codigo);
        }
        else {
            this.viewCtrl.dismiss();
        }
    };
    BuildingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-building',template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\building\building.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">{{"close" | translate }}</button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content  class="categoria{{buildingDetails.categoria}}" padding> <!--class="teste{{buildingDetails.categoria}}"-->\n    <ion-card (swipe)="swipeEvent($event)" > <!--class="borda{{buildingDetails.categoria}}"-->\n        <img src="http://alivearchapp.com/viagemdearquiteto/painel/upload/edificio/{{buildingDetails.foto}}" height="55%">\n        <ion-fab right top>\n            <ion-buttons end>\n                <button  ion-fab class="topright heart" icon-only (click)="unfavoriteBuilding()" *ngIf="isFavorite"><i class="fas fa-heart heart-size"></i></button>\n                <button  ion-fab class="topright heart" icon-only (click)="favoriteBuilding()" *ngIf="!isFavorite"><i class="far fa-heart heart-size"></i></button>\n            </ion-buttons>\n          <!--<button ion-fab class="topright heart">\n            <i class="far fa-heart heart-size"></i>\n          </button> -->\n        </ion-fab>\n        <ion-card-content>        \n          <h2><b>{{buildingDetails.nome}}</b></h2>           \n          <h4 style="padding-top: 15px;"><b>Data de construção:</b> {{buildingDetails.data_construcao}}</h4>\n          <h4 style="padding-bottom: 15px;"><b>Arquiteto:</b> {{buildingDetails.arquiteto_nome}}</h4>       \n          <span>{{buildingDetails.descricao}}</span>\n       </ion-card-content>\n       <!--\n       <ion-row>\n        <ion-col>\n          <button ion-button icon-left clear small (click)="share()">\n            <ion-icon name="share-alt"></ion-icon>\n            <div>Share</div>\n          </button>\n        </ion-col>\n        <ion-col text-right>\n          <button ion-button icon-left clear small (click)="createRoute()">\n            <ion-icon name="navigate"></ion-icon>\n            <div>Route</div>\n          </button>\n        </ion-col>\n      </ion-row>\n      -->\n      <ion-row class="cardfooter">\n        <ion-col>\n          <button ion-button icon-left clear small (click)="share()" class="button-color{{buildingDetails.categoria}}">\n            <i class="fas fa-share-alt"></i>\n            <!--<ion-icon name="share-alt"></ion-icon>-->\n            <div style="padding-left: 10px;"> Share</div>\n          </button>\n        </ion-col>\n        <ion-col text-right>\n          <button ion-button icon-left clear small (click)="createRoute()" class="button-color{{buildingDetails.categoria}}">\n            <i class="fas fa-share"></i>\n            <!--<ion-icon name="navigate"></ion-icon>-->\n            <div style="padding-left: 10px;">Route</div>\n          </button>\n        </ion-col>\n      </ion-row>\n    \n      </ion-card>\n</ion-content>\n'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\building\building.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_5__providers_favorite_favorite__["a" /* FavoriteProvider */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]])
    ], BuildingPage);
    return BuildingPage;
}());

//# sourceMappingURL=building.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CadastroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_url_url__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tutorial_tutorial__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CadastroPage = /** @class */ (function () {
    function CadastroPage(navCtrl, navParams, storage, http, url, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.url = url;
        this.toastCtrl = toastCtrl;
        this.carregando = false;
        this.usuario = {
            email: "",
            senha: "",
        };
    }
    CadastroPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CadastroPage');
    };
    CadastroPage.prototype.Voltar = function () {
        this.navCtrl.pop();
    };
    CadastroPage.prototype.Salvar = function () {
        var _this = this;
        this.carregando = true;
        this.http.post(this.url.usuario.salvar, this.usuario)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.carregando = false;
            if (!res.erro) {
                alert("Cadastro concluído com sucesso");
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__tutorial_tutorial__["a" /* TutorialPage */]);
            }
            else {
                alert(res.mensagem);
            }
        });
    };
    CadastroPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cadastro',template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\cadastro\cadastro.html"*/'\n<ion-content padding id="welcome" >\n  <ion-grid>\n    <ion-row>\n      <ion-col text-center >\n        <img src="assets/imgs/logoAlive.png" class="logo"/>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-list inset>\n\n    <ion-item>\n      <ion-input type="text"  placeholder="Email" [(ngModel)]="usuario.email"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-input type="password" placeholder="Senha" [(ngModel)]="usuario.senha"></ion-input>\n    </ion-item>\n\n    <div class="carregando" [style.display]="carregando?\'block\':\'none\'">\n      <ion-spinner name="ios" duration="700"></ion-spinner>\n    </div>\n    <button ion-button (click)="Salvar()" [style.display]="!carregando?\'block\':\'none\'">Salvar</button>\n\n  </ion-list>\n\n  <ion-grid>    \n    <ion-row>\n        <ion-col>\n          <button (click)="Voltar()" class="btn-voltar">\n              <ion-icon name="ios-arrow-back"></ion-icon>\n            Voltar\n          </button>\n        </ion-col>\n      </ion-row>\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\cadastro\cadastro.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__providers_url_url__["a" /* UrlProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
    ], CadastroPage);
    return CadastroPage;
}());

//# sourceMappingURL=cadastro.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_news_news__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NewsPage = /** @class */ (function () {
    function NewsPage(navCtrl, navParams, toast, userProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toast = toast;
        this.userProvider = userProvider;
    }
    NewsPage.prototype.ionViewDidEnter = function () {
        this.users = [];
        this.page = 1;
        this.infiniteScroll.enable(true);
        this.getAllUsers(this.page);
    };
    NewsPage.prototype.getAllUsers = function (page) {
        var _this = this;
        this.userProvider
            .getAll(page)
            .then(function (result) {
            for (var i = 0; i < result.data.length; i++) {
                var user = result.data[i];
                _this.users.push(user);
            }
            if (_this.infiniteScroll) {
                _this.infiniteScroll.complete();
                if (_this.users.length == result.total) {
                    _this.infiniteScroll.enable(false);
                }
            }
        })
            .catch(function (error) {
            _this.toast
                .create({
                message: "Erro ao listar os usuários. Erro: " + error.error,
                position: "botton",
                duration: 3000
            })
                .present();
        });
    };
    NewsPage.prototype.getUsers = function () {
        var _this = this;
        setTimeout(function () {
            _this.page += 1;
            _this.getAllUsers(_this.page);
        }, 500);
    };
    NewsPage.prototype.openUser = function (id) {
        var _this = this;
        this.userProvider
            .get(id)
            .then(function (result) {
            _this.navCtrl.push("UserDetailPage", { user: result.data });
        })
            .catch(function (error) {
            _this.toast
                .create({
                message: "Erro ao recuperar o usuário. Erro: " + error.error,
                position: "botton",
                duration: 3000
            })
                .present();
        });
    };
    NewsPage.prototype.openCreateUser = function () {
        this.navCtrl.push("UserEditPage");
    };
    NewsPage.prototype.openEditUser = function (id) {
        var _this = this;
        this.userProvider
            .get(id)
            .then(function (result) {
            _this.navCtrl.push("UserEditPage", { user: result.data });
        })
            .catch(function (error) {
            _this.toast
                .create({
                message: "Erro ao recuperar o usuário. Erro: " + error.error,
                position: "botton",
                duration: 3000
            })
                .present();
        });
    };
    NewsPage.prototype.deleteUser = function (user) {
        var _this = this;
        this.userProvider
            .remove(user.id)
            .then(function (result) {
            var index = _this.users.indexOf(user);
            _this.users.splice(index, 1);
            _this.toast
                .create({
                message: "Usuário excluído com sucesso.",
                position: "botton",
                duration: 3000
            })
                .present();
        })
            .catch(function (error) {
            _this.toast
                .create({
                message: "Erro ao excluir o usuário. Erro: " + error.error,
                position: "botton",
                duration: 3000
            })
                .present();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* InfiniteScroll */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* InfiniteScroll */])
    ], NewsPage.prototype, "infiniteScroll", void 0);
    NewsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: "news",template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\news\news.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Ultimos posts no instagram\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <ion-list>\n    <ion-item-sliding *ngFor="let user of users">\n      <ion-item (click)="openUser(user.id)">\n        <img src="{{ user.images.standard_resolution.url }}">\n        <ion-card-content text-wrap>\n          <p>{{ user.caption.text }}</p>\n        </ion-card-content>\n\n      </ion-item>\n\n      <ion-item-options side="left">\n        <button ion-button color="primary" (click)="openEditUser(user.id)">\n            <ion-icon name="create"></ion-icon>\n            Editar\n          </button>\n        <button ion-button color="danger" (click)="deleteUser(user)">\n            <ion-icon name="trash"></ion-icon>\n            Excluir\n          </button>\n      </ion-item-options>\n    </ion-item-sliding>\n\n  </ion-list>\n\n  <ion-infinite-scroll (ionInfinite)="getUsers($event)">\n    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Aguarde...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n  <ion-fab right bottom>\n    <button ion-fab color="light" (click)="openCreateUser()"><ion-icon name="add"></ion-icon></button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\news\news.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_news_news__["a" /* NewsProvider */]])
    ], NewsPage);
    return NewsPage;
}());

//# sourceMappingURL=news.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodigoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nova_senha_nova_senha__ = __webpack_require__(179);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the CodigoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CodigoPage = /** @class */ (function () {
    function CodigoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.codigo = "";
        this.id_usuario = this.navParams.get("id_usuario");
        this.codigo_gerado = this.navParams.get("codigo");
    }
    CodigoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CodigoPage');
    };
    CodigoPage.prototype.Validar = function () {
        if (this.codigo != "") {
            if (this.codigo == this.codigo_gerado) {
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__nova_senha_nova_senha__["a" /* NovaSenhaPage */], { id_usuario: this.id_usuario });
            }
            else {
                alert("Código inválido");
            }
        }
    };
    CodigoPage.prototype.Voltar = function () {
        this.navCtrl.pop();
    };
    CodigoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-codigo',template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\codigo\codigo.html"*/'\n<ion-content padding id="welcome" >\n  <ion-grid>\n    <ion-row>\n      <ion-col text-center >\n        <img src="assets/imgs/logoAlive.png" class="logo"/>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-list inset>\n\n    <ion-item>\n      <ion-input type="text"  placeholder="Digite o código" [(ngModel)]="codigo"></ion-input>\n    </ion-item>\n\n    <div class="carregando" [style.display]="carregando?\'block\':\'none\'">\n      <ion-spinner name="ios" duration="700"></ion-spinner>\n    </div>\n    <button ion-button (click)="Validar()" [style.display]="!carregando?\'block\':\'none\'">Enviar</button>\n\n  </ion-list>\n\n  <ion-grid>    \n    <ion-row>\n        <ion-col>\n          <button (click)="Voltar()" class="btn-voltar">\n            <ion-icon name="ios-arrow-back"></ion-icon>\n            Voltar\n          </button>\n        </ion-col>\n      </ion-row>\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\codigo\codigo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], CodigoPage);
    return CodigoPage;
}());

//# sourceMappingURL=codigo.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NovaSenhaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__welcome_welcome__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_url_url__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the NovaSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NovaSenhaPage = /** @class */ (function () {
    function NovaSenhaPage(navCtrl, navParams, http, url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.url = url;
        this.carregando = false;
        this.senha = "";
        this.id_usuario = this.navParams.get("id_usuario");
    }
    NovaSenhaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NovaSenhaPage');
    };
    NovaSenhaPage.prototype.Voltar = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__welcome_welcome__["a" /* WelcomePage */]);
    };
    NovaSenhaPage.prototype.Enviar = function () {
        var _this = this;
        if (this.senha.length > 2) {
            this.carregando = true;
            var usuario = {
                id: this.id_usuario,
                senha: this.senha
            };
            this.http.post(this.url.usuario.novaSenha, usuario)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.carregando = false;
                alert("Senha cadastrada com sucesso!");
                _this.Voltar();
            });
        }
    };
    NovaSenhaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-nova-senha',template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\nova-senha\nova-senha.html"*/'\n<ion-content padding id="welcome" >\n  <ion-grid>\n    <ion-row>\n      <ion-col text-center >\n        <img src="assets/imgs/logoAlive.png" class="logo"/>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-list inset>\n\n    <ion-item>\n      <ion-input type="password" placeholder="Digite sua nova senha" [(ngModel)]="senha" ></ion-input>\n    </ion-item>\n\n    <div class="carregando" [style.display]="carregando?\'block\':\'none\'">\n      <ion-spinner name="ios" duration="700"></ion-spinner>\n    </div>\n    <button ion-button (click)="Enviar()" [style.display]="!carregando?\'block\':\'none\'">Enviar</button>\n\n  </ion-list>\n\n  <ion-grid>    \n    <ion-row>\n        <ion-col>\n          <button (click)="Voltar()" class="btn-voltar">\n              <ion-icon name="ios-arrow-back"></ion-icon>\n              VOLTAR\n          </button>\n        </ion-col>\n      </ion-row>\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\nova-senha\nova-senha.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4__providers_url_url__["a" /* UrlProvider */]])
    ], NovaSenhaPage);
    return NovaSenhaPage;
}());

//# sourceMappingURL=nova-senha.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EsqueciPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_url_url__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__codigo_codigo__ = __webpack_require__(178);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the EsqueciPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EsqueciPage = /** @class */ (function () {
    function EsqueciPage(navCtrl, navParams, http, url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.url = url;
        this.carregando = false;
        this.usuario = {
            email: ""
        };
    }
    EsqueciPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EsqueciPage');
    };
    EsqueciPage.prototype.Voltar = function () {
        this.navCtrl.pop();
    };
    EsqueciPage.prototype.Enviar = function () {
        var _this = this;
        if (this.usuario.email != "") {
            this.carregando = true;
            this.http.post(this.url.usuario.esqueci, this.usuario)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.carregando = false;
                if (!res.erro) {
                    alert(res.mensagem);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__codigo_codigo__["a" /* CodigoPage */], res);
                }
                else {
                    alert(res.mensagem);
                }
            });
        }
    };
    EsqueciPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-esqueci',template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\esqueci\esqueci.html"*/'\n<ion-content padding id="welcome" >\n  <ion-grid>\n    <ion-row>\n      <ion-col text-center >\n        <img src="assets/imgs/logoAlive.png" class="logo"/>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-list inset>\n\n    <ion-item>\n      <ion-input type="text"  placeholder="E-mail" [(ngModel)]="usuario.email"></ion-input>\n    </ion-item>\n\n    <div class="carregando" [style.display]="carregando?\'block\':\'none\'">\n      <ion-spinner name="ios" duration="700"></ion-spinner>\n    </div>\n    <button ion-button (click)="Enviar()" [style.display]="!carregando?\'block\':\'none\'">Enviar</button>\n\n  </ion-list>\n\n  <ion-grid>    \n    <ion-row>\n        <ion-col>\n          <button (click)="Voltar()" class="btn-voltar">\n              <ion-icon name="ios-arrow-back"></ion-icon>\n            VOLTAR\n          </button>\n        </ion-col>\n      </ion-row>\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\esqueci\esqueci.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__providers_url_url__["a" /* UrlProvider */]])
    ], EsqueciPage);
    return EsqueciPage;
}());

//# sourceMappingURL=esqueci.js.map

/***/ }),

/***/ 190:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 190;

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/building/building.module": [
		749,
		9
	],
	"../pages/cadastro/cadastro.module": [
		750,
		8
	],
	"../pages/codigo/codigo.module": [
		751,
		7
	],
	"../pages/esqueci/esqueci.module": [
		752,
		6
	],
	"../pages/news-detail/news-detail.module": [
		753,
		5
	],
	"../pages/news/news.module": [
		754,
		4
	],
	"../pages/nova-senha/nova-senha.module": [
		755,
		3
	],
	"../pages/search/search.module": [
		756,
		2
	],
	"../pages/tutorial/tutorial.module": [
		757,
		1
	],
	"../pages/welcome/welcome.module": [
		758,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 234;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__favorites_favorites__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__form_form__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__map_map__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__news_news__ = __webpack_require__(177);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TabsPage = /** @class */ (function () {
    function TabsPage(afAuth, navCtrl, navParams, toast) {
        this.afAuth = afAuth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toast = toast;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__map_map__["a" /* MapPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__favorites_favorites__["a" /* FavoritesPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_6__news_news__["a" /* NewsPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_2__form_form__["a" /* FormPage */];
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        // this.afAuth.authState.subscribe(data=> {
        //   if(data && data.email && data.uid){
        //     //console.log(data);
        //   } else {
        //     this.toast.create({
        //       message: "Could not find user",
        //       duration: 3000
        //     }).present();
        //     this.navCtrl.setRoot(WelcomePage);                
        //   }      
        // });
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\tabs\tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabIcon="map"></ion-tab>\n  <ion-tab [root]="tab2Root" tabIcon="heart"></ion-tab>\n  <ion-tab [root]="tab3Root" tabIcon="paper"></ion-tab>\n  <ion-tab [root]="tab4Root" tabIcon="add"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["p" /* ToastController */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoritesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_favorite_favorite__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_building_building__ = __webpack_require__(175);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FavoritesPage = /** @class */ (function () {
    function FavoritesPage(navCtrl, favoriteProvider, navParams, loadingCtrl, http, zone, modalCtrl) {
        this.navCtrl = navCtrl;
        this.favoriteProvider = favoriteProvider;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.zone = zone;
        this.modalCtrl = modalCtrl;
        this.favArrayURL = "";
        this.hasFavorite = false;
        this.getFavorites = function () {
            var _this = this;
            this.favArrayURL = '';
            this.favoritesArray.forEach(function (fav) {
                _this.favArrayURL += 'favs[]=' + fav + '&';
            });
            var promise = new Promise(function (resolve, reject) {
                var favURL = 'http://alivearchapp.com/viagemdearquiteto/api/favorites/read.php?' + _this.favArrayURL;
                _this.http.get(favURL)
                    .subscribe(function (result) {
                    resolve(result.json());
                    _this.zone.run(function () {
                        _this.buildings = result.json().records;
                    });
                    _this.loading.dismiss();
                }, function (error) {
                    reject(error.json());
                });
            });
        };
    }
    FavoritesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: "ios"
        });
        this.loading.present();
        this.favoriteProvider.getAllFavoriteBuildings().then(function (result) {
            if (result) {
                _this.favoritesArray = result;
            }
            else {
                _this.loading.dismiss();
            }
            if (result && _this.favoritesArray.length > 0) {
                _this.hasFavorite = true;
                _this.getFavorites();
            }
            else {
                _this.loading.dismiss();
            }
        });
    };
    FavoritesPage.prototype.getFav = function () {
        console.log(this.favoriteProvider.getAllFavoriteBuildings());
        console.log(this.favoriteProvider.getAll());
        //this.favoritesArray = this.favoriteProvider.getAllFavoriteBuildings().__zone_symbol__value;
    };
    FavoritesPage.prototype.unfavoriteBuilding = function (cod) {
        var _this = this;
        this.favoriteProvider.unfavoriteBuilding(cod).then(function () {
            _this.buildings.forEach(function (fav) {
                if (fav.codigo != cod) {
                    return;
                }
                else {
                    var index = _this.buildings.indexOf(fav);
                    _this.buildings.splice(index, 1);
                }
            });
            var index = _this.favoritesArray.indexOf(cod);
            _this.favoritesArray.splice(index, 1);
            /**this.zone.run(() => {
              //this.getFavorites();
            });*/
        });
    };
    FavoritesPage.prototype.openFavorite = function (cod) {
        var _this = this;
        console.log("Builing ID: " + cod);
        var myModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_building_building__["a" /* BuildingPage */], { myParam: cod });
        myModal.onDidDismiss(function (data) {
            if (data) {
                _this.unfavoriteBuilding(data);
            }
        });
        myModal.present();
    };
    FavoritesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-favorites",template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\favorites\favorites.html"*/'\n\n<ion-content padding overflow-scroll="true">\n  <h3>{{"favorites" | translate}}</h3>\n  <h5>{{"favorites-sub" | translate}}</h5>\n  <h5 *ngIf="!hasFavorite">Adicione já seus favoritos</h5>\n<ion-list *ngIf="hasFavorite">\n  <ion-item *ngFor="let building of buildings">\n    <ion-card class="container categoria{{building.categoria}}" class="">\n      <img src="http://alivearchapp.com/viagemdearquiteto/painel/upload/edificio/{{building.foto}}" (click)=\'openFavorite(building.codigo)\'  />\n      <button  ion-fab class="topright heart" icon-only (click)="unfavoriteBuilding(building.codigo)">\n        <i class="fas fa-heart heart-size"></i></button>\n        <ion-item (click)=\'openFavorite(building.codigo)\'>\n            <h2>{{building.nome}}</h2>\n          </ion-item>\n<!-- <div class="card-title">{{building.nome}}</div> -->\n</ion-card>\n</ion-item>\n<!--\n<ion-item>\n<ion-card class="container">\n  <img src="assets/imgs/testes/casadocomercio.jpg" height="275px">  \n    <button ion-fab class="topright heart">\n      <ion-icon name="heart" class="heart-size"></ion-icon>\n    </button>\n  <ion-item>\n    <h2>Casa do comércio</h2>\n  </ion-item>\n</ion-card>\n</ion-item>-->\n</ion-list>  \n</ion-content>\n'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\favorites\favorites.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_favorite_favorite__["a" /* FavoriteProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
    ], FavoritesPage);
    return FavoritesPage;
}());

//# sourceMappingURL=favorites.js.map

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__information_information__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__place_place__ = __webpack_require__(342);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FormPage = /** @class */ (function () {
    function FormPage(navCtrl, modalCtrl, fdb, camera, toast, loadingCtrl, http) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.fdb = fdb;
        this.camera = camera;
        this.toast = toast;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.arrData = [];
        this.data = {
            lat: '',
            lng: '',
            photo: '',
            buildingName: '',
            architect: '',
            architects: '',
            constructionYear: '',
            type: '',
            description: '',
            confirm: false
        };
        /**this.fdb.list("/myItems/").subscribe(_data =>{
          this.arrData = _data;
          console.log(this.arrData);
        });*/
        this.typeOptions = {
            title: 'Choose type'
            //subTitle: 'Select your favorite'
        };
    }
    FormPage.prototype.ionViewWillLoad = function () {
        // Architect SearchBox
        this.getArchitects();
    };
    FormPage.prototype.openInformationModal = function () {
        var myModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__information_information__["a" /* InformationPage */]);
        myModal.present();
    };
    FormPage.prototype.openConfirmationModal = function () {
        var _this = this;
        var myModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__information_information__["a" /* InformationPage */]);
        myModal.onDidDismiss(function (data) {
            if (data) {
                _this.data.confirm = true;
            }
        });
        myModal.present();
    };
    //to open the search modal
    FormPage.prototype.openMapModal = function () {
        var _this = this;
        var myModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__place_place__["a" /* PlacePage */]);
        myModal.onDidDismiss(function (data) {
            if (data) {
                _this.data.lat = data.lat();
                _this.data.lng = data.lng();
                _this.toast.create({
                    message: "Location sent",
                    duration: 3000,
                    position: 'top'
                }).present();
            }
        });
        myModal.present();
    };
    FormPage.prototype.takePhoto = function () {
        var _this = this;
        console.log("Take Photo");
        var options = {
            quality: 75,
            //destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.FILE_URI,
            targetWidth: 1000,
            targetHeight: 1000,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.base64Image = "data:image/jpeg;base64," + imageData;
            _this.photos.push(_this.base64Image);
            _this.photos.reverse();
            _this.toast.create({
                message: "Photo sent",
                duration: 3000,
                position: 'top'
            }).present();
        }, function (err) {
            console.log(err);
        });
    };
    //get the buildings
    FormPage.prototype.getArchitects = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'ios'
        });
        //this.loading.present();
        var promise = new Promise(function (resolve, reject) {
            _this.http.get('http://alivearchapp.com/viagemdearquiteto/api/architects/read.php')
                .subscribe(function (result) {
                console.log("Getting architects");
                resolve(result.json());
                _this.architectOptions = result.json();
                console.log(_this.architectOptions);
                var myArchitects = [];
                if (_this.architectOptions.records.length > 0) {
                    for (var i = 0; i < _this.architectOptions.records.length; i++) {
                        myArchitects.push({
                            id: _this.architectOptions.records[i].codigo,
                            name: _this.architectOptions.records[i].nome
                        });
                    }
                }
                _this.architects = _this.passingFunction(myArchitects);
                _this.loading.dismiss();
            }, function (error) {
                reject(error.json());
            });
        })
            .catch(function (e) { return console.log(e); });
    };
    FormPage.prototype.passingFunction = function (data) {
        return data;
    };
    FormPage.prototype.architectChange = function (event) {
        console.log('value:', event.value);
        var myArchitects = [];
        if (event.value.length > 0) {
            for (var i = 0; i < event.value.length; i++) {
                myArchitects.push({
                    id: event.value[i].id
                });
            }
        }
        console.log(myArchitects);
    };
    FormPage.prototype.send = function () {
        var _this = this;
        this.data.architect = this.data.architects['0'].id;
        console.log(this.data);
        this.openConfirmationModal();
        if (this.data.confirm) {
            this.uploadPhoto();
            var link = 'http://alivearchapp.com/viagemdearquiteto/api/buildings/create.php';
            this.http.post(link, this.data).subscribe(function (data) {
                _this.response = data['_body'];
                console.log(_this.response);
                _this.toast.create({
                    message: "Building sent",
                    duration: 3000,
                    position: 'top'
                }).present();
            }, function (error) {
                console.log('error');
                _this.toast.create({
                    message: "Building not sent",
                    duration: 3000,
                    position: 'top'
                }).present();
            });
        }
        else {
            console.log("termo negado");
            this.toast.create({
                message: "Building not sent",
                duration: 3000,
                position: 'top'
            }).present();
        }
    };
    FormPage.prototype.uploadPhoto = function () {
        var _this = this;
        var link = 'http://alivearchapp.com/viagemdearquiteto/api/photo/create.php';
        this.http.post(link, this.photos[0]).subscribe(function (data) {
            _this.response = data['_body'];
            console.log(_this.response);
        }, function (error) {
            console.log('error');
        });
    };
    FormPage.prototype.makePhotoName = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 32; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    FormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-form',template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\form\form.html"*/'<ion-content padding id="form">\n  <form>\n      \n      <ion-list>\n        \n          <h3 style="margin: 0px;">{{"sugest" | translate }}</h3>\n          <h5 style="margin: 0px;">*{{"required info" | translate }}</h5>\n        \n        </ion-list>\n      <ion-grid>\n        <ion-row>\n          <ion-col class="left-item">\n            <ion-input type="button" (click)="openMapModal()"  readonly="true" name="place" value="{{\'place\' | translate }}"></ion-input>\n          </ion-col>\n          <ion-col  class="right-item">\n            <ion-input type="button" (click)="takePhoto()"  readonly="true" name="photo"  value="{{\'photo\' | translate }}" ></ion-input>\n            <!-- <button ion-button block outline (click)="takePhoto()" >\n              <ion-icon name="camera"></ion-icon>Take Photo\n              </button> -->\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-input type="text" name="buildingName" [(ngModel)]="data.buildingName" placeholder="{{\'building name\' | translate }}"></ion-input>\n        </ion-row>\n        <ion-row>\n          <!-- <ion-input type="text" name="archName" placeholder="{{\'arch name\' | translate }}"></ion-input> -->\n          <ion-item class="controls">\n            <select-search\n                [(ngModel)]="data.architects"\n                name="architect"\n                id="architect"\n                title="ARCHITECTS"\n                itemValueField="id"\n                itemTextField="name"\n                [items]="architects"\n                [canSearch]="true"\n                [multiple]="true"\n                (onChange)="architectChange($event)">\n            </select-search>\n          </ion-item>\n        </ion-row>\n        <ion-row>\n          <ion-col class="left-item" col-7>\n            <ion-input type="text" [(ngModel)]="data.constructionYear" name="constructionYear" placeholder="{{\'construction year\' | translate }}"></ion-input>\n          </ion-col>\n          <ion-col class="right-item" col-5>\n           <!-- <ion-input type="text" name="type" placeholder="TIPO"></ion-input> -->\n              <ion-select type="text" [(ngModel)]="data.type" name="type" [selectOptions]="typeOptions" placeholder=\'{{"type" | translate }}\'> <!-- [(ngModel)]="gender" -->\n                \n                <ion-option value="buildings">{{"buildings" | translate }}</ion-option>\n                <ion-option value="monument">{{"monument" | translate }}</ion-option>\n                <ion-option value="square">{{"square" | translate }}</ion-option>\n              </ion-select>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-textarea type="text" [(ngModel)]="data.description" name="description" placeholder="{{\'building-description\' | translate }}"></ion-textarea>\n        </ion-row>\n        <ion-row>\n          <ion-col col-3></ion-col>\n          <ion-col col-6>\n            <button ion-button icon-only class="button-send" (click)="send()">\n              <div class="space-buton">\n                {{"send" | translate}}\n              </div>\n            </button>\n            </ion-col>\n            <ion-col  col-3>\n              <button ion-button icon-only (click)="openInformationModal()">\n                <ion-icon ios="ios-information-circle-outline" md="md-information-circle"></ion-icon>\n              </button>\n            </ion-col>\n        </ion-row>\n      </ion-grid>\n \n<!--    \n  <button ion-button outline>Enviar</button>\n  <ion-icon name="information-circle-outline"></ion-icon> -->\n</form>\n</ion-content>\n<!--\n<form (ngSubmit)="logForm()">\n    <ion-item>\n      <ion-label>Todo</ion-label>\n      <ion-input type="text" [(ngModel)]="todo.title" name="title"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Description</ion-label>\n      <ion-textarea [(ngModel)]="todo.description" name="description"></ion-textarea>\n    </ion-item>\n    <button ion-button type="submit" block>Add Todo</button>\n  </form>\n-->'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\form\form.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_http__["a" /* Http */]])
    ], FormPage);
    return FormPage;
}());

//# sourceMappingURL=form.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InformationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the InformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InformationPage = /** @class */ (function () {
    function InformationPage(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    InformationPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    InformationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-information',template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\information\information.html"*/'<!--\n  Generated template for the InformationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">{{"close" | translate }}</button>\n    </ion-buttons>\n    <ion-title>{{"information" | translate }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<h1>{{"titulo-info" | translate }}</h1>\n<h5>{{"info-titulo" | translate }}</h5>\n<h4>{{"title1" | translate }}</h4>\n<h5>{{"info1" | translate }}</h5>\n<h4>{{"title2" | translate }}</h4>\n<h5>{{"info2" | translate }}</h5>\n<h4>{{"title3" | translate }}</h4>\n<h5>{{"info3" | translate }}</h5>\n<h4>{{"title4" | translate }}</h4>\n<h5>{{"info4" | translate }}</h5>\n</ion-content>\n'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\information\information.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */]])
    ], InformationPage);
    return InformationPage;
}());

//# sourceMappingURL=information.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { AngularFireAuth } from 'angularfire2/auth';
//import { WelcomePage } from '../welcome/welcome';
//import { FirebaseObjectObservable  } from 'angularfire2/database-deprecated';
//import { Profile } from '../../models/profile';
//import { Observable } from '@firebase/util';


var PlacePage = /** @class */ (function () {
    function PlacePage(
        //private afDatabase: AngularFireDatabase,
        //private afAuth : AngularFireAuth, 
        toast, geo, http, loadingCtrl, modalCtrl, viewCtrl, navCtrl, app, platform) {
        this.toast = toast;
        this.geo = geo;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.app = app;
        this.platform = platform;
        this.data = {
            lat: 0,
            lng: 0
        };
        this.iconSelf = {
            url: 'assets/imgs/markers/icone_voce.png',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };
        this.loading = this.loadingCtrl.create({
            spinner: 'ios'
        });
        //start the markers
        this.markers = [];
        this.location = new google.maps.LatLng(40.730610, -73.935242);
        platform.ready().then(function () {
            //this.showMap();
        });
    }
    PlacePage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.loading.present();
        try {
            this.geo.getCurrentPosition().then(function (pos) {
                _this.userLat = pos.coords.latitude;
                _this.userLng = pos.coords.longitude;
                _this.location = new google.maps.LatLng(_this.userLat, _this.userLng);
                _this.showMap();
            });
        }
        catch (e) {
            console.error(e);
            //this.loading.dismiss();
        }
    };
    PlacePage.prototype.showMap = function () {
        var _this = this;
        //options
        var options = {
            center: this.location,
            zoom: 14,
            mapTypeControl: false,
            zoomControl: false,
            fullscreenControl: false,
            streetViewControl: false
        };
        //bring map online
        this.map = new google.maps.Map(this.mapRef.nativeElement, options);
        // THIS IS THE CENTER MAP
        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlUI.style.margin = '10px';
        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '20px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '9px';
        controlText.style.paddingRight = '9px';
        controlText.innerHTML = '<i class="fas fa-crosshairs"></i>';
        controlUI.appendChild(controlText);
        this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlUI);
        // Setup the click event listeners: simply set the map where the person is.
        controlUI.addEventListener('click', function () {
            _this.map.setCenter(_this.location);
        });
        // Create a marker for  self location place  
        this.markers.push(new google.maps.Marker({
            map: this.map,
            icon: this.iconSelf,
            position: this.location
        }));
        // Marker to be draggable to choose position
        this.markers.push(new google.maps.Marker({
            position: this.location,
            map: this.map,
            draggable: true
        }));
        this.loading.dismiss();
    };
    PlacePage.prototype.close = function () {
        this.viewCtrl.dismiss(this.markers[1].getPosition());
    };
    PlacePage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], PlacePage.prototype, "mapRef", void 0);
    PlacePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-place',template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\place\place.html"*/'<ion-content>\n  <div style="height:100%; width:100%;">\n<div #map id="map"></div>\n  </div>\n\n</ion-content>\n<ion-footer>\n  <ion-toolbar padding>\n      <ion-row>\n          <ion-col>\n              <button ion-button block class="search-button" (click)="close()">\n                  OK\n              </button>\n          </ion-col>\n          <ion-col>\n              <button ion-button block class="search-button" (click)="cancel()">\n                  CANCEL\n              </button>\n          </ion-col>\n      </ion-row>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\place\place.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */]])
    ], PlacePage);
    return PlacePage;
}());

//# sourceMappingURL=place.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_url_url__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MapPage = /** @class */ (function () {
    function MapPage(toast, geo, http, loadingCtrl, modalCtrl, url, navCtrl, app, platform, geolocation) {
        this.toast = toast;
        this.geo = geo;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.url = url;
        this.navCtrl = navCtrl;
        this.app = app;
        this.platform = platform;
        this.geolocation = geolocation;
        this.markers = [];
        this.popup = false;
        this.lista = [];
        this.loading = this.loadingCtrl.create({
            spinner: 'ios'
        });
        this.registro = {
            nome_edificio: "",
            descricao: "",
            link_externo: ""
        };
        this.Carregar();
    }
    MapPage.prototype.ionViewWillLoad = function () {
    };
    MapPage.prototype.Carregar = function () {
        var _this = this;
        this.loading.present();
        this.http.get(this.url.edificio.lista)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.loading.dismiss();
            _this.lista = res;
            _this.MostrarMapa();
        });
    };
    MapPage.prototype.MostrarMapa = function () {
        var _this = this;
        var context = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.LimparMarker();
            var location = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            var options = {
                center: location,
                zoom: 4,
                streetViewControl: false,
                disableDefaultUI: true
            };
            _this.map = new google.maps.Map(_this.mapRef.nativeElement, options);
            var marker = new google.maps.Marker({
                position: location,
                map: _this.map,
                title: 'Você esta aqui',
                icon: "assets/imgs/markers/icone_voce.png"
            });
            console.log(_this.lista);
            for (var i in _this.lista) {
                var locationAgencia = new google.maps.LatLng(_this.lista[i].latitude, _this.lista[i].longitude);
                _this.markers[i] = new google.maps.Marker({
                    position: locationAgencia,
                    map: _this.map,
                    icon: _this.Icone(_this.lista[i].subcategoria),
                    registro: _this.lista[i],
                    numero: _this.lista[i].id_edificio
                });
                console.log(_this.lista[i]);
                _this.markers[i].addListener('click', function (e) {
                    context.AbrirInfo(this.registro);
                });
            }
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    MapPage.prototype.AbrirInfo = function (registro) {
        this.registro = registro;
        this.popup = true;
    };
    MapPage.prototype.LimparMarker = function () {
        for (var i in this.markers) {
            this.markers[i].setMap(null);
            console.log("Marcador:" + i);
        }
        this.markers = new Array();
    };
    MapPage.prototype.Icone = function (c) {
        switch (Number(c)) {
            case 1:
                return "assets/imgs/markers/icone_predios.png";
            case 2:
                return "assets/imgs/markers/icone_monumentos.png";
            case 3:
                return "assets/imgs/markers/icone_pracas.png";
            default:
                return "assets/imgs/markers/icone_predios.png";
        }
    };
    MapPage.prototype.FecharPopup = function () {
        this.popup = false;
    };
    MapPage.prototype.AbrirLink = function () {
        window.open(this.registro.link_externo, '_system', 'location=yes');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], MapPage.prototype, "mapRef", void 0);
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-map',template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\map\map.html"*/'<ion-content>\n    <div style="height:100%; width:100%;">\n  <div #map id="map"></div>\n    </div>\n  \n    <div class="popup" [style.display]="popup?\'block\':\'none\'">\n\n      <div class="container-popup">\n        <div class="fechar-popup" (click)="FecharPopup()">\n          X\n        </div>\n\n        <img src="https://drengenharia.com/wp-content/uploads/2017/07/residencial_athos.jpg" height="150">\n\n        <p class="data">30/08/2019</p>\n        <p class="titulo">{{registro.nome_edificio}}</p>\n        <p class="descricao">{{registro.descricao}}</p>\n\n        <button class="link" (click)="AbrirLink()">Link Externo</button>\n      </div>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\map\map.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_url_url__["a" /* UrlProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NewsProvider = /** @class */ (function () {
    function NewsProvider(http) {
        this.http = http;
        //private API_URL = "https://reqres.in/api/";
        this.API_URL = "https://api.instagram.com/v1/users/self/media/recent/?access_token=8689023244.1677ed0.a6669f04ce2c4eca84ae55dfaa94aa11";
    }
    NewsProvider.prototype.createAccount = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                email: email,
                password: password
            };
            _this.http.post(_this.API_URL + "register", data).subscribe(function (result) {
                resolve(result.json());
            }, function (error) {
                reject(error.json());
            });
        });
    };
    NewsProvider.prototype.login = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                email: email,
                password: password
            };
            _this.http.post(_this.API_URL + "login", data).subscribe(function (result) {
                resolve(result.json());
            }, function (error) {
                reject(error.json());
            });
        });
    };
    NewsProvider.prototype.getAll = function (page) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // let url = this.API_URL + "users/?per_page=10&page=" + page;
            var url = _this.API_URL;
            _this.http.get(url).subscribe(function (result) {
                resolve(result.json());
            }, function (error) {
                reject(error.json());
            });
        });
    };
    NewsProvider.prototype.get = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = _this.API_URL + "users/" + id;
            _this.http.get(url).subscribe(function (result) {
                resolve(result.json());
            }, function (error) {
                reject(error.json());
            });
        });
    };
    NewsProvider.prototype.insert = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = _this.API_URL + "users/";
            _this.http.post(url, user).subscribe(function (result) {
                resolve(result.json());
            }, function (error) {
                reject(error.json());
            });
        });
    };
    NewsProvider.prototype.update = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = _this.API_URL + "users/" + user.id;
            var data = {
                first_name: user.first_name,
                last_name: user.last_name
            };
            _this.http.put(url, user).subscribe(function (result) {
                resolve(result.json());
            }, function (error) {
                reject(error.json());
            });
        });
    };
    NewsProvider.prototype.remove = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = _this.API_URL + "users/" + id;
            _this.http.delete(url).subscribe(function (result) {
                resolve(result.json());
            }, function (error) {
                reject(error.json());
            });
        });
    };
    NewsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], NewsProvider);
    return NewsProvider;
}());

//# sourceMappingURL=news.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectSearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SelectSearchPage = /** @class */ (function () {
    function SelectSearchPage(navParams) {
        var _this = this;
        this.navParams = navParams;
        this.selectedItems = [];
        this.selectComponent = this.navParams.get('selectComponent');
        this.navController = this.navParams.get('navController');
        this.filteredItems = this.selectComponent.items;
        this.filterItems();
        if (this.selectComponent.value) {
            if (this.selectComponent.multiple) {
                this.selectComponent.value.forEach(function (item) {
                    _this.selectedItems.push(item);
                });
            }
            else {
                this.selectedItems.push(this.selectComponent.value);
            }
        }
    }
    SelectSearchPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.searchbarComponent) {
            // Focus after a delay because focus doesn't work without it.
            setTimeout(function () {
                _this.searchbarComponent.setFocus();
            }, 1000);
        }
    };
    SelectSearchPage.prototype.isItemSelected = function (item) {
        var _this = this;
        return this.selectedItems.find(function (selectedItem) {
            if (_this.selectComponent.itemValueField) {
                return item[_this.selectComponent.itemValueField] === selectedItem[_this.selectComponent.itemValueField];
            }
            return item === selectedItem;
        }) !== undefined;
    };
    SelectSearchPage.prototype.deleteSelectedItem = function (item) {
        var _this = this;
        var itemToDeleteIndex;
        this.selectedItems.forEach(function (selectedItem, itemIndex) {
            if (_this.selectComponent.itemValueField) {
                if (item[_this.selectComponent.itemValueField] === selectedItem[_this.selectComponent.itemValueField]) {
                    itemToDeleteIndex = itemIndex;
                }
            }
            else if (item === selectedItem) {
                itemToDeleteIndex = itemIndex;
            }
        });
        this.selectedItems.splice(itemToDeleteIndex, 1);
    };
    SelectSearchPage.prototype.addSelectedItem = function (item) {
        this.selectedItems.push(item);
    };
    SelectSearchPage.prototype.select = function (item) {
        if (this.selectComponent.multiple) {
            if (this.isItemSelected(item)) {
                this.deleteSelectedItem(item);
            }
            else {
                this.addSelectedItem(item);
            }
        }
        else {
            if (!this.isItemSelected(item)) {
                this.selectedItems = [];
                this.addSelectedItem(item);
                this.selectComponent.select(item);
            }
            this.close();
        }
    };
    SelectSearchPage.prototype.ok = function () {
        this.selectComponent.select(this.selectedItems.length ? this.selectedItems : null);
        this.close();
    };
    SelectSearchPage.prototype.close = function () {
        var _this = this;
        // Focused input interferes with the animation.
        // Blur it first, wait a bit and then close the page.
        if (this.searchbarComponent) {
            this.searchbarComponent._fireBlur();
        }
        setTimeout(function () {
            _this.navController.pop();
            if (!_this.selectComponent.hasSearchEvent) {
                _this.selectComponent.filterText = '';
            }
        });
    };
    SelectSearchPage.prototype.reset = function () {
        this.navController.pop();
        this.selectComponent.reset();
    };
    SelectSearchPage.prototype.filterItems = function () {
        var _this = this;
        if (this.selectComponent.hasSearchEvent) {
            if (this.selectComponent.isNullOrWhiteSpace(this.selectComponent.filterText)) {
                this.selectComponent.items = [];
            }
            else {
                // Delegate filtering to the event.
                this.selectComponent.emitSearch();
            }
        }
        else {
            // Default filtering.
            if (!this.selectComponent.filterText || !this.selectComponent.filterText.trim()) {
                this.filteredItems = this.selectComponent.items;
                return;
            }
            var filterText_1 = this.selectComponent.filterText.trim().toLowerCase();
            this.filteredItems = this.selectComponent.items.filter(function (item) {
                return item[_this.selectComponent.itemTextField].toLowerCase().indexOf(filterText_1) !== -1;
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('searchbarComponent'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Searchbar */])
    ], SelectSearchPage.prototype, "searchbarComponent", void 0);
    SelectSearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'select-search-page',template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\components\select-search\select-search-page.html"*/'<!--\n<ion-header>\n    <ion-navbar>\n        <ion-title>{{selectComponent.title}}</ion-title>\n    </ion-navbar>\n    <ion-toolbar *ngIf="selectComponent.canSearch">\n        <ion-searchbar\n            #searchbarComponent\n            [(ngModel)]="selectComponent.filterText"\n            (ionInput)="filterItems()"\n            [placeholder]="selectComponent.searchPlaceholder || \'Search\'">\n        </ion-searchbar>\n    </ion-toolbar>\n</ion-header> -->\n\n\n<ion-content>\n    <ion-toolbar *ngIf="selectComponent.canSearch">\n        <ion-searchbar\n            class="input-color"\n            #searchbarComponent\n            [(ngModel)]="selectComponent.filterText"\n            (ionInput)="filterItems()"\n            [placeholder]="selectComponent.searchPlaceholder || \'Search\'">\n        </ion-searchbar>\n    </ion-toolbar>\n    <div class="select-search-spinner" *ngIf="selectComponent.isSearching">\n        <div class="select-search-spinner-background"></div>\n        <ion-spinner></ion-spinner>\n    </div>\n    <ion-list no-margin *ngIf="filteredItems.length">\n        <button ion-item detail-none *ngFor="let item of filteredItems" (click)="select(item)">\n            <ion-icon\n                [name]="isItemSelected(item) ? \'checkmark-circle\' : \'radio-button-off\'"\n                [color]="isItemSelected(item) ? \'primary\' : \'daek\'"\n                item-left>\n            </ion-icon>\n            <h2>{{selectComponent.formatItem(item) | translate}}</h2>\n        </button>\n    </ion-list>\n    <div *ngIf="!filteredItems.length" margin>No items found.</div>\n</ion-content>\n\n\n\n<ion-footer *ngIf="selectComponent.canReset || selectComponent.multiple">\n    <ion-toolbar padding>\n        <ion-row>\n            <ion-col no-padding *ngIf="selectComponent.canReset"\n                [attr.col-6]="selectComponent.canReset && selectComponent.multiple ? \'\' : null"\n                [attr.col-12]="selectComponent.canReset && !selectComponent.multiple ? \'\' : null">\n                <button ion-button block no-margin (click)="reset()" [disabled]="!selectedItems.length">\n                    Clear\n                </button>\n            </ion-col>\n            <ion-col no-padding *ngIf="selectComponent.multiple"\n                [attr.col-6]="selectComponent.canReset && selectComponent.multiple ? \'\' : null"\n                [attr.col-12]="!selectComponent.canReset && selectComponent.multiple ? \'\' : null">\n                <button ion-button block no-margin class="search-button" (click)="ok()">\n                    OK\n                </button>\n            </ion-col>\n            <ion-col no-padding *ngIf="selectComponent.multiple"\n                [attr.col-6]="selectComponent.canReset && selectComponent.multiple ? \'\' : null"\n                [attr.col-12]="!selectComponent.canReset && selectComponent.multiple ? \'\' : null">\n                <button ion-button block class="search-button" (click)="close()">\n                    CANCEL\n                </button>\n            </ion-col>\n        </ion-row>\n    </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\components\select-search\select-search-page.html"*/,
            host: {
                'class': 'select-search-page',
                '[class.select-search-page-can-reset]': 'selectComponent.canReset',
                '[class.select-search-page-multiple]': 'selectComponent.multiple'
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], SelectSearchPage);
    return SelectSearchPage;
}());

//# sourceMappingURL=select-search-page.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the NewsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NewsDetailPage = /** @class */ (function () {
    function NewsDetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    NewsDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewsDetailPage');
    };
    NewsDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-news-detail',template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\news-detail\news-detail.html"*/'<!--\n  Generated template for the NewsDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>news-detail</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <header>\n    <img src="https://images.adsttc.com/media/images/5bc5/4257/f197/cc17/1200/0433/slideshow/Deployable_bamboo_space_structure_pavilion_11.jpg?1539654225">\n  </header>\n  <main>\n    <ion-title>Nome da Notîcia</ion-title>\n    <p>From this point he marched two stages—ten parasangs—to the river Psarus, which is two hundred feet broad, and from the\n      Psarus he marched a single stage—five parasangs—to Issi, the last city in Cilicia. It lies on the seaboard—a prosperous,\n      large and flourishing town. Here they halted three days, and here Cyrus was joined by his fleet. There were thirty-five\n      ships from Peloponnesus, with the Lacedaemonian admiral Pythagoras on board. These had been piloted from Ephesus by\n      Tamos the Egyptian, who himself had another fleet of twenty-five ships belonging to Cyrus. These had formed Tamos\'s\n      blockading squadron at Miletus, when that city sided with Tissaphernes; he had also used them in other military services\n      rendered to Cyrus in his operations against that satrap. There was a third officer on board the fleet, the Lacedaemonian\n      Cheirisophus, who had been sent for by Cyrus, and had brought with him seven hundred hoplites, over whom he was to\n      act as general in the service of Cyrus. The fleet lay at anchor opposite Cyrus\'s tent. Here too another reinforcement\n      presented itself. This was a body of four hundred hoplites, Hellenic mercenaries in the service of Abrocomas, who deserted\n      him for Cyrus, and joined in the campaign against the king.</p>\n    <p>From Issi, he marched a single stage—five parasangs—to the gates of Cilicia and Syria. This was a double fortress: the\n      inner and nearer one, which protects Cilicia, was held by Syennesis and a garrison of Cilicians; the outer and further\n      one, protecting Syria, was reported to be garrisoned by a body of the king\'s troops. Through the gap between the two\n      fortresses flows a river named the Carsus, which is a hundred feet broad, and the whole space between was scarcely\n      more than six hundred yards. To force a passage here would be impossible, so narrow was the pass itself, with the fortification\n      walls stretching down to the sea, and precipitous rocks above; while both fortresses were furnished with gates. It\n      was the existence of this pass which had induced Cyrus to send for the fleet, so as to enable him to lead a body of\n      hoplites inside and outside the gates; and so to force a passage through the enemy, if he were guarding the Syrian\n      gate, as he fully expected to find Abrocomas doing with a large army. This, however, Abrocomas had not done; but as\n      soon as he learnt that Cyrus was in Cilicia, he had turned round and made his exit from Phoenicia, to join the king\n      with an army amounting, as report said, to three hundred thousand men.</p>\n    <p>From this point Cyrus pursued his march, through Syria a single stage—five parasangs—to Myriandus, a city inhabited by\n      Phoenicians, on the sea-coast. This was a commercial port, and numerous merchant vessels were riding at anchor in the\n      harbour. Here they halted seven days, and here Xenias the Arcadian general, and Pasion the Megarian got on board a\n      trader, and having stowed away their most valuable effects, set sail for home; most people explained the act as the\n      outcome of a fit of jealousy, because Cyrus had allowed Clearchus to retain their men, who had deserted to him, in\n      hopes of returning to Hellas instead of marching against the king; when the two had so vanished, a rumour spread that\n      Cyrus was after them with some ships of war, and some hoped the cowards might be caught, others pitied them, if that\n      should be their fate.</p>\n  </main>\n\n</ion-content>\n'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\news-detail\news-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], NewsDetailPage);
    return NewsDetailPage;
}());

//# sourceMappingURL=news-detail.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SearchPage = /** @class */ (function () {
    function SearchPage(navCtrl, navParams, viewCtrl, platform, loadingCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.data = {
            place: '',
            architect: '',
            category: '',
            fromYear: '',
            toYear: '',
        };
    }
    SearchPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        // Places SearchBox 
        var search = document.getElementById('place');
        var searchBox = new google.maps.places.SearchBox(search);
        // https://stackoverflow.com/questions/30383097/pass-typescript-property-from-outside-scope-into-scope
        searchBox.addListener('places_changed', function () {
            _this.data.place = searchBox.getPlaces();
        });
    };
    SearchPage.prototype.ionViewWillLoad = function () {
        // Architect SearchBox
        this.getArchitects();
        // categoies searchbox
        this.getCategories();
    };
    SearchPage.prototype.search = function () {
        if (this.data) {
            this.viewCtrl.dismiss(this.data);
        }
        else {
            this.viewCtrl.dismiss();
        }
    };
    SearchPage.prototype.selectAll = function () {
        this.data.architect = '';
        this.data.fromYear == '';
        this.data.toYear == '';
        this.search();
    };
    //get the archs
    SearchPage.prototype.getArchitects = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'ios'
        });
        this.loading.present();
        var promise = new Promise(function (resolve, reject) {
            _this.http.get('http://alivearchapp.com/viagemdearquiteto/api/architects/read.php')
                .subscribe(function (result) {
                console.log("Getting architects");
                resolve(result.json());
                _this.architectOptions = result.json();
                console.log(_this.architectOptions);
                _this.myArchitects = [];
                if (_this.architectOptions.records.length > 0) {
                    for (var i = 0; i < _this.architectOptions.records.length; i++) {
                        _this.myArchitects.push({
                            id: _this.architectOptions.records[i].codigo,
                            name: _this.architectOptions.records[i].nome
                        });
                    }
                }
                _this.architects = _this.passingFunctionArc(_this.myArchitects);
                _this.loading.dismiss();
            }, function (error) {
                reject(error.json());
            });
        })
            .catch(function (e) { return console.log(e); });
    };
    SearchPage.prototype.getCategories = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get('http://alivearchapp.com/viagemdearquiteto/api/categories/read.php')
                .subscribe(function (result) {
                console.log("Getting categories");
                resolve(result.json());
                _this.categoryOptions = result.json();
                console.log(_this.categoryOptions);
                _this.myCategories = [];
                if (_this.categoryOptions.records.length > 0) {
                    for (var i = 0; i < _this.categoryOptions.records.length; i++) {
                        _this.myCategories.push({
                            id: _this.categoryOptions.records[i].codigo,
                            name: _this.categoryOptions.records[i].nome
                        });
                    }
                }
                _this.categories = _this.passingFunctionCat(_this.myCategories);
            }, function (error) {
                reject(error.json());
            });
        })
            .catch(function (e) { return console.log(e); });
    };
    SearchPage.prototype.passingFunctionArc = function (data) {
        return data;
    };
    SearchPage.prototype.passingFunctionCat = function (data) {
        return data;
    };
    SearchPage.prototype.architectChange = function (event) {
        console.log('value:', event.value);
        var myArchitects = [];
        if (event.value.length > 0) {
            for (var i = 0; i < event.value.length; i++) {
                myArchitects.push({
                    id: event.value[i].id
                });
            }
        }
        console.log(myArchitects);
    };
    SearchPage.prototype.categoryChange = function (event) {
        console.log('value:', event.value);
        var myCategories = [];
        if (event.value.length > 0) {
            for (var i = 0; i < event.value.length; i++) {
                myCategories.push({
                    id: event.value[i].id
                });
            }
        }
        console.log(myCategories);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('pac-input'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], SearchPage.prototype, "mapRef", void 0);
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\search\search.html"*/'\n<ion-content padding>    \n  <form id="form" (ngSubmit)="search()">\n    <input id="place" class="controls" name="place" type="text" placeholder="{{\'choose\' | translate }}">\n    <ion-item class="controls">\n      <select-search\n          [(ngModel)]="data.architect"\n          name="architect"\n          id="architect"\n          title="{{\'architects\' | translate }}"\n          itemValueField="id"\n          itemTextField="name"\n          [items]="architects"\n          [canSearch]="true"\n          [multiple]="true"\n          (onChange)="architectChange($event)">\n      </select-search>\n    </ion-item>\n    <ion-item class="controls">\n      <select-search\n          [(ngModel)]="data.category"\n          name="category"\n          id="category"\n          title="{{\'categories\' | translate }}"\n          itemValueField="id"\n          itemTextField="{{\'name\' | translate }}"\n          [items]="categories"\n          [canSearch]="true"\n          [multiple]="true"\n          (onChange)="categoryChange($event)">\n      </select-search>\n    </ion-item>\n    <ion-item class="controls">\n      <select-search\n          [(ngModel)]="data.category"\n          name="materials"\n          id="materials"\n          title="{{\'materials\' | translate }}"\n          itemValueField="id"\n          itemTextField="{{\'name\' | translate }}"\n          [items]="categories"\n          [canSearch]="true"\n          [multiple]="true"\n          (onChange)="materialsChange($event)">\n      </select-search>\n    </ion-item>\n    <ion-item class="controls">\n      <select-search\n          [(ngModel)]="data.category"\n          name="materials"\n          id="materials"\n          title="{{\'category\' | translate }}"\n          itemValueField="id"\n          itemTextField="{{\'name\' | translate }}"\n          [items]="categories"\n          [canSearch]="true"\n          [multiple]="true"\n          (onChange)="materialsChange($event)">\n      </select-search>\n    </ion-item>\n    \n    <!--<ion-label>Period</ion-label>-->\n\n    <input id="fromYear" class="controls" [(ngModel)]="data.fromYear" name="fromYear" type="number" placeholder="{{\'from\' | translate }}" maxlength="4">\n\n    <input id="toYear" class="controls" [(ngModel)]="data.toYear" name="toYear" type="number" placeholder="{{\'to\' | translate }}" maxlength="4">\n\n  \n    <!--\n    <ion-input id="architect" class="controls" name="architect" type="text" placeholder="Choose Architect"></ion-input>\n    -->\n    \n    <button ion-button type="submit" class="search-button"block>{{\'search\' | translate }}</button>\n    <button ion-button (click)="selectAll()" class="search-button"block>{{\'clear filters\' | translate }}</button>\n    <button ion-button type="submit" class="search-button"block>{{\'cancel\' | translate }}</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\search\search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(400);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* unused harmony export HttpLoaderFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(737);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_favorites_favorites__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_form_form__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_map_map__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_welcome_welcome__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__ = __webpack_require__(738);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_information_information__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_building_building__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_tutorial_tutorial__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_search_search__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_news_news__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_news_detail_news_detail__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_facebook__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_google_plus__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ngx_translate_core__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ngx_translate_http_loader__ = __webpack_require__(739);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_common_http__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_firebase__ = __webpack_require__(741);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_angularfire2__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_angularfire2_database__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__app_firebase_config__ = __webpack_require__(747);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_angularfire2_auth__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_geolocation__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_screen_orientation__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_social_sharing__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_camera__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__components_select_search_select_search__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_select_search_select_search_page__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__providers_favorite_favorite__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_storage__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_place_place__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__node_modules_ionic_native_globalization__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__providers_news_news__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__providers_url_url__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_cadastro_cadastro__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_nova_senha_nova_senha__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_esqueci_esqueci__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_codigo_codigo__ = __webpack_require__(178);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















// import { HttpModule, Http } from "@angular/http";


























__WEBPACK_IMPORTED_MODULE_24_firebase___default.a.initializeApp({
    apiKey: "AIzaSyDztxJxETKWZkz7EMBxtSVrxgy2gwdgRDM",
    authDomain: "alivearchusers.firebaseapp.com",
    databaseURL: "https://alivearchusers.firebaseio.com",
    projectId: "alivearchusers",
    storageBucket: "alivearchusers.appspot.com",
    messagingSenderId: "521144244038"
});
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_favorites_favorites__["a" /* FavoritesPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_form_form__["a" /* FormPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_information_information__["a" /* InformationPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_building_building__["a" /* BuildingPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_tutorial_tutorial__["a" /* TutorialPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_33__components_select_search_select_search__["a" /* SelectSearch */],
                __WEBPACK_IMPORTED_MODULE_34__components_select_search_select_search_page__["a" /* SelectSearchPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_place_place__["a" /* PlacePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_news_news__["a" /* NewsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_news_detail_news_detail__["a" /* NewsDetailPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_cadastro_cadastro__["a" /* CadastroPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_nova_senha_nova_senha__["a" /* NovaSenhaPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_esqueci_esqueci__["a" /* EsqueciPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_codigo_codigo__["a" /* CodigoPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/building/building.module#BuildingPageModule', name: 'BuildingPage', segment: 'building', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cadastro/cadastro.module#CadastroPageModule', name: 'CadastroPage', segment: 'cadastro', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/codigo/codigo.module#CodigoPageModule', name: 'CodigoPage', segment: 'codigo', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/esqueci/esqueci.module#EsqueciPageModule', name: 'EsqueciPage', segment: 'esqueci', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/news-detail/news-detail.module#NewsDetailPageModule', name: 'NewsDetailPage', segment: 'news-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/news/news.module#NewsPageModule', name: 'NewsPage', segment: 'news', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/nova-senha/nova-senha.module#NovaSenhaPageModule', name: 'NovaSenhaPage', segment: 'nova-senha', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'SearchPage', segment: 'search', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tutorial/tutorial.module#TutorialPageModule', name: 'TutorialPage', segment: 'tutorial', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/welcome/welcome.module#WelcomePageModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_36__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_25_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_27__app_firebase_config__["a" /* FIREBASE_CONFIG */]),
                __WEBPACK_IMPORTED_MODULE_23__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_18__angular_http__["b" /* HttpModule */],
                //Http,
                __WEBPACK_IMPORTED_MODULE_21__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_21__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: HttpLoaderFactory,
                        deps: [__WEBPACK_IMPORTED_MODULE_23__angular_common_http__["a" /* HttpClient */]]
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_28_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_26_angularfire2_database__["b" /* AngularFireDatabaseModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_favorites_favorites__["a" /* FavoritesPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_form_form__["a" /* FormPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_information_information__["a" /* InformationPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_building_building__["a" /* BuildingPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_tutorial_tutorial__["a" /* TutorialPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_33__components_select_search_select_search__["a" /* SelectSearch */],
                __WEBPACK_IMPORTED_MODULE_34__components_select_search_select_search_page__["a" /* SelectSearchPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_place_place__["a" /* PlacePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_news_news__["a" /* NewsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_news_detail_news_detail__["a" /* NewsDetailPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_cadastro_cadastro__["a" /* CadastroPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_nova_senha_nova_senha__["a" /* NovaSenhaPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_esqueci_esqueci__["a" /* EsqueciPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_codigo_codigo__["a" /* CodigoPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_facebook__["a" /* Facebook */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_google_plus__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
                __WEBPACK_IMPORTED_MODULE_31__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_38__node_modules_ionic_native_globalization__["a" /* Globalization */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_35__providers_favorite_favorite__["a" /* FavoriteProvider */],
                __WEBPACK_IMPORTED_MODULE_39__providers_news_news__["a" /* NewsProvider */],
                __WEBPACK_IMPORTED_MODULE_40__providers_url_url__["a" /* UrlProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

function HttpLoaderFactory(http) {
    return new __WEBPACK_IMPORTED_MODULE_22__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UrlProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the UrlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UrlProvider = /** @class */ (function () {
    function UrlProvider(http) {
        this.http = http;
        this.padrao = "http://agenciacolateral.com.br/alivearch/api/";
        this.usuario = {
            logar: this.padrao + "conta/index",
            salvar: this.padrao + "conta/adicionar",
            esqueci: this.padrao + "conta/esqueci",
            novaSenha: this.padrao + "conta/novaSenha",
        };
        this.edificio = {
            lista: this.padrao + "edificio"
        };
        console.log('Hello UrlProvider Provider');
    }
    UrlProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], UrlProvider);
    return UrlProvider;
}());

//# sourceMappingURL=url.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_plus__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tutorial_tutorial__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cadastro_cadastro__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_url_url__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__esqueci_esqueci__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(153);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};










/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WelcomePage = /** @class */ (function () {
    function WelcomePage(navCtrl, navParams, gPlus, facebook, http, url, toastCtrl, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gPlus = gPlus;
        this.facebook = facebook;
        this.http = http;
        this.url = url;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.carregando = false;
        this.usuario = {
            email: "",
            senha: ""
        };
    }
    WelcomePage.prototype.loginFacebookApp = function () {
        var _this = this;
        this.facebook.login(["email"])
            .then(function (res) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tutorial_tutorial__["a" /* TutorialPage */]);
        })
            .catch(function (e) {
            if (JSON.stringify(e).indexOf("1349195")) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tutorial_tutorial__["a" /* TutorialPage */]);
            }
        });
    };
    WelcomePage.prototype.loginGoogle = function () {
        var _this = this;
        this.gPlus.login({
            'webClientId': '521144244038-vnp94iolok0be604bqmjr7btnhjbajp9.apps.googleusercontent.com',
            'offline': true
        }).then(function (res) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tutorial_tutorial__["a" /* TutorialPage */]);
        }).catch(function (e) {
            if (e == 10)
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tutorial_tutorial__["a" /* TutorialPage */]);
        });
    };
    WelcomePage.prototype.novaConta = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__cadastro_cadastro__["a" /* CadastroPage */]);
                return [2 /*return*/];
            });
        });
    };
    WelcomePage.prototype.Esqueci = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__esqueci_esqueci__["a" /* EsqueciPage */]);
    };
    WelcomePage.prototype.Entrar = function () {
        var _this = this;
        if (this.Validar()) {
            this.carregando = true;
            this.http.post(this.url.usuario.logar, this.usuario)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.carregando = false;
                if (!res.erro) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tutorial_tutorial__["a" /* TutorialPage */]);
                }
                else {
                    var toast = _this.toastCtrl.create({
                        message: res.mensagem,
                        duration: 3000,
                        position: "bottom"
                    });
                    toast.present();
                }
            });
        }
        else {
            var toast = this.toastCtrl.create({
                message: "Preencha os campos",
                duration: 3000,
                position: "bottom"
            });
            toast.present();
        }
    };
    WelcomePage.prototype.Validar = function () {
        var valido = false;
        if (this.usuario.email != "" && this.usuario.senha != "")
            valido = true;
        return valido;
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-welcome',template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\welcome\welcome.html"*/'<ion-content padding id="welcome" >\n  <ion-grid>\n  <ion-row>\n    <ion-col text-center >\n      <img src="assets/imgs/logoAlive.png" class="logo"/>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n<ion-list inset>\n\n  <ion-item>\n    <ion-input type="text" [(ngModel)]="usuario.email" placeholder="E-mail"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-input type="password" [(ngModel)]="usuario.senha" placeholder="Senha"></ion-input>\n  </ion-item>\n\n  <div class="carregando" [style.display]="carregando?\'block\':\'none\'">\n    <ion-spinner name="ios" duration="700"></ion-spinner>\n  </div>\n\n  <button ion-button block color="primary" type="submit" (click)="Entrar()" [style.display]="!carregando?\'block\':\'none\'" >Entrar</button>\n\n</ion-list>\n<div padding-horizontal>\n  <div class="login-footer">\n    <p>\n      <a (click)="Esqueci()">Esqueceu a senha?</a>\n      Novo aqui, cadastre-se.\n    </p>\n  </div>\n\n</div>\n<ion-grid>    \n  <ion-row>\n    <ion-col center text-center>\n      <button ion-button block  class="btn-tools"(click)="loginFacebookApp()">\n          <ion-icon name="logo-facebook"></ion-icon>\n          {{"facebook" | translate }}</button>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col center text-center>\n      <button ion-button block class="btn-tools" (click)="loginGoogle()">\n          <ion-icon name="logo-google"></ion-icon>\n          {{"google" | translate }}</button>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n      <ion-col>\n        <button ion-button block class="btn-tools" (click)="novaConta()" >\n            <ion-icon name="md-mail" large></ion-icon>\n            Cadastrar com e-mail</button>\n      </ion-col>\n    </ion-row>\n</ion-grid>\n</ion-content>'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\welcome\welcome.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_7__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_6__providers_url_url__["a" /* UrlProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */]])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 737:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_observable_timer__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_observable_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_observable_timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__node_modules_ionic_native_globalization__ = __webpack_require__(391);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = /** @class */ (function () {
    function MyApp(platform, translate, afAuth, statusBar, splashScreen, globalization, screenOrientation) {
        var _this = this;
        this.translate = translate;
        this.afAuth = afAuth;
        this.globalization = globalization;
        this.screenOrientation = screenOrientation;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__["a" /* WelcomePage */];
        this.showSplash = true;
        this.language = "en-US";
        this.translate.addLangs(['en-US', 'pt-BR']);
        this.setLanguage();
        // this.afAuth.authState.subscribe(token => {
        //   if(!token){
        //     this.rootPage = WelcomePage;
        //   }
        //   else{
        //     this.rootPage = TabsPage;
        //   }
        // })
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__["a" /* WelcomePage */];
        // this.rootPage = TabsPage;
        if (platform.is('cordova')) {
            platform.ready().then(function () {
                _this.screenOrientation.lock(_this.screenOrientation.ORIENTATIONS.PORTRAIT);
            });
        }
        //translate.use('es');
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            statusBar.hide();
            splashScreen.hide();
            Object(__WEBPACK_IMPORTED_MODULE_8_rxjs_observable_timer__["timer"])(3000).subscribe(function () { return _this.showSplash = false; });
        });
    }
    MyApp.prototype.setLanguage = function () {
        this.translate.setDefaultLang(this.language);
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\app\app.html"*/'<div *ngIf="showSplash" class="splash-screen">\n    <div class="spinner-beggining">\n        <img src="assets/imgs/logoAlive.png" style="width: 100%;height: auto;" />\n    </div>\n</div>\n<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_9__node_modules_ionic_native_globalization__["a" /* Globalization */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__["a" /* ScreenOrientation */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__welcome_welcome__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(93);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


//import { TabsPage } from '../tabs/tabs';


var SignupPage = /** @class */ (function () {
    function SignupPage(afAuth, navCtrl, navParams) {
        this.afAuth = afAuth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userData = { "password": "", "email": "" };
    }
    SignupPage.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.afAuth.auth.createUserWithEmailAndPassword(this.userData.email, this.userData.password)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        localStorage.setItem('userData', JSON.stringify(this.responseData));
                        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__welcome_welcome__["a" /* WelcomePage */]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SignupPage.prototype.login = function () {
        //Login page link
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__welcome_welcome__["a" /* WelcomePage */]);
    };
    SignupPage.prototype.welcome = function () {
        //Login page link
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__welcome_welcome__["a" /* WelcomePage */]);
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\signup\signup.html"*/'<ion-content padding class="appBackground">\n  <ion-card>\n    <ion-card-header>\n      Registration\n    </ion-card-header>\n    <ion-card-content>\n      <ion-list>\n\n        <ion-item>\n          <ion-label stacked>Email</ion-label>\n          <ion-input type="text" [(ngModel)]="userData.email"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label stacked>Password</ion-label>\n          <ion-input type="password" [(ngModel)]="userData.password"></ion-input>\n        </ion-item>\n\n        <button ion-button full color="success" (click)="register()">Sign up</button>\n        <button ion-button full color="success" (click)="login()">Login Page</button>\n        <button ion-button full color="success" (click)="welcome()">Welcome Page</button>\n      </ion-list>\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 747:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FIREBASE_CONFIG; });
var FIREBASE_CONFIG = {
    apiKey: "AIzaSyDztxJxETKWZkz7EMBxtSVrxgy2gwdgRDM",
    authDomain: "alivearchusers.firebaseapp.com",
    databaseURL: "https://alivearchusers.firebaseio.com",
    projectId: "alivearchusers",
    storageBucket: "alivearchusers.appspot.com",
    messagingSenderId: "521144244038"
};
//# sourceMappingURL=app.firebase.config.js.map

/***/ }),

/***/ 748:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectSearch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__select_search_page__ = __webpack_require__(392);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var SelectSearch = /** @class */ (function () {
    function SelectSearch(navController, ionForm, platform, ionItem) {
        this.navController = navController;
        this.ionForm = ionForm;
        this.platform = platform;
        this.ionItem = ionItem;
        this._items = [];
        this.filterText = '';
        this.value = null;
        this.canSearch = false;
        this.canReset = false;
        this.searchPlaceholder = '...';
        this.onChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.onSearch = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.propagateChange = function (_) { };
    }
    SelectSearch_1 = SelectSearch;
    Object.defineProperty(SelectSearch.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (items) {
            // The original reference of the array should be preserved to keep two-way data binding working between SelectSearchable and SelectSearchablePage.
            this._items.splice(0, this._items.length);
            // Add new items to the array.
            Array.prototype.push.apply(this._items, items);
        },
        enumerable: true,
        configurable: true
    });
    SelectSearch.prototype.isNullOrWhiteSpace = function (value) {
        if (value === null || value === undefined) {
            return true;
        }
        // Convert value to string in case if it's not.
        return value.toString().replace(/\s/g, '').length < 1;
    };
    SelectSearch.prototype.ngOnInit = function () {
        this.isIos = this.platform.is('ios');
        this.isMd = this.platform.is('android');
        this.hasSearchEvent = this.onSearch.observers.length > 0;
        this.ionForm.register(this);
        if (this.ionItem) {
            this.ionItem.setElementClass('item-select-search', true);
        }
    };
    SelectSearch.prototype.initFocus = function () { };
    SelectSearch.prototype._click = function (event) {
        if (event.detail === 0) {
            // Don't continue if the click event came from a form submit.
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        this.open();
    };
    SelectSearch.prototype.select = function (selectedItem) {
        this.value = selectedItem;
        this.emitChange();
    };
    SelectSearch.prototype.emitChange = function () {
        this.propagateChange(this.value);
        this.onChange.emit({
            component: this,
            value: this.value
        });
    };
    SelectSearch.prototype.emitSearch = function () {
        this.onSearch.emit({
            component: this,
            text: this.filterText
        });
    };
    SelectSearch.prototype.open = function () {
        this.navController.push(__WEBPACK_IMPORTED_MODULE_3__select_search_page__["a" /* SelectSearchPage */], {
            selectComponent: this,
            navController: this.navController
        });
    };
    SelectSearch.prototype.reset = function () {
        this.setValue(null);
        this.emitChange();
    };
    SelectSearch.prototype.formatItem = function (value) {
        if (this.itemTemplate) {
            return this.itemTemplate(value);
        }
        return value ? value[this.itemTextField] : null;
    };
    SelectSearch.prototype.formatValue = function () {
        var _this = this;
        if (!this.value) {
            return null;
        }
        if (this.multiple) {
            return this.value.map(function (item) { return _this.formatItem(item); }).join(', ');
        }
        else {
            return this.formatItem(this.value);
        }
    };
    SelectSearch.prototype.writeValue = function (value) {
        this.setValue(value);
    };
    SelectSearch.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    SelectSearch.prototype.registerOnTouched = function (fn) { };
    SelectSearch.prototype.setDisabledState = function (isDisabled) { };
    SelectSearch.prototype.ngOnDestroy = function () {
        this.ionForm.deregister(this);
    };
    SelectSearch.prototype.setValue = function (value) {
        var _this = this;
        this.value = value;
        // Get an item from the list for value.
        // We need this in case value contains only id, which is not sufficient for template rendering.
        if (this.value && !this.isNullOrWhiteSpace(this.value[this.itemValueField])) {
            var selectedItem = this.items.find(function (item) {
                return item[_this.itemValueField] === _this.value[_this.itemValueField];
            });
            if (selectedItem) {
                this.value = selectedItem;
            }
        }
    };
    SelectSearch.prototype.ngOnChanges = function (changes) {
        if (changes['items'] && this.items.length > 0) {
            this.setValue(this.value);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('items'),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], SelectSearch.prototype, "items", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], SelectSearch.prototype, "isSearching", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], SelectSearch.prototype, "itemValueField", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], SelectSearch.prototype, "itemTextField", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], SelectSearch.prototype, "canSearch", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], SelectSearch.prototype, "canReset", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], SelectSearch.prototype, "title", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], SelectSearch.prototype, "searchPlaceholder", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], SelectSearch.prototype, "onChange", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], SelectSearch.prototype, "onSearch", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Function)
    ], SelectSearch.prototype, "itemTemplate", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], SelectSearch.prototype, "multiple", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */])('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [UIEvent]),
        __metadata("design:returntype", void 0)
    ], SelectSearch.prototype, "_click", null);
    SelectSearch = SelectSearch_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'select-search',template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\components\select-search\select-search.html"*/'<div class="select-search-label">{{title}}</div>\n<div class="select-search-value">{{formatValue()}}</div>\n<div class="select-search-icon">\n    <div class="select-search-icon-inner"></div>\n</div>\n<button aria-haspopup="true" ion-button="item-cover" class="item-cover"></button>'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\components\select-search\select-search.html"*/,
            providers: [{
                    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* NG_VALUE_ACCESSOR */],
                    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* forwardRef */])(function () { return SelectSearch_1; }),
                    multi: true
                }],
            host: {
                'class': 'select-search',
                '[class.select-search-ios]': 'isIos',
                '[class.select-search-md]': 'isMd',
                '[class.select-search-can-reset]': 'canReset'
            }
        }),
        __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Optional */])()),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Form */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* Item */]])
    ], SelectSearch);
    return SelectSearch;
    var SelectSearch_1;
}());

//# sourceMappingURL=select-search.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TutorialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(242);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TutorialPage = /** @class */ (function () {
    function TutorialPage(navCtrl, navParams, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        console.log("tutorial");
    }
    TutorialPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TutorialPage');
    };
    TutorialPage.prototype.slideChanged = function () {
        var currentIndex = this.slides.getActiveIndex();
        if (currentIndex > 2) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */])
    ], TutorialPage.prototype, "slides", void 0);
    TutorialPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tutorial',template:/*ion-inline-start:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\tutorial\tutorial.html"*/'<ion-content >\n  <!--(ionSlideReachEnd)="navHome()"-->\n    <ion-slides pager="true" (ionSlideDidChange)="slideChanged()" >\n      <ion-slide style="width: 100% ; height: 100% !important;">\n        <h3>BEM VINDO</h3>\n        <h3>AO ALIVE ARCH</h3>\n        <h5>Você está pronto para descobrir lugares incríveis perto de você ou contar para outros apaixonados por arquitetura sobre uma construção que talvez só você conheça? </h5>\n        <img class="imgsize" src="assets/imgs/tutorial/Tutorial 1.png">\n      </ion-slide>\n      <ion-slide style="width: 100% ; height: 100% !important;">\n        <h3 class="botton-space">PODEM SER</h3>\n        <img src="assets/imgs/tutorial/Tutorial 2_ícones.png">\n        <ion-grid class="no-top-padding">\n        <ion-row>\n            <ion-col class="no-top-padding">\n              <h5 class="no-top-margin buildings">prédios</h5>\n            </ion-col>\n            <ion-col class="no-top-padding">\n              <h5 class="no-top-margin monuments">monumentos</h5> \n            </ion-col>\n            <ion-col  class="no-top-padding">\n              <h5 class="no-top-margin squares">praças</h5>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n        <img src="assets/imgs/tutorial/Tutorial 2.png">\n      </ion-slide>\n      <ion-slide style="width: 100% ; height: 100% !important;" ionSlideDrag="navHome()">\n        <h3>VAMOS</h3>\n        <h3>NESSAS</h3>\n        <h5>Busque por uma construção ou pelo seu arquiteto favorito, descubra como chegar lá e compartilhe tudo com seus amigos! </h5>\n        <img class="imgsize" src="assets/imgs/tutorial/Tutorial 3.png" (click)="navHome()">\n      </ion-slide>\n\n      \n    </ion-slides>\n    \n  </ion-content>'/*ion-inline-end:"C:\_Projetos\alivearch\alivearch_app-master\alivearch_app-master\src\pages\tutorial\tutorial.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]])
    ], TutorialPage);
    return TutorialPage;
}());

//# sourceMappingURL=tutorial.js.map

/***/ })

},[395]);
//# sourceMappingURL=main.js.map
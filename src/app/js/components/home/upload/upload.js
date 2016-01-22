import Ractive from 'ractive'

import loadingUI from "_uiModules/loading/loading.js"
import uploadTemplate from '_templates/home/upload/upload.html'

var UploadV = Ractive.extend({
    template: uploadTemplate,
    components: {
        LoadingV: loadingUI
    },
    data: function() {
        return {
            loading: true,
            loadListing: false,
            activeTypeData: {
                id: 101,
                type: 'bigthumb',
                name: "Bigthumb Images"
            },
            imagesData: [],
            errorMessage: [],
            formatDate: function(timestamp) {
                function align(num) {
                    return ((num + '').length == 1 ? '0' + num : num);
                }

                var d = new Date(timestamp * 1000);
                var year = d.getFullYear();
                var month = d.getMonth() + 1;
                var day = d.getDate();
                var hour = d.getHours();
                var minute = d.getMinutes();
                var second = d.getSeconds();
                return year + '-' + align(month) + '-' + align(day) + ' ' + align(hour) + ':' + align(minute) + ':' + align(second);
            },
            pageOpts: [5,10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            page: 1,
            count: 5
        };
    },
    onchange: function() {

    },
    onrender: function() {
        this.client = [];
        //this._onLoad('bigthumb');
        Store.event.on('SUCCESS_LOAD_app', this._onLoadSuccess.bind(this));
        Store.event.on('SUCCESS_LOADLIST_app', this._onLoadListSuccess.bind(this));
        Store.event.on('SUCCESS_DEL_app', this._onDelSuccess.bind(this));
        Store.event.on('active_type_change', this._onActiveTypeChange.bind(this));
        Store.event.on('change_country', this._onChangeCountry.bind(this));
    },
    oncomplete: function() {
        var self = this;
        this.on({
            // 监听子组件事件
            'delete': function(event, item) {
                var _curLocale = Store.states.home.get('curLocale');
                var params = {
                    lc: _curLocale,
                    src: item.url
                };
                Store.actions.upload.del(params);
            },
            'initZeroClipboard': function(event, i) {
                self._initZeroClipboard(event, i);
            },
            'destroyClipboard': function(event, i) {
                self._destroyClipboard(event, i);
            },
            'focus': function(event, item) {
                $(event.node).select();
            },
            'gotoPage': function(event, delta) {console.log(333)
                var pageNum;
                if (delta !== undefined) {
                    delta = parseInt(delta, 10);
                    if (delta > 0) {
                        self.set('page', parseInt(self.get('page'), 10) + 1).then(function() {
                            self._onLoadList();
                        });
                    } else {
                        self.set('page', parseInt(self.get('page'), 10) - 1).then(function() {
                            self._onLoadList();
                        });
                    }
                } else {
                    pageNum = event.node.value;
                    console.log(pageNum)
                    self.set('page', parseInt(pageNum, 10)).then(function() {
                        self._onLoadList();
                    });
                }
            },
            'changeNumPpage': function(event) {
                var numPpage = event.node.options[event.node.selectedIndex].value;
                self.set('count', numPpage).then(function() {
                    self._onLoadList();
                });
            },
        }, this);
    },
    onunrender: function() {
        Store.event.removeListener('SUCCESS_LOAD_app', this._onLoadSuccess.bind(this))
        Store.event.removeListener('SUCCESS_LOADLIST_app', this._onLoadListSuccess.bind(this));
        Store.event.removeListener('SUCCESS_DEL_app', this._onDelSuccess.bind(this));
        Store.event.removeListener('active_type_change', this._onActiveTypeChange.bind(this));
    },
    _onLoad: function(_type) {
        var self = this;
        this.set("loading", true).then(function() {
            var _curLocale = Store.states.home.get('curLocale');
            var _page = self.get("page"),
                _count = self.get("count");
            var params = {
                lc: _curLocale,
                type: _type,
                page: _page,
                count: _count
            };
            Store.actions.upload.load(params);
        });
    },
    _onLoadSuccess: function(data) {
        var self = this;
        this.set("imagesData", data.data);
        this.set("loading", false).then(function() {
            self._initFlow();
        });
    },
    _onActiveTypeChange: function(data) {
        var _typeData = data.data;
        var self = this;
        this.set("activeTypeData", _typeData).then(function() {
            self._onLoad(_typeData.type);
        });
    },
    _onLoadList: function() {
        var self = this;
        var _activeTypeData = this.get('activeTypeData');
        this.set("loadListing", true).then(function() {
            var _curLocale = Store.states.home.get('curLocale');
            var _page = self.get("page"),
                _count = self.get("count");
            var params = {
                lc: _curLocale,
                type: _activeTypeData.type,
                page: _page,
                count: _count
            };
            Store.actions.upload.loadList(params);
        });
    },
    _onLoadListSuccess: function(data) {
        var self = this;
        this.set("imagesData", data.data);
        this.set("loadListing", false).then(function() {});
    },
    _onDelSuccess: function(data) {
        this._onLoadList();
    },
    _onChangeCountry: function() {
        var _activeTypeData = this.get('activeTypeData');
        this._onLoad(_activeTypeData.type);
    },
    _initFlow: function() {
        var self = this;
        var _activeTypeData = this.get('activeTypeData');
        var _uploadUrl;
        var _curLocale = Store.states.home.get('curLocale');

        this.r = null;

        switch (_activeTypeData.type) {
            case 'bigthumb':
                _uploadUrl = '/admin/api/upload/bigthumb?lc=' + _curLocale + '&type=bigthumb';
                break;
            case 'banner_ad_image':
                _uploadUrl = '/admin/api/upload/banner_ad_image?lc=' + _curLocale + '&type=banner_ad_image';
                break;
            case 'circle_image':
                _uploadUrl = '/admin/api/upload/image?lc=' + _curLocale + '&type=circle_image';
                break;
            case 'topic_image':
                _uploadUrl = '/admin/api/upload/topicimage?lc=' + _curLocale + '&type=topic_image';
                break;
            default:

        }
        this.r = new Flow({
            target: _uploadUrl,
            chunkSize: 1024 * 1024,
            testChunks: false
        });
        // Flow.js isn't supported, fall back on a different method
        if (!this.r.support) {
            $('.flow-error').show();
            return;
        }
        // Show a place for dropping/selecting files
        $('.flow-drop').show();
        this.r.assignDrop($('.flow-drop')[0]);
        this.r.assignBrowse($('.flow-browse')[0]);
        this.r.assignBrowse($('.flow-browse-folder')[0], true);
        this.r.assignBrowse($('.flow-browse-image')[0], false, false, {
            accept: 'image/*'
        });

        // Handle file add event
        this.r.on('fileAdded', function(file) {
            $('.flow-progress').show();
            //console.log(file)
        });
        this.r.on('filesSubmitted', function(file) {
            self.r.upload();
        });
        this.r.on('uploadStart', function() {
            // Show pause, hide resume
            // self.timer = setTimeout(function(){
            //     $('.flow-progress').hide();
            //     self._onLoadList();
            // },5000);
        });
        this.r.on('fileSuccess', function(file, message) {
            var $self = $('.flow-file-' + file.uniqueIdentifier);
            // Reflect that the file upload has completed
            $self.find('.flow-file-progress').text('(completed)');
            $self.find('.flow-file-pause, .flow-file-resume').remove();
            $self.find('.flow-file-download').attr('href', '/download/' + file.uniqueIdentifier).show();
        });
        this.r.on('fileError', function(file, message) {
            console.log("error", message)
            var _errorMessageArr = self.get('errorMessage');
            _errorMessageArr.push({
                message: '(file could not be uploaded: ' + message + ')'
            });
            self.set("errorMessage", _errorMessageArr);
        });
        this.r.on('complete', function() {
            //clearTimeout(self.timer);
            $('.flow-progress').hide();
            self._onLoadList();
        });

        this.r.on('fileProgress', function(file) {
            // Handle progress for both the file and the overall upload
            $('.flow-file-' + file.uniqueIdentifier + ' .flow-file-progress')
                .html(Math.floor(file.progress() * 100) + '% ' + self._readablizeBytes(file.averageSpeed) + '/s ' + self._secondsToStr(file.timeRemaining()) + ' remaining');
            $('.progress-bar').css({
                width: Math.floor(self.r.progress() * 100) + '%'
            });
        });

        this.r.on('catchAll', function() {});
    },
    _initZeroClipboard: function(e, i) {
        var self = this;
        var client = this.client;
        var _btn = document.getElementById("Clipboard_id_" + i);

        client[i] = new ZeroClipboard(_btn);
        client[i].on("ready", function(readyEvent) {
            client[i].on("beforecopy", function(event) {
                console.log("4343434")
            });
            client[i].on("aftercopy", function(event) {
                console.log("111")
                    //event.target.style.display = "none";
                    //alert("成功复制到剪切板 "+ event.data["text/plain"]);
                $(_btn).popover({
                    title: 'The link has been copied to the clipboard',
                    content: event.data["text/plain"],
                    placement: 'left'
                });
                $(_btn).popover('show');
            });

            client[i].on("error", function(event) {
                console.log("error")
                $(_btn).popover({
                    title: 'Error',
                    content: 'Please copy again'
                });
                $(_btn).popover('show');
            });
            self.set('client', client);
            console.log('Create This Clipboard');
        });
    },
    _destroyClipboard: function(e, i) {
        console.log('[destroy clipboard] ' + i)
        var client = this.client;
        client[i].destroy();
        var _btn = document.getElementById("Clipboard_id_" + i);
        $(_btn).popover('destroy');
        console.log('Destroy This Clipboard');
    },
    _readablizeBytes: function(bytes) {
        var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
        var e = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, e)).toFixed(2) + " " + s[e];
    },
    _secondsToStr: function(temp) {
        function numberEnding(number) {
            return (number > 1) ? 's' : '';
        }
        var years = Math.floor(temp / 31536000);
        if (years) {
            return years + ' year' + numberEnding(years);
        }
        var days = Math.floor((temp %= 31536000) / 86400);
        if (days) {
            return days + ' day' + numberEnding(days);
        }
        var hours = Math.floor((temp %= 86400) / 3600);
        if (hours) {
            return hours + ' hour' + numberEnding(hours);
        }
        var minutes = Math.floor((temp %= 3600) / 60);
        if (minutes) {
            return minutes + ' minute' + numberEnding(minutes);
        }
        var seconds = temp % 60;
        return seconds + ' second' + numberEnding(seconds);
    },


});

export default UploadV

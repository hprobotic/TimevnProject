var diagramGalleryView = Backbone.View.extend({
    el: "#story-content-next",
    initialize: function() {
        this.template = _.template(GE.deepDive.tpl.get("diagram-gallery")),
        this.render()
    },
    render: function() {
        return $(this.el).append(this.template(this.model.toJSON())),
        $("#diagram-gallery-section .content").flexslider({
            animationLoop: !0,
            slideshow: !0,
            slideshowSpeed: 1e4,
            animationSpeed: 1e3,
            controlNav: !0,
            controlsContainer: ".slider-arrows-erosion"
        }),
        this
    }
})
  , diagramVideoView = Backbone.View.extend({
    el: "#story-content-next",
    initialize: function() {
        this.template = _.template(GE.deepDive.tpl.get("diagram-video")),
        this.render()
    },
    render: function() {
        return $(this.el).append(this.template(this.model.toJSON())),
        videojs(document.getElementById("zoomin_video"), {}, function() {
            _V_("zoomin_video").load()
        }
        ),
        this
    }
})
  , heroView = Backbone.View.extend({
    el: "#story-next",
    initialize: function() {
        this.template = _.template(GE.deepDive.tpl.get("hero")),
        this.render()
    },
    render: function() {
        return $(this.el).append(this.template(this.model.toJSON())),
        1 == CONFIG.isMobile || CONFIG.isTablet,
        this
    }
})
  , imgLeftHalfView = Backbone.View.extend({
    el: "#story-content-next",
    initialize: function() {
        this.template = _.template(GE.deepDive.tpl.get("img-left-half")),
        this.render()
    },
    render: function() {
        return $(this.el).append(this.template(this.model.toJSON())),
        this
    }
})
  , imgLeftHalfViewImg = Backbone.View.extend({
    el: "#story-content-next",
    initialize: function() {
        this.template = _.template(GE.deepDive.tpl.get("img-left-half-img")),
        this.render()
    },
    render: function() {
        return $(this.el).append(this.template(this.model.toJSON())),
        this
    }
})
  , imgLeftHalfViewSm = Backbone.View.extend({
    el: "#story-content-next",
    initialize: function() {
        this.template = _.template(GE.deepDive.tpl.get("img-left-half-sm")),
        this.render()
    },
    render: function() {
        return $(this.el).append(this.template(this.model.toJSON())),
        this
    }
})
  , imgRightHalfView = Backbone.View.extend({
    el: "#story-content-next",
    initialize: function() {
        this.template = _.template(GE.deepDive.tpl.get("img-right-half")),
        this.render()
    },
    render: function() {
        return $(this.el).append(this.template(this.model.toJSON())),
        this
    }
})
  , imgRightThirdView = Backbone.View.extend({
    el: "#story-content-next",
    initialize: function() {
        this.template = _.template(GE.deepDive.tpl.get("img-right-third")),
        this.render()
    },
    render: function() {
        return $(this.el).append(this.template(this.model.toJSON())),
        this
    }
})
  , locationsView = Backbone.View.extend({
    el: "#story-content-next",
    initialize: function() {
        this.template = _.template(GE.deepDive.tpl.get("locations")),
        this.render()
    },
    render: function() {
        $(this.el).append(this.template(this.model.toJSON()));
        var a = $(this.el).parent(".story").attr("class").split(" ")[1].split("-")[0];
        return $(this.el).find("#loc-" + a).remove(),
        this
    },
    events: {
        "click #locations li": "changeBusiness",
        "click #explore-btn button": "close"
    },
    changeBusiness: function(a) {
        var b = a.currentTarget.id;
        "loc-introvideo" != b ? GE.changeBusiness(b) : this.playYTvideo(a)
    },
    close: function(a) {
        a.preventDefault(),
        GE.backToHome()
    },
    playYTvideo: function(a) {
        $("#overlay-video").fadeIn();
        var b = this;
        GE.youtubeid = "droJ2mPmwkg",
        console.log(a);
        var c = "#videoId-" + GE.youtubeid
          , d = "videoId-" + GE.youtubeid;
        if (GE.highlightsPlayer = new StinkYTPlayer,
        $(GE.highlightsPlayer).bind(StinkYTPlayer.ENDED, function() {}
        ).bind(StinkYTPlayer.PLAYING, function() {
            $(c).addClass("show")
        }
        ),
        $(c).addClass("show"),
        $(c).addClass("show"),
        1 == GE.isPlaying)
            b.resetVideo(GE.youtubeid),
            setTimeout(function() {
                b.playYTvideo(GE.youtubeid)
            }
            , 700);
        else {
            if ($("#overlay-videointrocont .video-close-button").eq(0).fadeIn(),
            $(c).show().fadeIn(),
            $("#overlay-videointrocont .video-loader").show(),
            $("#overlay-videointrocont .video-loader").css({
                opacity: 1
            }),
            CONFIG.isTablet || CONFIG.isMobile)
                var e = !1;
            else
                var e = !0;
            GE.highlightsPlayer.isReady ? GE.highlightsPlayer.playVideo() : GE.highlightsPlayer.init(d, GE.youtubeid, e),
            GE.isPlaying = !0
        }
    },
    closeVideo: function(a) {
        GE.youtubeid = $(a.currentTarget).attr("data-ytid");
        var b = "#videoId-" + GE.youtubeid;
        GE.highlightsPlayer.stopVideo(),
        $("#video-two-third-" + GE.youtubeid + " .intro-video .video-close-button").fadeOut(),
        $(b).removeClass("show"),
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) && $(b).html(""),
        $(b).remove(),
        $("#video-two-third-" + GE.youtubeid + " .video-loader").hide(),
        $("#video-two-third-" + GE.youtubeid + " .intro-video").append('<div class="intro-video-container" id="videoId-' + GE.youtubeid + '"></div>'),
        GE.isPlaying = !1
    },
    resetVideo: function(a) {
        GE.youtubeid = a;
        var b = "#videoId-" + GE.youtubeid;
        console.log(b),
        GE.highlightsPlayer.stopVideo(),
        $("#video-two-third-" + GE.youtubeid + " .intro-video .video-close-button").fadeOut(),
        $(b).removeClass("show"),
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) && $(b).html(""),
        $(b).remove(),
        $("#video-two-third-" + GE.youtubeid + " .video-loader").hide(),
        $("#video-two-third-" + GE.youtubeid + " .intro-video").append('<div class="intro-video-container" id="videoId-' + GE.youtubeid + '"></div>'),
        GE.isPlaying = !1
    }
})
  , introVideoView = Backbone.View.extend({
    el: "#story-content-next",
    initialize: function() {
        this.template = _.template(GE.deepDive.tpl.get("introvideo")),
        this.render()
    },
    render: function() {
        $(this.el).append(this.template(this.model.toJSON()));
        var a = $(this.el).parent(".story").attr("class").split(" ")[1].split("-")[0];
        return $(this.el).find("#loc-" + a).remove(),
        this
    },
    events: {
        "click #introvideo-container": "playYTvideo",
        "click .video-close-button": "closeVideo"
    },
    openVideo: function() {},
    close: function() {},
    playYTvideo: function(a) {
        $("#overlay-video").fadeIn(),
        a.stopImmediatePropagation();
        var b = this;
        this.youtubeid = "droJ2mPmwkg",
        console.log(a);
        var c = "#videoId-" + GE.youtubeid
          , d = "videoId-" + GE.youtubeid;
        if (GE.highlightsPlayer = new StinkYTPlayer,
        $(GE.highlightsPlayer).bind(StinkYTPlayer.ENDED, function() {}
        ).bind(StinkYTPlayer.PLAYING, function() {
            $(c).addClass("show")
        }
        ),
        $(c).addClass("show"),
        $(c).addClass("show"),
        1 == GE.isPlaying)
            b.resetVideo(GE.youtubeid),
            setTimeout(function() {
                b.playYTvideo(GE.youtubeid)
            }
            , 700);
        else {
            if ($("#video-two-third-" + GE.youtubeid + " .intro-video .video-close-button").eq(0).fadeIn(),
            $(c).show().fadeIn(),
            $("#video-two-third-" + GE.youtubeid + " .video-loader").show(),
            $("#video-two-third-" + GE.youtubeid + " .video-loader").css({
                opacity: 1
            }),
            CONFIG.isTablet || CONFIG.isMobile)
                var e = !1;
            else
                var e = !0;
            GE.highlightsPlayer.isReady ? GE.highlightsPlayer.playVideo() : GE.highlightsPlayer.init(d, GE.youtubeid, e),
            GE.isPlaying = !0
        }
    },
    closeVideo: function(a) {
        GE.youtubeid = $(a.currentTarget).attr("data-ytid");
        var b = "#videoId-" + GE.youtubeid;
        GE.highlightsPlayer.stopVideo(),
        $("#video-two-third-" + GE.youtubeid + " .intro-video .video-close-button").fadeOut(),
        $(b).removeClass("show"),
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) && $(b).html(""),
        $(b).remove(),
        $("#video-two-third-" + GE.youtubeid + " .video-loader").hide(),
        $("#video-two-third-" + GE.youtubeid + " .intro-video").append('<div class="intro-video-container" id="videoId-' + GE.youtubeid + '"></div>'),
        GE.isPlaying = !1
    },
    resetVideo: function(a) {
        GE.youtubeid = a;
        var b = "#videoId-" + GE.youtubeid;
        console.log(b),
        GE.highlightsPlayer.stopVideo(),
        $("#video-two-third-" + GE.youtubeid + " .intro-video .video-close-button").fadeOut(),
        $(b).removeClass("show"),
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) && $(b).html(""),
        $(b).remove(),
        $("#video-two-third-" + GE.youtubeid + " .video-loader").hide(),
        $("#video-two-third-" + GE.youtubeid + " .intro-video").append('<div class="intro-video-container" id="videoId-' + GE.youtubeid + '"></div>'),
        GE.isPlaying = !1
    }
})
  , tickerView = Backbone.View.extend({
    el: "#story-content-next",
    initialize: function() {
        this.template = _.template(GE.deepDive.tpl.get("ticker")),
        this.render()
    },
    render: function() {
        return $(this.el).append(this.template(this.model.toJSON())),
        this
    }
})
  , videoTwoThirdView = Backbone.View.extend({
    el: "#story-content-next",
    initialize: function() {
        this.template = _.template(GE.deepDive.tpl.get("video-two-third")),
        this.render()
    },
    render: function() {
        $(this.el).append(this.template(this.model.toJSON()));
        parseInt(Math.floor(1e4 * Math.random() + 1));
        return this
    },
    events: {
        "click .intro-video-content": "playYTvideo",
        "click .video-close-button": "closeVideo"
    },
    backHome: function() {
        GE.backToHome()
    },
    changeCity: function(a) {
        var b = a.currentTarget.id;
        GE.changeCity(b)
    },
    playYTvideo: function(a) {
        a.stopImmediatePropagation();
        var b = this;
        GE.youtubeid = $(a.currentTarget).attr("data-ytid"),
        console.log(a);
        var c = "#videoId-" + GE.youtubeid
          , d = "videoId-" + GE.youtubeid;
        if (GE.highlightsPlayer = new StinkYTPlayer,
        $(GE.highlightsPlayer).bind(StinkYTPlayer.ENDED, function() {}
        ).bind(StinkYTPlayer.PLAYING, function() {
            $(c).addClass("show")
        }
        ),
        $(c).addClass("show"),
        $(c).addClass("show"),
        1 == GE.isPlaying)
            b.resetVideo(GE.youtubeid),
            setTimeout(function() {
                b.playYTvideo(GE.youtubeid)
            }
            , 700);
        else {
            if ($("#video-two-third-" + GE.youtubeid + " .intro-video .video-close-button").eq(0).fadeIn(),
            $(c).show().fadeIn(),
            $("#video-two-third-" + GE.youtubeid + " .video-loader").show(),
            $("#video-two-third-" + GE.youtubeid + " .video-loader").css({
                opacity: 1
            }),
            CONFIG.isTablet || CONFIG.isMobile)
                var e = !1;
            else
                var e = !0;
            GE.highlightsPlayer.isReady ? GE.highlightsPlayer.playVideo() : GE.highlightsPlayer.init(d, GE.youtubeid, e),
            GE.isPlaying = !0
        }
    },
    closeVideo: function(a) {
        GE.youtubeid = $(a.currentTarget).attr("data-ytid");
        var b = "#videoId-" + GE.youtubeid;
        GE.highlightsPlayer.stopVideo(),
        $("#video-two-third-" + GE.youtubeid + " .intro-video .video-close-button").fadeOut(),
        $(b).removeClass("show"),
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) && $(b).html(""),
        $(b).remove(),
        $("#video-two-third-" + GE.youtubeid + " .video-loader").hide(),
        $("#video-two-third-" + GE.youtubeid + " .intro-video").append('<div class="intro-video-container" id="videoId-' + GE.youtubeid + '"></div>'),
        GE.isPlaying = !1
    },
    resetVideo: function(a) {
        GE.youtubeid = a;
        var b = "#videoId-" + GE.youtubeid;
        console.log(b),
        GE.highlightsPlayer.stopVideo(),
        $("#video-two-third-" + GE.youtubeid + " .intro-video .video-close-button").fadeOut(),
        $(b).removeClass("show"),
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) && $(b).html(""),
        $(b).remove(),
        $("#video-two-third-" + GE.youtubeid + " .video-loader").hide(),
        $("#video-two-third-" + GE.youtubeid + " .intro-video").append('<div class="intro-video-container" id="videoId-' + GE.youtubeid + '"></div>'),
        GE.isPlaying = !1
    }
})
  , videoTwoThirdRightView = Backbone.View.extend({
    el: "#story-content-next",
    initialize: function() {
        this.template = _.template(GE.deepDive.tpl.get("video-two-third-right")),
        this.render()
    },
    render: function() {
        $(this.el).append(this.template(this.model.toJSON()));
        parseInt(Math.floor(1e4 * Math.random() + 1));
        return this
    },
    events: {
        "click .intro-video-content": "playYTvideo",
        "click .video-close-button": "closeVideo"
    },
    backHome: function() {
        GE.backToHome()
    },
    changeCity: function(a) {
        var b = a.currentTarget.id;
        GE.changeCity(b)
    },
    playYTvideo: function(a) {
        a.stopImmediatePropagation();
        var b = this;
        GE.youtubeid = $(a.currentTarget).attr("data-ytid"),
        console.log(a);
        var c = "#videoId-" + GE.youtubeid
          , d = "videoId-" + GE.youtubeid;
        if (GE.highlightsPlayer = new StinkYTPlayer,
        $(GE.highlightsPlayer).bind(StinkYTPlayer.ENDED, function() {}
        ).bind(StinkYTPlayer.PLAYING, function() {
            $(c).addClass("show")
        }
        ),
        $(c).addClass("show"),
        $(c).addClass("show"),
        1 == GE.isPlaying)
            b.resetVideo(GE.youtubeid),
            setTimeout(function() {
                b.playYTvideo(GE.youtubeid)
            }
            , 700);
        else {
            if ($("#video-two-third-" + GE.youtubeid + " .intro-video .video-close-button").eq(0).fadeIn(),
            $(c).show().fadeIn(),
            $("#video-two-third-" + GE.youtubeid + " .video-loader").show(),
            $("#video-two-third-" + GE.youtubeid + " .video-loader").css({
                opacity: 1
            }),
            CONFIG.isTablet || CONFIG.isMobile)
                var e = !1;
            else
                var e = !0;
            GE.highlightsPlayer.isReady ? GE.highlightsPlayer.playVideo() : GE.highlightsPlayer.init(d, GE.youtubeid, e),
            GE.isPlaying = !0
        }
    },
    closeVideo: function(a) {
        GE.youtubeid = $(a.currentTarget).attr("data-ytid");
        var b = "#videoId-" + GE.youtubeid;
        GE.highlightsPlayer.stopVideo(),
        $("#video-two-third-" + GE.youtubeid + " .intro-video .video-close-button").fadeOut(),
        $(b).removeClass("show"),
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) && $(b).html(""),
        $(b).remove(),
        $("#video-two-third-" + GE.youtubeid + " .video-loader").hide(),
        $("#video-two-third-" + GE.youtubeid + " .intro-video").append('<div class="intro-video-container" id="videoId-' + GE.youtubeid + '"></div>'),
        GE.isPlaying = !1
    },
    resetVideo: function(a) {
        GE.youtubeid = a;
        var b = "#videoId-" + GE.youtubeid;
        console.log(b),
        GE.highlightsPlayer.stopVideo(),
        $("#video-two-third-" + GE.youtubeid + " .intro-video .video-close-button").fadeOut(),
        $(b).removeClass("show"),
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) && $(b).html(""),
        $(b).remove(),
        $("#video-two-third-" + GE.youtubeid + " .video-loader").hide(),
        $("#video-two-third-" + GE.youtubeid + " .intro-video").append('<div class="intro-video-container" id="videoId-' + GE.youtubeid + '"></div>'),
        GE.isPlaying = !1
    }
})
  , imgLeftThirdView = Backbone.View.extend({
    el: "#story-content-next",
    initialize: function() {
        this.template = _.template(GE.deepDive.tpl.get("img-left-third")),
        this.render()
    },
    render: function() {
        return $(this.el).append(this.template(this.model.toJSON())),
        this
    }
})
  , imgLeftTwoThirdView = Backbone.View.extend({
    el: "#story-content-next",
    initialize: function() {
        this.template = _.template(GE.deepDive.tpl.get("img-left-two-third")),
        this.render()
    },
    render: function() {
        return $(this.el).append(this.template(this.model.toJSON())),
        this
    }
})
  , introView = Backbone.View.extend({
    el: "#story-content-next",
    initialize: function() {
        this.template = _.template(GE.deepDive.tpl.get("intro")),
        this.render()
    },
    render: function() {
        return $(this.el).append(this.template(this.model.toJSON())),
        this
    }
})
  , fullSecondView = Backbone.View.extend({
    el: "#story-content-next",
    initialize: function() {
        this.template = _.template(GE.deepDive.tpl.get("full-second")),
        this.render()
    },
    render: function() {
        return $(this.el).append(this.template(this.model.toJSON())),
        this
    }
})
  , GE = GE || {};
GE.window = window;
var GE = {
    businessId: ["aviation", "healthcare", "power-gas", "transportation", "oil-gas", "lighting", "power-wind", "software-data", "global-res"],
    storiesId: ["diesel", "imaging", "industrial", "supermaterials"],
    selectedStory: null ,
    hoverStory: null ,
    storyOpened: !1,
    vidStartTime: [],
    eS: null ,
    iframeFlag: null ,
    devCheck: !1,
    init: function() {
        function a() {
            null  == GE.iframeFlag ? setTimeout(function() {
                a()
            }
            , 100) : ($("#mixit-btn").hide(),
            CONFIG.isMobileIframe = !1,
            (CONFIG.isTablet || CONFIG.isMobile) && GE.iframeFlag === !1 && ($("#business-container").show(),
            $("#sun-icon").show(),
            $("#continue-exp").hide(),
            $("#mixit-btn").show()),
            (CONFIG.isTablet || CONFIG.isMobile) && GE.iframeFlag === !0 && ($("#sun-icon").hide(),
            $("#mixit-btn").show()),
            CONFIG.isMobile === !0 && GE.iframeFlag === !1 && ($("#overlay").hide(),
            $("#logo-big").hide()),
            CONFIG.isMobile === !0 && GE.iframeFlag === !0 && (CONFIG.isMobileIframe = !0,
            GE.mobileLogoTimeline = new TimelineLite({
                paused: !0
            }),
            GE.mobileLogoTimeline.insert(TweenLite.to($("#overlay"), 1, {
                css: {
                    opacity: .8
                },
                ease: Cubic.easeOut,
                onComplete: function() {}
            }), .3).insert(TweenLite.to($("#logo-big h1"), .5, {
                css: {
                    marginTop: 0,
                    opacity: 1
                },
                ease: Cubic.easeOut,
                onComplete: function() {}
            }), .3).insert(TweenLite.to($("#logo-big p"), .5, {
                css: {
                    marginTop: 0,
                    opacity: 1
                },
                ease: Cubic.easeOut,
                onComplete: function() {}
            }), .6).insert(TweenLite.to($("#logo-big img"), .5, {
                css: {
                    marginTop: 35,
                    opacity: 1
                },
                ease: Cubic.easeOut,
                onComplete: function() {}
            }), .9).insert(TweenLite.to($("#logo-big #loader-message"), .5, {
                css: {
                    marginTop: 30,
                    opacity: 1
                },
                ease: Cubic.easeOut,
                onComplete: function() {
                    TweenLite.to($("#loader-message .loading-bar"), 6, {
                        css: {
                            width: "100%"
                        },
                        ease: Cubic.easeOut,
                        onComplete: function() {}
                    }),
                    0
                }
            }), 1.1),
            setTimeout(function() {
                GE.mobileLogoTimeline.play(),
                setTimeout(function() {
                    $("#continue-exp").fadeIn()
                }
                , 1e3)
            }
            , 3e3),
            $(".loader").hide()))
        }
        /webOS|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent.toLowerCase()) && $(window).width() < 768 && (CONFIG.isMobile = !0,
        $("body").addClass("mobile"),
        console.log("in mobile")),
        /iPad|Android/i.test(navigator.userAgent.toLowerCase()) && (CONFIG.isTablet = !0,
        $("body").addClass("tablet"),
        console.log("in tablet")),
        /trident/i.test(navigator.userAgent.toString().toLowerCase()) && (CONFIG.isIE = !0,
        $("#close-video").css({
            top: "30px",
            right: "30px"
        }));
        var b = window.addEventListener ? "addEventListener" : "attachEvent"
          , c = window[b]
          , d = "attachEvent" == b ? "onmessage" : "message";
        c(d, function(a) {
            (CONFIG.isTablet || CONFIG.isMobile) && (console.log("im in tablet?"),
            console.log(a.origin),
            "http://www.ge.com" == a.origin && (console.log("the event.origin is ", a.origin),
            GE.iframeFlag = !0)),
            GE.eS = a
        }
        , !1),
        GE.iframeFlag = window.location !== window.parent.location ? !0 : !1,
        a(),
        this.resize(),
        GE.logoTimeline = new TimelineLite({
            paused: !0
        }),
        GE.logoTimeline.insert(TweenLite.to($("#overlay"), 1, {
            css: {
                opacity: .8
            },
            ease: Cubic.easeOut,
            onComplete: function() {}
        }), .3).insert(TweenLite.to($("#logo-big h1"), .5, {
            css: {
                marginTop: 0,
                opacity: 1
            },
            ease: Cubic.easeOut,
            onComplete: function() {}
        }), .3).insert(TweenLite.to($("#logo-big p"), .5, {
            css: {
                marginTop: 0,
                opacity: 1
            },
            ease: Cubic.easeOut,
            onComplete: function() {}
        }), .6).insert(TweenLite.to($("#logo-big img"), .5, {
            css: {
                marginTop: 35,
                opacity: 1
            },
            ease: Cubic.easeOut,
            onComplete: function() {}
        }), .9).insert(TweenLite.to($("#logo-big #loader-message"), .5, {
            css: {
                marginTop: 30,
                opacity: 1
            },
            ease: Cubic.easeOut,
            onComplete: function() {
                TweenLite.to($("#loader-message .loading-bar"), 6, {
                    css: {
                        width: "100%"
                    },
                    ease: Cubic.easeOut,
                    onComplete: function() {}
                }),
                0
            }
        }), 1.1),
        GE.logoTimelineReverse = new TimelineLite({
            paused: !0
        }),
        GE.logoTimelineReverse.insert(TweenLite.to($("#logo-big h1"), .5, {
            css: {
                marginTop: -20,
                opacity: 0
            },
            ease: Cubic.easeOut,
            onComplete: function() {}
        }), 0).insert(TweenLite.to($("#logo-big p"), .5, {
            css: {
                marginTop: -20,
                opacity: 0
            },
            ease: Cubic.easeOut,
            onComplete: function() {}
        }), .1).insert(TweenLite.to($("#logo-big img"), .5, {
            css: {
                marginTop: 20,
                opacity: 0
            },
            ease: Cubic.easeOut,
            onComplete: function() {
                $("#logo-big").hide(),
                $("#overlay").fadeOut(1e3)
            }
        }), .2).insert(TweenLite.to($("#logo-big #loader-message"), .3, {
            css: {
                marginTop: 20,
                opacity: 0
            },
            ease: Cubic.easeOut,
            onComplete: function() {}
        }), .2),
        TweenLite.set($(".business"), {
            css: {
                width: CONFIG.currentW / 3 + 1
            }
        }),
        GE.resizeTiles(),
        TweenLite.set($(".business").eq(0).find(".business-inner"), {
            css: {
                rotationX: -120,
                transformOrigin: "0 0"
            }
        }),
        TweenLite.set($(".business").eq(1).find(".business-inner"), {
            css: {
                rotationX: -120,
                transformOrigin: "0 100%"
            }
        }),
        TweenLite.set($(".business").eq(2).find(".business-inner"), {
            css: {
                rotationY: -120,
                transformOrigin: "100% 100%"
            }
        }),
        TweenLite.set($(".business").eq(3).find(".business-inner"), {
            css: {
                rotationY: 120,
                transformOrigin: "0 0%"
            }
        }),
        TweenLite.set($(".business").eq(4).find(".business-inner"), {
            css: {
                rotationX: 120,
                transformOrigin: "0 100%"
            }
        }),
        TweenLite.set($(".business").eq(5).find(".business-inner"), {
            css: {
                rotationX: -120,
                transformOrigin: "0 0%"
            }
        }),
        TweenLite.set($(".business").eq(6).find(".business-inner"), {
            css: {
                rotationX: -120,
                transformOrigin: "0 0%"
            }
        }),
        TweenLite.set($(".business").eq(7).find(".business-inner"), {
            css: {
                rotationY: -122,
                transformOrigin: "100% 0%"
            }
        }),
        TweenLite.set($(".business").eq(8).find(".business-inner"), {
            css: {
                rotationX: 120,
                transformOrigin: "0 100%"
            }
        }),
        $(".business").show(),
        $(".business").eq(4).hide(),
        $(".business").eq(5).hide(),
        $(".business").eq(6).hide(),
        $(".business").eq(7).hide();
        var e = "data/businesses.json";
        $.getJSON(e, function(a) {
            GE.cities = a
        }
        ),
        CONFIG.isTablet || CONFIG.isMobile || setTimeout(function() {}
        , 8500),
        GE.loadingTimeline = new TimelineLite({
            paused: !0
        }),
        GE.loadingTimeline.insert(TweenLite.to($(".business").eq(0).find(".business-inner"), .8, {
            css: {
                rotationX: 0,
                transformOrigin: "0 0%"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {
                $(".business").eq(7).show(),
                $(".business").eq(5).show()
            }
        }), .3).insert(TweenLite.to($(".business").eq(2).find(".business-inner"), .8, {
            css: {
                rotationY: 0,
                transformOrigin: "100% 0"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {}
        }), .4).insert(TweenLite.to($(".business").eq(1).find(".business-inner"), .8, {
            css: {
                rotationX: 0,
                transformOrigin: "0 0"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {}
        }), .5).insert(TweenLite.to($(".business").eq(3).find(".business-inner"), .8, {
            css: {
                rotationY: 0,
                transformOrigin: "0% 0"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {
                $(".business").eq(4).show(),
                $(".business").eq(6).show()
            }
        }), .6).insert(TweenLite.to($(".business").eq(7).find(".business-inner"), .8, {
            css: {
                rotationY: 0,
                transformOrigin: "100% 0%"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {}
        }), .7).insert(TweenLite.to($(".business").eq(8).find(".business-inner"), .8, {
            css: {
                rotationX: 0,
                transformOrigin: "0% 100%"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {}
        }), .8).insert(TweenLite.to($(".business").eq(5).find(".business-inner"), .8, {
            css: {
                rotationX: 0,
                transformOrigin: "0% 0"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {}
        }), .9).insert(TweenLite.to($(".business").eq(6).find(".business-inner"), .8, {
            css: {
                rotationX: 0,
                transformOrigin: "0 0"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {}
        }), 1).insert(TweenLite.to($(".business").eq(4).find(".business-inner"), .8, {
            css: {
                rotationX: 0,
                transformOrigin: "0% 100%"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {
                GE.businessContDisplay("#lighting"),
                CONFIG.isMobile === !1 && GE.logoTimeline.play(),
                waitTime = 1 == GE.devCheck ? 1e3 : 7e3,
                CONFIG.isMobileIframe === !1 && setTimeout(function() {
                    GE.logoTimelineReverse.play()
                }
                , waitTime)
            }
        }), 1.1),
        setTimeout(function() {
            GE.loadingTimeline.play()
        }
        , 1e3),
        $(".business").bind("click", function() {
            if ("power-gas" != $(this).attr("id")) {
                var a = $(this).attr("data-story");
                CONFIG.isMobile || CONFIG.isTablet || GE.foldTiles(a)
            }
        }
        ),
        $("#power-side-left").bind("click", function() {
            CONFIG.isMobile || CONFIG.isTablet || GE.foldTiles("supermaterials")
        }
        ),
        $("#power-side-right").bind("click", function() {
            CONFIG.isMobile || CONFIG.isTablet || GE.foldTiles("diesel")
        }
        ),
        $("#mixit-btn").bind("click", function() {
            null  != GE.selectedStory && GE.foldTiles(GE.selectedStory)
        }
        ),
        $(".business").hover(function() {
            if (null  == GE.selectedStory && TweenLite.to($("#mixit-btn button"), .5, {
                css: {
                    opacity: 1
                },
                ease: Cubic.easeOut,
                onComplete: function() {}
            }),
            "power-gas" != $(this).attr("id") && 0 == GE.storyOpened) {
                "transportation" == $(this).attr("id") && ($("#power-gas").find(".business-content").addClass("active"),
                $("#supermat-title").addClass("inactive"),
                $("#diesel-title").removeClass("inactive")),
                ("aviation" == $(this).attr("id") || "global-res" == $(this).attr("id")) && ($("#power-gas").find(".business-content").addClass("active"),
                $("#supermat-title").removeClass("inactive"),
                $("#diesel-title").addClass("inactive"));
                var a = $(this).attr("data-story");
                $('*[data-story="' + a + '"]').each(function() {
                    $(this).find(".business-content").addClass("active"),
                    CONFIG.isMobile === !0 && ($(".business-inner h2").css({
                        marginTop: 30,
                        opacity: 1
                    }),
                    $(".business-inner h2").css({
                        marginTop: 30,
                        opacity: 1
                    }),
                    $(".business .multiline-conn").css({
                        marginTop: 30,
                        opacity: 1
                    }),
                    $(".business .multiline-conn-dist").css({
                        marginTop: 30,
                        opacity: 1
                    }),
                    $(".business-inner p").css({
                        marginTop: 30,
                        opacity: 1
                    }),
                    $(".business-inner .conn-icon").css({
                        marginTop: 30,
                        opacity: 1
                    }))
                }
                ),
                GE.selectedStory = a
            }
            GE.hoverStory = $(this).attr("data-story"),
            (CONFIG.isMobile === !1 || CONFIG.isTablet === !1) && GE.animateBusinessContent()
        }
        , function() {
            $(".business-content").removeClass("active"),
            $('*[data-story="' + GE.hoverStory + '"]').each(function() {
                $(".business-inner h2").css({
                    marginTop: 30,
                    opacity: 0
                }),
                $(".business .multiline-conn").css({
                    marginTop: 30,
                    opacity: 0
                }),
                $(".business .multiline-conn-dist").css({
                    marginTop: 30,
                    opacity: 0
                }),
                $(".business-inner p").css({
                    marginTop: 30,
                    opacity: 0
                }),
                $(".business-inner .conn-icon").css({
                    marginTop: 40,
                    opacity: 0
                })
            }
            )
        }
        ),
        $("#power-side-left").hover(function() {
            null  == GE.selectedStory && TweenLite.to($("#mixit-btn button"), .5, {
                css: {
                    opacity: 1
                },
                ease: Cubic.easeOut,
                onComplete: function() {}
            }),
            0 == GE.storyOpened && ($('*[data-story="supermaterials"]').each(function() {
                $(this).find(".business-content").addClass("active"),
                CONFIG.isMobile === !0 && ($(".business-inner h2").css({
                    marginTop: 30,
                    opacity: 1
                }),
                $(".business .multiline-conn").css({
                    marginTop: 30,
                    opacity: 1
                }),
                $(".business .multiline-conn-dist").css({
                    marginTop: 30,
                    opacity: 1
                }),
                $(".business-inner p").css({
                    marginTop: 30,
                    opacity: 1
                }),
                $(".business-inner .conn-icon").css({
                    marginTop: 30,
                    opacity: 1
                }))
            }
            ),
            $("#power-gas").find(".business-content").addClass("active"),
            $("#supermat-title").removeClass("inactive"),
            $("#diesel-title").addClass("inactive"),
            GE.selectedStory = "supermaterials",
            GE.hoverStory = "supermaterials",
            (CONFIG.isMobile === !1 || CONFIG.isTablet === !1) && GE.animateBusinessContent())
        }
        , function() {
            $(".business-content").removeClass("active"),
            $('*[data-story="' + GE.hoverStory + '"]').each(function() {
                $(".business-inner h2").css({
                    marginTop: 30,
                    opacity: 0
                }),
                $(".business .multiline-conn").css({
                    marginTop: 30,
                    opacity: 0
                }),
                $(".business .multiline-conn-dist").css({
                    marginTop: 30,
                    opacity: 0
                }),
                $(".business-inner p").css({
                    marginTop: 30,
                    opacity: 0
                }),
                $(".business-inner .conn-icon").css({
                    marginTop: 40,
                    opacity: 0
                })
            }
            )
        }
        ),
        $("#power-side-right").hover(function() {
            null  == GE.selectedStory && TweenLite.to($("#mixit-btn button"), .5, {
                css: {
                    opacity: 1
                },
                ease: Cubic.easeOut,
                onComplete: function() {}
            }),
            0 == GE.storyOpened && ($('*[data-story="diesel"]').each(function() {
                $(this).find(".business-content").addClass("active"),
                CONFIG.isMobile === !0 && ($(".business-inner h2").css({
                    marginTop: 30,
                    opacity: 1
                }),
                $(".business .multiline-conn").css({
                    marginTop: 30,
                    opacity: 1
                }),
                $(".business .multiline-conn-dist").css({
                    marginTop: 30,
                    opacity: 1
                }),
                $(".business-inner p").css({
                    marginTop: 30,
                    opacity: 1
                }),
                $(".business-inner .conn-icon").css({
                    marginTop: 30,
                    opacity: 1
                }))
            }
            ),
            $("#power-gas").find(".business-content").addClass("active"),
            $("#supermat-title").addClass("inactive"),
            $("#diesel-title").removeClass("inactive"),
            GE.selectedStory = "diesel",
            GE.hoverStory = "diesel",
            (CONFIG.isMobile === !1 || CONFIG.isTablet === !1) && GE.animateBusinessContent())
        }
        , function() {
            $(".business-content").removeClass("active"),
            $('*[data-story="' + GE.hoverStory + '"]').each(function() {
                $(".business-inner h2").css({
                    marginTop: 30,
                    opacity: 0
                }),
                $(".business .multiline-conn").css({
                    marginTop: 30,
                    opacity: 0
                }),
                $(".business .multiline-conn-dist").css({
                    marginTop: 30,
                    opacity: 0
                }),
                $(".business-inner p").css({
                    marginTop: 30,
                    opacity: 0
                }),
                $(".business-inner .conn-icon").css({
                    marginTop: 40,
                    opacity: 0
                })
            }
            )
        }
        ),
        $("#close").bind("click", function(a) {
            a.preventDefault(),
            TweenLite.set($("#cinemagraph-cont .back h3"), {
                css: {
                    opacity: 0
                }
            }),
            GE.backToHome()
        }
        ),
        $(".back h3").bind("click", function() {
            $("html, body").animate({
                scrollTop: $("#story-ticker").offset().top
            }, 1e3)
        }
        ),
        $("#overlay-video, #close-video").bind("click", function(a) {
            a.preventDefault(),
            GE.closeVideoIntro(),
            $("#overlay-video").fadeOut()
        }
        ),
        GE.deepDive.init(),
        CONFIG.isMobile ? GE.preloadHeroesImgSeq() : GE.preloadPoster(),
        CONFIG.isIE && GE.blackandwhiteIE()
    },
    animateBusinessContent: function() {
        ("supermaterials" === GE.hoverStory || "diesel" === GE.hoverStory) && (currentHoverStory = $("#power-gas"),
        TweenLite.to(currentHoverStory.find(".business-inner h2"), .4, {
            css: {
                marginTop: 20,
                opacity: 1
            },
            ease: Cubic.easeOut,
            delay: .2,
            onComplete: function() {}
        }),
        TweenLite.to(currentHoverStory.find(".business .multiline-conn"), .4, {
            css: {
                marginTop: 20,
                opacity: 1
            },
            ease: Cubic.easeOut,
            delay: .2,
            onComplete: function() {}
        }),
        TweenLite.to(currentHoverStory.find(".business .multiline-conn-dist"), .4, {
            css: {
                marginTop: 20,
                opacity: 1
            },
            ease: Cubic.easeOut,
            delay: .2,
            onComplete: function() {}
        }),
        TweenLite.to(currentHoverStory.find(".business-inner p"), .4, {
            css: {
                marginTop: 10,
                opacity: 1
            },
            ease: Cubic.easeOut,
            delay: .3,
            onComplete: function() {}
        }),
        TweenLite.to(currentHoverStory.find(".business-inner .conn-icon"), .4, {
            css: {
                marginTop: 30,
                opacity: 1
            },
            ease: Cubic.easeOut,
            delay: .4,
            onComplete: function() {}
        })),
        $('*[data-story="' + GE.hoverStory + '"]').each(function() {
            TweenLite.to($(this).find(".business-inner h2"), .4, {
                css: {
                    marginTop: 20,
                    opacity: 1
                },
                ease: Cubic.easeOut,
                delay: .2,
                onComplete: function() {}
            }),
            TweenLite.to($(this).find(".business .multiline-conn"), .4, {
                css: {
                    marginTop: 20,
                    opacity: 1
                },
                ease: Cubic.easeOut,
                delay: .2,
                onComplete: function() {}
            }),
            TweenLite.to($(this).find(".business .multiline-conn-dist"), .4, {
                css: {
                    marginTop: 20,
                    opacity: 1
                },
                ease: Cubic.easeOut,
                delay: .2,
                onComplete: function() {}
            }),
            TweenLite.to($(this).find(".business-inner p"), .4, {
                css: {
                    marginTop: 10,
                    opacity: 1
                },
                ease: Cubic.easeOut,
                delay: .3,
                onComplete: function() {}
            }),
            TweenLite.to($(this).find(".business-inner .conn-icon"), .4, {
                css: {
                    marginTop: 30,
                    opacity: 1
                },
                ease: Cubic.easeOut,
                delay: .4,
                onComplete: function() {}
            })
        }
        )
    },
    foldTiles: function(a) {
        switch (TweenLite.set($("#cinemagraph-cont").eq(0), {
            css: {
                left: CONFIG.currentW / 3,
                top: CONFIG.currentH / 3,
                width: "33.33333%",
                height: CONFIG.currentH / 3
            }
        }),
        TweenLite.set($("#cinemagraph-cont .back").eq(0), {
            css: {
                height: CONFIG.currentH / 3
            }
        }),
        GE.foldingTimeline = new TimelineLite({
            paused: !0
        }),
        $("#mixit-btn").fadeOut("slow"),
        a) {
        case "diesel":
            GE.foldingTimeline.insert(TweenLite.to($(".business").eq(3).find(".business-inner"), .8, {
                css: {
                    rotationX: -120,
                    transformOrigin: "0 0"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {
                    $(".business").eq(3).hide()
                }
            }), 0).insert(TweenLite.to($(".business").eq(2).find(".business-inner"), .8, {
                css: {
                    rotationY: -120,
                    transformOrigin: "100% 0"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), .2).insert(TweenLite.to($(".business").eq(0).find(".business-inner"), .8, {
                css: {
                    rotationY: 120,
                    transformOrigin: "0 0"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), .6).insert(TweenLite.to($(".business").eq(4).find(".business-inner"), .8, {
                css: {
                    rotationY: -120,
                    transformOrigin: "100% 0"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {
                    $(".business").eq(4).hide()
                }
            }), .6).insert(TweenLite.to($(".business").eq(1).find(".business-inner"), .8, {
                css: {
                    rotationX: -120,
                    transformOrigin: "0 0%"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), .4).insert(TweenLite.to($(".business").eq(6).find(".business-inner"), .8, {
                css: {
                    rotationX: 120,
                    transformOrigin: "0 100%"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), .8).insert(TweenLite.to($(".business").eq(5).find(".business-inner"), .8, {
                css: {
                    rotationX: 120,
                    transformOrigin: "0% 100%"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {
                    $(".business").eq(5).hide()
                }
            }), 1.2).insert(TweenLite.to($(".business").eq(7), .8, {
                css: {
                    left: CONFIG.currentW / 3,
                    top: CONFIG.currentH / 3
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), 2.5).insert(TweenLite.to($(".business").eq(8), .8, {
                css: {
                    left: CONFIG.currentW / 3,
                    top: CONFIG.currentH / 3
                },
                ease: Cubic.easeInOut,
                onComplete: function() {
                    $("#cinemagraph-cont").show(),
                    GE.startVideo("diesel"),
                    $(".business").eq(7).clone().css({
                        top: 0,
                        left: 0,
                        width: "100%"
                    }).appendTo("#cinemagraph-cont .front"),
                    $(".business").eq(8).clone().css({
                        top: 0,
                        left: 0,
                        width: "100%"
                    }).appendTo("#cinemagraph-cont .front"),
                    $(".business").eq(7).hide(),
                    $(".business").eq(8).hide()
                }
            }), 2.5).insert(TweenLite.to($("#cinemagraph-cont .flipper").eq(0), .3, {
                css: {
                    transformOrigin: "50% 50%",
                    perspective: 1025,
                    rotationY: 180
                },
                ease: Linear.easeNone,
                onComplete: function() {
                    CONFIG.isIE && ($("#cinemagraph-cont .front").empty(),
                    $("#container #cinemagraph-cont .back").css({
                        transform: "rotateY(0deg)"
                    }),
                    $("#container #cinemagraph-cont .flipper").css({
                        transform: "rotateY(0deg)"
                    }))
                }
            }), 3.5).insert(TweenLite.to($("#cinemagraph-cont .back"), .8, {
                css: {
                    height: 9 * CONFIG.currentW / 16
                },
                ease: Power4.easeInOut,
                onComplete: function() {}
            }), 4.5).insert(TweenLite.to($("#cinemagraph-cont"), .8, {
                css: {
                    top: 0,
                    left: 0,
                    width: CONFIG.currentW,
                    height: CONFIG.currentH
                },
                ease: Power4.easeInOut,
                onComplete: function() {
                    GE.storyOpened = !0,
                    $("#cinemagraph-cont .front").empty(),
                    $("#overlay-cine").hide(),
                    $("#close").fadeIn(200)
                }
            }), 4.5);
            break;
        case "industrial":
            GE.foldingTimeline.insert(TweenLite.to($(".business").eq(5).find(".business-inner"), .8, {
                css: {
                    rotationX: -120,
                    transformOrigin: "0 0%"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {
                    $(".business").eq(5).hide()
                }
            }), 0).insert(TweenLite.to($(".business").eq(7).find(".business-inner"), .8, {
                css: {
                    rotationY: 120,
                    transformOrigin: "0 0"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {
                    $(".business").eq(7).hide()
                }
            }), .2).insert(TweenLite.to($(".business").eq(3).find(".business-inner"), .8, {
                css: {
                    rotationY: 120,
                    transformOrigin: "0 0"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), .4).insert(TweenLite.to($(".business").eq(8).find(".business-inner"), .8, {
                css: {
                    rotationY: -120,
                    transformOrigin: "100% 0%"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), .6).insert(TweenLite.to($(".business").eq(1).find(".business-inner"), .8, {
                css: {
                    rotationX: -120,
                    transformOrigin: "0 0"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), .8).insert(TweenLite.to($(".business").eq(6).find(".business-inner"), .8, {
                css: {
                    rotationX: 120,
                    transformOrigin: "0 100%"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), 1).insert(TweenLite.to($(".business").eq(0), .8, {
                css: {
                    left: CONFIG.currentW / 3,
                    top: CONFIG.currentH / 3
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), 2.5).insert(TweenLite.to($(".business").eq(2), .8, {
                css: {
                    left: CONFIG.currentW / 3,
                    top: CONFIG.currentH / 3
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), 2.5).insert(TweenLite.to($(".business").eq(4), .8, {
                css: {
                    left: CONFIG.currentW / 3,
                    top: CONFIG.currentH / 3
                },
                ease: Cubic.easeInOut,
                onComplete: function() {
                    $("#cinemagraph-cont").show(),
                    GE.startVideo("industrial"),
                    $(".business").eq(0).clone().css({
                        top: 0,
                        left: 0,
                        width: "100%"
                    }).appendTo("#cinemagraph-cont .front"),
                    $(".business").eq(2).clone().css({
                        top: 0,
                        left: 0,
                        width: "100%"
                    }).appendTo("#cinemagraph-cont .front"),
                    $(".business").eq(4).clone().css({
                        top: 0,
                        left: 0,
                        width: "100%"
                    }).appendTo("#cinemagraph-cont .front"),
                    $(".business").eq(0).hide(),
                    $(".business").eq(2).hide(),
                    $(".business").eq(4).hide()
                }
            }), 2.5).insert(TweenLite.to($("#cinemagraph-cont .flipper").eq(0), .3, {
                css: {
                    perspective: 1025,
                    rotationY: 180
                },
                ease: Linear.easeNone,
                onComplete: function() {
                    CONFIG.isIE && ($("#cinemagraph-cont .front").empty(),
                    $("#container #cinemagraph-cont .back").css({
                        transform: "rotateY(0deg)"
                    }),
                    $("#container #cinemagraph-cont .flipper").css({
                        transform: "rotateY(0deg)"
                    }))
                }
            }), 3.5).insert(TweenLite.to($("#cinemagraph-cont .back"), .8, {
                css: {
                    height: 9 * CONFIG.currentW / 16
                },
                ease: Power4.easeInOut,
                onComplete: function() {}
            }), 4.5).insert(TweenLite.to($("#cinemagraph-cont"), .8, {
                css: {
                    top: 0,
                    left: 0,
                    width: CONFIG.currentW,
                    height: CONFIG.currentH
                },
                ease: Power4.easeInOut,
                onComplete: function() {
                    GE.storyOpened = !0,
                    $("#cinemagraph-cont .front").empty(),
                    $("#overlay-cine").hide(),
                    $("#close").fadeIn(200)
                }
            }), 4.5);
            break;
        case "imaging":
            GE.foldingTimeline.insert(TweenLite.to($(".business").eq(0).find(".business-inner"), .8, {
                css: {
                    rotationX: 120,
                    transformOrigin: "0 100%"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), 0).insert(TweenLite.to($(".business").eq(6).find(".business-inner"), .8, {
                css: {
                    rotationX: -120,
                    transformOrigin: "0 0"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {
                    $(".business").eq(6).hide()
                }
            }), .2).insert(TweenLite.to($(".business").eq(2).find(".business-inner"), .8, {
                css: {
                    rotationY: 120,
                    transformOrigin: "0 0"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {
                    $(".business").eq(2).hide()
                }
            }), .4).insert(TweenLite.to($(".business").eq(4).find(".business-inner"), .8, {
                css: {
                    rotationY: -120,
                    transformOrigin: "100% 0"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {
                    $(".business").eq(4).hide()
                }
            }), .6).insert(TweenLite.to($(".business").eq(1).find(".business-inner"), .8, {
                css: {
                    rotationX: -120,
                    transformOrigin: "0 0"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), .8).insert(TweenLite.to($(".business").eq(7).find(".business-inner"), .8, {
                css: {
                    rotationX: 120,
                    transformOrigin: "0 100%"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), 1).insert(TweenLite.to($(".business").eq(8).find(".business-inner"), .8, {
                css: {
                    rotationY: -120,
                    transformOrigin: "100% 0"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), 1.2).insert(TweenLite.to($(".business").eq(3), .8, {
                css: {
                    left: CONFIG.currentW / 3
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), 2.5).insert(TweenLite.to($(".business").eq(5), .8, {
                css: {
                    left: CONFIG.currentW / 3
                },
                ease: Cubic.easeInOut,
                onComplete: function() {
                    $("#cinemagraph-cont").show(),
                    GE.startVideo("imaging"),
                    $(".business").eq(3).clone().css({
                        top: 0,
                        left: 0,
                        width: "100%"
                    }).appendTo("#cinemagraph-cont .front"),
                    $(".business").eq(5).clone().css({
                        top: 0,
                        left: 0,
                        width: "100%"
                    }).appendTo("#cinemagraph-cont .front"),
                    $(".business").eq(3).hide(),
                    $(".business").eq(5).hide()
                }
            }), 2.5).insert(TweenLite.to($("#cinemagraph-cont .flipper").eq(0), .3, {
                css: {
                    perspective: 1025,
                    rotationY: 180
                },
                ease: Linear.easeNone,
                onComplete: function() {
                    CONFIG.isIE && ($("#cinemagraph-cont .front").empty(),
                    $("#container #cinemagraph-cont .back").css({
                        transform: "rotateY(0deg)"
                    }),
                    $("#container #cinemagraph-cont .flipper").css({
                        transform: "rotateY(0deg)"
                    }))
                }
            }), 3.5).insert(TweenLite.to($("#cinemagraph-cont .back"), .8, {
                css: {
                    height: 9 * CONFIG.currentW / 16
                },
                ease: Power4.easeInOut,
                onComplete: function() {}
            }), 4.5).insert(TweenLite.to($("#cinemagraph-cont"), .8, {
                css: {
                    top: 0,
                    left: 0,
                    width: CONFIG.currentW,
                    height: CONFIG.currentH
                },
                ease: Power4.easeInOut,
                onComplete: function() {
                    GE.storyOpened = !0,
                    $("#cinemagraph-cont .front").empty(),
                    $("#overlay-cine").hide(),
                    $("#close").fadeIn(200)
                }
            }), 4.5);
            break;
        case "supermaterials":
            GE.foldingTimeline.insert(TweenLite.to($(".business").eq(0).find(".business-inner"), .8, {
                css: {
                    rotationX: 120,
                    transformOrigin: "0 100%"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), 0).insert(TweenLite.to($(".business").eq(5).find(".business-inner"), .8, {
                css: {
                    rotationX: 120,
                    transformOrigin: "0 100%"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {
                    $(".business").eq(5).hide()
                }
            }), .4).insert(TweenLite.to($(".business").eq(4).find(".business-inner"), .8, {
                css: {
                    rotationX: -120,
                    transformOrigin: "0 0"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {
                    $(".business").eq(4).hide()
                }
            }), .6).insert(TweenLite.to($(".business").eq(3).find(".business-inner"), .8, {
                css: {
                    rotationY: 120,
                    transformOrigin: "0 0"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), .8).insert(TweenLite.to($(".business").eq(7).find(".business-inner"), .8, {
                css: {
                    rotationX: 120,
                    transformOrigin: "0 100%"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), 1).insert(TweenLite.to($(".business").eq(2).find(".business-inner"), .8, {
                css: {
                    rotationY: -120,
                    transformOrigin: "100% 0"
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), 1.2).insert(TweenLite.to($(".business").eq(1), .8, {
                css: {
                    left: CONFIG.currentW / 3,
                    top: CONFIG.currentH / 3
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), 2.5).insert(TweenLite.to($(".business").eq(6), .8, {
                css: {
                    left: CONFIG.currentW / 3,
                    top: CONFIG.currentH / 3
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }), 2.5).insert(TweenLite.to($(".business").eq(8), .8, {
                css: {
                    left: CONFIG.currentW / 3,
                    top: CONFIG.currentH / 3
                },
                ease: Cubic.easeInOut,
                onComplete: function() {
                    $("#cinemagraph-cont").show(),
                    GE.startVideo("supermaterials"),
                    $(".business").eq(1).clone().css({
                        top: 0,
                        left: 0,
                        width: "100%"
                    }).appendTo("#cinemagraph-cont .front"),
                    $(".business").eq(6).clone().css({
                        top: 0,
                        left: 0,
                        width: "100%"
                    }).appendTo("#cinemagraph-cont .front"),
                    $(".business").eq(8).clone().css({
                        top: 0,
                        left: 0,
                        width: "100%"
                    }).appendTo("#cinemagraph-cont .front"),
                    $(".business").eq(1).hide(),
                    $(".business").eq(6).hide(),
                    $(".business").eq(8).hide()
                }
            }), 2.5).insert(TweenLite.to($("#cinemagraph-cont .flipper").eq(0), .3, {
                css: {
                    perspective: 1025,
                    rotationY: 180
                },
                ease: Linear.easeNone,
                onComplete: function() {
                    CONFIG.isIE && ($("#cinemagraph-cont .front").empty(),
                    $("#container #cinemagraph-cont .back").css({
                        transform: "rotateY(0deg)"
                    }),
                    $("#container #cinemagraph-cont .flipper").css({
                        transform: "rotateY(0deg)"
                    }))
                }
            }), 3.5).insert(TweenLite.to($("#cinemagraph-cont .back"), .8, {
                css: {
                    height: 9 * CONFIG.currentW / 16
                },
                ease: Power4.easeInOut,
                onComplete: function() {}
            }), 4.5).insert(TweenLite.to($("#cinemagraph-cont"), .8, {
                css: {
                    top: 0,
                    left: 0,
                    width: CONFIG.currentW,
                    height: CONFIG.currentH
                },
                ease: Power4.easeInOut,
                onComplete: function() {
                    GE.storyOpened = !0,
                    $("#cinemagraph-cont .front").empty(),
                    $("#overlay-cine").hide(),
                    $("#close").fadeIn(200)
                }
            }), 4.5)
        }
        $('*[data-story="' + a + '"]').each(function() {
            var a = $(this).find(".videocontent")
              , b = $(this).attr("id");
            CONFIG.isIE ? $("#" + b + " .videocontent").css({
                "background-image": "url(img/businesses/" + b + ".jpg)"
            }) : TweenLite.to(a, .5, {
                css: {
                    "-webkit-filter": "grayscale(0%)",
                    filter: "grayscale(0%)",
                    opacity: .7
                },
                ease: Cubic.easeOut,
                onComplete: function() {}
            })
        }
        ),
        ("diesel" == a || "supermaterials" == a) && (CONFIG.isIE ? $("#power-gas .videocontent").css({
            "background-image": "url(img/businesses/power-gas.jpg)"
        }) : TweenLite.to($("#power-gas .videocontent"), .5, {
            css: {
                "-webkit-filter": "grayscale(0%)",
                filter: "grayscale(0%)",
                opacity: .7
            },
            ease: Cubic.easeOut,
            onComplete: function() {}
        })),
        $(".business-content").removeClass("active"),
        $("#overlay-cine").show(),
        GE.foldingTimeline.play(),
        setTimeout(function() {
            $(".story-content").show()
        }
        , 9e3),
        setTimeout(function() {
            var a = $("video").height();
            $("#cinemagraph-cont .back").height(a),
            1 != CONFIG.isMobile && TweenLite.to($("#cinemagraph-cont .back h3"), .5, {
                css: {
                    bottom: 30,
                    opacity: 1
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            })
        }
        , 5e3);
        var b = $(this).attr("data-order");
        GE.deepDive.displayBusiness(a, !1);
        var c = $(this).index();
        GE.animSwitch(c, b, a)
    },
    startVideo: function(a) {
        CONFIG.isMobile ? ($(".videocontent-back").empty(),
        $(".videocontent-back").append("<div style='background: url(video/img/gif/" + a + ".gif) center center; background-size: cover' class='image-still'></div>"),
        TweenLite.set($("#cinemagraph-cont .back h3"), {
            css: {
                opacity: 1
            }
        })) : ($("#cinemagraph-video_html5_api").eq(0).attr("poster", "video/img/" + a + ".jpg"),
        $(".videocontent-back .vjs-poster").css("background-image", "url(video/img/" + a + ".jpg)").show(),
        $("#cinemagraph-video_html5_api").eq(0).attr("src", "video/" + a + ".mp4"),
        _V_("cinemagraph-video").src([{
            type: "video/mp4",
            src: "video/" + a + ".mp4"
        }, {
            type: "video/webm",
            src: "video/" + a + ".webm"
        }, {
            type: "video/ogg",
            src: "video/" + a + ".ogv"
        }]),
        $("#cinemagraph-video").find("source").eq(0).attr("src", "video/" + a + ".mp4"),
        $("#cinemagraph-video").find("source").eq(1).attr("src", "video/" + a + ".webm"),
        $("#cinemagraph-video").find("source").eq(2).attr("src", "video/" + a + ".ogv"),
        videojs(document.getElementById("cinemagraph-video"), {}, function() {
            _V_("cinemagraph-video").load(),
            _V_("cinemagraph-video").play()
        }
        ),
        _V_("cinemagraph-video").ready(function() {
            function a() {
                $(this).width(),
                $(this).height(),
                $("#cinemagraph-cont .back").width(),
                $("#cinemagraph-cont .back").height()
            }
            a(),
            window.onresize = a
        }
        ))
    },
    preloadHeroesImgSeq: function() {
        var a = []
          , b = "video/img/gif/diesel.gif";
        a.push(b);
        var c = "video/img/gif/imaging.gif";
        a.push(c);
        var d = "video/img/gif/industrial.gif";
        a.push(d);
        var e = "video/img/gif/supermaterials.gif";
        a.push(e);
        for (var f = [], g = 0; g < a.length; g++)
            !function(a, b) {
                var c = new Image;
                c.onload = function() {
                    b.resolve()
                }
                ,
                c.src = a
            }
            (a[g], f[g] = $.Deferred());
        $.when.apply($, f).done(function() {
            console.log("All heroes ready!"),
            setTimeout(function() {}
            , 3e3)
        }
        )
    },
    preloadPoster: function() {
        var a = []
          , b = "video/img/diesel.jpg";
        a.push(b);
        var c = "video/img/imaging.jpg";
        a.push(c);
        var d = "video/img/industrial.jpg";
        a.push(d);
        var e = "video/img/supermaterials.jpg";
        a.push(e);
        for (var f = [], g = 0; g < a.length; g++)
            !function(a, b) {
                var c = new Image;
                c.onload = function() {
                    b.resolve()
                }
                ,
                c.src = a
            }
            (a[g], f[g] = $.Deferred());
        $.when.apply($, f).done(function() {}
        )
    },
    blackandwhiteIE: function() {
        $.each(GE.businessId, function(a, b) {
            $("#" + b + " .videocontent").css({
                "background-image": "url(img/businesses/IE/" + b + ".jpg)"
            })
        }
        )
    },
    createImageSequences: function() {
        $.each(GE.businessId, function(a, b) {
            $("#" + b).find(".videocontent").empty(),
            $("#" + b).find(".videocontent").append("<div id='seq-" + b + "' class='image-sequence'></div>");
            var c = "seq-" + b
              , d = "imageseq/timelapse/" + b
              , e = b + "00"
              , f = $("#" + b).width() + 100
              , g = f * (9 / 16)
              , h = Sequencer.create({
                id: c,
                width: f,
                height: g,
                from: 10,
                to: 39,
                folder: d,
                baseName: e,
                ext: "jpg"
            });
            setTimeout(function() {
                h.stop(),
                $("#lang").fadeIn()
            }
            , 15e3)
        }
        ),
        console.log("test"),
        CONFIG.isMobile ? (console.log("hide overlay"),
        $("#overlay").hide()) : setTimeout(function() {}
        , 1e4),
        GE.resize()
    },
    animSwitch: function(a, b, c) {
        CONFIG.isMobile ? GE.animStory(a, b, c) : CONFIG.isTablet ? GE.animStory(a, b, c) : GE.animStory(a, b, c)
    },
    businessContDisplay: function(a) {
        startMargin = (CONFIG.isTablet || CONFIG.isMobile,
        0);
        var b = new TimelineLite({
            paused: !0
        });
        b.insert(TweenLite.to($(a + " .business-content h4"), .5, {
            css: {
                marginTop: startMargin,
                opacity: 1
            },
            ease: Cubic.easeOut,
            onComplete: function() {}
        }), 0).insert(TweenLite.to($(a + " .business-content h2"), .5, {
            css: {
                opacity: 1
            },
            ease: Cubic.easeOut,
            onComplete: function() {}
        }), .2).insert(TweenLite.to($(a + " .business-content .conn-icon"), .7, {
            css: {
                opacity: 1
            },
            ease: Cubic.easeOut,
            onComplete: function() {}
        }), .6),
        b.play()
    },
    startTouchVideos: function() {
        $.each(GE.vidStartTime, function(a, b) {
            var c = $(".business").eq(a).find(".video-js").attr("id");
            _gaq.push(["_trackEvent", "Video", "Play", c.toString()]),
            _V_(c).currentTime(b).play().on("ended", function() {
                this.currentTime(0),
                this.play()
            }
            )
        }
        )
    },
    animStory: function(a) {
        var b = (CONFIG.currentH / 3,
        CONFIG.currentH / 3 * 2,
        CONFIG.currentH / 3 * 3,
        new TimelineLite({
            paused: !0
        }));
        (5 == a || 6 == a) && $(".story-wrapper").eq(0).css("top", CONFIG.currentH),
        $(".business").eq(a).css("z-index", 15),
        b.insert(TweenLite.to($("#lighting"), 1, {
            css: {
                opacity: 1
            },
            ease: Cubic.easeInOut,
            onComplete: function() {
                $(".story-wrapper").eq(0).show(),
                TweenLite.to($(".story-wrapper").eq(0), .1, {
                    css: {
                        opacity: 1
                    }
                })
            }
        }), 0).insert(TweenLite.to($(".story-wrapper").eq(0), 1, {
            css: {
                top: 0
            },
            ease: Cubic.easeInOut,
            onComplete: function() {}
        }), 1).insert(TweenLite.to($(".story"), 1, {
            css: {
                transformOrigin: "0 0"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {
                $(".story-content").fadeIn(),
                $("#close").fadeIn(200)
            }
        }), 4).insert(TweenLite.to($(".story-wrapper #story-hero-cont h3"), .5, {
            css: {
                bottom: 50,
                opacity: 1
            },
            ease: Cubic.easeOut,
            onComplete: function() {
                $("#overlay").hide()
            }
        }), 5).insert(TweenLite.to($(".story-wrapper #story-switch h4"), .5, {
            css: {
                marginTop: 0,
                opacity: 1
            },
            ease: Cubic.easeOut,
            onComplete: function() {}
        }), 2.1).insert(TweenLite.to($(".story-wrapper #story-switch h2"), .5, {
            css: {
                marginTop: -64,
                opacity: 1
            },
            ease: Cubic.easeOut,
            onComplete: function() {
                $("#overlay").hide()
            }
        }), 2.3),
        b.play(),
        GE.storyOpened = !0
    },
    animStoryMobile: function(a) {
        $("#overlay-mobile").show(),
        window.scrollTo(0, 0);
        var b = (CONFIG.currentH / 3,
        CONFIG.currentH / 3 * 2,
        CONFIG.currentH / 3 * 3,
        new TimelineLite({
            paused: !0
        }));
        $(".story").css("height", CONFIG.currentH),
        console.log(a),
        4 == a && ($("#container").css({
            height: CONFIG.currentH,
            overflow: "hidden"
        }),
        $("#business-container").hide()),
        $(".business").eq(a).css("z-index", 15),
        $(".story-wrapper").eq(0).show(),
        TweenLite.to($(".story-wrapper").eq(0), .1, {
            css: {
                opacity: 1
            }
        }),
        b.insert(TweenLite.to($(".story-wrapper").eq(0), 0, {
            css: {
                top: 0
            },
            ease: Cubic.easeInOut,
            onComplete: function() {}
        }), 0).insert(TweenLite.to($(".story"), 0, {
            css: {
                rotationX: 0,
                transformOrigin: "0 0"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {
                $(".story-content").show(),
                $("#close").fadeIn(200)
            }
        }), 1).insert(TweenLite.to($(".story-wrapper #story-hero-cont h4"), 0, {
            css: {
                marginTop: 0,
                opacity: 1
            },
            ease: Cubic.easeOut,
            onComplete: function() {}
        }), .1).insert(TweenLite.to($(".story-wrapper #story-hero-cont h2"), 0, {
            css: {
                marginTop: -64,
                opacity: 1
            },
            ease: Cubic.easeOut,
            onComplete: function() {}
        }), .3).insert(TweenLite.to($(".story-wrapper #story-hero-cont h3"), 0, {
            css: {
                bottom: 50,
                opacity: 1
            },
            ease: Cubic.easeOut,
            onComplete: function() {}
        }), .5).insert(TweenLite.to($(".story-wrapper #story-switch h4"), 0, {
            css: {
                marginTop: 0,
                opacity: 1
            },
            ease: Cubic.easeOut,
            onComplete: function() {}
        }), .1).insert(TweenLite.to($(".story-wrapper #story-switch h2"), 0, {
            css: {
                marginTop: -54,
                opacity: 1
            },
            ease: Cubic.easeOut,
            onComplete: function() {}
        }), .3).insert(TweenLite.to($(".story-wrapper #story-switch h3"), 0, {
            css: {
                bottom: -4,
                opacity: 1
            },
            ease: Cubic.easeOut,
            onComplete: function() {
                $("#overlay").hide()
            }
        }), .5).insert(TweenLite.to($(".business").eq(a), 1, {
            css: {
                top: 0
            },
            ease: Cubic.easeInOut,
            onComplete: function() {}
        }), 1),
        b.play(),
        GE.storyOpened = !0,
        GE.resize(),
        $("#overlay-mobile").hide()
    },
    backToHome: function() {
        CONFIG.currentH / 3,
        CONFIG.currentH / 3 * 2,
        CONFIG.currentH / 3 * 3,
        CONFIG.currentW / 3,
        CONFIG.currentW / 3 * 2,
        CONFIG.currentW / 3 * 3;
        GE.resize(),
        GE.resizeTiles(),
        $(".business").show(),
        (CONFIG.isMobile || CONFIG.isTablet) && $("#mixit-btn").fadeIn(),
        TweenLite.set($(".business").find(".business-inner"), {
            css: {
                rotationX: 0,
                rotationY: 0,
                transformOrigin: "0 0"
            }
        }),
        TweenLite.set($(".business").eq(0).find(".business-inner"), {
            css: {
                rotationX: -120,
                transformOrigin: "0 0"
            }
        }),
        TweenLite.set($(".business").eq(1).find(".business-inner"), {
            css: {
                rotationX: -120,
                transformOrigin: "0 100%"
            }
        }),
        TweenLite.set($(".business").eq(2).find(".business-inner"), {
            css: {
                rotationY: -120,
                transformOrigin: "100% 100%"
            }
        }),
        TweenLite.set($(".business").eq(3).find(".business-inner"), {
            css: {
                rotationY: 120,
                transformOrigin: "0 0%"
            }
        }),
        TweenLite.set($(".business").eq(4).find(".business-inner"), {
            css: {
                rotationX: 120,
                transformOrigin: "0 100%"
            }
        }),
        TweenLite.set($(".business").eq(5).find(".business-inner"), {
            css: {
                rotationX: -120,
                transformOrigin: "0 0%"
            }
        }),
        TweenLite.set($(".business").eq(6).find(".business-inner"), {
            css: {
                rotationX: -120,
                transformOrigin: "0 0%"
            }
        }),
        TweenLite.set($(".business").eq(7).find(".business-inner"), {
            css: {
                rotationY: -122,
                transformOrigin: "100% 0%"
            }
        }),
        TweenLite.set($(".business").eq(8).find(".business-inner"), {
            css: {
                rotationX: 120,
                transformOrigin: "0 100%"
            }
        }),
        $(".business").eq(4).hide(),
        $(".business").eq(5).hide(),
        $(".business").eq(6).hide(),
        $(".business").eq(7).hide(),
        GE.loadingTimeline = new TimelineLite({
            paused: !0
        }),
        TweenLite.set($("#business-container"), {
            css: {
                zIndex: 500
            }
        }),
        GE.loadingTimeline.insert(TweenLite.to($(".business").eq(0).find(".business-inner"), .8, {
            css: {
                rotationX: 0,
                transformOrigin: "0 0%"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {
                $(".business").eq(7).show(),
                $(".business").eq(5).show()
            }
        }), .3).insert(TweenLite.to($(".business").eq(2).find(".business-inner"), .8, {
            css: {
                rotationY: 0,
                transformOrigin: "100% 0"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {}
        }), .4).insert(TweenLite.to($(".business").eq(1).find(".business-inner"), .8, {
            css: {
                rotationX: 0,
                transformOrigin: "0 0"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {}
        }), .5).insert(TweenLite.to($(".business").eq(3).find(".business-inner"), .8, {
            css: {
                rotationY: 0,
                transformOrigin: "0% 0"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {
                $(".business").eq(4).show(),
                $(".business").eq(6).show()
            }
        }), .6).insert(TweenLite.to($(".business").eq(7).find(".business-inner"), .8, {
            css: {
                rotationY: 0,
                transformOrigin: "100% 0%"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {}
        }), .7).insert(TweenLite.to($(".business").eq(8).find(".business-inner"), .8, {
            css: {
                rotationX: 0,
                transformOrigin: "0% 100%"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {}
        }), .8).insert(TweenLite.to($(".business").eq(5).find(".business-inner"), .8, {
            css: {
                rotationX: 0,
                transformOrigin: "0% 0"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {}
        }), .9).insert(TweenLite.to($(".business").eq(6).find(".business-inner"), .8, {
            css: {
                rotationX: 0,
                transformOrigin: "0 0"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {}
        }), 1).insert(TweenLite.to($(".business").eq(4).find(".business-inner"), .8, {
            css: {
                rotationX: 0,
                transformOrigin: "0% 100%"
            },
            ease: Cubic.easeInOut,
            onComplete: function() {
                TweenLite.to($(".story-wrapper").eq(0), .5, {
                    css: {
                        opacity: 0
                    },
                    ease: Cubic.easeInOut,
                    onComplete: function() {
                        $(".story-wrapper").eq(0).css({
                            top: "66%",
                            display: "none"
                        }),
                        TweenLite.set($(".story"), {
                            css: {
                                rotationX: -80
                            }
                        }),
                        $(".story-content").fadeOut(),
                        $(".story-wrapper").eq(0).empty(),
                        TweenLite.set($("#business-container"), {
                            css: {
                                zIndex: 100
                            }
                        }),
                        $("#cinemagraph-cont").hide(),
                        TweenLite.set($("#cinemagraph-cont .flipper"), {
                            css: {
                                rotationY: 0
                            }
                        }),
                        TweenLite.set($("#cinemagraph-cont"), {
                            css: {
                                width: "33%",
                                height: "auto"
                            }
                        }),
                        TweenLite.set($("#cinemagraph-cont .back"), {
                            css: {
                                width: "100%",
                                height: "auto"
                            }
                        }),
                        GE.selectedStory = null ,
                        TweenLite.to($("#mixit-btn button"), .5, {
                            css: {
                                opacity: .3
                            },
                            ease: Cubic.easeOut,
                            onComplete: function() {}
                        }),
                        GE.storyOpened = !1
                    }
                })
            }
        }), 1.1),
        GE.loadingTimeline.play(),
        $("#close").fadeOut(200),
        TweenLite.set($(".videocontent"), {
            css: {
                "-webkit-filter": "grayscale(100%)",
                filter: "grayscale(100%)",
                opacity: .9
            }
        }),
        CONFIG.isIE && $.each(GE.businessId, function(a, b) {
            $("#" + b + " .videocontent").css({
                "background-image": "url(img/businesses/IE/" + b + ".jpg)"
            })
        }
        )
    },
    changeBusiness: function(a) {
        if (CONFIG.isMobile) {
            console.log("changing in", a),
            $("#locations li").css("zIndex", 1),
            $("#overlay-change").css("height", $("body").height()).show();
            var b = $("#" + a).offset()
              , c = $("#" + a).width();
            $("#" + a).clone().css({
                position: "absolute",
                left: b.left,
                top: b.top - 16,
                width: c
            }).addClass("moving-thumb").appendTo("#overlay-change");
            var d = a.slice(4);
            $(".videocontent-back").empty(),
            $(".videocontent-back").append("<div style='background: url(video/img/gif/" + d + ".gif) center center; background-size: cover' class='image-still'></div>"),
            TweenLite.to($("#locations, #checkout, #introvideo"), 0, {
                css: {
                    opacity: 0
                },
                ease: Cubic.easeOut,
                onComplete: function() {}
            }),
            TweenLite.to($(".moving-thumb"), 0, {
                css: {
                    width: CONFIG.currentW,
                    height: CONFIG.currentH,
                    position: "absolute",
                    top: $(window).scrollTop(),
                    left: 0,
                    zIndex: 240
                },
                ease: Cubic.easeOut,
                onComplete: function() {
                    switch ($(".story-wrapper").eq(0).after("<div class='story-wrapper next'></div>"),
                    $(".story-wrapper").eq(1).css("top", 0),
                    $("#story-hero").empty(),
                    $("#story-switch").empty(),
                    a) {
                    case "loc-supermaterials":
                        GE.deepDive.displayBusiness("supermaterials", !0, a),
                        _gaq.push(["_trackEvent", "business", "Click", "supermaterials"]);
                        break;
                    case "loc-industrial":
                        GE.deepDive.displayBusiness("industrial", !0, a),
                        _gaq.push(["_trackEvent", "business", "Click", "industrial"]);
                        break;
                    case "loc-diesel":
                        GE.deepDive.displayBusiness("diesel", !0, a),
                        _gaq.push(["_trackEvent", "business", "Click", "diesel"]);
                        break;
                    case "loc-imaging":
                        GE.deepDive.displayBusiness("imaging", !0, a),
                        _gaq.push(["_trackEvent", "business", "Click", "imaging"])
                    }
                    $("#overlay-change").hide(),
                    $(".moving-thumb").remove()
                }
            })
        } else {
            $("#locations li").css("zIndex", 1),
            $("#overlay-change").css("height", $("body").height()).show();
            var b = $("#" + a).offset()
              , c = $("#" + a).width();
            $("#" + a).clone().css({
                position: "absolute",
                left: b.left,
                top: b.top - 16,
                width: c
            }).addClass("moving-thumb").appendTo("#overlay-change");
            var d = a.slice(4);
            _V_("cinemagraph-video").src([{
                type: "video/mp4",
                src: "video/" + d + ".mp4"
            }, {
                type: "video/webm",
                src: "video/" + d + ".webm"
            }, {
                type: "video/ogg",
                src: "video/" + d + ".ogv"
            }]),
            $("#cinemagraph-video").find("source").eq(0).attr("src", "video/" + d + ".mp4"),
            $("#cinemagraph-video").find("source").eq(1).attr("src", "video/" + d + ".webm"),
            $("#cinemagraph-video").find("source").eq(2).attr("src", "video/" + d + ".ogv"),
            $(".videocontent-back .vjs-poster").css("background-image", "url(video/img/" + d + ".jpg)").show(),
            $("#cinemagraph-video_html5_api").eq(0).attr("poster", "video/img/" + d + ".jpg"),
            TweenLite.to($("#locations, #checkout, #introvideo"), .5, {
                css: {
                    opacity: 0
                },
                ease: Cubic.easeOut,
                onComplete: function() {}
            }),
            TweenLite.to($("#cinemagraph-cont .back h3"), .5, {
                css: {
                    bottom: 10,
                    opacity: 0
                },
                ease: Cubic.easeInOut,
                onComplete: function() {}
            }),
            TweenLite.to($(".moving-thumb"), 1, {
                css: {
                    width: CONFIG.currentW,
                    height: CONFIG.currentH,
                    position: "absolute",
                    top: $(window).scrollTop(),
                    left: 0,
                    zIndex: 240
                },
                ease: Cubic.easeOut,
                onComplete: function() {
                    switch ($(".story-wrapper").eq(0).after("<div class='story-wrapper next'></div>"),
                    $(".story-wrapper").eq(1).css("top", 0),
                    $("#story-hero").empty(),
                    $("#story-switch").empty(),
                    a) {
                    case "loc-supermaterials":
                        GE.deepDive.displayBusiness("supermaterials", !0, a),
                        _gaq.push(["_trackEvent", "business", "Click", "supermaterials"]);
                        break;
                    case "loc-industrial":
                        GE.deepDive.displayBusiness("industrial", !0, a),
                        _gaq.push(["_trackEvent", "business", "Click", "industrial"]);
                        break;
                    case "loc-diesel":
                        GE.deepDive.displayBusiness("diesel", !0, a),
                        _gaq.push(["_trackEvent", "business", "Click", "diesel"]);
                        break;
                    case "loc-imaging":
                        GE.deepDive.displayBusiness("imaging", !0, a),
                        _gaq.push(["_trackEvent", "business", "Click", "imaging"])
                    }
                    $("#overlay-change").hide(),
                    $(".moving-thumb").remove(),
                    TweenLite.to($("#cinemagraph-cont .back h3"), .5, {
                        css: {
                            bottom: 30,
                            opacity: 1
                        },
                        ease: Cubic.easeInOut,
                        onComplete: function() {}
                    })
                }
            }),
            $("#" + a).find("h5").hide()
        }
    },
    closeVideoIntro: function() {
        GE.youtubeid = "droJ2mPmwkg";
        var a = "#videoId-" + GE.youtubeid;
        GE.highlightsPlayer.stopVideo(),
        $(a).removeClass("show"),
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) && $(a).html(""),
        $(a).remove(),
        $("#overlay-videointrocont .video-loader").hide(),
        $("#overlay-videointrocont").append('<div class="intro-video-container" id="videoId-' + GE.youtubeid + '"></div>'),
        GE.isPlaying = !1
    },
    resizeTiles: function() {
        if ($("#lighting, #global-res, #healthcare").css({
            left: "0"
        }),
        $("#aviation, #transportation, #software-data").css({
            left: Math.ceil(CONFIG.currentW / 3)
        }),
        $("#oil-gas, #power-wind, #power-gas").css({
            left: Math.ceil(CONFIG.currentW / 3 * 2)
        }),
        $(".business").css({
            width: Math.ceil(CONFIG.currentW / 3)
        }),
        CONFIG.isMobile === !0 || CONFIG.isTablet === !0) {
            var a = CONFIG.currentH / 3 - $("#mixit-btn").height() / 3;
            $(".business").css({
                height: a + 1
            }),
            $("#mixit-btn").show(),
            $("#power-wind, #aviation, #lighting").css({
                top: "0px"
            }),
            $("#healthcare, #software-data, #oil-gas").css({
                top: CONFIG.currentH / 3 - $("#mixit-btn").height() / 3
            }),
            $("#global-res, #power-gas, #transportation").css({
                top: CONFIG.currentH / 3 * 2 - $("#mixit-btn").height() / 3 * 2
            })
        } else {
            var b = CONFIG.currentH / 3 + .5;
            $(".business").css({
                height: CONFIG.currentH / 2
            }),
            $("#power-wind, #aviation, #lighting").css({
                top: 0
            }),
            $("#healthcare, #software-data, #oil-gas").css({
                top: CONFIG.currentH / 2
            }),
            $("#global-res, #power-gas, #transportation").css({
                top: CONFIG.currentH / 3 * 2
            })
        }
    },
    resize: function() {
        CONFIG.currentW = $(window).width(),
        CONFIG.currentH = $(window).height();
        var a = $("#logo-big");
        a.css({
            "margin-top": CONFIG.currentH / 2 - a.height() / 2 + 40
        }),
        CONFIG.isMobile ? ($("#story-switch").height(CONFIG.currentH),
        $("#story-hero").height(9 * CONFIG.currentW / 16)) : ($("#container, #story-switch").height(CONFIG.currentH),
        $("#story-hero").height(9 * CONFIG.currentW / 16)),
        $("#glow").css({
            width: CONFIG.currentW
        }),
        GE.resizeTiles(),
        0 == GE.storyOpened || ($("#mixit-btn").hide(),
        $("#cinemagraph-cont").css({
            width: CONFIG.currentW
        }),
        $("#cinemagraph-cont .back").css({
            width: CONFIG.currentW,
            height: 9 * CONFIG.currentW / 16
        }),
        1 == CONFIG.isTablet),
        CONFIG.isMobile,
        CONFIG.isTablet
    }
}
  , CONFIG = CONFIG || {};
!function() {
    var a = CONFIG;
    a.currentW,
    a.currentH,
    a.isMobile = !1,
    a.isTablet = !1
}
(CONFIG),
$(function() {
    GE.init()
}
),
$(window).resize(function() {
    GE.resize()
}
)
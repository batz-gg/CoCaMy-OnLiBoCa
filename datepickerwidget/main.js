var day_width = 24;
var today = new Date();
today.setHours(0, 0, 0, 0);  // Used for comparison without time

function isToday(date) {
    var _date = new Date(date);
    return _date.getTime() == today.getTime();
}

function date2tomorrow(date) {
    date.setDate(date.getDate() + 1);
}

function getDateStart(num_weeks) {
    var fix_to_monday = 1 - (today.getDay() ? today.getDay() : 7);
    var day = new Date(today);
    day.setDate(today.getDate() - Math.floor(num_weeks / 2) * 7 + fix_to_monday);

    return day;
}

function formatDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    month = month <= 9 ? '0' + month : month;
    day = day <= 9 ? '0' + day : day;
    return year + '-' + month + '-' + day;
}

function addDay(date, el_week) {
    var el_day = $('<div class="day">').appendTo(el_week);
    el_day.text(date.getDate());
    el_day.attr('title', formatDate(date));
    el_day.toggleClass('today', isToday(date));

    if (isLastOfMonth(date)) {
        el_day.addClass('last');
        el_week.find('.day').addClass('last-week')
    }
    if (isFirstOfMonth(date)) {
        el_day.addClass('first');
        el_week.addClass('first-week');
    }
}

function addMonths(container) {
    var width = 0;
    var el_months = container.find('.months');
    var el_weeks = container.find('.days .week');
    var el_month;

    function _addMonth(el_week) {
        var date = el_week.find(':last-child').attr('title');  // e.g: 2016-06-17
        var month = parseInt(date.substr(5, 2));
        var year = date.substr(0, 4);
        el_month = $('<div class="month">').appendTo(el_months);
        el_month.text((month == 1 ? year + ' он ' : '')  + month + ' сар');
        el_month.attr('title', date.substr(0, 7));
        width = -2;
    }

    el_weeks.each(function(i, _el_week){
        var el_week = $(_el_week);
        var el_monday = el_week.find('.day:first');

        var is_monday_first = el_monday.hasClass('first');
        var is_monday_last_week = el_monday.hasClass('last-week');

        if (i == 0) {
            _addMonth(el_week);
            //width = 0;  // margin fix for latter weeks
        } else if (is_monday_first) {
            //_addMonth(el_week);
        }

        width += el_week.width();
        el_month.css('width', width + 'px');

        if (is_monday_last_week) {
            var el_week_next = el_week.next();
            if (el_week_next.length) {
                _addMonth(el_week.next());
            }
        }
    });
}

function isFirstOfMonth(date) {
    return date.getDate() == 1;
}

function isLastOfMonth(date) {
    var d = new Date(date);
    d.setDate(1);
    d.setMonth(d.getMonth() + 1);
    d.setDate(0);
    return date.getDate() == d.getDate();
}

function initCalendar(container, calendar) {
    var el_days = container.find('.days');
    var visible_weeks = Math.floor(el_days.width() / day_width);
    var number_of_days = visible_weeks * 7;
    var date = getDateStart(visible_weeks);
    var el_week = null;
    var el_months = container.find('.months');

    for (var day=0; day < number_of_days; ++day) {

        if (el_week === null || date.getDay() == 1) {
            el_week = $('<div class="week">').appendTo(el_days);
        }
        addDay(date, el_week);
        date2tomorrow(date);
    }
    addMonths(container);

    calendar.toggleClass = function toggleClass(date, cls, state) {
        var el_day = container.find('.day[title="' + date + '"]');
        var el_today = container.find('.day.today');
        if (!el_today.is(el_day)) {
            el_today.toggleClass('marked', !state);
        }

        el_day.toggleClass(cls, state);
    }
}

function selectRange(elements, el_start, el_end) {
    var is_el_start_found = false;
    var is_el_end_found = false;
    function _XOR(a, b) {
        return (a || b) && !(a && b);
    }
    elements.each(function(i, el) {
        if (el_end.is(el_start)) {
            el_end.toggleClass('selected');
            return false;
        } else if (el_end.is(el)) {
            is_el_end_found = true;
            $(el).addClass('selected');
        } else if (el_start.is(el)) {
            is_el_start_found = true;
            $(el).addClass('selected');
        } else if (_XOR(is_el_start_found, is_el_end_found)) {
            $(el).addClass('selected');
        }
    });
}

function initScroll(container, calendar) {
    var btn_prev = container.find('.prev');
    var btn_next = container.find('.next');
    var el_scroll = container.find('.calendar-container');

    function _snap(n) {
        return Math.round(n / day_width) * day_width;
    }

    function _getScroll() {
        if (el_scroll.data('scrollDest') !== undefined) {
            return el_scroll.data('scrollDest');
        } else {
            return el_scroll.scrollLeft();
        }
    }

    function _scroll(amount) {
        var scrollLeft = _snap(_getScroll() + amount);
        el_scroll.data('scrollDest', scrollLeft);
        el_scroll.animate({scrollLeft: scrollLeft}, 'fast');
    }

    var center_x = el_scroll.find('.day.today').position().left;
    el_scroll.scrollLeft(_snap(center_x - el_scroll.width() / 2));

    btn_prev.click(function() { _scroll(-day_width * 4); })
    btn_next.click(function() { _scroll(day_width * 4); })

    calendar.scrollTo = function scrollTo(date) {
        el_scroll.stop(true);

        var el_day = container.find('.day[title="' + date + '"]');
        var left = el_day.position().left - el_scroll.width() / 2;
        _scroll(left);
    }

    calendar.scrollSave = function scrollSave() {
        if (calendar.scroll === null) {
            calendar.scroll = _getScroll();
        }
    }
    calendar.scrollRestore = function scrollRestore() {
        if (calendar.scroll !== null) {
            _scroll(calendar.scroll - _getScroll());
            calendar.scroll = null;
        }
    }

    calendar.scroll = null;
}

function initSelection(container, calendar) {
    var el_start;

    function _highlightSelection(el_end, shiftKey) {
        if (!el_start) return;
        if (!shiftKey) {
            container.find('.day.selected').removeClass('selected');
        }
        selectRange(container.find('.day'), el_start, el_end);
    }
    function _triggerEvent() {
        var dates = container.find('.day.selected').map(function(i, el){
            return $(el).attr('title');
        });
        var event = $.Event("calendar-selected");
        event.dates = dates.toArray();
        container.trigger(event)
    }

    container.find('.day').mousedown(function(e) {
        el_start = $(e.target);
    });
    container.find('.day').mouseover(function(e) {
        _highlightSelection($(e.target), e.shiftKey);
    });
    container.find('.day').mouseup(function(e) {
        _highlightSelection($(e.target), e.shiftKey);
        if (!el_start) return;
        _triggerEvent();
        el_start = null;
    });
    container.find('.days').mouseleave(function() {
        if (!el_start) return;
        _triggerEvent();
        el_start = null;
    });
    container.find('.weekdays').click(function() {
        container.find('.day.selected').removeClass('selected');
        _triggerEvent();
    });
    container.find('.month').click(function(e) {
        if (!e.shiftKey) {
            container.find('.day.selected').removeClass('selected');
        }
        var year_month = $(e.target).attr('title');
        container.find('.day[title^=' + year_month + ']').addClass('selected');
        _triggerEvent();
    });

    calendar.selectDates = function selectDates(dates) {
        // reset and select given date
        container.find('.day').removeClass('selected');
        $.each(dates, function(idx, date){
            container.find('.day[title=' + date + ']').addClass('selected');
        });
    }
}

calendar.each(function(i, _el){
    var el_calendar = $(_el);
    var calendar = {
        el: el_calendar
    };

    initCalendar(el_calendar, calendar);
    initScroll(el_calendar, calendar);
    initSelection(el_calendar, calendar);

    var event = $.Event("calendar-ready");
    event.calendar = calendar;
    el_calendar.trigger(event);
});

var column_nav = '基金名称/基金代码/日期/净值/累计净值/日涨跌/近一月/近三月/近一年/风险等级/申购';
var column_profit = '基金名称/基金代码/日期/每万份基金净收益/七日年化收益率/日涨跌/近一月/近三月/近一年/风险等级/申购';

var fundsTbl = $('.funds-table');

function initFundTables() {
    // load dynamic data to each table in #tab1-6
    var ds = [info_gp, info_hh, info_zs, info_zq, info_hb, info_qdii];
    for (let i = 0; i < ds.length; i++) {
        const fundata = ds[i];
        // info_hb have to use column_profit 
        var column = (i === 4 ? column_profit : column_nav);
        // load table
        loadfundtable('#tab' + (i + 1), fundata, column);
    }
    enableSorting();
}

function loadfundtable(element, fundata, column) {
    $(element).html('');
    var tb = $('<table class="responsive-table table-border text-lite funds-table"><thead></thead><tbody></tbody></table>');
    tb.find('thead').html(getThead(column));
    tb.find('tbody').html(getTbody(fundata));
    $(element).append(tb);
}

function enableSorting() {
    // var i = 0;
    var sortedFields = '净值/累计净值/日涨跌/近一月/近三月/近一年/每万份基金净收益/七日年化收益率'
    sortedFields.split('/').forEach(function(item) {

        var element = $('th div:contains(' + item + ')');

        $.each(element, function(i, thisElem) {
            // matched
            if($(thisElem).text() === item) {
                // console.log(item, ++i, 'len', $(thisElem).text());
                // apply
                $(thisElem).addClass('sort');
                $(thisElem).on('click', function() {
                    if($(this).hasClass('sort_down')) {

                        // Up
                        $(this).attr('class', 'sort sort_up');
                        applySort($(this), 'sort_up');

                    } else {
                        
                        // Down
                        $(this).attr('class', 'sort sort_down');
                        applySort($(this), 'sort_down');

                    }
                    // clear
                    $(this).parent().siblings().find('div.sort').removeClass('sort_down sort_up');
                       
                });
            }
        });
        
    });
}


function toFloat(value) {
    var defval = -99999;
    if(!value) { return defval; }
    var v = parseFloat(value.replace(/%/g,'').trim());
    return !isNaN(v) ? v : defval;
}

function applySort(theader, upOrDown) {
    // $(this).parents('table').find('tr') -- all tr
    // var trList = theader.parents('table').find('tr');
    var tbody = theader.parents('table').find('tbody');
    var trList = tbody.find('tr');
    // $(this).parents('th').index()  - current index col
    var thIdx = theader.parents('th').index();
    // console.log(upOrDown, 'tr[]', trList, 'index', thIdx, $(trList[0]).data('c'+thIdx));


    // sort
    var compareFloat = function(a, b) {
        // thIdx
        $(a).data('c'+thIdx) > $(a).data('c'+thIdx)
        const valueA = $(a).data('c'+thIdx);
        const valueB = $(b).data('c'+thIdx);
        if (valueA < valueB) { return upOrDown === 'sort_down' ? -1 : 1; }
        if (valueA > valueB) { return upOrDown === 'sort_down' ? 1: -1; }
        return 0;
    }
    // tr compare
    trList.sort(compareFloat).map((i,item) => $(item).prependTo(tbody));
}

function getThead(column) {
    // var cols = column.split('/').map((name) => '<th class="">' + name + '</th>').join('');
    // '<div class="sort"><span>'+cols+'<i class="before"></i><i class="after"></i></span></div>'
    var cols = column.split('/').map((name) => '<th><div><span>' + name + '<i class="before"></i><i class="after"></i></span></div></th>').join('');
    return $('<tr></tr>').append(cols);
}

function getTbody(fundata) {
    var rows = [];
    fundata.forEach(function name(item) {
        var cells = [];
        // cells.push(item.name);
        // <a target="_blank" href="https://www.mfcteda.com/Channel/2217983"><span>泰达宏利<br>先进制造股票C</span></a>
        cells.push('<a target="_blank" href="'+item.detailUrl+'"><span>'+item.name+'</span></a>');
        cells.push(item.code);
        cells.push(item.date);
        cells.push(item.netValue || item.profit);
        cells.push(item.netValueSum || item.profitRate);
        cells.push(item.dailyRiseAndFall);
        cells.push(item.oneMonth);
        cells.push(item.threeMonth);
        cells.push(item.oneYear);
        cells.push(item.riskLevel);
        cells.push('<a href="https://etrade.mfcteda.com/etrading/" class="btn_buy" title="申购"><i></i></a>'); // 申购

        var row = cells.map(function (value) {
            var m = /(.+)%/.exec(value);
            var fv = 0;
            if (m && m[1]) {
                fv = parseFloat(m[1]);
            }
            if (fv > 0 || fv < 0) {
                var cls = (fv < 0 ? 'negative' : 'positive');
                return '<td class="' + 'responsive-table-width-td' + ' ' + cls + '">' + value + '</td>';
            } else {
                return '<td class="responsive-table-width-td">' + value + '</td>';
            }
        }).join('');
        
        
        var $tr = $('<tr></tr>').append(row);
        $tr.data('c3', toFloat(item.netValue || item.profit));
        $tr.data('c4', toFloat(item.netValueSum || item.profitRate));
        $tr.data('c5', toFloat(item.dailyRiseAndFall));
        $tr.data('c6', toFloat(item.oneMonth));
        $tr.data('c7', toFloat(item.threeMonth));
        $tr.data('c8', toFloat(item.oneYear));

        rows.push($tr);
    });
    return rows;
}

$(fundsTbl).css({
    'height': '500px',
    'overflow-y': 'scroll'
});

// Initial fund data table
initFundTables();

var React = require('react');
var Typeahead = require('typeahead');
var $ = require('jquery');
var cachedRequests = {};

var CityInput = React.createClass({
    componentDidMount: function(){
        var element = this.getDOMNode();
        Typeahead(element, {
            minLength: 3,
            sorter: function(items) { return items; },
            source: function(query, result) {
                if (cachedRequests[query]) {
                    return result(cachedRequests[query]);
                }
                $.get('http://local.webjet.com.au/Contrail/Api/AutoComplete/OriginAirports?locale=en-AU&limit=6', {search: query}, function(data){
                    var src = [];
                    $.each(data, function(i, value){
                        var padding = '';
                        if (value.HasMetro) {
                            padding = '    ';
                        }
                        src.push(padding + value.City + ', ' + value.Country + ' - ' + value.Airport + ' (' + value.TsaAirportCode + ')');
                    });
                    cachedRequests[query] = src;
                    return result(src);
                });
        }});
    },
    render: function(){
        return(
            <input type="text" autocomplete='off' placeholder={this.props.placeholder} />
        );
    }
});

module.exports = CityInput;
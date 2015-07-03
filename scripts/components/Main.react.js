var React = require('react');
var CityInput = require('./CityInput.react');

var Main = React.createClass({
    render: function(){
        return(
            <div>
            <CityInput placeholder="Enter origin" />
            <CityInput placeholder="Enter destination" />
            </div>
        );
    }
});

module.exports = Main;
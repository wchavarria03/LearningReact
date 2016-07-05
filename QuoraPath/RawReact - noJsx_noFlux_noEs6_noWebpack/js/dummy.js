var contacts = [
  {key: 1, name: "James Nelson", email: "james@jamesknelson.com"},
  {key: 2, name: "Bob"},
  {key: 3, name: "Walter Chavarria", email: "wchavarria03@gmail.com"},
]

var ContactItem = React.createClass({
    propTypes: {
        name: React.propTypes.string.isRequired,
        email: React.propTypes.string.isRequired
    },
    render : function () {
        return (
            React.createElement('li',{className: 'Contact'},
                React.createElement('h2', {className: 'Contact-name'}, this.props.name),
                React.createElement('a', {href:'mailto:'+this.props.email, className: 'Contact-link'}, this.props.email)
            )   
        );
    }
});

var listElements = contacts
    .filter(function(contact){
        return contact.email;
    })
    .map(function(contact){
        return React.createElement(ContactItem, {name: contact.name, email: contact.email}, {});
    });


var rootElement = React.createElement('div', {},
    React.createElement('h1', {}, 'Contacts'),
    React.createElement('ul', {}, listElements)
);

ReactDOM.render(rootElement, document.getElementById('react-app')); 
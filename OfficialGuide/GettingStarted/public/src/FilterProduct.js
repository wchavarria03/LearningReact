var FilterableProductTable = React.createClass({
    loadProductsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(products) {
                this.setState({products: products})
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleUserInput: function(filterText, isStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: isStockOnly
        });
    },
    getInitialState: function() {
        return {
            products: [],
            filterText: '',
            inStockOnly: false
        };
    },
    componentDidMount: function() {
        this.loadProductsFromServer();
    },
    render: function () {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    isStockOnly={this.state.isStockOnly}
                    onUserInput={this.handleUserInput}
                />
                <ProductTable
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    url={this.props.url}
                    products={this.state.products}
                />
            </div>
        );
    }
});

var SearchBar = React.createClass({
    handleChange: function() {
        this.props.onUserInput(
            this.refs.filterTextInput.value,
            this.refs.inStockOnlyInput.checked
        );
    },
    render: function() {
        return(
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    ref="filterTextInput"
                    onChange={this.handleChange}
                    value={this.props.filterText}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.inStockOnly}
                        ref="inStockOnlyInput"
                        onChange={this.handleChange}
                    />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
});

var ProductTable = React.createClass({
    render: function() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function(product) {
            console.log(product);

            if(product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }

            if(product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }



            rows.push(<ProductRow product={product}  key={product.name} />);
            lastCategory = product.category;
        }.bind(this));
        return(
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

var ProductCategoryRow = React.createClass({
    render: function() {
        return(<tr><th colspan="2">{this.props.category}</th></tr>);
    }
});

var ProductRow = React.createClass({
    render: function() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
                {this.props.product.name}
            </span>
        return(
            <tr>
                <td> {name} </td>
                <td> {this.props.product.price}</td>
            </tr>
        );
    }
});

ReactDOM.render(
    <FilterableProductTable url='/api/goods'/>,
    document.getElementById('container')
);
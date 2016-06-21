// tutorial8.js
var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"},
  {id: 3, author: "White Walker", text: "This is *another2* comment"}
];


var CommentBox = React.createClass({
    render: function() {
        return (
            <div clasName="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.props.data}/>
                <CommentForm/>
            </div>
        );
    }
});

var CommentForm = React.createClass({
    render: function() {
        return (
            <div clasName="commentForm">
                Hello, world! I am a CommentForm
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });

        return (
            <div clasName="commentList">
                {commentNodes}
            </div>
        );
    }
});

var Comment = React.createClass({
    rawMarkup: function() {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return {__html: rawMarkup };
    },

    render: function() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>

                <span dangerouslySetInnerHTML = {this.rawMarkup()} />
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox url="/api/comments" data={data}/>,
    document.getElementById('content')
);

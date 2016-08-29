var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];



var CommentBox = React.createClass({
	getInitialState: function(){
		return {data: []};
	},

	componentDidMount: function() {
		this.setState({data: data})
	}, 

	handleCommentSubmit: function (comment) {

			var newId = data.length + 1;
			comment.id = newId;
			data.push(comment);
			this.setState({data: data});
	},


  render: function() {
    return (
      <div className="commentBox">
        <h1>Hello, world! I am a CommentBox.</h1>
		<CommentList  data = {this.state.data}/>	       
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/> 
      </div>
    );
  }
});



var CommentList = React.createClass({

  	render: function() {
  		
  		var commentNodes = this.props.data.map(function(commentNode){
  			return (
  				<Comment key={commentNode.id} author={commentNode.author}>
  					{commentNode.text}
  				</Comment>
  			);
  		});

    	return (
	      <div className="commentList">
	        Hello, world! I am a CommentList.
	        {commentNodes}
	      </div>
    	);
  }
});

var Comment = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});



var CommentForm = React.createClass({

	getInitialState: function(){
		return {author: '', text: '' };
	},

	handleAuthorChange: function(e) {
		this.setState({author: e.target.value });
	},

	handleTextChange: function(e) {
		this.setState({text: e.target.value });
	},

	handleSubmit: function(e) {

		e.preventDefault();

		var author = this.state.author.trim();
		var text = this.state.text.trim();

		if(!author || !text ) {
			return;
		}

		this.setState({author: '', text: ''});
		this.props.onCommentSubmit({author: this.state.author, text: this.state.text});
	},

  	render: function() {
    	return (
      	<form className="commentForm" onSubmit ={this.handleSubmit}>
        	<input type="text" 
        	placeholder="Enter your name here"
			value={this.state.author}
			onChange={this.handleAuthorChange}/>
        	<input type="text" 
        	placeholder="Enter your comment here"
        	value={this.state.text}
        	onChange={this.handleTextChange}/>
        	<input type="submit" value="Post"/>
      	</form>
    	);
  	}
});



ReactDOM.render(
  <CommentBox/>,
  document.getElementById('container')
);




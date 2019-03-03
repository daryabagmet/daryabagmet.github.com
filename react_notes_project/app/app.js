var NotesPageTitle = React.createClass({
    render: function(){
        return (
        <h1 className="notes-container-title">FlowerX Notes</h1>
        )
    }
});

var Note = React.createClass({
    render: function(){
        var style = {backgroundColor: this.props.color};
        return (
            <div className="note-item" style={style}>
                <span className="delete-btn" onClick={this.props.onDelete}></span>
                {this.props.children} 
            </div>
        );
    }
});

var NotesEditor = React.createClass({
    getInitialState: function(){
        return {
            text: ''
        };
    },

    handleTextChange: function(event){
        this.setState({ text: event.target.value });
    },

    handleNoteAdd: function(event){
        var newNote = {
            text: this.state.text,
            color: '#a8d1bf',
            id: Date.now()
        };
    
        this.props.onNoteAdd(newNote);
        this.setState({text: ''});
    },
    render: function() {
        return (
            <div className="notes-editor"> 
                <textarea 
                    placeholder="Enter your note here..." 
                    rows={5} 
                    className="notes-editor-textarea" 
                    value={this.state.text} 
                    onChange={this.handleTextChange}/>
                <button className="notes-editor-btn" onClick={ this.handleNoteAdd }>Add new note</button>
            </div>
        );
    }
    
});

var NotesGrid = React.createClass({
    componentDidMount: function(){
        var grid = this.refs.grid;
        this.msnry = new Masonry( grid, {
            itemSelector: ".note-item",
            columnWidth: 250,
            gutter: 10,
            isFitWidth: true
        });
    },
    componentDidUpdate: function(prevProps){
        if(this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    },
    render: function() {
        var onNoteDelete = this.props.onNoteDelete;
        return (
            <div className="notes-grid" ref="grid">
               {
                    this.props.notes.map(function(note){
                        return <Note 
                                    key={note.id} 
                                    onDelete={onNoteDelete.bind(null, note)}
                                    color={note.color}> 
                                    {note.text} 
                                </Note>
                    })
               }
            </div>
        )
    }
});

var NotesApp = React.createClass({
    getInitialState: function(){
        return {
            notes: []
        };
    },
    componentDidMount: function(){
        var localNotes = JSON.parse(localStorage.getItem('notes'));

        if(localNotes) {
            this.setState({ notes: localNotes });
        }
    },
    componentDidUpdate: function() {
        this._updateLocalStorage();
    },
    handleNotesDelete: function(note){
        var noteId = note.id;
        var newNotes = this.state.notes.filter(function(note){
            return note.id !== noteId;
        });
        this.setState({ notes: newNotes});
    },
    handleNotesAdd: function(newNote){
        var newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({ notes: newNotes });
    },
    render: function(){
        return (
            <div className="notes-container">
                <NotesPageTitle/>
                <NotesEditor onNoteAdd={this.handleNotesAdd}/>
                <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNotesDelete} />
            </div>
        );
    },

    _updateLocalStorage: function(){
        var notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }
});

ReactDOM.render(
    <NotesApp/>,
    document.getElementById("mount-point")
);
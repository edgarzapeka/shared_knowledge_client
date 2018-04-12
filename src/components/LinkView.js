import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { getAllLinks, addLinkComment, deleteLink, updateLink, deleteLinkComment } from '../actions/'
import { Link as RouterLink } from 'react-router-dom'
import Comment from './Comment'

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp'
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Delete from 'material-ui-icons/Delete'
import ModeEdit from 'material-ui-icons/ModeEdit'
import Modal from 'material-ui/Modal'

import { withRouter } from 'react-router-dom'

class LinkView extends Component{

    constructor(props){
        super(props)

        this.submitDeleteLink = this.submitDeleteLink.bind(this)
        this.submitAddComment = this.submitAddComment.bind(this)
        this.submitEditLink = this.submitEditLink.bind(this)
    }

    componentDidMount(){
        if (!this.props.link){
            this.props.getAllLinks()
            return
        }
        
    }  

    componentWillReceiveProps(nextProps){
        if (nextProps.link){
            this.setState({
                linkTitle: nextProps.link.title,
                linkUrl: nextProps.link.linkURL
            })
        }
    }

    state = {
        commentValue: '',
        deleteLinkModal: false,
        editLinkModal: false,
        linkTitle: this.props.link !== undefined ? this.props.link.title : '',
        linkUrl: this.props.link !== undefined ? this.props.link.linkURL : ''
    }
    
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    getModalStyle() {
        const top = 50;
        const left = 50;
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
    }

    submitAddComment(){
        const { commentValue } = this.state
        const linkId = this.props.link.id
        const { id, token , secret } = this.props.userState

        this.props.addLinkComment(commentValue, linkId, id, {token: token, secret: secret}).then(console.log('Comment Done!'))
    }

    submitDeleteLink(){
        this.setState({deleteLinkModal: false})
        this.props.deleteLink(this.props.link.id, {
            token: this.props.userState.token,
            secret: this.props.userState.secret
        }).then(() => this.props.history.push("/links"))
    }

    submitEditLink(){
        this.setState({editLinkModal: false})
        const { linkTitle, linkUrl } = this.state
        const userState = {
            token: this.props.userState.token,
            secret: this.props.userState.secret
        }

        this.props.updateLink(this.props.link.id, linkTitle, linkUrl, userState ).then(console.log('Updated bitch!'))
    }

    render(){
        const { classes, link, comments, userState } = this.props
        const { commentValue } = this.state
        
        const userCredits = {
            token: userState === undefined ? null : userState.token,
            secret: userState === undefined ? null : userState.secret
        }

        if (!link)
            return null;

        return (
            <Grid container spacing={0} className={classes.container}>
                <Paper className={classes.root} elevation={4}> 
                    {( userState !== undefined && userState.userRole === 'Admin' ||  userState !== undefined && userState.userRole === 'Moderator') && 
                    <div className={classes.linkAction}>
                        <Button className={classes.buttonDelete} variant="raised" color="secondary" onClick={() => this.setState({deleteLinkModal: true})}>
                            Delete
                            <Delete className={classes.rightIcon} />
                        </Button>
                        <Button className={classes.buttonDelete} variant="raised" color="primary" onClick={() => this.setState({editLinkModal: true})}>
                            Edit
                            <ModeEdit className={classes.rightIcon} />
                        </Button>
                    </div>
                    }
                    <div className={classes.linkBlock}>
                        <div className={classes.actionBlock}>
                            <KeyboardArrowUp />
                            <Typography variant="title">
                                {link.rating}
                            </Typography>
                            <KeyboardArrowDown />
                        </div>
                        <div className={classes.infoBlock}>
                            <div className={classes.titleBlock}>
                                <Typography variant="title">
                                    {link.title}
                                </Typography>
                                <Typography variant="body1" className={classes.authorSignature}>
                                    by {link.userName}
                                </Typography>
                            </div>
                            <Typography variant="subheading" className={classes.linkLine}>
                                <a href={link.linkURL}> {link.linkURL} </a>
                            </Typography>
                        </div>
                    </div>
                    {userState !== undefined && userState.userRole !== undefined && 
                        <div className={classes.formBlock}>
                            <TextField
                                id="multiline-comment"
                                label="Comment"
                                multiline
                                rows="4"
                                value={commentValue}
                                onChange={this.handleChange('commentValue')}
                                className={classes.commentForm}
                                margin="normal"
                            />
                            <Button color="primary" className={classes.button} onClick={this.submitAddComment}>
                                Add Comment
                            </Button>
                        </div>
                    }
                </Paper>
                <Paper elevation={4} className={classes.commentsBlock}>
                    <Typography variant="display3" className={classes.commentsBlockTitle}>Comments:</Typography>
                        {comments.map(c => <Comment comment={c} key={c.id} deleteComment={() => this.props.deleteLinkComment(c.id, userCredits)} />)}
                </Paper>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.deleteLinkModal}
                    onClose={() => this.setState({deleteLinkModal: false})}
                    >
                    <div style={this.getModalStyle()} className={classes.paper}>
                        <Typography variant="title" id="modal-title">
                        Are you sure you want to delete {link.title}?
                        </Typography>
                        <Button color="secondary" className={classes.button} onClick={this.submitDeleteLink}>
                            Delete
                        </Button>
                        <Button color="primary" className={classes.button} onClick={() => this.setState({deleteLinkModal: false})}>
                            Cancel
                        </Button>
                    </div>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.editLinkModal}
                    onClose={() => this.setState({editLinkModal: false})}>

                    <div style={this.getModalStyle()} className={classes.paper}>
                        <Typography variant="title" id="modal-title">
                        Edit Link
                        </Typography>

                        <TextField
                                id="linkTitle"
                                label="Headline"
                                placeholder="Your beautiful title..."
                                className={classes.textField}
                                margin="normal"
                                value={this.state.linkTitle}
                                onChange={this.handleChange('linkTitle')}
                        />
                        <TextField
                            id="linkUrl"
                            label="Link URL"
                            placeholder="www.website.com"
                            multiline
                            className={classes.textField}
                            margin="normal"
                            value={this.state.linkUrl}
                            onChange={this.handleChange('linkUrl')}
                        />
                        <Button color="primary" className={classes.buttonModal} onClick={this.submitEditLink}>
                            Add
                        </Button>
                        <Button color="secondary" className={classes.buttonModal} onClick={() => this.setState({editLinkModal: false})}>
                            Cancel
                        </Button>
                    </div>
                </Modal>
            </Grid>
        )
    }
}

const styles = theme => ({
    container:{
        display: 'flex',
        flexDirection: 'row'
    },
    root: theme.mixins.gutters({
        paddingTop: 6,
        paddingBottom: 6,
        margin: theme.spacing.unit * 3,
        display: 'flex',
        flexDirection: 'column',
        width: '50%'
    }),
    linkBlock:{
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    commentsBlock:{
        paddingTop: 6,
        paddingBottom: 6,
        margin: theme.spacing.unit * 3,
        display: 'flex',
        order: 1,
        flexGrow: 1,
        flexDirection: 'column',
    },
    commentsBlockTitle:{
        textAlign: 'center'
    },
    actionBlock:{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    infoBlock:{
        marginLeft: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    titleBlock: {
        display: 'flex',
        flexDirection: 'row'
    },
    authorSignature: {
        marginLeft: '5px'
    },
    commentForm:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    formBlock:{
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        margin: theme.spacing.unit,
    },
    linkAction:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    buttonDelete:{
        margin: theme.spacing.unit,
        width: '100px'
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    buttonModal: {
        margin: theme.spacing.unit,
    },
    textField:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
    linkLine:{
        display: 'flex'
    }
})

function mapStateToProps(state, ownProps){
    return {
        link: state.links.list.find(l => l.id === ownProps.id),
        comments: state.comments.comments.filter(c => c.linkId === ownProps.id),
        userState: state.auth.userState
    }
}

function mapDispatchToProps(dispatch){
    return {
        getAllLinks: () => dispatch(getAllLinks()),
        addLinkComment: (body, authorId, linkId, userCredits) => dispatch(addLinkComment(body, authorId, linkId, userCredits)),
        deleteLink: (id, userCredits) => dispatch(deleteLink(id, userCredits)),
        updateLink: (linkId, title, linkURL, userCredits) => dispatch(updateLink(linkId, title, linkURL, userCredits)),
        deleteLinkComment: (commentId, userCredits) => dispatch(deleteLinkComment(commentId, userCredits))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LinkView)))
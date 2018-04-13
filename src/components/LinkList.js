import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { Link as RouterLink } from 'react-router-dom'

import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Link from 'material-ui-icons/Link'
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp'
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
import InsertComment from 'material-ui-icons/InsertComment'
import Button from 'material-ui/Button'
import Modal from 'material-ui/Modal'
import TextField from 'material-ui/TextField'

import { formatDate } from '../utils/formatter.js'
import { addLink, increaseLinkRate, decreaseLinkRate} from '../actions/'

import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'

class LinkList extends Component{

    constructor(props){
        super(props)

        this.submitAddLink = this.submitAddLink.bind(this)
    }

    componentDidMount(){
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
        addLinkModal: false,
        linkTitle: '',
        linkUrl: '',
        category: ''
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    handleChangeSelect = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    getModalStyle() {
        const top = 50;
        const left = 50;
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
    }

    submitAddLink(){
        const { linkTitle, linkUrl, category } = this.state
        const email = this.props.auth.userState.email

        this.props.addLink(linkTitle, linkUrl, category,  email).then(() => {
            this.setState({addLinkModal: false,linkTitle: '',linkUrl: '', category: ''})
        })
    }

    render(){
        const { links, classes, categories, auth } = this.props

        return (
            <Grid container spacing={0} className={classes.container}>
                {(auth.userState !== undefined && auth.isUserLogin) && (
                    <div className={classes.addLink}>
                        <Button color="primary" className={classes.button} onClick={() => this.setState({addLinkModal: true})}>
                            Add new Link
                        </Button>
                </div> )
                }
                <Grid container spacing={16} className={classes.containerBox}>
                {links.map(l => {
                    return (
                        <Grid item md={12} key={l.id}>
                            <Paper className={classes.root} elevation={4}>
                                <a href={l.linkURL}><Link color={'primary'} className={classes.icon}/></a>
                                <div className={classes.rateBlock}>
                                    <RouterLink to="#" onClick={() => this.props.rateUp(l.id)}>
                                        <KeyboardArrowUp/>
                                    </RouterLink>
                                    <Typography variant="body2" component="h4">
                                    {l.rating}
                                    </Typography>
                                    <RouterLink to="#" onClick={() => this.props.rateDown(l.id)}>
                                    <KeyboardArrowDown />
                                    </RouterLink>
                                </div>
                                <div className={classes.mainInfoBlock}>
                                    <RouterLink to={`/links/${l.id}`}>
                                        <Typography variant="headline" component="h3">
                                            {l.title}
                                        </Typography>
                                    </RouterLink>
                                    <div className={classes.infoFooter}>
                                        <Typography component="p">
                                            by {l.userName}
                                        </Typography>
                                        <Typography component="p" className={classes.infoFooterItem}>
                                            {formatDate(l.date)}
                                        </Typography>
                                        <Typography component="p" className={classes.categoryMargin}>
                                            #{l.category}
                                        </Typography>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                    )
                })}
                </Grid>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.addLinkModal}
                    onClose={() => this.setState({addLinkModal: false})}>

                    <div style={this.getModalStyle()} className={classes.paper}>
                        <Typography variant="title" id="modal-title">
                        Add Link
                        </Typography>
                        <Typography variant="subheading" id="simple-modal-description">
                        Share somethig that would make you mom proud of you
                        </Typography>

                        <TextField
                                id="linkTitle"
                                label="Headline"
                                placeholder="Your beautiful title..."
                                className={classes.textField}
                                margin="normal"
                                onChange={this.handleChange('linkTitle')}
                        />
                        <TextField
                            id="linkUrl"
                            label="Link URL"
                            placeholder="www.website.com"
                            multiline
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleChange('linkUrl')}
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={this.state.category}
                                onChange={this.handleChangeSelect}
                                inputProps={{
                                name: 'category',
                                id: 'category',
                                }}
                            >
                            {categories.map(c => <MenuItem value={c.name} key={c.name}>{c.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <Button color="primary" className={classes.buttonModal} onClick={this.submitAddLink}>
                            Add
                        </Button>
                        <Button color="secondary" className={classes.buttonModal} onClick={() => this.setState({addLinkModal: false})}>
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
        flexDirection: 'column'
    },
    containerBox: {
        width: '80%',
        margin: '0 auto'
    },
    root: theme.mixins.gutters({
      paddingTop: 6,
      paddingBottom: 6,
      marginTop: theme.spacing.unit * 3,
      display: 'flex',
      alignItems: 'center'
    }),
    icon:{
        fontSize: '30px'
    },
    rateBlock: {
        display: 'flex',
        padding: '5px',
        flexDirection: 'column',
        alignItems: 'center'
    },
    mainInfoBlock: {
        display: 'flex',
        padding: '5px',
        flexDirection: 'column',
        width: '100%'
    },
    infoFooter:{
        display: 'flex',
        padding: '2px'
    },
    infoFooterItem:{
        marginLeft: '15px'
    },
    button: {
        flex: 1,
        margin: theme.spacing.unit,
        marginTop: theme.spacing.unit * 3
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
    buttonModal: {
        margin: theme.spacing.unit,
    },
    actionBlock: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        height: '100%'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: '100%',
      },
      categoryMargin:{
          marginLeft: "10px"
      }
  });

function mapStateToProps(state, ownProps){
    return {
        auth: state.auth,
        links: ownProps.match.params.category !== undefined ?  state.links.list.filter(l => l.category === ownProps.match.params.category) :state.links.list,
        categories: state.categories.categories
    }
}

function mapDispatchToProps(dispatch){
    return {
        addLink: (title, url, category, email) => dispatch(addLink(title, url, category, email)),
        rateUp: (id) => dispatch(increaseLinkRate(id)),
        rateDown: (id) => dispatch(decreaseLinkRate(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LinkList))
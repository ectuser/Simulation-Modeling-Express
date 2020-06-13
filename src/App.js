import React from 'react';
import { Drawer, Grid, List, ListItem, ListItemText } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import { Lab13 } from "./components/Lab13";
import {Lab14} from "./components/Lab14";
import { Lab15 } from './components/Lab15';


const styles = {
    link: {
        textDecoration: "none",
        color: "gray",
        width: "100%",
        height: "100%"
    },
    leftNavBar: {
        width: "240px"
    },
    content: {
        marginLeft: "250px",
    }
}

const App = () => {

    const getUser = (axios) => {
        axios.get("/get-user").then(res => { console.log(res) });
    }

    return (
        <Router>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Drawer style={styles.leftNavBar}
                        variant="permanent"
                        anchor="left"
                    >
                        <List style={styles.leftNavBar}>
                            <ListItem button>
                                <Link style={styles.link} to="/lab-13"><ListItemText primary="Lab 13"></ListItemText></Link>
                            </ListItem>
                            <ListItem button>
                                <Link style={styles.link} to="/lab-14"><ListItemText primary="Lab 14"></ListItemText></Link>
                            </ListItem>
                            <ListItem button>
                                <Link style={styles.link} to="/lab-15"><ListItemText primary="Lab 15"></ListItemText></Link>
                            </ListItem>
                        </List>
                    </Drawer>
                </Grid>
                <Grid item xs={9}>
                    <Switch>
                        <Route path="/lab-13" component={Lab13} />
                        <Route path="/lab-14" component={Lab14} />
                        <Route path="/lab-15" component={Lab15} />
                    </Switch>
                </Grid>
            </Grid>
        </Router>
    );
}

export default App;

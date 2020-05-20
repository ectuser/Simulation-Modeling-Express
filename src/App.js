import React from 'react';
import { Drawer, Divider, List, ListItem, ListItemText } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';


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
    content:{
        marginLeft: "250px",
    }
}

const App = () => {

    const getUser = (axios) => {
        axios.get("/get-user").then(res => {console.log(res)});
    }

    return (
        <Router>
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
                </List>
            </Drawer>

            <div style={styles.content}>
                {/* <Switch>
                    <Route path="/lab-13">
                    </Route>
                </Switch> */}
                <div>Hello world</div>
                <button onClick={() => {getUser(axios)}}>Get user</button>
            </div>
        </Router>
    );
}

export default App;

import React, { useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const Profile = () => {
  useEffect(() => console.log("profile mounted"), []);
  return (
    <Grid container justify="center">
      <Grid container md="8">
        <Card>
          <CardContent>this is profile page</CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  state: state
});

export default connect(mapStateToProps)(Profile);

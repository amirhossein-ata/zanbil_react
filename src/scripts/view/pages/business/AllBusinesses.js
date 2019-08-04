import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { get_businesses } from "../../../core/actions/business";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    background: "#f2fafa"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  addButton: {
    margin: "2em"
  }
});

const AllBusinessesPage = ({ dispatch, auth, business, match }) => {
  useEffect(() => {
    dispatch(get_businesses(auth.token));
  }, []);
  const classes = useStyles();
  console.log("match in all business: ", match);
  return (
    <div>
      <Link to="/add_business">
        <Button
          className={classes.addButton}
          variant="contained"
          color="primary"
        >
          ایجاد کسب و کار
        </Button>
      </Link>

      <Grid container spacing={2} justify="center">
        {business.state === "loaded" &&
          business.businesses.map((business, index) => (
            <Grid item xs={10} md={6} lg={4} key={index}>
              <Card className={classes.card}>
                <CardContent>
                  <h4>{business.name}</h4>
                  <p>{business.description}</p>
                </CardContent>
                <CardActions>
                  <Link to={`/business_detail/${business.id}`}>
                    <Button color="primary" variant="contained" size="small">
                      {" "}
                      مشاهده کسب و کار
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  business: state.business,
  auth: state.auth
});

export default connect(mapStateToProps)(AllBusinessesPage);

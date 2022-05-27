import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Link from "next/link";

const Details = ({ todoProps }) => {
  const todo = JSON.parse(todoProps);
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Card
          sx={{ minWidth: 275, boxShadow: 3 }}
          style={{ backgroundColor: "#fafafa" }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {todo.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {todo.details}
            </Typography>
          </CardContent>
          <CardActions>
            <Link href="/">
              <Button size="small">Back to Home</Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Details;

export const getStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, "todos"));
  const paths = snapshot.docs.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const docRef = doc(db, "todos", id);
  const docSnap = await getDoc(docRef);

  return {
    props: {
      todoProps: JSON.stringify(docSnap.data()) || null,
    },
  };
};

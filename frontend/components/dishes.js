import { useRouter } from "next/router";
import { gql, useQuery } from '@apollo/client';
import { useState, useContext, useEffect } from 'react'; // Added useEffect
import AppContext from "@/components/AppContext";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col } from "reactstrap";

function Dishes({ restId }) {
  const { addItem } = useContext(AppContext);
  const [restaurantID, setRestaurantID] = useState(restId);
  
  useEffect(() => {
    setRestaurantID(restId);
  }, [restId]) // This will update restaurantID whenever restId changes
  
  const GET_RESTAURANT_DISHES = gql`
    query($id: ID!) {
      restaurant(id: $id) {
        id
        name
        dishes {
          id
          name
          description
          price
          image {
            url
          }
        }
      }
    }
  `;

  const router = useRouter();

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: restaurantID },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  const restaurant = data.restaurant;

  if (restaurant.dishes.length === 0) {
    return <h1>No Dishes</h1>;
  }

  return (
    <>
      {restaurant.dishes.map((dish) => (
        <Col xs="6" sm="4" style={{ padding: 0 }} key={dish.id}>
          <Card style={{ margin: "0 10px" }}>
            <CardImg
              top={true}
              style={{ height: 150, width: 150 }}
              src={`http://localhost:1337${dish.image.url}`}
            />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
            <div className="card-footer">
              <Button
                color="info"
                outline
                onClick={() => addItem(dish)}
              >
                + Add To Cart
              </Button>
            </div>
          </Card>
        </Col>
      ))}
    </>
  );
}

export default Dishes;

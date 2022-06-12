import gql from 'graphql-tag';

const mutation = gql`
  mutation getOrder(
    $orderId: Int!
  ) {
    getOrder(input: {
      orderId: $orderId,
    }) {
      order {
        itemId
        companyName
        companySiren
        orderAddress
        orderDate
        panels
      }
      customers {
        itemId
        name
        email
        phone
      }
      success
      errors
    }
  }
`;

export default function({
  apollo,
  orderId,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      orderId
    }
  });
}

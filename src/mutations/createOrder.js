import gql from 'graphql-tag';

const mutation = gql`
  mutation createOrder(
    $companyName: String!,
    $companySiren: String!,
    $orderAddress: String!,
    $orderDate: String!,
    $customers: JSON!,
    $panels: JSON!
  ) {
    createOrder(input: {
      companyName: $companyName,
      companySiren: $companySiren,
      orderAddress: $orderAddress,
      orderDate: $orderDate,
      customers: $customers,
      panels: $panels,
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
  companyName,
  companySiren,
  orderAddress,
  orderDate,
  customers,
  panels,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      companyName,
      companySiren,
      orderAddress,
      orderDate,
      customers,
      panels
    }
  });
}

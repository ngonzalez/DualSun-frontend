import gql from 'graphql-tag';

const mutation = gql`
  mutation createOrder(
    $companyName: String!,
    $companySiren: String!,
    $customers: JSON!,
    $orderAddress: String!,
    $orderDate: String!
    $panels: JSON!
  ) {
    createOrder(input: {
      companyName: $companyName,
      companySiren: $companySiren,
      customers: $customers,
      orderAddress: $orderAddress,
      orderDate: $orderDate,
      panels: $panels,
    }) {
      order {
        id
        companyName
        companySiren
        orderAddress
        orderDate
        panels
      }
      customers {
        id
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
  customers,
  orderAddress,
  orderDate,
  panels,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      companyName,
      companySiren,
      customers,
      orderAddress,
      orderDate,
      panels
    }
  });
}
